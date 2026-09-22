-- =========================================================================
-- National Land Acquisition & Management System (NLAMS / BHOOMI-GATI)
-- PostgreSQL with PostGIS Database Schema & Spatial Engine
-- Compliance: Right to Fair Compensation and Transparency in Land
-- Acquisition, Rehabilitation and Resettlement Act (RFCTLARR 2013)
-- =========================================================================

-- Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    hindi_title VARCHAR(255),
    sector VARCHAR(100) NOT NULL,
    ministry VARCHAR(150) NOT NULL,
    requiring_body VARCHAR(150) NOT NULL,
    state VARCHAR(100) NOT NULL,
    districts TEXT[] NOT NULL,
    total_proposed_area_ha NUMERIC(12, 4) NOT NULL,
    notified_area_ha NUMERIC(12, 4) DEFAULT 0,
    acquired_area_ha NUMERIC(12, 4) DEFAULT 0,
    possession_taken_ha NUMERIC(12, 4) DEFAULT 0,
    total_estimated_budget_cr NUMERIC(14, 2) NOT NULL,
    compensation_assessed_cr NUMERIC(14, 2) DEFAULT 0,
    compensation_disbursed_cr NUMERIC(14, 2) DEFAULT 0,
    escrow_funded_cr NUMERIC(14, 2) DEFAULT 0,
    total_affected_families INTEGER DEFAULT 0,
    total_displaced_families INTEGER DEFAULT 0,
    current_stage INTEGER DEFAULT 1 CHECK (current_stage BETWEEN 1 AND 9),
    sec11_date DATE,
    sec19_deadline DATE,
    status VARCHAR(30) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DELAYED', 'COMPLETED', 'ON_TRACK')),
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    lead_officer_name VARCHAR(150),
    lead_officer_role VARCHAR(100),
    hero_image_url TEXT
);

-- 2. Land Parcels Table (PostGIS Geometry)
CREATE TABLE IF NOT EXISTS land_parcels (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) REFERENCES projects(id) ON DELETE CASCADE,
    khasra_number VARCHAR(64) NOT NULL,
    survey_number VARCHAR(64),
    village VARCHAR(100) NOT NULL,
    taluk VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    area_hectares NUMERIC(10, 4) NOT NULL,
    area_acres NUMERIC(10, 4) NOT NULL,
    land_type VARCHAR(50) NOT NULL,
    owner_name VARCHAR(150) NOT NULL,
    father_husband_name VARCHAR(150),
    aadhaar_masked VARCHAR(20),
    bank_account_masked VARCHAR(30),
    ifsc_code VARCHAR(20),
    base_circle_rate_per_ha NUMERIC(14, 2) NOT NULL,
    rural_multiplier NUMERIC(4, 2) DEFAULT 1.0,
    solatium_amount NUMERIC(14, 2) DEFAULT 0,
    additional_market_value NUMERIC(14, 2) DEFAULT 0,
    assets_value NUMERIC(14, 2) DEFAULT 0,
    total_compensation_amount NUMERIC(14, 2) NOT NULL,
    compensation_status VARCHAR(30) DEFAULT 'PENDING' CHECK (compensation_status IN ('PENDING', 'ASSESSED', 'DISBURSED', 'UNDER_APPEAL')),
    possession_status VARCHAR(30) DEFAULT 'PENDING' CHECK (possession_status IN ('PENDING', 'SURVEYED', 'POSSESSION_TAKEN', 'DISPUTED')),
    status VARCHAR(30) DEFAULT 'PROPOSED' CHECK (status IN ('PROPOSED', 'NOTIFIED_SEC11', 'DECLARED_SEC19', 'AWARD_DECLARED', 'COMPENSATION_DISBURSED', 'POSSESSION_TAKEN', 'DISPUTED')),
    -- PostGIS spatial polygon geometry in WGS 84 (SRID 4326)
    geom geometry(Polygon, 4326) NOT NULL,
    field_photo_url TEXT,
    possession_date TIMESTAMP WITH TIME ZONE,
    disbursement_date TIMESTAMP WITH TIME ZONE,
    pfms_utr_number VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial GIST Index on parcel geometries for high-speed spatial queries
CREATE INDEX IF NOT EXISTS idx_land_parcels_geom ON land_parcels USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_land_parcels_project ON land_parcels (project_id);
CREATE INDEX IF NOT EXISTS idx_land_parcels_khasra ON land_parcels (khasra_number);

-- 3. Statutory Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) REFERENCES projects(id) ON DELETE CASCADE,
    section VARCHAR(50) NOT NULL,
    gazette_number VARCHAR(100) NOT NULL,
    gazette_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED', 'EXPIRED', 'COMPLIANT')),
    newspaper_publication_english VARCHAR(150),
    newspaper_publication_vernacular VARCHAR(150),
    digital_sign_cert_hash VARCHAR(128) NOT NULL,
    signed_by VARCHAR(150) NOT NULL,
    document_title VARCHAR(255) NOT NULL,
    file_size_mb NUMERIC(6, 2) DEFAULT 1.5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PFMS / DBT Direct Benefit Transfer Ledger
CREATE TABLE IF NOT EXISTS dbt_disbursements (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) REFERENCES projects(id) ON DELETE CASCADE,
    parcel_id VARCHAR(64) REFERENCES land_parcels(id) ON DELETE CASCADE,
    khasra_number VARCHAR(64) NOT NULL,
    beneficiary_name VARCHAR(150) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    masked_account VARCHAR(30) NOT NULL,
    ifsc VARCHAR(20) NOT NULL,
    amount_rupees NUMERIC(14, 2) NOT NULL,
    utr_number VARCHAR(64) UNIQUE NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'SUCCESS' CHECK (status IN ('SUCCESS', 'PROCESSING', 'FAILED')),
    pfms_batch_id VARCHAR(64) NOT NULL,
    disbursed_by VARCHAR(150) NOT NULL
);

-- 5. Rehabilitation & Resettlement (R&R) Register
CREATE TABLE IF NOT EXISTS rnr_records (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) REFERENCES projects(id) ON DELETE CASCADE,
    family_head_name VARCHAR(150) NOT NULL,
    vulnerability_status VARCHAR(50) DEFAULT 'GENERAL',
    is_displaced BOOLEAN DEFAULT FALSE,
    khasra_number VARCHAR(64) NOT NULL,
    residential_structure_affected BOOLEAN DEFAULT FALSE,
    agricultural_land_pct_lost NUMERIC(5, 2) DEFAULT 0,
    resettlement_house_allotted BOOLEAN DEFAULT FALSE,
    resettlement_plot_location TEXT,
    subsistence_allowance_months INTEGER DEFAULT 0 CHECK (subsistence_allowance_months BETWEEN 0 AND 12),
    displacement_grant_paid BOOLEAN DEFAULT FALSE,
    cattle_shed_grant_paid BOOLEAN DEFAULT FALSE,
    annuity_or_job_option VARCHAR(50) DEFAULT 'ONE_TIME_LUMPSUM',
    status VARCHAR(30) DEFAULT 'ELIGIBLE' CHECK (status IN ('ELIGIBLE', 'PARTIALLY_SETTLED', 'FULLY_SETTLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Audit Trail with Cryptographic Verification
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    project_id VARCHAR(64) REFERENCES projects(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actor VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    sha256_hash VARCHAR(128) NOT NULL
);

-- =========================================================================
-- PostGIS Spatial Analytical Functions & Stored Queries
-- =========================================================================

-- Function 1: Compute true geodetic area of parcel in Hectares using PostGIS
CREATE OR REPLACE FUNCTION get_parcel_geodesic_area_ha(parcel_geom geometry)
RETURNS NUMERIC AS $$
BEGIN
    -- ST_Area with geography calculates true WGS-84 ellipsoidal area in square meters
    RETURN ROUND((ST_Area(parcel_geom::geography) / 10000.0)::NUMERIC, 4);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function 2: Check project alignment envelope intersection with sensitive zone
CREATE OR REPLACE FUNCTION check_parcel_alignment_intersection(
    project_poly geometry,
    search_geom geometry
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN ST_Intersects(project_poly, search_geom);
END;
$$ LANGUAGE plpgsql STABLE;

-- Function 3: Generate GeoJSON FeatureCollection for a project
CREATE OR REPLACE FUNCTION get_project_parcels_geojson(proj_id VARCHAR)
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(ST_AsGeoJSON(t.*)::json)
    ) INTO result
    FROM (
        SELECT id, project_id, khasra_number, village, taluk, district,
               area_hectares, land_type, owner_name, total_compensation_amount,
               compensation_status, possession_status, status, geom
        FROM land_parcels
        WHERE project_id = proj_id
    ) AS t;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

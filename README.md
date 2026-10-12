# National Land Acquisition & Management System (NLAMS)
### राष्ट्रीय भूमि अधिग्रहण एवं प्रबंधन प्रणाली
**Department of Land Resources (DoLR) • Ministry of Rural Development, Government of India**

[![Production Status](https://img.shields.io/badge/Production-Live%20Online-emerald?style=flat-square)](https://nlas-five.vercel.app)
[![Compliance](https://img.shields.io/badge/Statutory%20Act-RFCTLARR%202013-blue?style=flat-square)](https://nlas-five.vercel.app)
[![Coverage](https://img.shields.io/badge/Coverage-780%2B%20Districts%20%7C%2036%20States%20%26%20UTs-orange?style=flat-square)](https://nlas-five.vercel.app)

---

## 🏛️ Overview

NLAMS is an enterprise, multi-tier digital governance portal engineered for nationwide execution of the **Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR Act 2013)** across the Republic of India.

The platform provides end-to-end statutory workflow management across all **28 States, 8 Union Territories, and 780+ Districts**, featuring strict territorial jurisdiction locks, dynamic cadastral mapping, 100% solatium computation, and direct PFMS / RBI e-Kuber treasury integration.

---

## 🚀 Live Portal

- **Production Portal**: [https://nlas-five.vercel.app](https://nlas-five.vercel.app)
- **API Health Gateway**: [https://nlas-five.vercel.app/api/health](https://nlas-five.vercel.app/api/health)
- **Pan-India District Directory API**: [https://nlas-five.vercel.app/api/districts](https://nlas-five.vercel.app/api/districts)

---

## 🔑 Government Service ID Authentication

Under the Supreme Court mandate (*K.S. Puttaswamy v. Union of India*), employee authentication uses **Government Service Identity Cards** (DoPT / SPARROW / GAD Civil List / e-HRMS Codes) rather than Aadhaar numbers, strictly binding officers to their official Cadre Posting Order.

> **Universal Demonstration Passphrase**: `INDIa@114`

### 1. District Collector / CALA (Any of 780+ Districts)
- **Format**: `DC-{STATE_CODE}-{DISTRICT}`
- **Examples**:
  - `DC-MH-NANDURBAR` &rarr; Collector & DM, Nandurbar District (Maharashtra)
  - `DC-GJ-AHMEDABAD` &rarr; Collector & DM, Ahmedabad District (Gujarat)
  - `DC-UP-LUCKNOW` &rarr; Collector & DM, Lucknow District (Uttar Pradesh)
  - `DC-KA-BENGALURU` &rarr; Collector & DM, Bengaluru Urban (Karnataka)
  - `DC-RJ-JAIPUR` &rarr; Collector & DM, Jaipur District (Rajasthan)

### 2. State Revenue Secretary (All 36 States & UTs)
- **Format**: `SO-{STATE_CODE}`
- **Examples**:
  - `SO-MH` &rarr; Principal Secretary (Revenue), Maharashtra
  - `SO-KA` &rarr; Principal Secretary (Revenue), Karnataka
  - `SO-UP` &rarr; Principal Secretary (Revenue), Uttar Pradesh
  - `SO-TN` &rarr; Principal Secretary (Revenue), Tamil Nadu

### 3. Central Apex Authority (DoLR, New Delhi)
- **Identifier**: `CA-CENTRAL` or `admin`
- **Cadre Code**: `IAS-AGMUT-2002-0056`

### 4. Project Implementing Bodies
- **Identifier**: `AG-{AGENCY}` or `nhai`
- **Cadre Code**: `NHAI-CGM-2015-0814`

### 5. Affected Landowners
- **Identifier**: `CZ-{STATE}-{DISTRICT}-{SURVEY}` or `citizen`

---

## ⚖️ Statutory 3-Tier Statutory Workflow

The system enforces the strict three-tier statutory clearance sequence mandated by the RFCTLARR Act 2013:

```
[ Tier 1: District Collectorate (CALA) ]
         │  Field Joint Measurement Survey (JMS)
         │  Disposal of Section 15 Landowner Objections
         ▼
[ Tier 2: State Revenue Secretariat ]
         │  Section 15(2) State Scrutiny & SIA Appraisal
         │  Cabinet / Empowered Committee Statutory Endorsement
         ▼
[ Tier 3: Central Apex Authority (DoLR / MoRD) ]
            Section 19 National Gazette Notification
            Gazette Order Publication (e.g. CG-DL-E-2024-XXXXXX)
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, Leaflet GIS Cadastral Maps
- **Backend**: Express.js with modular REST micro-gateways
- **Scalability**:
  - In-memory multi-key hash indexing ($O(1)$ query execution across 780+ districts)
  - Dynamic on-demand district synthesis for zero-gap nationwide coverage
  - HTTP Gzip/Deflate response compression (`compression`)
  - Enterprise security hardening (`helmet`)
  - Sliding-window rate limiting configured for 100,000 requests/minute
  - Edge caching with `Cache-Control: public, max-age=60`
- **Deployment**: Vercel Serverless Architecture

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd nlas

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Vite client will run at http://localhost:3000
# Express API server will run at http://localhost:5000

# 4. Build for production
npm run build
```

---

## 📜 Statutory Legal Notice

*Compliant with Sections 11, 15, 19, 23, 26, 30, 38, 64, 77, and 96 of the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (RFCTLARR).*

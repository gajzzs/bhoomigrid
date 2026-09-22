---
name: Sovereign Cadastral Enterprise
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#525f75'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0e1c2f'
  on-primary-container: '#77849c'
  inverse-primary: '#bac7e1'
  secondary: '#426086'
  on-secondary: '#ffffff'
  secondary-container: '#b3d1fd'
  on-secondary-container: '#3b5a7f'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f1500'
  on-tertiary-container: '#c76c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3fe'
  primary-fixed-dim: '#bac7e1'
  on-primary-fixed: '#0e1c2f'
  on-primary-fixed-variant: '#3a475c'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#aac9f4'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#29486d'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: IBM Plex Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.04em
  cadastral-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

The design system embodies sovereign authority, statutory precision, and unshakeable institutional integrity. Built specifically for high-stakes administrative infrastructure, cadastral surveys, Direct Benefit Transfer (DBT) land compensation ledgers, and multi-agency governance, the visual tone eliminates ornamental distractions in favor of high-density clarity and decisive operational structure.

The design movement combines **Corporate Modernism** with **Institutional Grid Architecture**:
- **Authoritative & Legitimate:** Commands immediate trust from field officers, district collectors, legal arbiters, and citizen-facing counters.
- **High Information Density:** Accommodates intricate survey numbers, plot partitions, gazette notifications, and financial audit ledgers without visual exhaustion.
- **Statutory Precision:** Visual anchors establish clear procedural checkpoints, dispute notifications, and jurisdictional provenance across state, district, and tehsil tiers.

## Colors

The system relies on a high-contrast sovereign palette that differentiates governance tiers, critical land disputes, statutory timelines, and automated fund disbursements.

- **Primary Canvas & Structural Core:** Sovereign Deep Navy Slate (`#0b192c`) serves as the dominant structural anchor for system headers, agency masts, and executive dashboards. Secondary Slate Navy (`#1e3e62`) governs active toolbars, structural dividers, and secondary actions.
- **National Accent:** Gold/Saffron (`#d97706`, hover `#f59e0b`) is reserved for official state gazette seals, active workflow triggers, highlighting parcel boundaries during active acquisition, and primary transactional anchors.
- **Statutory Semantics:**
  - **Disbursed / Verified / Mutated:** Emerald Green (`#059669`) denotes clear land title, finalized DBT disbursement, and verified survey coordinates.
  - **Pending Statutory Action / Gazette Notice:** Amber (`#d97706` / `#b45309`) indicates public objection window periods, pending revenue court decisions, or environmental clearances.
  - **Bottleneck / Encumbrance / Injunction:** Crimson (`#dc2626`) immediately flags overlapping claims, legal stays, non-matching Aadhaar/land record linkage, or acquisition freezes.
- **Surfaces & Data Backdrops:** Crisp Slate White (`#ffffff`), Canvas (`#f8fafc`), Subdued Slate (`#f1f5f9`), framed by rigid administrative hairline borders (`#e2e8f0`).

## Typography

The typographical framework enforces technical legibility under extreme tabular and geographic density. 

- **IBM Plex Sans** supplies the human-readable institutional register. Its structured grotesque architecture offers superior stability across bureaucratic forms, gazette texts, and complex administrative navigation.
- **JetBrains Mono** serves as the specialized functional layer for high-precision metadata: survey khata numbers, Khasra references, GIS coordinates, PFMS transaction UTR numbers, and timestamped audit logs.
- All tabular data cells must implement tabular lining figures (`font-variant-numeric: tabular-nums`) to ensure strict vertical alignment across revenue compensation tables.

## Layout & Spacing

The layout is built upon an uncompromising, mathematically grounded 12-column administrative grid system optimized for high-resolution dual-monitor setups commonly deployed across ministry back-offices, while remaining resilient on field-level ruggedized tablets.

- **Desktop Framework (>= 1280px):** 12-column fluid structure with `1.5rem` gutters and `2rem` page margins. Sidebar navigation is persistent (260px fixed width) alongside an optional collapsible cadastral map panel.
- **Tablet Layout (768px - 1279px):** 8-column layout with `1rem` gutters and `1.5rem` margins. The primary data table takes precedence; contextual inspection panes collapse into docked bottom drawers.
- **Mobile / Field Device (< 768px):** 4-column layout with `0.5rem` gutters and `1rem` margins. Complex financial ledgers convert into card stacks with sticky record IDs.
- **Spatial Rhythm:** Built strictly on an 8px grid baseline with a half-step 4px micro-unit (`space-xs`) reserved for tight data dense table rows, status pills, and GIS coordinate readouts.

## Elevation & Depth

Visual hierarchy does not rely on soft atmospheric blur or consumer-grade elevation. It leverages **Crisp Hairline Boundaries with Targeted Tonal Stacking**:

- **Ground Plane (0dp):** System canvas sits at `#f8fafc`. Surface cards, cadastral registries, and work panels rest at `#ffffff` with a crisp 1px structural perimeter of `#e2e8f0`.
- **Raised Tiers (1dp):** Dropdown menus, floating map tools, and active ledger rows use `box-shadow: 0 1px 3px 0 rgba(11, 25, 44, 0.08), 0 1px 2px -1px rgba(11, 25, 44, 0.05)` combined with a 1px border of `#cbd5e1`.
- **Statutory Focus / Overlays (2dp):** Objection filings, gazette generation modals, and disbursement authorization prompts employ `box-shadow: 0 10px 15px -3px rgba(11, 25, 44, 0.12), 0 4px 6px -4px rgba(11, 25, 44, 0.08)` paired with an institutional backdrop overlay of `#0b192c` at 65% opacity.
- **Selection & State Highlighting:** Selected spatial parcels and table records discard drop shadows in favor of a 2px inset border of `#1e3e62` or `#d97706`.

## Shapes

The design system adopts a **Soft Geometric (Level 1)** posture, enforcing crisp, serious corners that avoid the juvenile feel of highly rounded shapes while avoiding the harshness of zero-radius corners.

- **Standard Elements (0.25rem / 4px):** Form fields, action buttons, table cells, metric ribbon modules, and GovTech badges.
- **Structural Modules (0.5rem / 8px):** Data cards, audit trail panels, and map viewports (`rounded-lg`).
- **Pill Exceptions:** Status badges and verification tags use standard `0.25rem` corners with monospaced text to preserve an official stamp or legal certificate identity, explicitly rejecting rounded-pill aesthetics.

## Components

### Buttons
- **Primary Statutory Action:** Deep sovereign navy (`#0b192c`) background, white text, 4px corner radius, 1px border of `#0b192c`. On hover: `#1e3e62`. Active states use an inner stroke.
- **High-Value Executive Action (e.g., Sanction DBT):** Saffron/Gold accent (`#d97706`), text `#ffffff`, font-weight 600.
- **Destructive / Cancellation Action:** `#dc2626` background with white text for acquisition cancelation or revoking gazette draft.
- **Secondary Actions:** White background, 1px solid `#cbd5e1` border, `#0b192c` text, hovering to `#f1f5f9`.

### GovTech Status Badges & Stamps
- Structural, rectangular badges (padding: 2px 8px, 4px border radius, uppercase typography in `JetBrains Mono`, 11px).
- **Verified / Disbursed:** `#ecfdf5` background, `#047857` border, `#065f46` text. Left-flanked by a solid micro-bullet.
- **Statutory Timeline Active / Public Review:** `#fffbeb` background, `#d97706` border, `#92400e` text.
- **Enjoined / Objections Flagged:** `#fef2f2` background, `#dc2626` border, `#991b1b` text.

### Metric Ribbons
- Horizontal operational counters tracking total hectarage acquired, budget sanctioned, balance for disbursement, and open objections.
- Bordered by `#e2e8f0` with vertical hairline dividers between KPI segments. Labels rendered in IBM Plex Sans (11px, semi-bold, uppercase, `#64748b`), accompanied by large numerical readouts in tabular format.

### Audit Trails & Historical Ledgers
- Vertical spine layout using a 2px `#cbd5e1` hairline connecting step nodes.
- Each event features an authoritative timestamp in `JetBrains Mono`, officer designation, jurisdictional office code, digital signature hash preview, and action status badge.

### Multi-Agency Tier Indicators
- A structured breadcrumb-style indicator tracking approvals across tiers: `Tehsil Revenue Office → District Collectorate → State Land Revenue Board → Competent Authority (NHAI/Railways)`.
- Active stage is highlighted in Navy (`#0b192c`) with Saffron indicator; pending stages show `#94a3b8` dashed borders; cleared stages show `#059669` check marks.

### Cadastral Data & Form Fields
- Inputs feature explicit field headers with statutory act references where applicable (e.g., *Under Section 11(1)*).
- 1px neutral borders (`#cbd5e1`), background `#ffffff`, focus ring of 2px solid `#1e3e62` with 0px offset.

### Cards & Data Panels
- Rigid white surfaces bordered by 1px `#e2e8f0`. Headers include a light grey background (`#f8fafc`), bottom border, and title accompanied by action buttons.
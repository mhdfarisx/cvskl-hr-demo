# cvskl-hr-demo

Static HTML demo — CVSKL + PICASO full HR System. Single-page app. No backend, demo data only. Fully mobile-responsive.

## Stack
- Vanilla HTML/CSS/JS (no framework)
- Chart.js 4.4.0 (CDN)
- Google Fonts — Inter
- `css/style.css`, `js/app.js`, `js/data.js`

## Pages (sidebar nav)
- **Dashboard** — KPI cards, 4 Chart.js charts, filters (entity/contract/dept/gender), recent movements, hiring pipeline bar, upcoming interviews
- **Staff List** — searchable/filterable table, click row → Staff Profile
- **Staff Profile** — tabs: Overview, Leave, Salary & Increments, Performance (KPI + bonus)
- **Movement Log** — all hires/resignations/promotions/transfers
- **Job Requisitions** — table with modal drill-down per JR
- **Pipeline Board** — Kanban (Applied → Screening → Interview 1/2 → Offer → Hired/Rejected), cross-entity badges
- **All Candidates** — full candidate list with cross-entity alert banner, Add Candidate form (with live IC validation)
- **Hiring Reports** — static analytics (time-to-hire, acceptance rate, department/source breakdown)
- **Settings** — company config + notification settings + user access table

## Key Features
- **Dual entity**: CVSKL + PICASO — both logos in sidebar; all data filterable by entity
- **Cross-Entity Intelligence** — IC-based detection of:
  - Bad record / Do-Not-Rehire (red alert, blocks hire flow)
  - Concurrent duplicate — same candidate active at both entities simultaneously (amber alert)
  - Live IC validation in Add Candidate form (flags on keystroke)
- **AI Chat** — keyword-matched Q&A for staff, hiring, watchlist, performance (bottom-right FAB)
- **Stage mover** — move candidates through pipeline stages live in the candidate modal
- **Mobile responsive** — hamburger sidebar (off-canvas), grid stacking at 768px, 480px

## Data (js/data.js)
- `STAFF` — 20 staff records (CVSKL + PICASO)
- `MOVEMENTS` — 10 movement log entries
- `LEAVE` — per-staff AL/MC/HL balances
- `SALARY_HISTORY` — salary increment history (5 staff)
- `PERFORMANCE` — tier/score/bonus/KPI (12 staff)
- `JOB_REQUISITIONS` — 8 JRs (active/closed/on hold)
- `CANDIDATES` — 27 candidates including 3 flagged scenarios (Fadzlan, Khairul, Izzatul)
- `WATCHLIST` — 2 Do-Not-Rehire entries
- `AI_QA` — ~35 Q&A pairs for the HR Assistant chatbot

## Demo Persona
- Nur Aisyah, HR Manager — logged in user

## Cross-Entity Scenarios (demo)
1. **Fadzlan bin Mamat** (IC: 880420-10-6612) — falsified creds at CVSKL, reapplied at PICASO
2. **Khairul Aziz bin Hamdan** (IC: 950310-05-4432) — misconduct at CVSKL, reapplied at PICASO
3. **Izzatul Izzati binti Idris** (IC: 980115-14-2234) — concurrent application at both entities

## Quotation
- QT-2026-0427 · RM19,000 · Valid 27 May 2026
- File: `/Users/mhdfarisx/CVSKL-Quotation.html`

## GitHub
- Repo: https://github.com/mhdfarisx/cvskl-hr-demo

## Responsive Grid Classes (css/style.css)
- `.grid-2` → 2-col, collapses to 1 on mobile
- `.grid-2-lg` → 2-col 24px gap, collapses to 1 on mobile
- `.grid-3` / `.grid-3-sm` → 3-col, collapses to 2 on tablet, 1 on mobile
- `.grid-2-1` → 2fr/1fr split, collapses to 1 on mobile
- `.stats-grid` → 4-col, collapses to 2 on tablet, 1 on 480px
- `.add-cand-grid` → 2-col form grid, collapses to 1 on mobile

## Entry Point
Single `index.html` — all pages in one file, JS routing via `showPage(id)`

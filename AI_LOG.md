# AI Collaboration Log — 3SAJ Stream

This document tracks all AI-assisted engineering sessions, prompts, tools, code generations, architectural decisions, and verification activities during the development of **3SAJ Stream**.

---

## Session 1: Check 1 Initialization & Requirements Ingestion
- **Timestamp:** 2026-11-15 21:26:40+07:00
- **Primary AI Assistant:** Antigravity (Powered by Google Gemini 3.8 Flash)
- **Developer / Student:** KRIYA MUSTAFA (ID: `e20230474`, Group: `I4-GIC-A`)
- **Objective:** Fulfill all milestones for **Check 1 · Week 4 practice**:
  1. `docs/SPEC.md` with 6–10 user stories, acceptance criteria, ≥2 roles.
  2. Wireframes for main screens in `docs/wireframes/`.
  3. `frontend/` runnable via `npm run dev` from a fresh clone.
  4. First static screens built from the spec (no real data yet).
  5. `AI_LOG.md` and `DECISIONS.md` with real entries.
  6. Small commits with meaningful messages and git tag `check-1`.

### Prompt 1.1: Document Analysis & Project Proposal Ingestion
- **User Input:**
  ```text
  "z:\Year 4\OS\M1\Project Proposal Video Streaming Website.pdf"### **Check 1 · Week 4 practice**
  [Checklist items...]
  ```
- **AI Action / Tool Calls:**
  - Ran `read_file` on `Project Proposal Video Streaming Website.pdf`.
  - Extracted core parameters: Project name ("3SAJ Stream"), author credentials, Crunchyroll reference architecture, 3 user classes (Guest, Member, Admin), 17 Functional Requirements (FR-1 through FR-17), 8 Non-Functional Requirements (NFR-1 through NFR-8), and architectural components.
- **Outcome:** Complete understanding of domain requirements, entities (`User`, `Series`, `Season`, `Episode`, `SubtitleTrack`, `Watchlist`, `WatchHistory`), and grading criteria.

---

## Session 2: Specification & User Stories Generation
- **Timestamp:** 2026-11-15 21:29:00+07:00
- **Task:** Draft `docs/SPEC.md` covering 8 comprehensive user stories with standard acceptance criteria.
- **Engineering Decisions:**
  - Selected 8 stories (exceeding the minimum 6, within the 6–10 bounds).
  - Explicitly mapped each story to at least one role: Guest, Member, and Administrator.
  - Used standard Gherkin-style "Given / When / Then" acceptance criteria with clear boundary cases (e.g. non-MP4 upload rejection, subtitle switching without player disruption, resume position recall).
  - Built a cross-reference Traceability Matrix matching FR-1..17 and NFR-1..8.
- **Git Commit:**
  - `docs(spec): add specification with 8 user stories and acceptance criteria for 3 roles` (`4bd0bf4`)

---

## Session 3: UI Wireframes & Layout Modeling
- **Timestamp:** 2026-11-15 21:31:00+07:00
- **Task:** Create vector wireframes for core system screens in `docs/wireframes/`.
- **Generated Assets:**
  - `home.svg`: Hero banner, continue watching shelf, genre pills, anime grid.
  - `series-detail.svg`: Large poster, metadata badges, synopsis, season tabs, episode cards.
  - `video-player.svg`: 16:9 canvas, custom playback bar, subtitle track menu (`CC`), episode queue.
  - `watchlist.svg`: Personal watchlist cards, progress percentage bars, resume CTA.
  - `admin-dashboard.svg`: Metric cards, series CRUD table, MP4 upload form, transcoding queue with status badges and retry trigger.
  - `auth-modal.svg`: Sign in / register forms with quick role switcher for testing.
  - `docs/wireframes/README.md`: Layout explanations, responsive design notes, and Mermaid navigation flow chart.
- **Git Commit:**
  - `docs(wireframes): add vector wireframe SVGs and layout architecture documentation` (`37e73b5`)

---

## Session 4: Architectural Decision Records & Logging
- **Timestamp:** 2026-11-15 21:34:00+07:00
- **Task:** Formalize ADRs in `DECISIONS.md` and initial interaction history in `AI_LOG.md`.
- **Recorded Decisions:**
  - ADR-001 through ADR-007 documenting architecture choices, framework evaluation (React + Vite + Tailwind), player design, RBAC simulation, and offline-first graphic rendering.

---

## Session 5: Frontend Scaffolding & Static Screen Implementation
- **Timestamp:** 2026-11-15 (In Progress)
- **Task:** Construct `frontend/` directory with Vite, React, Tailwind CSS, Lucide icons, and static screens implementing the specification.
- **Plan:**
  - Scaffold `frontend/` with standard Vite React template.
  - Add Tailwind CSS for responsive styling (mobile 360px to desktop 1920px per NFR-7).
  - Implement full mock datasets (`seriesData.js`, `mockJobs.js`).
  - Build views: Home, Series Detail, Watch Player (with interactive subtitles & progress), Watchlist, and Admin Console.
  - Test locally with `npm run build` and `npm run dev`.

# 3SAJ Stream — Anime Video Streaming Website

**3SAJ Stream** is a web-based anime streaming platform inspired by Crunchyroll. It delivers an organized catalogue of anime series and seasons, high-definition video playback with synchronized multi-language WebVTT subtitles, personal watchlists, watch progress resumption, and administrative tools for content management and background video transcoding orchestration.

- **Author / Student:** KRIYA MUSTAFA
- **Student ID:** `e20230474`
- **Class Group:** `I4-GIC-A`
- **Submission Checkpoint:** `check-1` (Week 4 Practice)

---

## 1. Check 1 Deliverables Summary

| Item | Requirement | Status | Location / Artifact |
| :--- | :--- | :---: | :--- |
| **1** | `docs/SPEC.md`: 6–10 user stories with acceptance criteria, ≥2 roles | **Complete** | [docs/SPEC.md](file:///Z:/Year%204/OS/M1/docs/SPEC.md) (8 user stories covering Guest, Member, Admin) |
| **2** | Wireframes for the main screens in `docs/wireframes/` | **Complete** | [docs/wireframes/](file:///Z:/Year%204/OS/M1/docs/wireframes/) (Vector SVGs + [README.md](file:///Z:/Year%204/OS/M1/docs/wireframes/README.md)) |
| **3** | `frontend/` runs with `npm run dev` from a fresh clone | **Complete** | [frontend/](file:///Z:/Year%204/OS/M1/frontend/) (`Vite + React + Tailwind CSS`, tested HTTP 200) |
| **4** | First static screens built from the spec (no real data yet) | **Complete** | Home, Series Detail, Watch Player, Watchlist/History, Admin Studio |
| **5** | `AI_LOG.md` and `DECISIONS.md` have real entries | **Complete** | [AI_LOG.md](file:///Z:/Year%204/OS/M1/AI_LOG.md) & [DECISIONS.md](file:///Z:/Year%204/OS/M1/DECISIONS.md) (7 ADRs) |
| **6** | Small commits with meaningful messages, tag `check-1` | **Complete** | Semantic commits, annotated tag `check-1` |

---

## 2. Quickstart: Running Frontend from a Fresh Clone

To launch the static prototype:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will be served locally at:
👉 **`http://localhost:5173/`**

To verify the production bundle:
```bash
npm run build
npm run preview
```

---

## 3. Features Implemented in Check 1

### A. Navigation & Evaluator Role Switcher
- **Live Search Bar:** Real-time filtering across titles, genres, and synopses with no full-page reloads (FR-5).
- **Role Switcher Dropdown:** Embedded in the top navbar and Auth Modal, enabling evaluators to test **Guest**, **Member**, and **Administrator** views with one click.

### B. Catalogue & Home Page (`/`)
- **Spotlight Hero Banner:** Features "Chrono Blades: Cyber Awakening" with direct "Watch Episode 1" and "+ Add to Watchlist" actions (FR-3).
- **Genre Filter Pills:** Instant filtering by *All, Action, Sci-Fi, Cyberpunk, Fantasy, Magic, Shonen, Slice of Life, Music* (FR-5).
- **Continue Watching Shelf:** Visual cards with progress bars showing remaining minutes and last-watched positions (FR-10).
- **Catalogue Grid:** Clean hover cards showing poster art, rating, studio, release year, and episode count.

### C. Series Detail View
- Displays high-resolution banner, metadata, age rating, comprehensive plot synopsis, and watchlist bookmark toggle (FR-4).
- **Season Selector Tabs:** Switch between Season 1, Season 2, and OVAs (FR-12).
- **Episode List:** Numerical cards with thumbnails, duration, episode title, synopsis, and instant stream button.

### D. Custom Video Player (Theater View)
- 16:9 responsive aspect ratio canvas with custom dark controls overlay (FR-6).
- **Interactive Scrubber:** Seek to any timestamp with elapsed/total duration display (`14:20 / 23:45`).
- **WebVTT Multi-Language Subtitles (FR-7):** Click the `CC` button to switch between English (WebVTT), Japanese, Spanish, or Subtitles Off. Real-time caption cues appear synchronized over the video canvas!
- **Resume Playback (FR-8):** Remembers where the viewer left off and displays a notification banner upon opening.
- **Skip & Volume:** 10s back/forward skip buttons, volume slider with mute toggle, and fullscreen mode.
- **Up Next Rail:** Side playlist showing upcoming episodes in the season.

### E. Watchlist & History Management (`/watchlist`)
- **My Watchlist Tab:** Displays all bookmarked anime series with direct watch link and quick remove action (FR-9).
- **Continue Watching Tab:** Summarizes unfinished episodes with percentage progress bars (FR-10).

### F. Administrator Content Studio (`/admin`)
- **RBAC Security Guard (FR-16):** Restricts access to administrators only; Guests/Members see an unauthorized prompt with a button to switch to Admin.
- **Series CRUD Table:** Create new anime series via modal, delete series, and configure seasons (FR-11, FR-12).
- **Media Asset Ingest Form (FR-13, FR-15):**
  - **Video Validator:** Accepts only `.mp4` format; explicitly detects and rejects non-MP4 formats (such as `.mkv` or `.avi`) with clear error messaging (FR-13).
  - **Subtitle Ingest:** Attaches `.vtt` subtitle files and selects target language tags (FR-15).
- **Transcoding Worker Queue (FR-14, FR-17):**
  - Job status tracking: `Processing [progress %]`, `Ready (Thumbnail Extracted)`, and `Failed`.
  - **Retry Conversion Button (FR-17):** Clicking "Retry Job ↺" on failed jobs recovers the pipeline and converts it to ready!

---

## 4. Architectural Documents
- **Requirements Specification:** [docs/SPEC.md](file:///Z:/Year%204/OS/M1/docs/SPEC.md)
- **UI Wireframes & Layout:** [docs/wireframes/README.md](file:///Z:/Year%204/OS/M1/docs/wireframes/README.md)
- **Architecture Decision Records:** [DECISIONS.md](file:///Z:/Year%204/OS/M1/DECISIONS.md)
- **AI Collaboration Log:** [AI_LOG.md](file:///Z:/Year%204/OS/M1/AI_LOG.md)
- **Original Project Proposal:** [Project Proposal Video Streaming Website.pdf](file:///Z:/Year%204/OS/M1/Project%20Proposal%20Video%20Streaming%20Website.pdf)

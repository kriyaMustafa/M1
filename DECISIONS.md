# Architecture Decision Records (ADRs) — 3SAJ Stream

This document logs key architectural and technical decisions made during the design and implementation of the **3SAJ Stream** video streaming platform, documenting context, tradeoffs, and consequences.

---

## ADR-001: Architecture Model & Technology Decoupling

### Status
Accepted

### Context
The project proposal defines **3SAJ Stream** as an anime streaming platform modeled after Crunchyroll. It requires a client-facing web application, video storage, a relational database, and an asynchronous transcoding worker (FFmpeg). For **Check 1 (Week 4 Practice)**, the primary deliverable is a high-fidelity frontend prototype built from the functional specification, running statically without live server dependencies while remaining ready for backend integration in subsequent phases.

### Decision
We adopt a decoupled three-tier architecture:
1. **Frontend Client (`frontend/`):** Single Page Application (SPA) built with React and Vite. In Check 1, it operates against strongly typed mock data models matching the relational entities (`User`, `Series`, `Season`, `Episode`, `SubtitleTrack`, `Watchlist`, `WatchHistory`).
2. **Backend API (Future):** RESTful service handling authentication, permissions, catalogue data, and upload orchestration.
3. **Transcoding Worker (Future):** Background process converting uploaded MP4 files into browser-streamable formats and extracting thumbnails.

### Consequences
- **Positive:** Enables rapid UI validation and user story testing for Check 1. Eliminates backend build or database setup bottlenecks for frontend grading.
- **Negative:** Requires an explicit migration step in Check 2/3 to connect UI components to live REST/GraphQL endpoints.

---

## ADR-002: Frontend Framework Selection (React + Vite + Tailwind CSS)

### Status
Accepted

### Context
The frontend must meet NFR-2 (page load under 2 seconds) and NFR-7 (responsive interface across 360px to 1920px viewports). It must also run reliably with `npm run dev` from a fresh clone across diverse operating systems.

### Decision
We selected **React (v18+) with Vite** as the build engine and **Tailwind CSS** for styling:
- **Vite:** Offers instant Hot Module Replacement (HMR), lightweight build overhead, and zero-configuration development server startup.
- **Tailwind CSS:** Provides utility-first responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`) allowing seamless adherence to NFR-7 (360px mobile up to 1920px desktop) without bulky CSS files.
- **Lucide Icons:** Clean, tree-shakeable SVG icons for media playback controls (play, pause, volume, subtitles, fullscreen).

### Alternatives Considered
- *Plain HTML/CSS/JS:* Simpler, but lacks modular component state needed for dynamic subtitle toggling, progress tracking, and interactive tab switches.
- *Next.js (SSR):* Adds server runtime requirements unnecessary for a static client-side prototype.

### Consequences
- Fast initial load time, deterministic `npm run dev` execution, modular component hierarchy.

---

## ADR-003: Video Player & WebVTT Subtitle Track Rendering Strategy

### Status
Accepted

### Context
FR-6 requires full browser playback controls (play, pause, seek, volume, fullscreen), while FR-7 requires selectable subtitle tracks (WebVTT) or disabling subtitles entirely. FR-8 requires resuming playback from the last watched position.

### Decision
We implement a **custom-skinned HTML5 video component** paired with a simulated/custom caption overlay engine:
1. The player wraps HTML5 `<video>` elements, capturing standard events (`timeupdate`, `seeking`, `ended`).
2. Subtitles are driven by structured WebVTT cue timecodes. The player allows toggling between active tracks (e.g., English, Japanese, Spanish) and an "Off" state without reloading media streams.
3. Playback position is persisted to client storage (simulating member watch history) and automatically recalled upon opening the episode watch page.

### Consequences
- Consistent cross-browser UI styling matching the dark Crunchyroll aesthetic, avoiding browser-native player styling inconsistencies.
- Demonstrates immediate compliance with FR-6, FR-7, and FR-8 during static evaluation.

---

## ADR-004: Role-Based Access Control (RBAC) & Interactive Evaluator Switcher

### Status
Accepted

### Context
The specification defines three user roles: **Guest**, **Member**, and **Administrator**. Certain routes and features (such as `/admin`, series creation, transcoding status, and video playback) must be restricted according to FR-16. Evaluators must be able to test all three roles without registering accounts or configuring database users.

### Decision
1. Implement a client-side authentication context (`AuthContext`) managing current user state:
   - `Guest`: Can browse catalogue, search, view synopsis. Prompted to sign in when attempting playback.
   - `Member`: Can play episodes, toggle subtitles, maintain watchlist, track resume history. Denied access to `/admin`.
   - `Admin`: Full access, including `/admin` content management and transcoding queue.
2. Embed an explicit **"Role Switcher" quick bar** in the navigation header and auth modal, allowing one-click toggling between roles during evaluation.

### Consequences
- Allows instructors and grading scripts to verify role-dependent behaviors instantly without friction.

---

## ADR-005: Transcoding Worker State Machine & Error Handling

### Status
Accepted

### Context
FR-13, FR-14, and FR-17 specify that uploaded episode videos (MP4 only) must be validated, converted into web-playable formats with thumbnails, and tracked in a queue. If conversion fails, the system must mark the episode as failed and allow the admin to retry.

### Decision
Model the transcoding pipeline as a deterministic finite-state machine:
$$\text{Pending} \longrightarrow \text{Processing } [X\%] \longrightarrow \text{Ready} \mid \text{Failed}$$
- If state is `Failed`, display the specific error diagnostic (e.g., "Corrupt audio stream / unsupported codec") and expose a prominent **"Retry Conversion"** action button that transitions the state back to `Pending` / `Processing`.
- Enforce client-side file format checks (accepting only `.mp4` MIME types and rejecting non-MP4 formats with clear warning banners).

### Consequences
- Validates FR-13, FR-14, and FR-17 directly in the UI prototype before the physical FFmpeg worker daemon is connected.

---

## ADR-006: Self-Contained Vector Artwork & Visual Assets

### Status
Accepted

### Context
When testing or grading from a fresh clone, external CDN images (e.g., Unsplash or third-party image URLs) can fail due to firewalls, rate limits, or lack of internet connectivity.

### Decision
All anime posters, thumbnails, and branding graphics are generated using pure CSS gradients, SVG vector graphics, and embedded SVG data URIs. No external image CDNs are relied upon.

### Consequences
- 100% offline reliability: the application renders identically even without an active internet connection.

---

## ADR-007: Git Workflow, Semantic Commits, and Checkpoint Tagging

### Status
Accepted

### Context
The practice requirements mandate small commits with meaningful messages and pushing the tag `check-1`.

### Decision
We follow the **Conventional Commits** specification:
- `chore:` repository initialization, config files, gitignore
- `docs:` specification documents, wireframes, ADRs, AI logs
- `feat(frontend):` application scaffolding, UI screens, mock data, and interactions
- Tag: annotated tag `check-1` anchored to the final submission commit.

### Consequences
- Clean, transparent git history easily inspectable by instructors and automated CI/CD runners.

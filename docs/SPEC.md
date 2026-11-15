# 3SAJ Stream — Software Requirements Specification (SPEC)

## 1. Project Overview & System Purpose
**3SAJ Stream** is a web-based anime streaming platform inspired by Crunchyroll. It enables members to browse an organized catalogue of anime series and seasons, watch high-definition video episodes with synchronized multi-language WebVTT subtitles, track playback history, and curate a personal watchlist. The platform also provides administrators with dedicated content management tools to create series, manage seasons and episodes, ingest MP4 video assets, upload subtitle tracks, and monitor asynchronous transcoding tasks.

- **Author / Student:** KRIYA MUSTAFA (ID: `e20230474`, Group: `I4-GIC-A`)
- **System Architecture:** Decoupled Web Front End, Backend API, Transcoding Worker, Relational Database, and Object/File Storage.
- **Reference Document:** Project Proposal: 3SAJ Stream (Software Requirements Specification)

---

## 2. User Roles & Personas

| Role | Description | Access Permissions |
| :--- | :--- | :--- |
| **Guest** | An unauthenticated public visitor accessing the streaming portal. | Public catalogue browsing, series synopsis reading, search by title, genre filtering. No video playback or watchlist persistence. |
| **Member** | An authenticated registered user with an active account. | Full video playback, resume playback position from history, multi-language subtitle track selection, add/remove titles to personal watchlist. |
| **Administrator** | Content manager and site operator. | Access restricted admin dashboard, create/edit/delete series, manage seasons/episodes, upload MP4 videos and WebVTT subtitles, view transcoding worker queue, retry failed transcoding jobs. |

---

## 3. User Stories & Acceptance Criteria

### US-01: Catalogue Discovery & Genre Filtering
- **Role:** Guest / Member
- **Story:**  
  *As a visitor or member,*  
  *I want to browse the catalogue of anime titles with real-time genre filtering and search by title,*  
  *So that I can quickly discover new shows or find specific anime series I want to watch.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-3, FR-5, NFR-2, NFR-6

#### Acceptance Criteria:
1. **AC 1.1 — Homepage Catalogue Rendering:**
   - **Given** any user navigates to the homepage (`/`),
   - **When** the page loads,
   - **Then** a featured hero spotlight section displays prominently, followed by a "Newest Episodes" row and a "Popular Series" grid displaying title, poster, genres, and release year within 2.0 seconds (NFR-2).
2. **AC 1.2 — Live Title Search:**
   - **Given** a user is on any catalogue view,
   - **When** the user types at least 2 characters into the global search bar,
   - **Then** the series list updates dynamically to show matching series titles with zero full-page reloads.
3. **AC 1.3 — Genre Filtering:**
   - **Given** a user clicks on one or more genre badges (e.g., "Action", "Fantasy", "Sci-Fi"),
   - **When** the filter is toggled,
   - **Then** the catalogue immediately displays only series tagged with the selected genre(s), showing an empty-state message if no series match.

---

### US-02: Member Registration and Session Authentication
- **Role:** Guest
- **Story:**  
  *As a new visitor,*  
  *I want to register an account with my email, username, and secure password, and be able to log in and out seamlessly,*  
  *So that my preferences, watchlist, and viewing history are preserved across sessions.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-1, FR-2, NFR-4, NFR-5

#### Acceptance Criteria:
1. **AC 2.1 — Account Registration:**
   - **Given** a guest opens the authentication modal/page and provides a valid email, unique username, and password (minimum 8 characters),
   - **When** the guest submits the registration form,
   - **Then** the system registers the account, securely stores passwords as salted hashes (NFR-4), sets up the user profile, and automatically initiates a member session.
2. **AC 2.2 — Validation & Error Messaging:**
   - **Given** invalid inputs (e.g., malformed email, existing username, password < 8 characters),
   - **When** the guest attempts to submit,
   - **Then** descriptive inline validation error messages appear without clearing valid inputs.
3. **AC 2.3 — Login & Logout Session Management:**
   - **Given** a registered member provides valid credentials on the login screen,
   - **When** authenticated,
   - **Then** the member's profile avatar and watchlist menu appear in the navigation bar; clicking "Log Out" immediately destroys the session and returns the user to Guest state.

---

### US-03: Series Detail, Synopsis & Episode Listing
- **Role:** Guest / Member
- **Story:**  
  *As a viewer,*  
  *I want to view a comprehensive series page with poster, synopsis, genres, release year, and a structured episode list organized by season,*  
  *So that I can evaluate the show and choose an episode to start watching.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-4, NFR-6, NFR-7

#### Acceptance Criteria:
1. **AC 3.1 — Series Metadata Display:**
   - **Given** a user clicks on any series card from the catalogue,
   - **When** the series detail page loads,
   - **Then** the system displays the high-resolution poster art, title, release year, genres, content synopsis, and an "Add to Watchlist" action button.
2. **AC 3.2 — Season Selector & Episode List:**
   - **Given** a series contains multiple seasons,
   - **When** the user selects a season tab or dropdown (e.g., "Season 1", "Season 2"),
   - **Then** the episode cards corresponding to that season are listed in numerical order, each with episode number, thumbnail, title, duration, and a brief description.
3. **AC 3.3 — Guest Playback Restriction:**
   - **Given** an unauthenticated Guest clicks an episode card to play,
   - **When** the play action is triggered,
   - **Then** an authentication prompt modal is displayed explaining that video playback requires a free registered member account.

---

### US-04: Video Playback & Custom Player Controls
- **Role:** Member
- **Story:**  
  *As an authenticated member,*  
  *I want to stream anime episodes inside a custom web video player with responsive play, pause, seek, volume, and fullscreen controls,*  
  *So that I enjoy an uninterrupted, high-quality viewing experience across desktop and mobile devices.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-6, NFR-1, NFR-7

#### Acceptance Criteria:
1. **AC 4.1 — Playback Initialization & Controls:**
   - **Given** a logged-in member opens an episode watch page,
   - **When** playback begins,
   - **Then** video playback initiates within 3.0 seconds on standard broadband (NFR-1) and provides controls for Play/Pause, 10s Skip Forward/Backward, interactive progress scrubber bar, Volume/Mute slider, and Fullscreen toggle.
2. **AC 4.2 — Keyboard Shortcuts & Interaction:**
   - **Given** the video player is active,
   - **When** keyboard shortcuts are pressed (Space/K for Play/Pause, M for Mute, F for Fullscreen, Left/Right arrows for seek),
   - **Then** the player responds immediately to the commands.
3. **AC 4.3 — Responsive Viewport Adaptation:**
   - **Given** playback on screen widths ranging from 360px (mobile) to 1920px (full HD desktop) (NFR-7),
   - **When** resizing or rotating the display,
   - **Then** the player maintains proper 16:9 aspect ratio without control clipping or horizontal overflow.

---

### US-05: Synchronized Multi-Language Subtitle Track Selection
- **Role:** Member
- **Story:**  
  *As a viewer,*  
  *I want to toggle between available subtitle tracks (e.g., English, Japanese, French) or turn subtitles off entirely during playback,*  
  *So that I can watch episodes in my preferred language with clear, synchronized captions.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-7, FR-15

#### Acceptance Criteria:
1. **AC 5.1 — Subtitle Track Menu:**
   - **Given** an active video playback session for an episode with associated WebVTT subtitle files,
   - **When** the member clicks the Subtitles/Captions (`CC`) icon in the player control bar,
   - **Then** a dropdown menu opens displaying "Subtitles Off" and all available language tracks (e.g., "English", "Japanese", "French").
2. **AC 5.2 — Active Track Switching:**
   - **Given** the subtitle menu is open,
   - **When** the viewer selects a specific language,
   - **Then** the selected WebVTT track activates immediately and displays synchronized caption cues on the video canvas matching the audio timing.
3. **AC 5.3 — Disabling Captions:**
   - **Given** subtitles are currently active,
   - **When** the viewer selects "Off",
   - **Then** all subtitle overlays disappear instantly without interrupting continuous video playback.

---

### US-06: Personal Watchlist & Playback Progress Resumption
- **Role:** Member
- **Story:**  
  *As an active member,*  
  *I want to bookmark series into my personal Watchlist and have my watch history track my exact playback position,*  
  *So that I can quickly resume episodes right where I left off from the "Continue Watching" dashboard.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-8, FR-9, FR-10

#### Acceptance Criteria:
1. **AC 6.1 — Watchlist Toggle:**
   - **Given** a logged-in member is viewing a series card or series detail page,
   - **When** the member clicks the "Add to Watchlist" / bookmark button,
   - **Then** the button state updates to "In Watchlist" and the series is added to the member's private Watchlist page (`/watchlist`); clicking again removes it.
2. **AC 6.2 — Watch History Tracking:**
   - **Given** a member is watching an episode,
   - **When** playback passes 10 seconds or is paused/closed,
   - **Then** the system records the current timestamp and total episode duration into the member's watch history.
3. **AC 6.3 — Continue Watching Shelf:**
   - **Given** a member has partially watched episodes,
   - **When** the member views the Homepage or Watchlist page,
   - **Then** a "Continue Watching" carousel displays the unfinished episodes with a progress bar indicating elapsed percentage and a "Resume" button that opens the player at the saved timestamp (FR-8).

---

### US-07: Content Management for Series, Seasons, and Episodes
- **Role:** Administrator
- **Story:**  
  *As a content administrator,*  
  *I want to create, edit, and delete anime series, configure seasons, and attach episode metadata through an administrative dashboard,*  
  *So that the public catalogue remains organized, up-to-date, and accurate.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-11, FR-12, FR-16

#### Acceptance Criteria:
1. **AC 7.1 — Role-Based Access Control (RBAC):**
   - **Given** a Guest or Member attempts to navigate to the `/admin` portal,
   - **When** authorization is evaluated,
   - **Then** access is denied with a 403 Forbidden message or redirection to the login portal; only users with the `Admin` role can view content management controls (FR-16).
2. **AC 7.2 — Series CRUD Operations:**
   - **Given** an authenticated admin is on the Series Management page,
   - **When** the admin submits the "Add New Series" form with Title, Synopsis, Genres, Release Year, and Poster URL,
   - **Then** the series is validated, saved, and listed in the series management table with Edit and Delete options.
3. **AC 7.3 — Season & Episode Association:**
   - **Given** an existing series,
   - **When** the admin adds a season and inputs episode metadata (Episode Number, Title, Synopsis),
   - **Then** the episode is linked to the designated season and becomes ready for media asset attachment.

---

### US-08: Media File Ingestion & Transcoding Queue Monitoring
- **Role:** Administrator
- **Story:**  
  *As a content administrator,*  
  *I want to upload MP4 video files and WebVTT subtitle files for an episode, and track background transcoding progress with retry capabilities,*  
  *So that videos are converted into web-playable formats with generated thumbnails safely and reliably.*
- **Priority:** Must Have
- **Proposal Traceability:** FR-13, FR-14, FR-15, FR-17

#### Acceptance Criteria:
1. **AC 8.1 — Video File Validation:**
   - **Given** an admin uploads a media file for an episode,
   - **When** the file is selected,
   - **Then** the system validates that the format is strictly MP4 and the file size does not exceed the allowed threshold (e.g., 2 GB), rejecting non-MP4 formats with a clear validation error (FR-13).
2. **AC 8.2 — WebVTT Subtitle Ingestion:**
   - **Given** an admin attaches subtitle files to an episode,
   - **When** the admin uploads `.vtt` files and assigns a language tag (e.g., `en`, `ja`, `es`),
   - **Then** the system associates the subtitle track with the episode record (FR-15).
3. **AC 8.3 — Transcoding Queue & Status Tracking:**
   - **Given** an MP4 video has been uploaded,
   - **When** the background transcoding job is queued,
   - **Then** the admin dashboard displays the real-time transcoding job state (`Pending`, `Processing [progress %]`, `Ready`, or `Failed`) and automatically extracts video thumbnails (FR-14).
4. **AC 8.4 — Failed Job Retry Handling:**
   - **Given** a transcoding job fails due to an encoding error,
   - **When** the job status is set to `Failed`,
   - **Then** the admin is presented with an error diagnostic message and a "Retry Conversion" button to requeue the job (FR-17).

---

## 4. Requirements Traceability Matrix

| Requirement ID | Requirement Summary | Addressed in User Stories |
| :--- | :--- | :--- |
| **FR-1** | Guest registration with email, username, password | **US-02** |
| **FR-2** | Member login and logout | **US-02** |
| **FR-3** | Homepage listing newest episodes & catalogue | **US-01** |
| **FR-4** | Series page with synopsis, genres, seasons, episodes | **US-03** |
| **FR-5** | Search series by title and filter by genre | **US-01** |
| **FR-6** | Browser video playback with full controls | **US-04** |
| **FR-7** | WebVTT subtitle track selection or off | **US-05** |
| **FR-8** | Resume playback from last watched position | **US-06** |
| **FR-9** | Member personal watchlist management | **US-06** |
| **FR-10**| Watch history and continue watching shelf | **US-06** |
| **FR-11**| Admin create, edit, delete series | **US-07** |
| **FR-12**| Admin add seasons and episodes | **US-07** |
| **FR-13**| Video upload format validation (MP4, size check) | **US-08** |
| **FR-14**| Transcoding into web-playable format with thumbnail & status | **US-08** |
| **FR-15**| WebVTT subtitle upload and language tagging | **US-08** |
| **FR-16**| Admin portal access control (RBAC) | **US-07** |
| **FR-17**| Transcoding failure handling and retry mechanism | **US-08** |
| **NFR-1**| Playback start ≤ 3s on 10 Mbps | **US-04** |
| **NFR-2**| Page load ≤ 2s under normal load | **US-01**, **US-03** |
| **NFR-4**| Passwords stored as salted hashes | **US-02** |
| **NFR-6**| Usability: find and play episode within 1 min | **US-01**, **US-03**, **US-04** |
| **NFR-7**| Responsive across 360px to 1920px viewports | **US-01**, **US-03**, **US-04**, **US-07** |

---

## 5. System Acceptance Criteria Checklist (Check 1 Scope)
- [x] 8 detailed user stories documented with clear "Given / When / Then" acceptance criteria.
- [x] Defined minimum 2 distinct roles: **Member** (and Guest) & **Administrator**.
- [x] Strict mapping to functional requirements FR-1 through FR-17 and non-functional targets NFR-1 through NFR-8.
- [x] Ready for static screen implementation and wireframe validation.

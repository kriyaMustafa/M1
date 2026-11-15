// Mock Transcoding Queue data for Admin Console (FR-13, FR-14, FR-15, FR-17)

export const INITIAL_TRANSCODING_JOBS = [
  {
    id: "JOB-9042",
    seriesTitle: "Chrono Blades: Cyber Awakening",
    episodeTitle: "S1 : Episode 13 - Neon Horizon",
    filename: "chrono_blades_ep13_master.mp4",
    fileSize: "842 MB",
    subtitles: ["English.vtt", "Japanese.vtt"],
    status: "processing", // 'pending' | 'processing' | 'ready' | 'failed'
    progress: 68,
    timeRemaining: "1m 15s",
    errorMessage: null,
    createdAt: "2026-11-15 21:10"
  },
  {
    id: "JOB-9041",
    seriesTitle: "The Last Sorcerer",
    episodeTitle: "S1 : Episode 5 - Whispers in the Catacombs",
    filename: "last_sorcerer_ep05_raw.mp4",
    fileSize: "614 MB",
    subtitles: ["English.vtt"],
    status: "failed",
    progress: 42,
    timeRemaining: "Failed at frame 14200",
    errorMessage: "Transcoding error: Audio stream sample rate mismatch (AAC expected 48kHz, got 44.1kHz corrupted chunk).",
    createdAt: "2026-11-15 20:45"
  },
  {
    id: "JOB-9040",
    seriesTitle: "Chrono Blades: Cyber Awakening",
    episodeTitle: "S1 : Episode 12 - The Singularity Paradox",
    filename: "chrono_blades_ep12_1080p.mp4",
    fileSize: "755 MB",
    subtitles: ["English.vtt", "Japanese.vtt", "Spanish.vtt"],
    status: "ready",
    progress: 100,
    timeRemaining: "Completed",
    errorMessage: null,
    thumbnailUrl: "/thumbnails/ep12_thumb.jpg",
    createdAt: "2026-11-15 19:30"
  },
  {
    id: "JOB-9039",
    seriesTitle: "Neo Tokyo Express",
    episodeTitle: "S1 : Episode 8 - Cyber Highway Drift",
    filename: "neo_tokyo_ep08_hd.mp4",
    fileSize: "910 MB",
    subtitles: ["English.vtt"],
    status: "ready",
    progress: 100,
    timeRemaining: "Completed",
    errorMessage: null,
    thumbnailUrl: "/thumbnails/ep08_thumb.jpg",
    createdAt: "2026-11-15 18:00"
  }
];

// Rich static mock dataset for 3SAJ Stream Catalogue (FR-3, FR-4, FR-5, FR-6, FR-7)

export const INITIAL_SERIES = [
  {
    id: "series-01",
    title: "Chrono Blades: Cyber Awakening",
    slug: "chrono-blades",
    year: 2026,
    rating: "PG-13",
    studio: "Studio Nexus",
    genres: ["Action", "Sci-Fi", "Cyberpunk"],
    synopsis: "In year 2088 Neo-Tokyo, rogue artificial intelligence factions threaten to fracture the temporal matrix. Ryu and his squad of chrono-blade operatives embark on clandestine operations to neutralize paradox rifts before reality unravels.",
    featured: true,
    bannerColor: "from-blue-900 via-slate-900 to-slate-950",
    accentColor: "#f97316",
    posterGradient: "from-orange-500 to-indigo-900",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: Quantum Paradox",
        episodes: [
          {
            id: "cb-s1-e01",
            episodeNumber: 1,
            title: "The Neon Paradox",
            duration: "24m",
            durationSec: 1440,
            synopsis: "Ryu awakens in Sector 7 and discovers the first visible glitch in the chronological stream. A routine investigation turns deadly.",
            subtitles: [
              { lang: "en", label: "English (WebVTT)", cues: [
                { start: 0, end: 5, text: "[Synthesizer music plays as neon rain pours over Neo-Tokyo]" },
                { start: 5, end: 12, text: "Ryu: 'Sector 7 is experiencing quantum drift. Stabilizers failing.'" },
                { start: 12, end: 20, text: "AI Navigator: 'Warning: Temporal anomaly detected at Coordinates 44-X.'" },
                { start: 20, end: 30, text: "Ryu: 'Draw your chrono blades. We are not alone.'" }
              ]},
              { lang: "ja", label: "Japanese (Original)", cues: [
                { start: 0, end: 5, text: "【ネオ東京にネオンの雨が降り注ぐ中、シンセサイザーの音楽が流れる】" },
                { start: 5, end: 12, text: "リュウ：「セクター7で量子の揺らぎが発生している。安定装置が停止した。」" },
                { start: 12, end: 20, text: "AIナビ：「警告：座標44-Xで時間異常を検知しました。」" },
                { start: 20, end: 30, text: "リュウ：「クロノブレードを抜け。敵が来るぞ。」" }
              ]},
              { lang: "es", label: "Spanish (WebVTT)", cues: [
                { start: 0, end: 5, text: "[Música de sintetizador mientras cae lluvia de neón sobre Neo-Tokio]" },
                { start: 5, end: 12, text: "Ryu: 'El Sector 7 experimenta deriva cuántica. Los estabilizadores fallan.'" },
                { start: 12, end: 20, text: "IA Navegante: 'Advertencia: anomalía temporal detectada en coordenadas 44-X.'" },
                { start: 20, end: 30, text: "Ryu: 'Desenvainen sus hojas crono. No estamos solos.'" }
              ]}
            ]
          },
          {
            id: "cb-s1-e02",
            episodeNumber: 2,
            title: "Blade of Singularity",
            duration: "23m",
            durationSec: 1380,
            synopsis: "The resistance squad infiltrates the central cyber core to extract the temporal stabilizer from rogue synthetic drones.",
            subtitles: [
              { lang: "en", label: "English (WebVTT)", cues: [
                { start: 0, end: 7, text: "Commander: 'Maintain radio silence until the EMP charge detonates.'" },
                { start: 7, end: 16, text: "Ryu: 'The singularity blade is calibrated to 100% resonance.'" }
              ]}
            ]
          },
          {
            id: "cb-s1-e03",
            episodeNumber: 3,
            title: "Echoes from the Ruins",
            duration: "24m",
            durationSec: 1440,
            synopsis: "An unexpected transmission reveals the secret identity of the mastermind manipulating the time paradox.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          },
          {
            id: "cb-s1-e04",
            episodeNumber: 4,
            title: "Shadows Over Sector 9",
            duration: "25m",
            durationSec: 1500,
            synopsis: "A dangerous ambush traps the crew behind impenetrable energy shields during an electrical grid blackout.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          },
          {
            id: "cb-s1-e12",
            episodeNumber: 12,
            title: "The Singularity Paradox (Season Finale)",
            duration: "24m",
            durationSec: 1425,
            synopsis: "Ryu faces his alternate timeline counterpart in an all-or-nothing showdown at the summit of the Chronos Spire.",
            subtitles: [
              { lang: "en", label: "English (WebVTT)", cues: [
                { start: 0, end: 5, text: "[Thunderous electrical crackle as the gateway hums]" },
                { start: 5, end: 11, text: "Ryu: 'We cannot allow the timeline core to destabilize!'" },
                { start: 11, end: 18, text: "Counterpart: 'You think you are saving history, Ryu? You are rewriting it!'" },
                { start: 18, end: 28, text: "Maya: 'The portal is collapsing in 30 seconds! Pull the breaker now!'" }
              ]},
              { lang: "ja", label: "Japanese (Original)", cues: [
                { start: 0, end: 5, text: "【ゲートが唸りを上げ、激しい放電音が響き渡る】" },
                { start: 5, end: 11, text: "リュウ：「タイムラインの核を崩壊させるわけにはいかない！」" },
                { start: 11, end: 18, text: "影のリュウ：「歴史を救っているつもりか？お前は書き換えているだけだ！」" }
              ]}
            ]
          }
        ]
      },
      {
        seasonNumber: 2,
        title: "Season 2: Infinite Horizon",
        episodes: [
          {
            id: "cb-s2-e01",
            episodeNumber: 1,
            title: "Rebirth in Neo-Kyoto",
            duration: "24m",
            durationSec: 1440,
            synopsis: "Emerging in a reconstructed future, the squad discovers a new syndicate attempting to harvest chrono particles.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          }
        ]
      }
    ]
  },
  {
    id: "series-02",
    title: "The Last Sorcerer: Runes of Aethel",
    slug: "last-sorcerer",
    year: 2025,
    rating: "PG-13",
    studio: "Anima Arts",
    genres: ["Fantasy", "Magic", "Adventure"],
    synopsis: "In a realm where elemental magic was outlawed five centuries ago, a solitary apprentice uncovers the ancient codex of the Arch-Mages and embarks on a dangerous pilgrimage to rekindle the primal hearth.",
    featured: false,
    bannerColor: "from-purple-900 via-slate-900 to-slate-950",
    accentColor: "#a855f7",
    posterGradient: "from-purple-600 to-amber-700",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: Awakening of the Codex",
        episodes: [
          {
            id: "ls-s1-e01",
            episodeNumber: 1,
            title: "The Forbidden Rune",
            duration: "24m",
            durationSec: 1440,
            synopsis: "Kael accidentally invokes a dormant fire sprite while working in the grand archive catacombs.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          },
          {
            id: "ls-s1-e02",
            episodeNumber: 2,
            title: "Whispers of the Silver Grove",
            duration: "23m",
            durationSec: 1380,
            synopsis: "Hunted by the Grand Inquisitor's ironclad knights, Kael flees into the enchanted mist of the Silver Grove.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          },
          {
            id: "ls-s1-e04",
            episodeNumber: 4,
            title: "Ancient Runes of Aethel",
            duration: "24m",
            durationSec: 1440,
            synopsis: "At the sunken shrine of Aethel, Kael solves the celestial prism puzzle, unlocking the second arcane crest.",
            subtitles: [
              { lang: "en", label: "English (WebVTT)", cues: [
                { start: 0, end: 6, text: "Kael: 'The runes... they respond to elemental resonance!'" },
                { start: 6, end: 14, text: "Eldrin: 'Careful! The guardian wyrm awakens if the flow fluctuates.'" }
              ]}
            ]
          }
        ]
      }
    ]
  },
  {
    id: "series-03",
    title: "Neo Tokyo Express",
    slug: "neo-tokyo-express",
    year: 2026,
    rating: "TV-MA",
    studio: "Trigger Point",
    genres: ["Cyberpunk", "Action", "Shonen"],
    synopsis: "High-speed couriers operate bullet hover-trains traversing the megacity underbelly while evading mega-corporation enforcers in an electrifying cyberpunk adrenaline rush.",
    featured: false,
    bannerColor: "from-emerald-900 via-slate-900 to-slate-950",
    accentColor: "#10b981",
    posterGradient: "from-emerald-500 to-cyan-800",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: Zero Latency",
        episodes: [
          {
            id: "nte-s1-e01",
            episodeNumber: 1,
            title: "300 Kilometers Per Hour",
            duration: "22m",
            durationSec: 1320,
            synopsis: "Delivery driver Jin accepts a contraband package with a countdown timer tied to his mag-lev engine.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          },
          {
            id: "nte-s1-e08",
            episodeNumber: 8,
            title: "Cyber Highway Drift",
            duration: "23m",
            durationSec: 1370,
            synopsis: "A high-stakes aerial pursuit over the illuminated sky-bridges of Sector 4.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          }
        ]
      }
    ]
  },
  {
    id: "series-04",
    title: "Starlight Academy",
    slug: "starlight-academy",
    year: 2025,
    rating: "PG",
    studio: "Kyoto Melody",
    genres: ["Slice of Life", "Music", "Drama"],
    synopsis: "Gifted students from across the globe gather at an elite conservatory on the sea coast to compose symphonies that resonate with the aurora borealis.",
    featured: false,
    bannerColor: "from-pink-900 via-slate-900 to-slate-950",
    accentColor: "#ec4899",
    posterGradient: "from-pink-500 to-rose-800",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: First Crescendo",
        episodes: [
          {
            id: "sa-s1-e01",
            episodeNumber: 1,
            title: "The Ocean Piano",
            duration: "23m",
            durationSec: 1380,
            synopsis: "Aoi arrives at the cliffside academy and discovers an abandoned grand piano in the seaside chapel.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          }
        ]
      }
    ]
  },
  {
    id: "series-05",
    title: "Shadow Ronin: Way of the Ghost",
    slug: "shadow-ronin",
    year: 2026,
    rating: "TV-14",
    studio: "Shogun Works",
    genres: ["Action", "Historical", "Shonen"],
    synopsis: "In feudal Japan during an era of supernatural unrest, a disgraced master swordsman uses forbidden spirit-cutting techniques to protect helpless villagers from demonic warlords.",
    featured: false,
    bannerColor: "from-red-950 via-slate-900 to-slate-950",
    accentColor: "#ef4444",
    posterGradient: "from-red-600 to-amber-900",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: Blood Moon",
        episodes: [
          {
            id: "sr-s1-e01",
            episodeNumber: 1,
            title: "The Broken Saya",
            duration: "25m",
            durationSec: 1500,
            synopsis: "Kenji crosses the mist-veiled mountain pass and encounters the spirit of the fallen Crimson Shogun.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          }
        ]
      }
    ]
  },
  {
    id: "series-06",
    title: "Dragon Alchemist: Elemental Gate",
    slug: "dragon-alchemist",
    year: 2025,
    rating: "PG-13",
    studio: "Bones & Sparks",
    genres: ["Fantasy", "Action", "Comedy"],
    synopsis: "Twin alchemists accidentally fuse their laboratory with a dormant dragon egg, unlocking transmutational powers that plunge them into an international treasure hunt.",
    featured: false,
    bannerColor: "from-amber-900 via-slate-900 to-slate-950",
    accentColor: "#eab308",
    posterGradient: "from-amber-500 to-orange-800",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 1: The Golden Crucible",
        episodes: [
          {
            id: "da-s1-e01",
            episodeNumber: 1,
            title: "Sparks in the Crucible",
            duration: "24m",
            durationSec: 1440,
            synopsis: "A routine gold transmutation goes wildly awry when volcanic dragon scales react with liquid mercury.",
            subtitles: [{ lang: "en", label: "English (WebVTT)", cues: [] }]
          }
        ]
      }
    ]
  }
];

export const ALL_GENRES = ["All", "Action", "Sci-Fi", "Cyberpunk", "Fantasy", "Magic", "Shonen", "Slice of Life", "Music"];

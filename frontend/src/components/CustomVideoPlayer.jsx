import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Subtitles, Maximize, Minimize, SkipForward, Check, Clock
} from 'lucide-react';

export default function CustomVideoPlayer({ episode, series, onNextEpisode, onBackToSeries }) {
  const { role, openAuthModal, watchHistory, recordProgress } = useAuth();
  
  // Check if saved resume position exists (FR-8)
  const savedEntry = watchHistory[episode.id];
  const initialSeconds = savedEntry ? savedEntry.seconds : 0;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialSeconds);
  const [duration, setDuration] = useState(episode.durationSec || 1440);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Subtitles (FR-7)
  const availableTracks = episode.subtitles || [
    { lang: 'en', label: 'English (WebVTT)', cues: [
      { start: 0, end: 6, text: "[Dramatic cinematic opening score begins]" },
      { start: 6, end: 15, text: "Narrator: 'Across Neo-Tokyo, the chrono core began to resonate with the strange frequency.'" },
      { start: 15, end: 28, text: "Ryu: 'I warned them. If the timeline collapses, there will be no tomorrow.'" }
    ]},
    { lang: 'ja', label: 'Japanese (Original)', cues: [
      { start: 0, end: 6, text: "【劇的な映画のオープニング曲が流れる】" },
      { start: 6, end: 15, text: "ナレーター：「ネオ東京全域で、クロノコアが未知の周波数で共振を始めた。」" },
      { start: 15, end: 28, text: "リュウ：「言ったはずだ。時間軸が崩壊すれば、もう明日は来ない。」" }
    ]}
  ];

  const [activeSubLang, setActiveSubLang] = useState('en'); // 'off' or lang code
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [showResumeNotice, setShowResumeNotice] = useState(initialSeconds > 10);

  const playerContainerRef = useRef(null);

  // Playback timer simulation
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          const next = prev + 1;
          // Periodically save progress to watch history (FR-8, FR-10)
          if (role !== 'guest' && next % 5 === 0) {
            recordProgress(episode.id, next, duration, {
              seriesId: series.id,
              seriesTitle: series.title,
              episodeTitle: `S1 : Ep ${episode.episodeNumber} • ${episode.title}`
            });
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, episode, series, role, recordProgress]);

  // Restrict playback for guests (FR-16 / Guest role)
  const handlePlayToggle = () => {
    if (role === 'guest') {
      openAuthModal();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(clickPos * duration);
    setCurrentTime(newTime);
    if (role !== 'guest') {
      recordProgress(episode.id, newTime, duration, {
        seriesId: series.id,
        seriesTitle: series.title,
        episodeTitle: `S1 : Ep ${episode.episodeNumber} • ${episode.title}`
      });
    }
  };

  const skipSeconds = (sec) => {
    setCurrentTime(prev => {
      const updated = Math.min(Math.max(prev + sec, 0), duration);
      return updated;
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Compute active subtitle text from VTT cues (FR-7)
  const activeTrack = availableTracks.find(t => t.lang === activeSubLang);
  const currentCue = (activeSubLang !== 'off' && activeTrack) 
    ? activeTrack.cues.find(c => currentTime >= c.start && currentTime <= c.end)
    : null;

  // Format time mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      
      {/* Player Container (16:9 Aspect Ratio) */}
      <div 
        ref={playerContainerRef}
        className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden shadow-2xl border border-slate-800 select-none group"
      >
        {/* Animated Cyber Anime Video Simulation Canvas */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
          
          {/* Futuristic animated backdrop elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="relative z-10 max-w-lg space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">
              1080p FULL HD STREAM • {series.title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Episode {episode.episodeNumber}: "{episode.title}"
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isPlaying ? 'Streaming smoothly from video storage (NFR-1 ≤3s)' : 'Playback paused — Click Play or press Spacebar'}
            </p>
          </div>

          {/* Big Center Play/Pause Indicator */}
          {!isPlaying && (
            <button
              onClick={handlePlayToggle}
              className="relative z-20 mt-6 w-20 h-20 rounded-full bg-brand-500 hover:bg-brand-400 text-white flex items-center justify-center shadow-2xl shadow-brand-500/50 hover:scale-110 active:scale-95 transition-all"
            >
              <Play className="w-8 h-8 fill-white ml-1" />
            </button>
          )}

          {/* Guest restriction alert if clicked */}
          {role === 'guest' && (
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-medium flex items-center gap-1.5">
              <span>Guest Mode: Sign in to enable video streaming &amp; progress saving</span>
            </div>
          )}

          {/* Resume Notice Pill (FR-8) */}
          {showResumeNotice && (
            <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-brand-500/50 text-white text-xs font-medium flex items-center gap-2 shadow-xl backdrop-blur animate-fade-in">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>Resumed from saved position ({formatTime(initialSeconds)})</span>
              <button 
                onClick={() => { setCurrentTime(0); setShowResumeNotice(false); }}
                className="text-brand-400 hover:underline text-[11px] font-bold"
              >
                Restart
              </button>
              <button 
                onClick={() => setShowResumeNotice(false)} 
                className="text-slate-400 hover:text-white text-xs ml-1"
              >
                ✕
              </button>
            </div>
          )}

          {/* Active Subtitle Cue Rendering Overlay (FR-7) */}
          {currentCue && (
            <div className="absolute bottom-20 z-30 max-w-2xl px-5 py-2 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-center animate-fade-in">
              <p className="text-base sm:text-lg lg:text-xl font-medium text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {currentCue.text}
              </p>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block mt-0.5">
                [{activeTrack?.label}]
              </span>
            </div>
          )}

        </div>

        {/* Custom Video Controls Bar Overlay (FR-6) */}
        <div className="absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-black via-black/80 to-transparent pt-10 pb-3 px-4 sm:px-6 transition-opacity duration-300 opacity-95 group-hover:opacity-100">
          
          {/* Scrubber Progress Bar */}
          <div 
            onClick={handleSeek}
            className="group/scrub relative w-full h-2 hover:h-3 bg-slate-700/60 rounded-full cursor-pointer mb-3 transition-all"
          >
            {/* Buffered Bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-slate-500/50 rounded-full"
              style={{ width: `${Math.min(100, ((currentTime + 300) / duration) * 100)}%` }}
            />
            {/* Played Bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-brand-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            {/* Scrubber Thumb */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-brand-500 opacity-0 group-hover/scrub:opacity-100 transition-opacity"
              style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4">
            
            {/* Left Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              <button
                onClick={handlePlayToggle}
                className="w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-400 text-white flex items-center justify-center transition-transform hover:scale-105"
                title={isPlaying ? "Pause (Space)" : "Play (Space)"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => skipSeconds(-10)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Rewind 10 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => skipSeconds(10)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Forward 10 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 group/vol">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-300 hover:text-white transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-brand-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 sm:w-20 h-1 accent-brand-500 bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Timestamp */}
              <div className="text-xs font-mono text-slate-300 font-semibold tracking-wider">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Subtitles CC Button & Menu (FR-7) */}
              <div className="relative">
                <button
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                    activeSubLang !== 'off'
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Subtitle language track selection (WebVTT)"
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>CC</span>
                  {activeSubLang !== 'off' && (
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-200">
                      ({activeSubLang})
                    </span>
                  )}
                </button>

                {/* Subtitle Popup Menu */}
                {isSubMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50 text-xs">
                    <div className="px-3 py-1 font-bold uppercase tracking-wider text-[10px] text-slate-400 border-b border-slate-800">
                      Subtitle Tracks (WebVTT)
                    </div>

                    {availableTracks.map(track => (
                      <button
                        key={track.lang}
                        onClick={() => {
                          setActiveSubLang(track.lang);
                          setIsSubMenuOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-slate-800 transition-colors ${
                          activeSubLang === track.lang ? 'text-brand-400 font-bold' : 'text-slate-300'
                        }`}
                      >
                        <span>{track.label}</span>
                        {activeSubLang === track.lang && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}

                    <div className="border-t border-slate-800 my-1" />

                    <button
                      onClick={() => {
                        setActiveSubLang('off');
                        setIsSubMenuOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        activeSubLang === 'off' ? 'text-brand-400 font-bold' : 'text-slate-400'
                      }`}
                    >
                      <span>Subtitles Off</span>
                      {activeSubLang === 'off' && <Check className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Resolution Tag */}
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono font-bold text-brand-400 border border-slate-700 hidden sm:inline">
                1080p
              </span>

              {/* Next Episode Button */}
              {onNextEpisode && (
                <button
                  onClick={onNextEpisode}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Next Episode"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              )}

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, Bookmark, Check, ArrowLeft, Clock, Film, Sparkles } from 'lucide-react';

export default function SeriesDetailView({ series, onBack, onPlayEpisode }) {
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const bookmarked = isInWatchlist(series.id);

  const [activeSeasonIdx, setActiveSeasonIdx] = useState(0);
  const currentSeason = series.seasons[activeSeasonIdx] || series.seasons[0];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Catalogue
      </button>

      {/* Series Hero Header Banner (FR-4) */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${series.bannerColor} opacity-90`} />
        
        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left: Poster Box */}
          <div className="w-48 sm:w-56 flex-shrink-0 mx-auto md:mx-0">
            <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${series.posterGradient} p-4 flex flex-col justify-between border-2 border-slate-700 shadow-xl`}>
              <span className="px-2 py-0.5 rounded bg-black/60 text-[11px] font-bold text-white self-start">
                {series.rating}
              </span>
              <div className="text-center">
                <Film className="w-8 h-8 text-white/80 mx-auto mb-2" />
                <span className="text-xs font-bold text-white drop-shadow">{series.studio}</span>
              </div>
              <span className="text-[10px] text-center font-mono text-slate-200 bg-black/60 py-1 rounded">
                {series.year} Release
              </span>
            </div>
          </div>

          {/* Right: Meta & Actions */}
          <div className="flex-1 space-y-4 text-left">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-400 text-xs font-bold border border-brand-500/40">
                {series.year}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                {series.rating}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                {series.seasons.length} Season{series.seasons.length !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Studio: {series.studio}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {series.title}
            </h1>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {series.genres.map(g => (
                <span key={g} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl pt-1">
              {series.synopsis}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => onPlayEpisode(series, currentSeason.episodes[0])}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Play Episode 1
              </button>

              <button
                onClick={() => toggleWatchlist(series.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${
                  bookmarked
                    ? 'bg-slate-800 border-brand-500 text-brand-400'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                {bookmarked ? (
                  <>
                    <Check className="w-4 h-4 text-brand-400" />
                    In Watchlist
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    + Add to Watchlist
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Season Navigation Tabs (FR-4) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white tracking-tight">Episodes</h3>
            <div className="flex gap-2">
              {series.seasons.map((season, idx) => (
                <button
                  key={season.seasonNumber}
                  onClick={() => setActiveSeasonIdx(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeSeasonIdx === idx
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-slate-850 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Season {season.seasonNumber} ({season.episodes.length})
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            WebVTT Subtitles Available
          </span>
        </div>

        {/* Episode Cards Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSeason.episodes.map(ep => (
            <div
              key={ep.id}
              onClick={() => onPlayEpisode(series, ep)}
              className="group p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/60 transition-all cursor-pointer flex gap-4 items-start"
            >
              {/* Thumbnail Placeholder */}
              <div className="w-28 sm:w-32 aspect-video rounded-lg bg-slate-800 flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:ring-2 ring-brand-500 transition-all">
                <span className="text-[11px] font-bold text-slate-400">
                  EP {ep.episodeNumber}
                </span>
                <div className="absolute inset-0 bg-brand-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>
              </div>

              {/* Episode Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-brand-400">
                    Episode {ep.episodeNumber} • {ep.duration}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    HD
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-200 group-hover:text-brand-400 transition-colors line-clamp-1 mt-0.5">
                  {ep.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {ep.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

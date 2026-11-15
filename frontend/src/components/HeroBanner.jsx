import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, Bookmark, Check, Sparkles, Film } from 'lucide-react';

export default function HeroBanner({ featuredSeries, onWatchEp1, onOpenDetail }) {
  const { isInWatchlist, toggleWatchlist } = useAuth();

  if (!featuredSeries) return null;
  const bookmarked = isInWatchlist(featuredSeries.id);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-12">
      {/* Background Gradient & Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-r ${featuredSeries.bannerColor} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_60%)]" />

      {/* Hero Content */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        
        {/* Left Column: Details */}
        <div className="flex-1 space-y-4 text-left">
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-400 border border-brand-500/40">
              <Sparkles className="w-3 h-3" />
              SPOTLIGHT SERIES
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {featuredSeries.year} • {featuredSeries.rating} • {featuredSeries.studio}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {featuredSeries.title}
          </h1>

          {/* Genre Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {featuredSeries.genres.map(genre => (
              <span
                key={genre}
                className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {genre}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              Sub | Dub • 1080p WebVTT
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed pt-1">
            {featuredSeries.synopsis}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => onWatchEp1(featuredSeries)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              Watch Episode 1
            </button>

            <button
              onClick={() => toggleWatchlist(featuredSeries.id)}
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

            <button
              onClick={() => onOpenDetail(featuredSeries)}
              className="px-4 py-3 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              View Episodes &amp; Details &gt;
            </button>
          </div>

        </div>

        {/* Right Column: Poster Card Preview */}
        <div className="w-48 sm:w-56 lg:w-64 flex-shrink-0 cursor-pointer group" onClick={() => onOpenDetail(featuredSeries)}>
          <div className={`aspect-[3/4] rounded-xl bg-gradient-to-br ${featuredSeries.posterGradient} p-4 flex flex-col justify-between border-2 border-slate-700 group-hover:border-brand-500 shadow-2xl transition-all group-hover:scale-105`}>
            <div className="flex justify-between items-start">
              <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white">
                HD 1080p
              </span>
              <Film className="w-4 h-4 text-brand-400" />
            </div>
            
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <p className="mt-3 text-xs font-bold text-white drop-shadow">Click to Explore</p>
            </div>

            <div className="text-center bg-black/60 py-1 rounded backdrop-blur">
              <span className="text-[11px] font-mono text-slate-200">2 Seasons • 24 Episodes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

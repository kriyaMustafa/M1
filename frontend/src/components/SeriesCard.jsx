import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, Bookmark, Star } from 'lucide-react';

export default function SeriesCard({ series, onSelect, onPlayDirect }) {
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const bookmarked = isInWatchlist(series.id);

  const totalEpisodes = series.seasons.reduce((acc, s) => acc + s.episodes.length, 0);

  return (
    <div
      onClick={() => onSelect(series)}
      className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-brand-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 cursor-pointer flex flex-col"
    >
      {/* Poster Canvas / Artwork */}
      <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${series.posterGradient} p-4 flex flex-col justify-between overflow-hidden`}>
        
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] group-hover:bg-black/10 transition-colors" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[11px] font-bold text-white border border-white/10">
            {series.rating}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(series.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur transition-all ${
              bookmarked
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
            }`}
            title={bookmarked ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Center Play Icon on Hover */}
        <div className="relative z-10 self-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayDirect ? onPlayDirect(series) : onSelect(series);
            }}
            className="w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/40 hover:scale-110 transition-transform"
          >
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </button>
        </div>

        {/* Bottom Poster Metadata */}
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur">
            {series.year} • {series.studio}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-slate-900">
        <div>
          <h3 className="font-bold text-sm text-slate-100 group-hover:text-brand-400 transition-colors line-clamp-1">
            {series.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {series.synopsis}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-slate-300 font-medium">
            {series.genres.slice(0, 2).join(' • ')}
          </span>
          <span className="text-brand-400 font-semibold">
            {totalEpisodes} Ep{totalEpisodes !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

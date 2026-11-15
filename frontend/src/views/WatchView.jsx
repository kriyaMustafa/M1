import React from 'react';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import { ArrowLeft, Film, Bookmark, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function WatchView({ series, episode, onBack, onSelectEpisode }) {
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const bookmarked = isInWatchlist(series.id);

  // All episodes in current series
  const allEpisodes = series.seasons.flatMap(s => s.episodes);
  const currentIdx = allEpisodes.findIndex(e => e.id === episode.id);
  const nextEpisode = currentIdx !== -1 && currentIdx < allEpisodes.length - 1 
    ? allEpisodes[currentIdx + 1] 
    : null;

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-semibold hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {series.title}
        </button>
        <span className="font-mono text-slate-500">
          Season 1 • Episode {episode.episodeNumber}
        </span>
      </div>

      {/* Main Grid: Player on Left, Up Next on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Player & Episode Info (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <CustomVideoPlayer
            series={series}
            episode={episode}
            onNextEpisode={nextEpisode ? () => onSelectEpisode(series, nextEpisode) : null}
            onBackToSeries={onBack}
          />

          {/* Episode Info Strip */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                  {series.title} • Season 1
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Episode {episode.episodeNumber}: {episode.title}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Duration: {episode.duration} • 1080p HD • Subtitles: English, Japanese, Spanish
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWatchlist(series.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    bookmarked 
                      ? 'bg-brand-500/20 border-brand-500 text-brand-400' 
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  {bookmarked ? 'In Watchlist' : 'Add to Watchlist'}
                </button>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Episode Synopsis
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {episode.synopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Up Next Playlist (1 col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <Film className="w-4 h-4 text-brand-400" />
              Episodes in Season 1
            </h3>
            <span className="text-[11px] text-slate-400">{allEpisodes.length} total</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {allEpisodes.map((ep, idx) => {
              const isCurrent = ep.id === episode.id;

              return (
                <div
                  key={ep.id}
                  onClick={() => onSelectEpisode(series, ep)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                    isCurrent
                      ? 'bg-slate-800/90 border-brand-500 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className={`w-12 h-10 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    isCurrent ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCurrent ? 'NOW' : `E${ep.episodeNumber}`}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h5 className={`font-semibold text-xs truncate ${isCurrent ? 'text-brand-400 font-bold' : 'text-slate-200'}`}>
                      {ep.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {ep.duration} • 1080p
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

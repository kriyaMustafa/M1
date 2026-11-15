import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Clock, Trash2, Play, LogIn, Sparkles } from 'lucide-react';
import SeriesCard from '../components/SeriesCard';

export default function WatchlistView({ seriesList, onSelectSeries, onPlayEpisode }) {
  const { role, openAuthModal, watchlist, toggleWatchlist, watchHistory } = useAuth();
  const [activeTab, setActiveTab] = useState('watchlist'); // 'watchlist' | 'history'

  const bookmarkedSeries = seriesList.filter(s => watchlist.includes(s.id));
  const historyEntries = Object.entries(watchHistory);

  if (role === 'guest') {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
          <Bookmark className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Sign In to Save Your Anime</h2>
        <p className="text-sm text-slate-400">
          Your personal watchlist and continue-watching timestamps are saved to your member profile across all devices.
        </p>
        <button
          onClick={openAuthModal}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/30 transition-all"
        >
          <LogIn className="w-4 h-4" />
          Sign In or Register (FR-1, FR-2)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your bookmarked anime and resume unfinished episodes (FR-9, FR-10)
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'watchlist' ? 'bg-brand-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Watchlist ({bookmarkedSeries.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'history' ? 'bg-brand-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Continue Watching ({historyEntries.length})
          </button>
        </div>
      </div>

      {/* Tab Content 1: Watchlist (FR-9) */}
      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          {bookmarkedSeries.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-base font-semibold text-slate-300">Your Watchlist is empty.</p>
              <p className="text-xs text-slate-500">
                Browse our catalogue and bookmark anime to watch them anytime.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {bookmarkedSeries.map(series => (
                <div key={series.id} className="relative group">
                  <SeriesCard
                    series={series}
                    onSelect={onSelectSeries}
                    onPlayDirect={(s) => {
                      const firstEp = s.seasons[0]?.episodes[0];
                      if (firstEp) onPlayEpisode(s, firstEp);
                    }}
                  />
                  {/* Remove Shortcut */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(series.id);
                    }}
                    className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-slate-950/80 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow"
                    title="Remove from watchlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Continue Watching (FR-8, FR-10) */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {historyEntries.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-3">
              <Clock className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-base font-semibold text-slate-300">No playback history yet.</p>
              <p className="text-xs text-slate-500">
                Start watching an episode and your progress will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {historyEntries.map(([epId, item]) => {
                const pct = Math.min(100, Math.round((item.seconds / item.durationSec) * 100));
                const parentSeries = seriesList.find(s => s.id === item.seriesId);

                return (
                  <div
                    key={epId}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-brand-400 font-bold uppercase tracking-wider">
                        <span>{item.seriesTitle}</span>
                        <span className="text-slate-400 font-normal">{item.lastUpdated}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white mt-1">
                        {item.episodeTitle}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Progress: {Math.floor(item.seconds / 60)}m / {Math.floor(item.durationSec / 60)}m ({pct}%)
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-brand-500 h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Resume Action */}
                    <button
                      onClick={() => {
                        if (parentSeries) {
                          const ep = parentSeries.seasons.flatMap(s => s.episodes).find(e => e.id === epId) || parentSeries.seasons[0].episodes[0];
                          onPlayEpisode(parentSeries, ep);
                        }
                      }}
                      className="w-full py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Resume Playback (FR-8)
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

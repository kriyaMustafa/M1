import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import HeroBanner from '../components/HeroBanner';
import SeriesCard from '../components/SeriesCard';
import { ALL_GENRES } from '../mockData/seriesData';
import { Play, Clock, Sparkles } from 'lucide-react';

export default function HomeView({ seriesList, searchQuery, onSelectSeries, onPlayEpisode }) {
  const { role, watchHistory } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Featured anime series for hero
  const featuredSeries = seriesList.find(s => s.featured) || seriesList[0];

  // Filtering logic
  const filteredSeries = seriesList.filter(series => {
    const matchesSearch = searchQuery.trim() === '' || 
      series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      series.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = selectedGenre === 'All' || series.genres.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  // Continue Watching items for Member
  const historyEntries = Object.entries(watchHistory);

  return (
    <div className="space-y-10">
      
      {/* Featured Spotlight Banner (only if not actively searching) */}
      {!searchQuery && (
        <HeroBanner
          featuredSeries={featuredSeries}
          onWatchEp1={(series) => {
            const firstEp = series.seasons[0]?.episodes[0];
            if (firstEp) onPlayEpisode(series, firstEp);
          }}
          onOpenDetail={onSelectSeries}
        />
      )}

      {/* Genre Filter Pills (FR-5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Filter by Genre
          </h2>
          {searchQuery && (
            <span className="text-xs text-brand-400 font-semibold">
              Showing search results for "{searchQuery}"
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ALL_GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGenre === genre
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Watching Shelf (FR-8, FR-10 - for Member/Admin) */}
      {role !== 'guest' && historyEntries.length > 0 && !searchQuery && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Continue Watching</h2>
            </div>
            <span className="text-xs text-slate-400">Synced to Member Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {historyEntries.map(([epId, item]) => {
              const pct = Math.min(100, Math.round((item.seconds / item.durationSec) * 100));
              const parentSeries = seriesList.find(s => s.id === item.seriesId);

              return (
                <div
                  key={epId}
                  onClick={() => {
                    if (parentSeries) {
                      const ep = parentSeries.seasons.flatMap(s => s.episodes).find(e => e.id === epId) || parentSeries.seasons[0].episodes[0];
                      onPlayEpisode(parentSeries, ep);
                    }
                  }}
                  className="group p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/60 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                        {item.seriesTitle}
                      </span>
                      <h4 className="font-bold text-sm text-slate-200 group-hover:text-brand-400 transition-colors line-clamp-1">
                        {item.episodeTitle}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {Math.floor(item.seconds / 60)}m watched of {Math.floor(item.durationSec / 60)}m ({pct}%)
                      </p>
                    </div>

                    <button
                      className="w-9 h-9 rounded-full bg-slate-800 group-hover:bg-brand-500 text-slate-200 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Progress Scrubber */}
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-brand-500 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Series Catalogue Grid (FR-3) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {searchQuery ? 'Search Results' : selectedGenre === 'All' ? 'Anime Catalogue' : `${selectedGenre} Anime`}
            </h2>
            <p className="text-xs text-slate-400">
              {filteredSeries.length} titles available in high definition
            </p>
          </div>
        </div>

        {filteredSeries.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-3">
            <p className="text-base font-semibold text-slate-300">No anime titles matched your filters.</p>
            <p className="text-xs text-slate-500">Try adjusting your search query or selecting a different genre.</p>
            <button
              onClick={() => setSelectedGenre('All')}
              className="px-4 py-2 rounded-lg bg-brand-500 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSeries.map(series => (
              <SeriesCard
                key={series.id}
                series={series}
                onSelect={onSelectSeries}
                onPlayDirect={(s) => {
                  const firstEp = s.seasons[0]?.episodes[0];
                  if (firstEp) onPlayEpisode(s, firstEp);
                }}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

import HomeView from './views/HomeView';
import SeriesDetailView from './views/SeriesDetailView';
import WatchView from './views/WatchView';
import WatchlistView from './views/WatchlistView';
import AdminView from './views/AdminView';

import { INITIAL_SERIES } from './mockData/seriesData';

function AppContent() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'series-detail' | 'watch' | 'watchlist' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [seriesList, setSeriesList] = useState(INITIAL_SERIES);

  const [activeSeries, setActiveSeries] = useState(null);
  const [activeEpisode, setActiveEpisode] = useState(null);

  const handleSelectSeries = (series) => {
    setActiveSeries(series);
    setCurrentView('series-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayEpisode = (series, episode) => {
    setActiveSeries(series);
    setActiveEpisode(episode);
    setCurrentView('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q && currentView !== 'home') setCurrentView('home');
        }}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <HomeView
            seriesList={seriesList}
            searchQuery={searchQuery}
            onSelectSeries={handleSelectSeries}
            onPlayEpisode={handlePlayEpisode}
          />
        )}

        {currentView === 'series-detail' && activeSeries && (
          <SeriesDetailView
            series={activeSeries}
            onBack={() => setCurrentView('home')}
            onPlayEpisode={handlePlayEpisode}
          />
        )}

        {currentView === 'watch' && activeSeries && activeEpisode && (
          <WatchView
            series={activeSeries}
            episode={activeEpisode}
            onBack={() => setCurrentView('series-detail')}
            onSelectEpisode={(s, ep) => handlePlayEpisode(s, ep)}
          />
        )}

        {currentView === 'watchlist' && (
          <WatchlistView
            seriesList={seriesList}
            onSelectSeries={handleSelectSeries}
            onPlayEpisode={handlePlayEpisode}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            seriesList={seriesList}
            setSeriesList={setSeriesList}
          />
        )}
      </main>

      {/* Auth Modal (Sign In / Register / Evaluator Switcher) */}
      <AuthModal />

      {/* Global Crunchyroll-style Footer */}
      <Footer onNavigate={(view) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

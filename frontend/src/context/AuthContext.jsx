import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Default to 'member' for instant interactive testing, easily switchable to 'guest' or 'admin'
  const [role, setRole] = useState(() => {
    return localStorage.getItem('3saj_role') || 'member';
  });

  const [currentUser, setCurrentUser] = useState({
    name: 'Kriya Mustafa',
    username: 'kriyaMustafa',
    email: 'kriya.mustafa@example.com',
    avatarInitials: 'KM'
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Watchlist array of series IDs
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('3saj_watchlist');
    return saved ? JSON.parse(saved) : ['series-01', 'series-02', 'series-03'];
  });

  // Watch history: { [episodeId]: { seconds: number, durationSec: number, seriesId: string, seriesTitle: string, epTitle: string, lastUpdated: string } }
  const [watchHistory, setWatchHistory] = useState(() => {
    const saved = localStorage.getItem('3saj_watch_history');
    return saved ? JSON.parse(saved) : {
      'cb-s1-e12': {
        seriesId: 'series-01',
        seriesTitle: 'Chrono Blades',
        episodeTitle: 'S1 : Ep 12 • The Singularity Paradox',
        seconds: 860, // 14:20
        durationSec: 1425,
        lastUpdated: '10 mins ago'
      },
      'ls-s1-e04': {
        seriesId: 'series-02',
        seriesTitle: 'The Last Sorcerer',
        episodeTitle: 'S1 : Ep 4 • Ancient Runes of Aethel',
        seconds: 435, // 07:15
        durationSec: 1440,
        lastUpdated: '2 hours ago'
      },
      'nte-s1-e08': {
        seriesId: 'series-03',
        seriesTitle: 'Neo Tokyo Express',
        episodeTitle: 'S1 : Ep 8 • Cyber Highway Drift',
        seconds: 1265, // 21:05
        durationSec: 1370,
        lastUpdated: '1 day ago'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('3saj_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('3saj_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('3saj_watch_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  const toggleWatchlist = (seriesId) => {
    if (watchlist.includes(seriesId)) {
      setWatchlist(prev => prev.filter(id => id !== seriesId));
    } else {
      setWatchlist(prev => [...prev, seriesId]);
    }
  };

  const isInWatchlist = (seriesId) => watchlist.includes(seriesId);

  const recordProgress = (episodeId, seconds, durationSec, meta = {}) => {
    setWatchHistory(prev => ({
      ...prev,
      [episodeId]: {
        ...prev[episodeId],
        ...meta,
        seconds: Math.floor(seconds),
        durationSec: Math.floor(durationSec),
        lastUpdated: 'Just now'
      }
    }));
  };

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        switchRole,
        currentUser,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        watchHistory,
        recordProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

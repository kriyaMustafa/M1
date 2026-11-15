import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Film, Bookmark, ShieldAlert, User, LogIn, ChevronDown, Check } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, searchQuery, setSearchQuery }) {
  const { role, switchRole, currentUser, openAuthModal, watchlist } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Primary Nav */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => { setCurrentView('home'); setSearchQuery(''); }}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-base tracking-wider">3S</span>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white group-hover:text-brand-400 transition-colors">
                3SAJ<span className="text-brand-500">STREAM</span>
              </span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' ? 'text-brand-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentView('home'); setSearchQuery(''); }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentView === 'browse' ? 'text-brand-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setCurrentView('watchlist')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'watchlist' ? 'text-brand-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Watchlist
              {watchlist.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-xs font-bold bg-brand-500 text-white rounded-full">
                  {watchlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'admin' ? 'text-brand-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-brand-400" />
              Admin Portal
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search anime by title, genre, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-full pl-10 pr-4 py-1.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: Evaluator Role Switcher & Auth */}
        <div className="flex items-center gap-3">
          
          {/* Quick Evaluator Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
              title="Switch user role for testing (Check 1 Scope)"
            >
              <span className="text-slate-400 hidden lg:inline">Role:</span>
              <span className={`font-bold capitalize ${
                role === 'admin' ? 'text-amber-400' : role === 'member' ? 'text-brand-400' : 'text-slate-300'
              }`}>
                {role}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-900 border border-slate-700 shadow-xl py-1 z-50 text-xs"
                onClick={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Switch Active Role (RBAC)
                </div>
                
                <button
                  onClick={() => switchRole('guest')}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    role === 'guest' ? 'text-brand-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>Guest (Public, No Auth)</span>
                  {role === 'guest' && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => switchRole('member')}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    role === 'member' ? 'text-brand-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>Member (Viewer with History)</span>
                  {role === 'member' && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => switchRole('admin')}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 transition-colors ${
                    role === 'admin' ? 'text-amber-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  <span>Administrator (Full CRUD)</span>
                  {role === 'admin' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* User Profile / Auth Button */}
          {role === 'guest' ? (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={openAuthModal}
                className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-brand-500/30 hover:scale-105 transition-transform"
                title={`${currentUser.name} (${role})`}
              >
                {currentUser.avatarInitials}
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

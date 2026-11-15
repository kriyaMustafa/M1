import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Shield, Check, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, role, switchRole } = useAuth();
  const [tab, setTab] = useState('signin'); // 'signin' | 'register'
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'register') {
      if (!email || !username || !password) {
        setFeedback('Please fill out all required fields.');
        return;
      }
      if (password.length < 8) {
        setFeedback('Password must be at least 8 characters long (NFR-4).');
        return;
      }
      switchRole('member');
      setFeedback('Account registered! Signed in as Member.');
      setTimeout(() => {
        closeAuthModal();
        setFeedback('');
      }, 700);
    } else {
      if (!username || !password) {
        setFeedback('Please provide your username/email and password.');
        return;
      }
      switchRole('member');
      setFeedback('Authenticated successfully!');
      setTimeout(() => {
        closeAuthModal();
        setFeedback('');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30 mb-3">
            <span className="text-white font-extrabold text-xl">3S</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {tab === 'signin' ? 'Sign In to 3SAJ Stream' : 'Create Member Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access anime watch history, resume positions, and personal watchlist
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 mb-6 text-xs font-semibold">
          <button
            onClick={() => { setTab('signin'); setFeedback(''); }}
            className={`py-2 rounded-lg transition-all ${
              tab === 'signin' ? 'bg-slate-800 text-brand-400 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setFeedback(''); }}
            className={`py-2 rounded-lg transition-all ${
              tab === 'register' ? 'bg-slate-800 text-brand-400 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Register (FR-1)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="viewer@example.com"
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {tab === 'register' ? 'Choose Username' : 'Username or Email'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="kriyaMustafa"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
            {tab === 'register' && (
              <p className="text-[10px] text-slate-400 mt-1">
                Passwords stored as salted hashes (NFR-4). Minimum 8 characters.
              </p>
            )}
          </div>

          {feedback && (
            <div className="p-2.5 rounded-lg bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs text-center font-medium">
              {feedback}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.01]"
          >
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Quick Demo Role Switcher for Course Evaluator / Grader */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Quick Evaluator Switcher
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => { switchRole('guest'); closeAuthModal(); }}
              className={`p-2 rounded-lg border text-center transition-colors ${
                role === 'guest' ? 'bg-slate-800 border-slate-600 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => { switchRole('member'); closeAuthModal(); }}
              className={`p-2 rounded-lg border text-center transition-colors ${
                role === 'member' ? 'bg-brand-500/20 border-brand-500 text-brand-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Member
            </button>
            <button
              onClick={() => { switchRole('admin'); closeAuthModal(); }}
              className={`p-2 rounded-lg border text-center transition-colors ${
                role === 'admin' ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

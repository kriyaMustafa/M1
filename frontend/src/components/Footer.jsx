import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 mt-20 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center font-bold text-white text-xs">
                3S
              </div>
              <span className="font-extrabold text-slate-200 text-sm tracking-tight">
                3SAJ<span className="text-brand-500">STREAM</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Standalone anime video streaming portal modeled after Crunchyroll. Built for seamless episode streaming with WebVTT subtitles, watch history, and administrative transcoding.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-[11px]">Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-brand-400 transition-colors">Home Catalogue</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-brand-400 transition-colors">Browse Genres</button></li>
              <li><button onClick={() => onNavigate('watchlist')} className="hover:text-brand-400 transition-colors">My Watchlist &amp; History</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-brand-400 transition-colors">Admin Content Studio</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-[11px]">System Specifications</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Spec: <span className="text-slate-300">docs/SPEC.md (8 Stories)</span></li>
              <li>• Roles: <span className="text-slate-300">Guest, Member, Admin</span></li>
              <li>• Video: <span className="text-slate-300">HTML5 + WebVTT Subtitles</span></li>
              <li>• Transcoding: <span className="text-slate-300">FFmpeg Pipeline (FR-14)</span></li>
              <li>• Viewport: <span className="text-slate-300">360px – 1920px (NFR-7)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-[11px]">Academic Course Project</h4>
            <p className="text-slate-400 mb-2">
              <strong className="text-slate-200">KRIYA MUSTAFA</strong><br />
              Student ID: <code className="text-brand-400">e20230474</code><br />
              Group: <code className="text-slate-300">I4-GIC-A</code>
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-brand-400 font-mono text-[11px]">
              Submission Checkpoint: check-1
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 3SAJ Stream. All anime artwork and titles simulated for course prototype evaluation.</p>
          <p className="text-[11px]">Designed to meet FR-1 through FR-17 and NFR-1 through NFR-8.</p>
        </div>
      </div>
    </footer>
  );
}

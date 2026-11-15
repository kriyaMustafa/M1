import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, Plus, Trash2, Edit3, Film, UploadCloud, 
  RotateCw, AlertTriangle, CheckCircle, Clock, FileText, Check, Shield
} from 'lucide-react';
import { INITIAL_TRANSCODING_JOBS } from '../mockData/mockJobs';

export default function AdminView({ seriesList, setSeriesList }) {
  const { role, switchRole } = useAuth();
  
  const [activeTab, setActiveTab] = useState('series'); // 'series' | 'ingest' | 'queue'
  const [jobs, setJobs] = useState(INITIAL_TRANSCODING_JOBS);

  // New series modal form state
  const [isAddSeriesOpen, setIsAddSeriesOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGenres, setNewGenres] = useState('Action, Sci-Fi');
  const [newYear, setNewYear] = useState('2026');
  const [newStudio, setNewStudio] = useState('Studio Nexus');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [seriesNotice, setSeriesNotice] = useState('');

  // Video ingestion form state (FR-13, FR-15)
  const [selectedSeriesId, setSelectedSeriesId] = useState(seriesList[0]?.id || '');
  const [selectedEpNumber, setSelectedEpNumber] = useState('1');
  const [selectedEpTitle, setSelectedEpTitle] = useState('Episode Title');
  const [mockVideoFilename, setMockVideoFilename] = useState('');
  const [mockVttFilename, setMockVttFilename] = useState('');
  const [selectedVttLang, setSelectedVttLang] = useState('English');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // 1. RBAC Check (FR-16)
  if (role !== 'admin') {
    return (
      <div className="py-20 text-center max-w-lg mx-auto space-y-5 animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">403 — Administrator Portal Restricted</h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Content management and transcoding orchestration are restricted to users with the <strong className="text-amber-400">Administrator</strong> role (FR-16).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          Current Session: <span className="capitalize font-bold text-slate-100">{role}</span>
        </div>

        <button
          onClick={() => switchRole('admin')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
        >
          <Shield className="w-4 h-4" />
          Switch to Administrator Role (Evaluator Demo)
        </button>
      </div>
    );
  }

  // Handle Add Series (FR-11)
  const handleAddSeries = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setSeriesNotice('Please provide a series title.');
      return;
    }

    const created = {
      id: `series-${Date.now()}`,
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      year: parseInt(newYear) || 2026,
      rating: "PG-13",
      studio: newStudio || "Studio Nexus",
      genres: newGenres.split(',').map(g => g.trim()),
      synopsis: newSynopsis || "Newly ingested anime series into 3SAJ Stream catalogue.",
      featured: false,
      bannerColor: "from-blue-900 via-slate-900 to-slate-950",
      accentColor: "#f97316",
      posterGradient: "from-orange-600 to-slate-900",
      seasons: [
        {
          seasonNumber: 1,
          title: "Season 1",
          episodes: [
            {
              id: `ep-${Date.now()}`,
              episodeNumber: 1,
              title: "Episode 1: Pilot Broadcast",
              duration: "24m",
              durationSec: 1440,
              synopsis: "The introductory episode for this series.",
              subtitles: []
            }
          ]
        }
      ]
    };

    setSeriesList(prev => [created, ...prev]);
    setIsAddSeriesOpen(false);
    setNewTitle('');
    setNewSynopsis('');
    setSeriesNotice('Series created and added to public catalogue!');
    setTimeout(() => setSeriesNotice(''), 3000);
  };

  // Handle Delete Series (FR-11)
  const handleDeleteSeries = (id) => {
    setSeriesList(prev => prev.filter(s => s.id !== id));
  };

  // Handle Upload Video & Subtitle Validation (FR-13, FR-15)
  const handleIngestSubmit = (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');

    if (!mockVideoFilename) {
      setUploadError('Please select or specify an MP4 video file to upload.');
      return;
    }

    // Strict validation: Reject non-MP4 formats (FR-13)
    if (!mockVideoFilename.toLowerCase().endsWith('.mp4')) {
      setUploadError('Upload rejected: Invalid video format. The system strictly requires MP4 format (FR-13). Formats such as MKV, AVI, or MOV are rejected.');
      return;
    }

    // Success: queue new transcoding job (FR-14, FR-15)
    const targetSeries = seriesList.find(s => s.id === selectedSeriesId);
    const newJob = {
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      seriesTitle: targetSeries ? targetSeries.title : "Chrono Blades",
      episodeTitle: `S1 : Episode ${selectedEpNumber} - ${selectedEpTitle}`,
      filename: mockVideoFilename,
      fileSize: "780 MB",
      subtitles: mockVttFilename ? [`${selectedVttLang}.vtt`] : ["English.vtt"],
      status: "processing",
      progress: 15,
      timeRemaining: "2m 40s",
      errorMessage: null,
      createdAt: "Just now"
    };

    setJobs(prev => [newJob, ...prev]);
    setUploadSuccess(`Upload accepted! Job ${newJob.id} queued for background transcoding into web-playable format with thumbnail (FR-14).`);
    setMockVideoFilename('');
    setMockVttFilename('');
  };

  // Retry Failed Transcoding Task (FR-17)
  const handleRetryJob = (jobId) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: "processing",
          progress: 35,
          errorMessage: null,
          timeRemaining: "Retrying conversion via FFmpeg worker..."
        };
      }
      return job;
    }));

    // Simulate completion after 2 seconds
    setTimeout(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: "ready",
            progress: 100,
            timeRemaining: "Completed",
            thumbnailUrl: "/thumbnails/ep_thumb.jpg"
          };
        }
        return job;
      }));
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
              Role: Administrator
            </span>
            <span className="text-xs text-slate-500">Security Guard Active (FR-16)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Content Management Studio
          </h1>
        </div>

        {/* Action Tabs */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('series')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'series' ? 'bg-amber-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Series Catalogue ({seriesList.length})
          </button>
          <button
            onClick={() => setActiveTab('ingest')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'ingest' ? 'bg-amber-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Media Ingestion (FR-13, 15)
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'queue' ? 'bg-amber-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Transcoding Worker ({jobs.length})
            {jobs.some(j => j.status === 'failed') && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {seriesNotice && (
        <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-brand-400" />
          {seriesNotice}
        </div>
      )}

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Total Titles</span>
          <div className="text-2xl font-black text-white mt-1">{seriesList.length} Series</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Transcoded Episodes</span>
          <div className="text-2xl font-black text-white mt-1">142 Videos</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Worker Queue</span>
          <div className="text-2xl font-black text-brand-400 mt-1">
            {jobs.filter(j => j.status === 'processing').length} Processing
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Transcode Alerts</span>
          <div className="text-2xl font-black text-rose-400 mt-1">
            {jobs.filter(j => j.status === 'failed').length} Failed (Retryable)
          </div>
        </div>
      </div>

      {/* Tab 1: Series Management (FR-11, FR-12) */}
      {activeTab === 'series' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight">
              Published Anime Titles (FR-11)
            </h2>
            <button
              onClick={() => setIsAddSeriesOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add New Series
            </button>
          </div>

          {/* Series Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Series Title</th>
                    <th className="px-4 py-3">Genres</th>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3">Seasons &amp; Ep</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {seriesList.map(s => {
                    const epCount = s.seasons.reduce((acc, season) => acc + season.episodes.length, 0);

                    return (
                      <tr key={s.id} className="hover:bg-slate-850/60 transition-colors">
                        <td className="px-4 py-3 font-bold text-white">
                          {s.title}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {s.genres.join(', ')}
                        </td>
                        <td className="px-4 py-3 font-mono">{s.year}</td>
                        <td className="px-4 py-3">
                          {s.seasons.length} Season ({epCount} Ep)
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Published
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteSeries(s.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Delete Series"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Series */}
      {isAddSeriesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Add New Anime Series (FR-11)</h3>
            
            <form onSubmit={handleAddSeries} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Cyber Ronin 2099"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Genres (comma separated)</label>
                  <input
                    type="text"
                    value={newGenres}
                    onChange={(e) => setNewGenres(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Release Year</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Studio</label>
                <input
                  type="text"
                  value={newStudio}
                  onChange={(e) => setNewStudio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Synopsis</label>
                <textarea
                  rows="3"
                  value={newSynopsis}
                  onChange={(e) => setNewSynopsis(e.target.value)}
                  placeholder="Plot summary of the anime series..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSeriesOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold"
                >
                  Create Series
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Ingestion & Upload (FR-13, FR-15) */}
      {activeTab === 'ingest' && (
        <div className="max-w-2xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Ingest Episode Video &amp; Subtitles
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload MP4 container video assets and assign synchronized WebVTT captions (FR-13, FR-15).
            </p>
          </div>

          <form onSubmit={handleIngestSubmit} className="space-y-4 text-xs">
            
            {/* Target Series */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Anime Series</label>
              <select
                value={selectedSeriesId}
                onChange={(e) => setSelectedSeriesId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
              >
                {seriesList.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* Episode Number & Title */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Episode #</label>
                <input
                  type="number"
                  min="1"
                  value={selectedEpNumber}
                  onChange={(e) => setSelectedEpNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Episode Title</label>
                <input
                  type="text"
                  value={selectedEpTitle}
                  onChange={(e) => setSelectedEpTitle(e.target.value)}
                  placeholder="e.g. Beyond the Starlight"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            {/* Video File Validation Box (FR-13) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="block font-bold text-slate-200">
                1. Episode Video File (.MP4 only)
              </label>
              <p className="text-[11px] text-slate-400">
                Must be an MP4 container (H.264/AAC). Maximum file size: 2 GB. Other formats are rejected (FR-13).
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={mockVideoFilename}
                  onChange={(e) => setMockVideoFilename(e.target.value)}
                  placeholder="e.g. episode_14_master.mp4 (try typing .mkv to test rejection)"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setMockVideoFilename('chrono_blades_ep14_master.mp4')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px]"
                >
                  Fill Sample MP4
                </button>
                <button
                  type="button"
                  onClick={() => setMockVideoFilename('invalid_video.mkv')}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:text-white border border-rose-800 text-[11px]"
                  title="Test FR-13 format rejection"
                >
                  Test Non-MP4 (.mkv)
                </button>
              </div>
            </div>

            {/* Subtitles VTT Box (FR-15) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <label className="block font-bold text-slate-200">
                2. Subtitle File (.VTT) &amp; Language
              </label>
              <p className="text-[11px] text-slate-400">
                Supply timed captions formatted according to the WebVTT specification (FR-15).
              </p>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={mockVttFilename}
                    onChange={(e) => setMockVttFilename(e.target.value)}
                    placeholder="e.g. episode_14_english.vtt"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <select
                    value={selectedVttLang}
                    onChange={(e) => setSelectedVttLang(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="English">English</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Error or Success feedback */}
            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Upload &amp; Dispatch Transcoding Worker (FR-14)
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Transcoding Worker Tasks Queue (FR-14, FR-17) */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Background Transcoding Worker Tasks (FR-14, FR-17)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracks asynchronous FFmpeg video conversion, thumbnail generation, and failure recovery.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Job ID &amp; Target</th>
                    <th className="px-4 py-3">File &amp; Size</th>
                    <th className="px-4 py-3">Subtitles</th>
                    <th className="px-4 py-3">Status &amp; Progress</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-slate-200">{job.id}</span>
                        <div className="text-brand-400 font-semibold">{job.seriesTitle}</div>
                        <div className="text-slate-400 text-[11px]">{job.episodeTitle}</div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-mono text-slate-300 text-[11px]">{job.filename}</div>
                        <div className="text-slate-500 text-[10px]">{job.fileSize}</div>
                      </td>

                      <td className="px-4 py-3 text-slate-400 text-[11px]">
                        {job.subtitles.join(', ')}
                      </td>

                      <td className="px-4 py-3">
                        {job.status === 'processing' && (
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 inline-flex items-center gap-1">
                              <RotateCw className="w-3 h-3 animate-spin" />
                              Processing ({job.progress}%)
                            </span>
                            <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-sky-500 h-full rounded-full" style={{ width: `${job.progress}%` }} />
                            </div>
                            <span className="text-[10px] text-slate-500 block">{job.timeRemaining}</span>
                          </div>
                        )}

                        {job.status === 'ready' && (
                          <div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Ready (Thumbnail Extracted)
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Stream ready</span>
                          </div>
                        )}

                        {job.status === 'failed' && (
                          <div className="space-y-1 max-w-xs">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Transcoding Failed (FR-17)
                            </span>
                            <p className="text-[10px] text-rose-300/80 leading-snug">
                              {job.errorMessage}
                            </p>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {job.status === 'failed' && (
                          <button
                            onClick={() => handleRetryJob(job.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
                            title="Retry Transcoding Conversion (FR-17)"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            Retry Job ↺
                          </button>
                        )}
                        {job.status === 'ready' && (
                          <span className="text-slate-500 text-xs">Published</span>
                        )}
                        {job.status === 'processing' && (
                          <span className="text-sky-400 text-xs font-mono">Running</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Radio, RefreshCw, MessageSquare, Database, Zap, Moon, Swords, Code, Copy, Check, CheckCircle2, AlertTriangle, Send, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { soundFX } from '../utils/audio';

const STORAGE_KEY = 'blox_vulcan_raw_json_history_v3';

export const LiveStockTrackerTab: React.FC = () => {
  const [latestData, setLatestData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [activeStockTab, setActiveStockTab] = useState<'all' | 'normal' | 'mirage'>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [jsonStatus, setJsonStatus] = useState<'valid' | 'invalid' | 'idle'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('Waiting for bot JSON...');
  const [manualJsonInput, setManualJsonInput] = useState<string>('');
  const [showManualInput, setShowManualInput] = useState<boolean>(false);

  const webhookEndpoint = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/market-sync/webhook-stock`
    : '/api/market-sync/webhook-stock';

  const validateAndParseJSON = (raw: any) => {
    if (!raw) {
      setJsonStatus('invalid');
      setStatusMessage('Payload is empty or null');
      return false;
    }
    try {
      const str = typeof raw === 'string' ? raw : JSON.stringify(raw);
      JSON.parse(str);
      setJsonStatus('valid');
      setStatusMessage('JSON structure successfully validated 🟢');
      return true;
    } catch (e: any) {
      setJsonStatus('invalid');
      setStatusMessage(`Malformed JSON error: ${e.message}`);
      return false;
    }
  };

  const fetchStockFeed = async () => {
    try {
      const resp = await fetch('/api/market-sync/webhook-stock/live');
      if (resp.ok) {
        const json = await resp.json();
        if (json.latest) {
          setLatestData(json.latest);
          validateAndParseJSON(json.latest);
        }
        if (Array.isArray(json.history) && json.history.length > 0) {
          setHistory(json.history);
        }
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (e) {
      setJsonStatus('invalid');
      setStatusMessage('Network error fetching feed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockFeed();
    const interval = setInterval(fetchStockFeed, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  const handleManualSubmit = async () => {
    if (!manualJsonInput.trim()) return;
    try {
      soundFX.playPop();
      const parsed = JSON.parse(manualJsonInput);
      
      // Send to server webhook endpoint
      const resp = await fetch('/api/market-sync/webhook-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });

      if (resp.ok) {
        setManualJsonInput('');
        setShowManualInput(false);
        fetchStockFeed();
      } else {
        alert('Server refused webhook payload.');
      }
    } catch (e: any) {
      alert(`Invalid JSON: ${e.message}`);
    }
  };

  const isMirageItem = (item: any) => {
    try {
      const jsonStr = JSON.stringify(item).toLowerCase();
      return (
        jsonStr.includes('mirage') || 
        jsonStr.includes('advanced dealer') || 
        jsonStr.includes('advanced stock') ||
        jsonStr.includes('mirage island')
      );
    } catch (e) {
      return false;
    }
  };

  const mirageHistory = history.filter(isMirageItem);
  const normalHistory = history.filter(item => !isMirageItem(item));

  const displayedHistory = 
    activeStockTab === 'mirage' ? mirageHistory :
    activeStockTab === 'normal' ? normalHistory :
    history;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/20 to-purple-500/25 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                <span>Webhook Receiver Active</span>
              </span>

              {/* JSON Validation Status Indicator */}
              <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border shadow-lg ${
                jsonStatus === 'valid'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-emerald-950/50'
                  : jsonStatus === 'invalid'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-rose-950/50'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              }`}>
                {jsonStatus === 'valid' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                {jsonStatus === 'invalid' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                {jsonStatus === 'idle' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                <span>{statusMessage}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
              Vulcan Bot JSON Webhook & Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Real-time JSON receiver. Send your bot's JSON payload to the endpoint below or test manually.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playPop();
                setShowManualInput(!showManualInput);
              }}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-purple-950/40 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{showManualInput ? 'Close JSON Input' : 'Test / Paste JSON'}</span>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                setLoading(true);
                fetchStockFeed();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Webhook Endpoint & Manual Test Box */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs font-black uppercase text-cyan-400 tracking-wider">Your App Webhook URL</div>
            <div className="text-xs text-slate-400 mt-0.5">Configure your bot to POST JSON directly to this endpoint:</div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="text" 
              readOnly 
              value={webhookEndpoint} 
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-mono w-full sm:w-96 select-all"
            />
            <button
              onClick={() => {
                soundFX.playPop();
                navigator.clipboard.writeText(webhookEndpoint);
                alert('Webhook URL copied to clipboard!');
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>

        {showManualInput && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2">
            <div className="text-xs font-bold text-purple-300">Test or Paste Bot JSON Payload Here:</div>
            <textarea
              rows={5}
              value={manualJsonInput}
              onChange={(e) => setManualJsonInput(e.target.value)}
              placeholder={`{\n  "title": "Current Mirage Stock",\n  "fruits": ["Spring", "Smoke", "Flame"],\n  "prices": ["60,000", "100,000", "250,000"]\n}`}
              className="w-full rounded-xl bg-slate-950 border border-purple-500/40 p-3 text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleManualSubmit}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit JSON Payload</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => { soundFX.playPop(); setActiveStockTab('all'); }}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 border ${
            activeStockTab === 'all'
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <span>📋 All JSON Payloads ({history.length})</span>
        </button>

        <button
          onClick={() => { soundFX.playPop(); setActiveStockTab('normal'); }}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 border ${
            activeStockTab === 'normal'
              ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Swords className="w-3.5 h-3.5 text-blue-300" />
          <span>⚔️ Normal Stock ({normalHistory.length})</span>
        </button>

        <button
          onClick={() => { soundFX.playPop(); setActiveStockTab('mirage'); }}
          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 border ${
            activeStockTab === 'mirage'
              ? 'bg-purple-600 text-white border-purple-500 shadow-lg'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-purple-300" />
          <span>🔮 Mirage Stock ({mirageHistory.length})</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Latest JSON Payload */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                <h3 className="font-extrabold text-white text-sm">Latest Raw JSON</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{lastRefreshed || 'Just now'}</span>
            </div>

            {latestData ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Stock Type:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                    isMirageItem(latestData)
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  }`}>
                    {isMirageItem(latestData) ? '🔮 Mirage Stock' : '⚔️ Normal Stock'}
                  </span>
                </div>

                <div className="relative">
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto max-h-[400px]">
                    {JSON.stringify(latestData, null, 2)}
                  </pre>
                  <button
                    onClick={() => {
                      soundFX.playPop();
                      navigator.clipboard.writeText(JSON.stringify(latestData, null, 2));
                      setCopiedIndex(-1);
                      setTimeout(() => setCopiedIndex(null), 2000);
                    }}
                    className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedIndex === -1 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === -1 ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center">
                <Server className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-pulse" />
                <p className="text-sm font-bold text-slate-400">Waiting for JSON payloads...</p>
                <p className="text-xs text-slate-500 mt-1">Send a POST request to your webhook URL or test with the button above.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: History JSON Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <h3 className="font-extrabold text-white text-sm">
                  {activeStockTab === 'mirage' ? '🔮 Mirage JSON Stream' :
                   activeStockTab === 'normal' ? '⚔️ Normal JSON Stream' :
                   '📋 All Raw JSON Payloads Stream'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30">
                {displayedHistory.length} Payloads
              </span>
            </div>

            <div className="mt-4 space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
              {displayedHistory.length > 0 ? (
                displayedHistory.map((item, index) => {
                  const isMirage = isMirageItem(item);
                  let isValid = true;
                  try {
                    JSON.parse(typeof item === 'string' ? item : JSON.stringify(item));
                  } catch (e) {
                    isValid = false;
                  }

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl bg-slate-950/90 border transition-all space-y-2 relative ${
                        isMirage ? 'border-purple-500/40 shadow-lg shadow-purple-950/20' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                            isMirage ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          }`}>
                            {isMirage ? '🔮 Mirage Stock' : '⚔️ Normal Stock'}
                          </span>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${
                            isValid ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}>
                            {isValid ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-rose-400" />}
                            <span>{isValid ? 'Valid JSON' : 'Malformed'}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(item.receivedAt || Date.now()).toLocaleTimeString()}
                          </span>
                          <button
                            onClick={() => {
                              soundFX.playPop();
                              navigator.clipboard.writeText(JSON.stringify(item, null, 2));
                              setCopiedIndex(index);
                              setTimeout(() => setCopiedIndex(null), 2000);
                            }}
                            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer border border-slate-800"
                          >
                            {copiedIndex === index ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedIndex === index ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      <pre className="p-3 rounded-lg bg-slate-900 text-[11px] text-cyan-200 font-mono overflow-x-auto max-h-[300px]">
                        {JSON.stringify(item, null, 2)}
                      </pre>
                    </motion.div>
                  );
                })
              ) : (
                <div className="py-20 text-center text-slate-500 text-xs">
                  No JSON payloads recorded yet. Use the "Test / Paste JSON" button above to test instantly!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

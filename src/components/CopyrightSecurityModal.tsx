import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  AlertTriangle, 
  KeyRound, 
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COPYRIGHT_DATA } from '../utils/security';
import { soundFX } from '../utils/audio';

interface CopyrightSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CopyrightSecurityModal: React.FC<CopyrightSecurityModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedDc, setCopiedDc] = useState(false);

  if (!isOpen) return null;

  const handleCopySignature = () => {
    navigator.clipboard.writeText(COPYRIGHT_DATA.digitalSignature);
    setCopiedKey(true);
    soundFX.playPop();
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyDc = () => {
    navigator.clipboard.writeText(`${COPYRIGHT_DATA.author} (DC: ${COPYRIGHT_DATA.discordId})`);
    setCopiedDc(true);
    soundFX.playPop();
    setTimeout(() => setCopiedDc(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/50 overflow-hidden relative"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Certificate of Ownership & Security</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Digital Copyright & Anti-Tamper Protection Protocol
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Certificate Banner Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-950/80 to-slate-900 border border-indigo-500/30 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Sole Creator & Copyright Holder</span>
                </div>
                <h4 className="text-xl font-black text-white">
                  Developer: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-amber-300">1_solas</span>
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  Discord UID: <strong className="text-indigo-300">{COPYRIGHT_DATA.discordId}</strong>
                </p>
              </div>

              <button
                onClick={handleCopyDc}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-xs text-indigo-200 font-bold flex items-center gap-1.5 transition-all shrink-0"
              >
                {copiedDc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDc ? 'Copied' : 'Copy Contact'}</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-500/20 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Year / Edition</span>
                <span className="font-bold text-slate-200">© {COPYRIGHT_DATA.year} Master Hub</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">License Type</span>
                <span className="font-bold text-slate-200">All Rights Reserved</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Security Engine</span>
                <span className="font-bold text-cyan-300">{COPYRIGHT_DATA.appVersion}</span>
              </div>
            </div>
          </div>

          {/* Active Security Measures */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Active Web Security & Anti-Cloning Measures</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white">Cryptographic Watermarking</h6>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    All copied datasets and guides automatically append digital authorship metadata.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white">Anti-Scrape & Tamper Guard</h6>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Monitors unauthorized debugger injections, iframe hijacking, and asset duplication.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white">Input Sanitization Guard</h6>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Real-time XSS filtering and prompt-injection neutralization on all AI query buffers.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white">Offline Privacy Sandbox</h6>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Zero external telemetry leaks; all calculations and Solas AI models run in sandboxed memory.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Digital Signature Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-cyan-400" /> Digital Signature Certificate
              </span>
              <button
                onClick={handleCopySignature}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[10px]"
              >
                {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300 break-all select-all">
              {COPYRIGHT_DATA.digitalSignature}
            </div>
          </div>

          {/* Legal Infringement Notice */}
          <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-[11px] text-red-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> Any unauthorized re-hosting, plagiarism, or selling of this application or its internal Solas knowledge algorithms will be met with immediate copyright violation claims.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Protected under International Copyright Laws • © 2026 1_solas
          </span>
          <button
            onClick={() => {
              soundFX.playPop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors shadow-md"
          >
            I Acknowledge
          </button>
        </div>
      </motion.div>
    </div>
  );
};

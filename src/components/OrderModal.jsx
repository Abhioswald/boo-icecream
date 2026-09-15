import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function OrderModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 2400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      aria-describedby="order-modal-desc"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-3xl glass-card border border-white/10 p-6 sm:p-8 bg-[#0a0a0f] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white overflow-hidden focus-visible:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
              <Check className="w-7 h-7" />
            </div>
            <h3 id="order-modal-title" className="font-display font-black text-2xl uppercase tracking-tight text-white">
              ACCESS GRANTED
            </h3>
            <p id="order-modal-desc" className="text-zinc-400 text-xs tracking-wider max-w-xs mx-auto">
              You are on the priority list for the next BOO! drop. Check your inbox for private coordinates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIMITED DROP ACCESS</span>
              </div>
              <h3 id="order-modal-title" className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
                TASTE THE DARK
              </h3>
              <p id="order-modal-desc" className="text-zinc-400 text-xs mt-2 font-light leading-relaxed">
                Join the private list to receive drop releases and pop-up locations.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="order-modal-email" className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block">
                EMAIL ADDRESS
              </label>
              <input
                ref={inputRef}
                id="order-modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="darkness@domain.com"
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-display font-black text-xs tracking-[0.25em] uppercase rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <span>REQUEST ACCESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

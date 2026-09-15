import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-zinc-600 py-16 border-t border-zinc-900/80 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-black text-lg text-white tracking-tight">
            BOO<span className="text-purple-500">!</span>
          </span>
          <span className="text-zinc-800">/</span>
          <span className="tracking-widest uppercase text-[10px] text-zinc-500">
            ALL RIGHTS RESERVED © {currentYear}
          </span>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 sm:gap-8 tracking-widest uppercase text-[10px] text-zinc-500">
          <a href="#story" className="hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1 py-0.5">
            MANIFESTO
          </a>
          <a href="#flavor" className="hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1 py-0.5">
            LAB SPECS
          </a>
          <a href="#texture" className="hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1 py-0.5">
            INGREDIENTS
          </a>
          <span className="text-zinc-700 hidden md:inline">PARIS • TOKYO • NYC • LONDON</span>
        </nav>
      </div>
    </footer>
  );
}


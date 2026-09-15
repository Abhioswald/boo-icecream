import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 glass-nav border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left Logo */}
        <a
          href="#"
          aria-label="BOO! Home"
          className="group flex items-center gap-2 text-decoration-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-1"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-white transition-transform duration-300 group-hover:scale-105">
            BOO<span className="text-purple-500 animate-pulse">!</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-mono border-l border-zinc-800 pl-2 ml-1">
            DARK BATCH
          </span>
        </a>

        {/* Center Desktop Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('product')}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1.5 py-1"
          >
            PRODUCT
          </button>
          <button
            onClick={() => scrollToSection('flavor')}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1.5 py-1"
          >
            FLAVOR
          </button>
          <button
            onClick={() => scrollToSection('story')}
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 rounded px-1.5 py-1"
          >
            STORY
          </button>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenOrder}
            className="group relative inline-flex items-center justify-center px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-zinc-900/60 border border-white/10 hover:border-purple-500/40 rounded-full transition-all duration-300 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
          >
            <span className="flex items-center gap-1.5">
              <span>BUY NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900/40 border border-zinc-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden glass-nav border-b border-white/10 px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('product')}
              className="text-left text-xs font-semibold tracking-[0.25em] uppercase text-zinc-300 hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              PRODUCT
            </button>
            <button
              onClick={() => scrollToSection('flavor')}
              className="text-left text-xs font-semibold tracking-[0.25em] uppercase text-zinc-300 hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              FLAVOR
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-left text-xs font-semibold tracking-[0.25em] uppercase text-zinc-300 hover:text-purple-400 transition-colors cursor-pointer py-1"
            >
              STORY
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full mt-2 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-center font-bold tracking-[0.2em] text-xs uppercase rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              BUY NOW
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

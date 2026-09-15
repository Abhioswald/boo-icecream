import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA({ onOpenOrder, onExploreFlavor }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const img = imageRef.current;
    const buttons = buttonsRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      // Product image reveal & subtle elevation
      if (img) {
        gsap.fromTo(
          img,
          { scale: 0.94, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
            },
          }
        );
      }

      // Buttons reveal
      if (buttons) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-36 sm:py-48 lg:py-60 overflow-hidden flex items-center justify-center"
    >
      {/* Deep Atmospheric Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-[circle_at_center,_rgba(147,51,234,0.08)_0%,_transparent_70%] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-12">
        {/* Centered Headline */}
        <div ref={contentRef} className="space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-purple-500/50" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-purple-400 font-medium">
              05 // FINALE
            </span>
            <span className="w-6 h-[1px] bg-purple-500/50" />
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-9xl tracking-tight uppercase leading-[0.9] text-white">
            DARE TO<br />
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-white bg-clip-text text-transparent">
              TASTE THE DARK?
            </span>
          </h2>
        </div>

        {/* Centered Final Product Visual */}
        <div className="relative max-w-lg mx-auto flex justify-center items-center">
          <img
            ref={imageRef}
            src="/images/product-hero.jpg"
            alt="BOO! Black Ice Cream Branded Packaging and Cone"
            className="w-full h-auto object-contain will-change-transform drop-shadow-[0_25px_80px_rgba(0,0,0,0.98)]"
            loading="lazy"
          />
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreFlavor}
            className="w-full sm:w-auto px-10 py-4 rounded-full glass-card text-white font-display font-bold text-xs tracking-[0.25em] uppercase hover:bg-white/10 hover:border-white/30 transition-all duration-300 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            EXPLORE FLAVOR
          </button>
          
          <button
            onClick={onOpenOrder}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 text-white font-display font-black text-xs tracking-[0.25em] uppercase hover:shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span>BUY NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}


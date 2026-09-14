import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headerRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imageRef.current;
    const header = headerRef.current;
    const subtext = subtextRef.current;

    if (!section || !img) return;

    const ctx = gsap.context(() => {
      // Subtle rotation and elevation on scroll
      gsap.fromTo(
        img,
        { rotation: -3, y: 35, scale: 0.95 },
        {
          rotation: 2,
          y: -35,
          scale: 1.02,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );

      // Header reveal
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          }
        );
      }

      // Subtext reveal
      if (subtext) {
        gsap.fromTo(
          subtext,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative min-h-[110vh] bg-[#050505] text-white py-36 sm:py-48 lg:py-60 overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10 flex flex-col items-center text-center">
        {/* Header Block */}
        <div ref={headerRef} className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-purple-500/50" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-purple-400 font-medium">
              04 // PERSPECTIVE
            </span>
            <span className="w-6 h-[1px] bg-purple-500/50" />
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight uppercase leading-[0.95] text-white">
            ONE PRODUCT.<br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              ZERO BORING ANGLES.
            </span>
          </h2>
        </div>

        {/* Dramatic Low-Angle Perspective Visual in Expansive Negative Space */}
        <div className="relative mt-12 sm:mt-16 max-w-4xl w-full flex justify-center items-center">
          <img
            ref={imageRef}
            src="/images/showcase-angle.jpg"
            alt="BOO! artisan horizontal packaging and cone low angle perspective"
            className="w-full max-w-3xl lg:max-w-4xl h-auto object-contain will-change-transform drop-shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
            loading="lazy"
          />
        </div>

        {/* Minimalist Subtext */}
        <p
          ref={subtextRef}
          className="mt-12 max-w-md text-xs sm:text-sm font-light text-zinc-500 tracking-[0.25em] uppercase font-mono"
        >
          LIMITED DROP // 100% BOTANICAL CHARCOAL
        </p>
      </div>
    </section>
  );
}


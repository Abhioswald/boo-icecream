import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlavorSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const imgContainer = imageContainerRef.current;
    const img = imgRef.current;

    if (!section || !header || !img) return;

    const ctx = gsap.context(() => {
      // Slow, deliberate header reveal
      gsap.fromTo(
        header,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      );

      // Heavy, deliberate product image reveal
      gsap.fromTo(
        imgContainer,
        { scale: 0.94, opacity: 0, y: 35 },
        {
          scale: 1,
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

      // Subtle parallax on scroll
      gsap.fromTo(
        img,
        { y: -20, scale: 0.97 },
        {
          y: 20,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flavor"
      ref={sectionRef}
      className="relative min-h-screen py-32 sm:py-44 lg:py-52 overflow-hidden bg-[#050505] flex flex-col justify-center"
    >
      {/* Deep, subtle ambient radial gradient centered on the product visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-[circle_at_center,_rgba(147,51,234,0.08)_0%,_transparent_70%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        {/* Header story */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-purple-500/50" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-purple-400 font-medium">
              02 // TASTE
            </span>
            <span className="w-6 h-[1px] bg-purple-500/50" />
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.95]">
            BERRY<br />
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-zinc-200 bg-clip-text text-transparent">
              EXPLOSION.
            </span>
          </h2>

          <div className="pt-2 flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-zinc-400">
            <span>NORDIC BLACKCURRANT</span>
            <span className="text-purple-500/60">•</span>
            <span>GLACIAL CRANBERRY</span>
            <span className="text-purple-500/60">•</span>
            <span>DARK CREAM</span>
          </div>
        </div>

        {/* Central Flavor Explosion Visual */}
        <div ref={imageContainerRef} className="relative max-w-5xl mx-auto flex items-center justify-center">
          <div className="relative w-full flex justify-center items-center">
            <img
              ref={imgRef}
              src="/images/flavor-explosion.jpg"
              alt="BOO! Black Ice Cream Branded Packaging with Berry Explosion"
              className="w-full max-w-4xl lg:max-w-5xl h-auto object-contain will-change-transform drop-shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


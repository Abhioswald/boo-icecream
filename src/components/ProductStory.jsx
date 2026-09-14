import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductStory() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imgRef = useRef(null);
  const specRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    const img = imgRef.current;
    const spec = specRef.current;

    if (!section || !img || !textContainer) return;

    const ctx = gsap.context(() => {
      // Slow, deliberate text reveal
      gsap.fromTo(
        textContainer,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtle, heavy parallax on product image
      gsap.fromTo(
        img,
        { y: -25, scale: 0.95 },
        {
          y: 25,
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );

      // Subtle specs line reveal
      if (spec) {
        gsap.fromTo(
          spec,
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
      id="story"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white flex items-center py-32 sm:py-44 lg:py-52 overflow-hidden"
    >
      {/* Subtle deep ambient radial spotlight behind product */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-radial-[circle_at_center,_rgba(147,51,234,0.07)_0%,_transparent_70%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Minimal Editorial Story (5 cols) */}
          <div ref={textContainerRef} className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-purple-500/50" />
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-purple-400 font-medium">
                  01 // ORIGIN
                </span>
              </div>

              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9] text-white">
                BLACK<br />
                <span className="text-stroke-strong text-transparent">BY</span><br />
                <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  NATURE.
                </span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-sm">
              Crafted from 100% activated botanical coconut charcoal and slow-churned Alpine cream.
            </p>

            {/* Micro specs */}
            <div ref={specRef} className="pt-6 flex items-center gap-8 border-t border-zinc-900">
              <div>
                <span className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
                  CONE
                </span>
                <span className="text-xs font-semibold text-zinc-300 mt-1 block">
                  Charcoal Waffle
                </span>
              </div>
              <div className="w-[1px] h-8 bg-zinc-900" />
              <div>
                <span className="block text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
                  FLAVOR CORE
                </span>
                <span className="text-xs font-semibold text-zinc-300 mt-1 block">
                  Nordic Currant & Cranberry
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dominant BOO! Product Visual (7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full flex justify-center items-center">
              <img
                ref={imgRef}
                src="/images/product-hero.jpg"
                alt="BOO! Black Ice Cream Branded Horizontal Packaging and Charcoal Cone"
                className="w-full max-w-2xl lg:max-w-3xl h-auto object-contain will-change-transform drop-shadow-[0_25px_80px_rgba(0,0,0,0.98)]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextureSection() {
  const sectionRef = useRef(null);
  const bgTextRef = useRef(null);
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const imageCardRef = useRef(null);
  const specsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgText = bgTextRef.current;
    const header = headerRef.current;
    const img = imageRef.current;
    const card = imageCardRef.current;
    const specs = specsRef.current;

    if (!section || !img || !bgText) return;

    const ctx = gsap.context(() => {
      // Subdued background text horizontal parallax
      gsap.fromTo(
        bgText,
        { x: '8%' },
        {
          x: '-8%',
          ease: 'none',
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
            },
          }
        );
      }

      // Slow, deliberate zoom on the macro texture image
      gsap.fromTo(
        img,
        { scale: 1.1 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );

      // Card reveal
      gsap.fromTo(
        card,
        { opacity: 0, y: 45 },
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

      // Specs list reveal
      if (specs) {
        gsap.fromTo(
          specs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
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
      id="texture"
      ref={sectionRef}
      className="relative min-h-screen bg-[#050505] text-white py-32 sm:py-44 lg:py-52 overflow-hidden flex flex-col justify-center"
    >
      {/* Oversized background typography horizontal parallax */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] whitespace-nowrap pointer-events-none select-none z-0 opacity-[0.04]"
      >
        <span className="font-display font-black text-[16vw] leading-none tracking-tighter uppercase text-stroke-strong">
          CRUNCH IN THE DARK • CHARCOAL WAFFLE • VELVET MATTE • 
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        {/* Section Heading */}
        <div ref={headerRef} className="max-w-2xl mb-14 sm:mb-20 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
              03 // TACTILE
            </span>
          </div>
          
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.95]">
            CRUNCH<br />
            <span className="text-stroke-strong">IN THE</span><br />
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              DARK.
            </span>
          </h2>
        </div>

        {/* Macro Texture Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Macro Image Container */}
          <div
            ref={imageCardRef}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/[0.05] bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.98)]"
          >
            <div className="overflow-hidden aspect-[16/9]">
              <img
                ref={imageRef}
                src="/images/texture-macro.jpg"
                alt="Macro close-up of BOO! black charcoal waffle cone, ice cream texture, and wrapper edge"
                className="w-full h-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
            
            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Inset Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                100X MATTE CONE STRUCTURE
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                BOTANICAL CHARCOAL
              </span>
            </div>
          </div>

          {/* Right Tactile Specs */}
          <div ref={specsRef} className="lg:col-span-4 space-y-8">
            <div className="border-l border-purple-500/30 pl-6 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-purple-400 font-bold">
                01 // WAFFLE SNAP
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Charcoal-baked grid pattern delivering a crisp, acoustic snap with every bite.
              </p>
            </div>

            <div className="border-l border-zinc-700 pl-6 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-300 font-bold">
                02 // VELVET MATTE
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Slow-churned velvet black cream for a rich, dense mouthfeel.
              </p>
            </div>

            <div className="border-l border-zinc-700 pl-6 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-300 font-bold">
                03 // BERRY DRIZZLE
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Wild blackcurrant glaze giving a sharp shock against deep cocoa tones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


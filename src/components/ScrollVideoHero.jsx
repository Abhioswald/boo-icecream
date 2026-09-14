import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lightweight opacity calculator without layout thrashing
function calculateStage(p, startIn, fullIn, startOut, fullOut) {
  if (p < startIn || p > fullOut) return 0;
  if (p >= fullIn && p <= startOut) return 1;
  if (p < fullIn) return (p - startIn) / (fullIn - startIn);
  return 1 - (p - startOut) / (fullOut - startOut);
}

export default function ScrollVideoHero({ onOpenOrder }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const rafIdRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Direct performance refs
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const durationRef = useRef(0);
  const isHeroActiveRef = useRef(false);

  // Text and UI element refs (Direct GPU styling, zero React state overhead)
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const gaugeBarRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup video metadata & predecode first frame
    const setupVideo = () => {
      durationRef.current = video.duration || 1;
      if (durationRef.current > 0) {
        try {
          // Predecode first frame cleanly
          video.currentTime = 0.01;
        } catch {
          // Ignore seek initialization errors
        }
      }
    };

    video.pause();

    if (video.readyState >= 1) {
      setupVideo();
    } else {
      video.addEventListener('loadedmetadata', setupVideo, { once: true });
      video.addEventListener('loadeddata', setupVideo, { once: true });
    }

    // Single requestAnimationFrame seek interpolation loop
    const renderLoop = () => {
      if (isHeroActiveRef.current && durationRef.current > 0 && !prefersReducedMotion) {
        // Interpolate target time with 0.08 smoothing factor
        smoothTimeRef.current += (targetTimeRef.current - smoothTimeRef.current) * 0.08;

        const safeTime = Math.max(0, Math.min(smoothTimeRef.current, durationRef.current - 0.01));

        // Only assign video.currentTime if threshold > 0.025 to save CPU/GPU decode cycles
        if (Math.abs(video.currentTime - safeTime) > 0.025) {
          video.currentTime = safeTime;
        }
      }

      if (isHeroActiveRef.current && document.visibilityState === 'visible') {
        rafIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const startLoop = () => {
      if (!rafIdRef.current && !prefersReducedMotion && document.visibilityState === 'visible') {
        rafIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const stopLoop = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isHeroActiveRef.current) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Dynamic scroll distance per breakpoint (reduced on mobile for responsiveness)
    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? '+=300%' : '+=500%';

    // Single consolidated ScrollTrigger for all hero logic
    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: scrollDistance,
        pin: true,
        scrub: true,
        onToggle: (self) => {
          isHeroActiveRef.current = self.isActive;
          if (self.isActive) {
            startLoop();
          } else {
            stopLoop();
          }
        },
        onUpdate: (self) => {
          const progress = self.progress;

          // 1. Calculate target video time ONLY (no aggressive direct seeking)
          if (durationRef.current > 0) {
            targetTimeRef.current = progress * durationRef.current;
          }

          // 2. Direct progress gauge DOM update
          if (gaugeBarRef.current) {
            gaugeBarRef.current.style.width = `${Math.round(progress * 100)}%`;
          }

          // 3. Transform & Opacity only overlay updates (zero filter / blur overhead)
          // Stage 1: 0% - 20% (ENTER THE DARK)
          const op1 = calculateStage(progress, 0.0, 0.05, 0.15, 0.22);
          if (text1Ref.current) {
            text1Ref.current.style.opacity = op1.toFixed(3);
            text1Ref.current.style.transform = `translate3d(0, ${(1 - op1) * -20}px, 0)`;
            text1Ref.current.style.display = op1 > 0.005 ? 'block' : 'none';
          }

          // Stage 2: 20% - 40% (DARK FRUIT. COLD CREAM.)
          const op2 = calculateStage(progress, 0.20, 0.25, 0.35, 0.42);
          if (text2Ref.current) {
            text2Ref.current.style.opacity = op2.toFixed(3);
            text2Ref.current.style.transform = `translate3d(0, ${(1 - op2) * 20}px, 0)`;
            text2Ref.current.style.display = op2 > 0.005 ? 'block' : 'none';
          }

          // Stage 3: 40% - 72% (Strongest purple splash - 100% text-free)
          // Intentionally blank to let the visual dominate

          // Stage 4: 72% - 90% (DARK. BOLD. DELICIOUS.)
          const op4 = calculateStage(progress, 0.72, 0.76, 0.85, 0.90);
          if (text4Ref.current) {
            text4Ref.current.style.opacity = op4.toFixed(3);
            text4Ref.current.style.transform = `translate3d(0, ${(1 - op4) * 20}px, 0)`;
            text4Ref.current.style.display = op4 > 0.005 ? 'block' : 'none';
          }

          // Stage 5: 90% - 100% (READY TO TASTE THE DARK?)
          const op5 = calculateStage(progress, 0.89, 0.93, 1.0, 1.0);
          if (text5Ref.current) {
            text5Ref.current.style.opacity = op5.toFixed(3);
            text5Ref.current.style.transform = `translate3d(0, ${(1 - op5) * 20}px, 0)`;
            text5Ref.current.style.display = op5 > 0.005 ? 'block' : 'none';
          }

          // 4. Scroll indicator fade out (Opacity only)
          const indOpacity = Math.max(0, 1 - progress * 10);
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = indOpacity.toFixed(3);
            scrollIndicatorRef.current.style.transform = `translate3d(-50%, ${(1 - indOpacity) * 20}px, 0)`;
            scrollIndicatorRef.current.style.pointerEvents = indOpacity > 0.1 ? 'auto' : 'none';
          }
        },
      });
    }, container);

    // Reduced motion fallback
    if (prefersReducedMotion && video) {
      video.currentTime = 0.5;
    }

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      ctx.revert();
    };
  }, []);

  const handleManualExplore = () => {
    const nextSection = document.getElementById('story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          ref={videoRef}
          src="/assets/boo-scroll-ios.mp4"
          muted
          playsInline
          preload="auto"
          style={{ backgroundColor: '#050505' }}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
        />

        {/* Cinematic Vignette and Ambient Color Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-radial-[ellipse_at_center,_transparent_40%,_rgba(5,5,5,0.75)_100%]" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
        <div className="absolute top-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-b from-[#050505]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Interactive Floating Text Layers (GPU transform/opacity only) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none px-6 sm:px-12">
        {/* 0% - 20%: ENTER THE DARK */}
        <div
          ref={text1Ref}
          className="text-center max-w-4xl mx-auto space-y-4 will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <p className="text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-purple-300/90 font-medium">
              ENTER THE DARK
            </p>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase leading-[0.95]">
            NOT YOUR<br />
            <span className="text-stroke-strong hover:text-white transition-colors duration-500">ORDINARY</span><br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-purple-300 bg-clip-text text-transparent">
              ICE CREAM.
            </span>
          </h1>
        </div>

        {/* 20% - 40%: FLAVOR 01 */}
        <div
          ref={text2Ref}
          style={{ display: 'none', opacity: 0 }}
          className="text-center max-w-4xl mx-auto space-y-4 will-change-transform"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-purple-300 font-medium">
              BLACKCURRANT + CRANBERRY
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl tracking-tight text-white uppercase leading-[1.0]">
            DARK FRUIT.<br />
            <span className="text-purple-400">COLD CREAM.</span>
          </h2>
        </div>

        {/* 40% - 72%: PURPLE SPLASH PEAK MOMENT - Text removed so visual fills viewport */}
        <div
          ref={text3Ref}
          style={{ display: 'none', opacity: 0 }}
          className="hidden pointer-events-none"
        />

        {/* 72% - 90%: DARK. BOLD. DELICIOUS. */}
        <div
          ref={text4Ref}
          style={{ display: 'none', opacity: 0 }}
          className="text-center max-w-4xl mx-auto space-y-3 will-change-transform"
        >
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-white uppercase leading-[0.95]">
            DARK.<br />
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              BOLD.
            </span><br />
            DELICIOUS.
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-zinc-400">
            NATURAL COCONUT CHARCOAL + COLD-CHURNED CREAM
          </p>
        </div>

        {/* 90% - 100%: READY TO TASTE THE DARK? */}
        <div
          ref={text5Ref}
          style={{ display: 'none', opacity: 0 }}
          className="text-center max-w-3xl mx-auto space-y-6 will-change-transform pointer-events-auto"
        >
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-purple-400">
              LIMITED ARTISAN DROP
            </p>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl tracking-tight text-white uppercase leading-[1.0]">
              READY TO<br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-transparent">
                TASTE THE DARK?
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleManualExplore}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-display font-black text-xs tracking-[0.25em] uppercase rounded-full hover:bg-purple-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              EXPLORE BOO!
            </button>
            <button
              onClick={onOpenOrder}
              className="w-full sm:w-auto px-8 py-4 glass-card text-white font-display font-bold text-xs tracking-[0.25em] uppercase rounded-full hover:border-purple-500/50 hover:bg-purple-950/40 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              PRE-ORDER $8.50
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{ transform: 'translate3d(-50%, 0, 0)' }}
        className="absolute bottom-8 left-1/2 z-20 flex flex-col items-center gap-3 transition-opacity duration-300 pointer-events-none will-change-transform"
      >
        <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-zinc-400">
          SCROLL TO DISCOVER
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-purple-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Minimal Scroll Progress Gauge (Bottom Right) */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-20 items-center gap-3 font-mono text-[10px] tracking-widest text-zinc-500">
        <span>00</span>
        <div className="w-16 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div
            ref={gaugeBarRef}
            className="h-full w-0 bg-purple-500 transition-all duration-75"
          />
        </div>
        <span>100</span>
      </div>
    </section>
  );
}

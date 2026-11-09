import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let lenis = null;
const listeners = new Set();

export function initScroll() {
  const reduced = prefersReducedMotion();
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: !reduced,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', (instance) => {
    ScrollTrigger.update();
    listeners.forEach((fn) => fn(instance));
  });

  const raf = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onScroll(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function scrollTo(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (lenis) {
    lenis.scrollTo(el ?? target, { duration: prefersReducedMotion() ? 0 : 1.6, ...options });
  } else if (el?.scrollIntoView) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}

export function lockScroll(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

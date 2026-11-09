import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { onScroll } from '../../lib/scroll';

// Infinite marquee whose speed follows scroll velocity and whose direction
// flips with scroll direction.
export default function Marquee({ items, reverse = false, speed = 60, className = '' }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    let x = 0;
    let boost = 0;
    let direction = reverse ? 1 : -1;
    let hovering = false;
    let half = track.scrollWidth / 2;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    const offScroll = onScroll((lenis) => {
      boost = Math.min(Math.abs(lenis.velocity) * 12, 900);
      if (lenis.direction) direction = (reverse ? 1 : -1) * lenis.direction;
    });
    const enter = () => (hovering = true);
    const leave = () => (hovering = false);
    track.addEventListener('pointerenter', enter);
    track.addEventListener('pointerleave', leave);
    window.addEventListener('resize', measure);

    const tick = (_time, deltaMs) => {
      const dt = deltaMs / 1000;
      boost *= Math.exp(-dt * 3);
      const v = (speed + boost) * (hovering ? 0.25 : 1);
      x += v * direction * dt;
      if (half > 0) x = gsap.utils.wrap(-half, 0, x);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      offScroll();
      track.removeEventListener('pointerenter', enter);
      track.removeEventListener('pointerleave', leave);
      window.removeEventListener('resize', measure);
    };
  }, [reverse, speed]);

  const run = (copy) =>
    items.map((item, i) => (
      <span className="marquee__item" key={`${copy}-${i}`} aria-hidden={copy > 0 || undefined}>
        <span className={i % 2 ? 'marquee__word marquee__word--outline' : 'marquee__word'}>{item}</span>
        <span className="marquee__sep" aria-hidden="true">
          ✳
        </span>
      </span>
    ));

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" ref={trackRef}>
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}

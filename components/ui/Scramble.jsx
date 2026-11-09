import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/<>';

// Scrambles its text when the closest link or button is hovered or focused.
export default function Scramble({ text, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest('a, button') ?? el?.parentElement;
    if (!el || !host || prefersReducedMotion()) return;
    let frame = 0;
    let raf = 0;

    const run = () => {
      cancelAnimationFrame(raf);
      frame = 0;
      const total = text.length * 3;
      const step = () => {
        frame++;
        const revealed = Math.floor((frame / total) * text.length);
        el.textContent = text
          .split('')
          .map((ch, i) => (ch === ' ' || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('');
        if (frame < total) raf = requestAnimationFrame(step);
        else el.textContent = text;
      };
      raf = requestAnimationFrame(step);
    };

    host.addEventListener('pointerenter', run);
    host.addEventListener('focus', run);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener('pointerenter', run);
      host.removeEventListener('focus', run);
    };
  }, [text]);

  return (
    <>
      <span ref={ref} className={`scramble ${className}`} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}

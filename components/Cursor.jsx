import { useEffect, useRef, useState } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/motion';

// Elements opt into a labelled cursor with `data-cursor="Label"`.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState({ mode: 'idle', label: '' });

  useEffect(() => setEnabled(hasFinePointer()), []);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const reduced = prefersReducedMotion();
    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: reduced ? 0.08 : 0.5, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: reduced ? 0.08 : 0.5, ease: 'power3' });
    let visible = false;

    const move = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        root.classList.add('cursor-visible');
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    let current = 'idle|';
    const set = (mode, label = '') => {
      const key = `${mode}|${label}`;
      if (key === current) return;
      current = key;
      setState({ mode, label });
    };

    const over = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest('[data-cursor]');
      if (labelled) set('label', labelled.getAttribute('data-cursor'));
      else if (target?.closest('input, textarea, select')) set('text');
      else if (target?.closest('a, button, [role="button"], label')) set('hover');
      else set('idle');
    };

    const down = () => root.classList.add('cursor-down');
    const up = () => root.classList.remove('cursor-down');
    const leave = () => {
      visible = false;
      root.classList.remove('cursor-visible');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('pointerleave', leave);

    return () => {
      root.classList.remove('has-cursor', 'cursor-visible', 'cursor-down');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`cursor cursor--${state.mode}`} aria-hidden="true">
      <div className="cursor__anchor" ref={ringRef}>
        <span className="cursor__ring" />
        <span className="cursor__label">{state.label}</span>
      </div>
      <div className="cursor__anchor" ref={dotRef}>
        <span className="cursor__dot" />
      </div>
    </div>
  );
}

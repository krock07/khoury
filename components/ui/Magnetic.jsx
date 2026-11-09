import { useEffect, useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/motion';

export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const inner = el.firstElementChild;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      if (inner) gsap.to(inner, { x: dx * strength * 0.4, y: dy * strength * 0.4, duration: 0.6, ease: 'power3.out' });
    };
    const leave = () => {
      gsap.to([el, inner].filter(Boolean), { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.35)' });
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.killTweensOf([el, inner].filter(Boolean));
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}

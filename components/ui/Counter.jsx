import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';

const format = (n) => Math.round(n).toLocaleString('en-US');

export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      const state = { v: 0 };
      el.textContent = format(0);
      gsap.to(state, {
        v: value,
        duration: 2.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = format(state.v);
        },
      });
    },
    { dependencies: [value] }
  );

  return (
    <span className="counter">
      <span ref={ref}>{format(value)}</span>
      <span className="counter__suffix">{suffix}</span>
    </span>
  );
}

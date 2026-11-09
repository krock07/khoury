import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { profile, projects } from '../data/content';

const PRELOAD = projects.map((p) => p.image);

const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const counter = { v: 0 };
      let cancelled = false;
      const render = () => {
        countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
        barRef.current.style.transform = `scaleX(${counter.v / 100})`;
      };

      gsap.from('.preloader__reveal', { yPercent: 110, stagger: 0.06, duration: 1, ease: 'expo.out' });
      const fill = gsap.to(counter, { v: 86, duration: reduced ? 0.2 : 1.7, ease: 'power3.inOut', onUpdate: render });
      const assets = Promise.race([Promise.all([document.fonts.ready, ...PRELOAD.map(loadImage)]), wait(4500)]);

      Promise.all([assets, fill.then()]).then(() => {
        if (cancelled) return;
        gsap
          .timeline({ onComplete: onDone })
          .to(counter, { v: 100, duration: reduced ? 0.1 : 0.55, ease: 'power2.out', onUpdate: render })
          .to('.preloader__reveal', { yPercent: -110, stagger: 0.04, duration: 0.7, ease: 'expo.in' }, '+=0.1')
          .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: reduced ? 0.3 : 1.1, ease: 'expo.inOut' }, '-=0.25')
          .add(onReveal, '-=0.8');
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: root }
  );

  return (
    <div className="preloader" ref={root} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="preloader__row">
        <span className="mask">
          <span className="preloader__reveal mono">{profile.name}</span>
        </span>
        <span className="mask">
          <span className="preloader__reveal mono">Portfolio ©{new Date().getFullYear()}</span>
        </span>
      </div>

      <div className="preloader__center">
        <span className="mask">
          <span className="preloader__reveal preloader__count">
            <span ref={countRef}>000</span>
            <sup>%</sup>
          </span>
        </span>
      </div>

      <div className="preloader__row">
        <span className="mask">
          <span className="preloader__reveal mono">{profile.role}</span>
        </span>
        <span className="mask">
          <span className="preloader__reveal mono">{profile.location}</span>
        </span>
      </div>
      <span className="preloader__bar" ref={barRef} />
    </div>
  );
}

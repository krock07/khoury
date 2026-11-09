import { useEffect, useRef } from 'react';
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/motion';
import { scrollTo } from '../lib/scroll';
import { experience, profile } from '../data/content';

const Chars = ({ word }) => (
  <span className="hero__word">
    {word.split('').map((ch, i) => (
      <span className="hero__char-mask" key={i}>
        <span className="hero__char">{ch}</span>
      </span>
    ))}
  </span>
);

export default function Hero({ revealed }) {
  const root = useRef(null);
  const intro = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      tl.from('.hero__char', { yPercent: 115, rotate: 6, duration: 1.6, stagger: 0.045 })
        .from('.hero__fade', { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.08 }, 0.5)
        .from('.hero__rule', { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'expo.inOut' }, 0.3);
      if (reduced) tl.progress(1);
      intro.current = tl;

      if (!reduced) {
        gsap.to('.hero__line--first', {
          xPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__line--second', {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__inner', {
          yPercent: 18,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    },
    { scope: root }
  );

  useEffect(() => {
    if (revealed) intro.current?.play();
  }, [revealed]);

  // Letters thin out as the cursor approaches, via the variable weight axis.
  useEffect(() => {
    const el = root.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;
    const chars = Array.from(el.querySelectorAll('.hero__char'));
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        chars.forEach((c) => {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          const t = Math.max(0, 1 - d / 320);
          c.style.fontWeight = String(Math.round(720 - t * 520));
        });
      });
    };
    const leave = () => chars.forEach((c) => (c.style.fontWeight = ''));
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  const current = experience[0];

  return (
    <section id="top" className="hero" data-scene="top" ref={root} tabIndex={-1} aria-label="Introduction">
      <div className="hero__inner container">
        <div className="hero__meta">
          <p className="hero__fade mono">Welcome — I&rsquo;m Khoury · {profile.coordinates}</p>
          <p className="hero__fade mono hero__current">
            <span className="pulse" aria-hidden="true" />
            Currently — {current.title} @ {current.company}
          </p>
        </div>

        <h1 id="hero-title" className="hero__title" aria-label={profile.name}>
          <span className="hero__line hero__line--first" aria-hidden="true">
            <Chars word={profile.firstName} />
          </span>
          <span className="hero__line hero__line--second" aria-hidden="true">
            <span className="hero__role hero__fade">
              Tech Lead
              <br />
              <em>Frontend</em> Engineer
            </span>
            <Chars word={profile.lastName} />
          </span>
        </h1>
        <p className="sr-only">{profile.role}</p>

        <span className="hero__rule" aria-hidden="true" />

        <div className="hero__bottom">
          <p className="hero__intro hero__fade">
            <strong>{profile.disciplines}</strong> {profile.tagline} I build fast, considered interfaces — and
            I&rsquo;m probably the fastest developer you&rsquo;ll ever meet.
          </p>
          <dl className="hero__facts hero__fade mono">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Raised in</dt>
              <dd>Dade County, FL</dd>
            </div>
          </dl>
          <button type="button" className="hero__scroll hero__fade mono" onClick={() => scrollTo('#work')}>
            Scroll to explore
            <span className="hero__scroll-track" aria-hidden="true">
              <span />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/motion';
import { projects } from '../data/content';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';

const featured = projects.filter((p) => p.featured);
const FILTERS = ['All', 'Development', 'Design'];
const pad = (n) => String(n).padStart(2, '0');

function FeaturedCards() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray('.work-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card.querySelector('.work-card__media img'),
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
        const next = cards[i + 1];
        if (next) {
          gsap.fromTo(
            card.querySelector('.work-card__surface'),
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.9,
              filter: 'brightness(0.35)',
              ease: 'none',
              scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 12%', scrub: true },
            }
          );
        }
      });
    },
    { scope: root }
  );

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return undefined;
    const surfaces = Array.from(root.current.querySelectorAll('.work-card__surface'));
    const cleanups = surfaces.map((el) => {
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
        ry(((e.clientX - r.left) / r.width - 0.5) * 7);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="work__stack" ref={root}>
      {featured.map((p, i) => (
        <article className="work-card" key={p.title} style={{ '--i': i }}>
          <div className="work-card__surface">
            <a className="work-card__tilt" href={p.url} target="_blank" rel="noreferrer" data-cursor="Visit ↗">
              <div className="work-card__media">
                <Image src={p.image} alt={`${p.title} website`} fill sizes="(min-width: 1000px) 62vw, 100vw" />
              </div>
              <div className="work-card__info">
                <p className="mono work-card__count">
                  Featured {pad(i + 1)} / {pad(featured.length)}
                </p>
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__desc">{p.summary}</p>
                <ul className="tags">
                  {p.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="work-card__cta mono">
                  {p.domain} <span aria-hidden="true">↗</span>
                </span>
              </div>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function Archive() {
  const root = useRef(null);
  const previewRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(-1);
  const visible = projects.filter((p) => filter === 'All' || p.kind === filter);
  const count = (f) => (f === 'All' ? projects.length : projects.filter((p) => p.kind === f).length);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.archive__list > li', { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: 'expo.out' });
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true }
  );

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !hasFinePointer()) return undefined;
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.7, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.7, ease: 'power3' });
    const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.9, ease: 'power3' });
    let lastX = null;
    let settle;
    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (lastX !== null) rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
      clearTimeout(settle);
      settle = setTimeout(() => rTo(0), 90);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      clearTimeout(settle);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <div className="archive" ref={root} onPointerLeave={() => setActive(-1)}>
      <div className="archive__head">
        <h3 className="archive__title">
          Index <sup className="mono">({pad(projects.length)})</sup>
        </h3>
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`filters__btn ${filter === f ? 'is-active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <sup className="mono">{count(f)}</sup>
            </button>
          ))}
        </div>
      </div>

      <ul className="archive__list">
        {visible.map((p) => {
          const index = projects.indexOf(p);
          return (
            <li key={p.title}>
              <a
                className={`archive__row ${active === index ? 'is-hovered' : ''}`}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                data-cursor={p.kind === 'Design' ? 'Figma ↗' : 'Visit ↗'}
                onPointerEnter={() => setActive(index)}
              >
                <span className="archive__index mono">{pad(index + 1)}</span>
                <span className="archive__name">{p.title}</span>
                <span className="archive__kind">{p.kind}</span>
                <span className="archive__stack mono">{p.stack.join(' · ')}</span>
                <span className="archive__arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="archive__thumb" aria-hidden="true">
                  <Image src={p.image} alt="" fill sizes="40vw" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className={`archive__preview ${active >= 0 ? 'is-visible' : ''}`} ref={previewRef} aria-hidden="true">
        <div className="archive__preview-frame">
          <div className="archive__preview-strip" style={{ transform: `translateY(${-Math.max(active, 0) * 100}%)` }}>
            {projects.map((p) => (
              <div className="archive__preview-item" key={p.title}>
                <Image src={p.image} alt="" fill sizes="420px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="section work container" data-scene="work" tabIndex={-1} aria-labelledby="work-title">
      <SectionLabel index="01">Selected work</SectionLabel>
      <div className="section-head">
        <RevealText as="h2" id="work-title" className="display">
          Things I&rsquo;ve <em>shipped</em>.
        </RevealText>
        <RevealText as="p" className="section-head__aside" delay={0.15}>
          Live products, client sites and Figma design systems. Hover to tilt, click to visit.
        </RevealText>
      </div>
      <FeaturedCards />
      <Archive />
    </section>
  );
}

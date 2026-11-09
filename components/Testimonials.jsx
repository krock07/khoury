import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from '../lib/motion';
import { testimonials } from '../data/content';
import SectionLabel from './ui/SectionLabel';

const DURATION = 7;

export default function Testimonials() {
  const root = useRef(null);
  const quoteRef = useRef(null);
  const barRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const item = testimonials[index];
  const count = testimonials.length;

  const go = (dir) => setIndex((i) => (i + dir + count) % count);

  useEffect(() => {
    const t = ScrollTrigger.create({
      trigger: root.current,
      start: 'top 70%',
      end: 'bottom 30%',
      onToggle: (self) => setInView(self.isActive),
    });
    return () => t.kill();
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(quoteRef.current, { type: 'lines,words', mask: 'lines' });
      gsap.from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.018, ease: 'expo.out' });
      gsap.from('.quote__author', { autoAlpha: 0, y: 16, duration: 1, delay: 0.25 });
      return () => split.revert();
    },
    { scope: root, dependencies: [index], revertOnUpdate: true }
  );

  useEffect(() => {
    const bar = barRef.current;
    const autoplay = inView && !paused && !prefersReducedMotion();
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: DURATION, ease: 'none', paused: !autoplay, onComplete: () => go(1) }
    );
    return () => tween.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, inView, paused]);

  return (
    <section
      id="testimonials"
      className="section quotes container"
      data-scene="testimonials"
      ref={root}
      tabIndex={-1}
      aria-labelledby="quotes-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SectionLabel index="06">Kind words</SectionLabel>
      <h2 id="quotes-title" className="sr-only">
        Client testimonials
      </h2>

      <figure className="quote" aria-live="polite">
        <span className="quote__mark" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="quote__text" ref={quoteRef} key={index}>
          {item.quote}
        </blockquote>
        <figcaption className="quote__author">
          <span className="quote__name">{item.author}</span>
          <span className="mono">{item.context}</span>
        </figcaption>
      </figure>

      <div className="quote__controls">
        <p className="mono quote__count">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <span className="quote__progress" aria-hidden="true">
          <span ref={barRef} />
        </span>
        <div className="quote__buttons">
          <button type="button" className="round-btn" onClick={() => go(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <button type="button" className="round-btn" onClick={() => go(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

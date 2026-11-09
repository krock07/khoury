import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { experience } from '../data/content';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';

export default function Experience() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.xp__item', {
        y: 60,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.3,
        scrollTrigger: { trigger: '.xp', start: 'top 85%', once: true },
      });
    },
    { scope: root }
  );

  const toggle = (i) => setOpen((current) => (current === i ? -1 : i));

  return (
    <section id="experience" className="section experience container" data-scene="experience" ref={root} tabIndex={-1} aria-labelledby="xp-title">
      <SectionLabel index="03">Experience</SectionLabel>
      <div className="section-head">
        <RevealText as="h2" id="xp-title" className="display">
          Where I&rsquo;ve <em>led</em> and built.
        </RevealText>
        <RevealText as="p" className="section-head__aside" delay={0.15}>
          Across startups, platforms and education — from shipping features to leading frontend architecture.
        </RevealText>
      </div>

      <ol className="xp">
        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <li className={`xp__item ${isOpen ? 'is-open' : ''}`} key={job.company}>
              <h3 className="xp__heading">
                <button
                  type="button"
                  className="xp__row"
                  id={`xp-row-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`xp-panel-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="xp__index mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="xp__company">{job.company}</span>
                  <span className="xp__title">{job.title}</span>
                  <span className="xp__years mono">
                    {job.start} — {job.end}
                  </span>
                  <span className="xp__icon" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="xp__panel"
                id={`xp-panel-${i}`}
                role="region"
                aria-labelledby={`xp-row-${i}`}
                inert={!isOpen ? true : undefined}
              >
                <div className="xp__panel-inner">
                  <div className="xp__panel-grid">
                    <p className="xp__summary">{job.summary}</p>
                    <ul className="xp__highlights">
                      {job.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div className="xp__foot">
                      <ul className="tags" aria-label="Stack">
                        {job.stack.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <p className="mono xp__period">{job.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

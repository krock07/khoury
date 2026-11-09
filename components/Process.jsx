import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/motion';
import { principles, process } from '../data/content';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';

const pad = (n) => String(n).padStart(2, '0');

export default function Process() {
  const root = useRef(null);
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray('.steps__item');
      steps.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setStep(i),
        });
      });

      if (prefersReducedMotion()) return;
      gsap.from('.principle', {
        y: 60,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.3,
        scrollTrigger: { trigger: '.principles', start: 'top 85%', once: true },
      });
      gsap.fromTo(
        '.steps__progress-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.steps__track', start: 'top 55%', end: 'bottom 55%', scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="process" className="section process container" data-scene="process" ref={root} tabIndex={-1} aria-labelledby="process-title">
      <SectionLabel index="04">Process</SectionLabel>

      <div className="principles">
        {principles.map((p, i) => (
          <article className="principle" key={p.title}>
            <p className="mono principle__eyebrow">
              <span>{pad(i + 1)}</span> {p.eyebrow}
            </p>
            <h3 className="principle__title">{p.title}</h3>
            <p className="principle__body">{p.body}</p>
          </article>
        ))}
      </div>

      <div className="steps">
        <div className="steps__aside">
          <RevealText as="h2" id="process-title" className="display">
            From first call to <em>launch</em>.
          </RevealText>
          <p className="steps__counter mono" aria-hidden="true">
            <span className="steps__counter-current">{pad(step + 1)}</span>
            <span className="steps__counter-total"> / {pad(process.length)}</span>
          </p>
          <p className="steps__current" aria-hidden="true">
            {process[step].title}
          </p>
        </div>

        <div className="steps__track">
          <span className="steps__progress" aria-hidden="true">
            <span className="steps__progress-fill" />
          </span>
          <ol className="steps__list">
            {process.map((s, i) => (
              <li className={`steps__item ${i === step ? 'is-active' : ''} ${i < step ? 'is-past' : ''}`} key={s.title}>
                <span className="steps__dot" aria-hidden="true" />
                <span className="mono steps__index">Step {pad(i + 1)}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p className="steps__body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

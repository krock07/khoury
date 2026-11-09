import { useRef } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/motion';
import { bio, manifesto, offTheClock, profile, stats } from '../data/content';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';
import Counter from './ui/Counter';
import Magnetic from './ui/Magnetic';

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      SplitText.create('.about__manifesto', {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: '.about__manifesto', start: 'top 80%', end: 'bottom 50%', scrub: true },
            }
          ),
      });

      gsap.from('.about__list li, .stat', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.07,
        duration: 1.2,
        scrollTrigger: { trigger: '.about__list', start: 'top 90%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section id="about" className="section about container" data-scene="about" ref={root} tabIndex={-1} aria-labelledby="about-title">
      <SectionLabel index="02">About</SectionLabel>
      <h2 id="about-title" className="sr-only">
        About Khoury
      </h2>
      <p className="about__manifesto">{manifesto}</p>

      <div className="about__grid">
        <div className="about__body">
          {bio.map((para) => (
            <RevealText as="p" className="about__bio" key={para.slice(0, 16)}>
              {para}
            </RevealText>
          ))}

          <Magnetic>
            <a className="button" href={profile.resume} download>
              <span className="button__label">Download résumé</span>
              <span className="button__icon" aria-hidden="true">
                ↓
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="about__aside">
          <h3 className="about__subhead mono">Off the clock</h3>
          <ul className="about__list">
            {offTheClock.map((item) => (
              <li key={item.label}>
                <span className="about__list-label">{item.label}</span>
                <span className="about__list-detail">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="stats" aria-label="Impact in numbers">
        {stats.map((s) => (
          <li className="stat" key={s.label}>
            <span className="stat__value">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="stat__label">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

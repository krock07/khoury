import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { capabilities, education, marqueeWords, services } from '../data/content';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';
import Marquee from './ui/Marquee';

const pad = (n) => String(n).padStart(2, '0');

// Pointer position feeds the card's radial spotlight through CSS custom properties.
const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.service', {
        y: 60,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.3,
        scrollTrigger: { trigger: '.services__grid', start: 'top 85%', once: true },
      });
      gsap.from('.caps__group', {
        y: 50,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 1.2,
        scrollTrigger: { trigger: '.caps__grid', start: 'top 85%', once: true },
      });
      gsap.from('.edu__row', {
        y: 30,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: '.edu', start: 'top 88%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section id="services" className="section services" data-scene="services" ref={root} tabIndex={-1} aria-labelledby="services-title">
      <div className="container">
        <SectionLabel index="05">Services</SectionLabel>
        <div className="section-head">
          <RevealText as="h2" id="services-title" className="display">
            Built for <em>speed</em>, made to last.
          </RevealText>
          <RevealText as="p" className="section-head__aside" delay={0.15}>
            A designer&rsquo;s eye with an engineer&rsquo;s discipline — what I can do for you, and the tools I reach for every day.
          </RevealText>
        </div>

        <ul className="services__grid">
          {services.map((s, i) => (
            <li className="service" key={s.title} onPointerMove={spotlight}>
              <span className="mono service__index">{pad(i + 1)}</span>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__body">{s.body}</p>
              <span className="service__glyph" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="caps__marquees" aria-hidden="true">
        <Marquee items={marqueeWords} />
        <Marquee items={[...marqueeWords].reverse()} reverse speed={45} className="marquee--small" />
      </div>

      <div className="container">
        <div className="caps__grid">
          {capabilities.map((c, i) => (
            <div className="caps__group" key={c.group}>
              <h3 className="caps__title">
                <span className="mono">{pad(i + 1)}</span>
                {c.group}
              </h3>
              <ul>
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="edu">
          <h3 className="edu__heading mono">Education</h3>
          <ul>
            {education.map((e) => (
              <li className="edu__row" key={e.school}>
                <span className="edu__school">{e.school}</span>
                <span className="edu__degree">{e.degree}</span>
                <span className="edu__year mono">{e.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

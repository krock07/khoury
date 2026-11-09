import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { faqs } from '../data/content';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';

const TOPICS = Object.keys(faqs);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function Faq() {
  const root = useRef(null);
  const tabRefs = useRef([]);
  const [topic, setTopic] = useState(0);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.faq__item', { y: 30, autoAlpha: 0, stagger: 0.07, duration: 0.9 });
    },
    { scope: root, dependencies: [topic], revertOnUpdate: true }
  );

  const choose = (i) => {
    setTopic(i);
    setOpen(0);
  };

  // Roving tabindex: arrows move between tabs, Home/End jump to the ends.
  const onTabKey = (e) => {
    const last = TOPICS.length - 1;
    const next = { ArrowRight: topic + 1, ArrowLeft: topic - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + TOPICS.length) % TOPICS.length;
    choose(i);
    tabRefs.current[i]?.focus();
  };

  const items = faqs[TOPICS[topic]];
  const panelId = `faq-panel-${slug(TOPICS[topic])}`;

  return (
    <section id="faq" className="section faq container" data-scene="faq" ref={root} tabIndex={-1} aria-labelledby="faq-title">
      <SectionLabel index="07">FAQ</SectionLabel>
      <div className="faq__layout">
        <div className="faq__aside">
          <RevealText as="h2" id="faq-title" className="display">
            Questions, <em>answered</em>.
          </RevealText>
          <div className="faq__tabs" role="tablist" aria-label="FAQ topics">
            {TOPICS.map((t, i) => (
              <button
                key={t}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`faq-tab-${slug(t)}`}
                aria-selected={i === topic}
                aria-controls={`faq-panel-${slug(t)}`}
                tabIndex={i === topic ? 0 : -1}
                className={`faq__tab ${i === topic ? 'is-active' : ''}`}
                onClick={() => choose(i)}
                onKeyDown={onTabKey}
              >
                {t}
                <sup className="mono">{faqs[t].length}</sup>
              </button>
            ))}
          </div>
        </div>

        <div className="faq__panel" role="tabpanel" id={panelId} aria-labelledby={`faq-tab-${slug(TOPICS[topic])}`}>
          <ul className="faq__list">
            {items.map((f, i) => {
              const isOpen = open === i;
              const id = `${panelId}-${i}`;
              return (
                <li className={`faq__item ${isOpen ? 'is-open' : ''}`} key={f.question}>
                  <h3 className="faq__heading">
                    <button
                      type="button"
                      className="faq__question"
                      id={`${id}-q`}
                      aria-expanded={isOpen}
                      aria-controls={`${id}-a`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      <span>{f.question}</span>
                      <span className="xp__icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq__answer" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!isOpen ? true : undefined}>
                    <div className="faq__answer-inner">
                      <p>{f.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion';
import { scrollTo } from '../lib/scroll';
import { profile } from '../data/content';
import useClock from '../hooks/useClock';
import SectionLabel from './ui/SectionLabel';
import RevealText from './ui/RevealText';
import Magnetic from './ui/Magnetic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const QUESTIONS = [
  {
    key: 'email',
    text: 'To start, could you give me',
    postfix: 'your email?',
    type: 'email',
    autoComplete: 'email',
    check: (v) => (EMAIL_RE.test(v) ? '' : "That doesn't look like an email — try again."),
  },
  {
    key: 'name',
    text: "Awesome! And what's",
    postfix: 'your name?',
    type: 'text',
    autoComplete: 'name',
    check: (v) => (v ? '' : 'I need something to call you.'),
  },
  {
    key: 'project',
    text: 'Perfect, and',
    postfix: 'how can I help you?',
    type: 'text',
    autoComplete: 'off',
    check: (v) => (v.length >= 10 ? '' : 'A little more detail, please (10+ characters).'),
  },
];

function Terminal() {
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const current = QUESTIONS.find((q) => answers[q.key] === undefined);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [answers, error, sent, text]);

  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  const submitLine = (e) => {
    e.preventDefault();
    const value = text.trim();
    const problem = current.check(value);
    setError(problem);
    if (problem) return;
    setAnswers((a) => ({ ...a, [current.key]: value }));
    setText('');
  };

  const restart = () => {
    setAnswers({});
    setText('');
    setError('');
    setSent(false);
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  };

  const send = () => {
    const subject = `Project inquiry from ${answers.name}`;
    const body = `${answers.project}\n\n— ${answers.name} (${answers.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="terminal" onClick={focusInput}>
      <div className="terminal__bar">
        <span className="terminal__lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mono terminal__host">khoury@atl: ~/contact</span>
      </div>

      <div className="terminal__body mono" ref={bodyRef} data-lenis-prevent>
        <div aria-live="polite">
          <p>Hey there! I&rsquo;m excited to link 🔗</p>
          <p className="terminal__rule" aria-hidden="true" />

          {QUESTIONS.filter((q) => answers[q.key] !== undefined).map((q) => (
            <div className="terminal__qa" key={q.key}>
              <p>
                {q.text} <span className="terminal__accent">{q.postfix}</span>
              </p>
              <p className="terminal__ok">
                <span aria-hidden="true">✓ </span>
                {answers[q.key]}
              </p>
            </div>
          ))}

          {current && (
            <p>
              {current.text} <span className="terminal__accent">{current.postfix}</span>
            </p>
          )}
          {error && (
            <p className="terminal__error" role="alert">
              <span aria-hidden="true">✗ </span>
              {error}
            </p>
          )}

          {!current && (
            <div className="terminal__summary">
              <p>Beautiful! Here&rsquo;s what I&rsquo;ve got:</p>
              {QUESTIONS.map((q) => (
                <p key={q.key}>
                  <span className="terminal__key">{q.key}:</span> {answers[q.key]}
                </p>
              ))}
              {sent ? (
                <p className="terminal__ok">
                  ✓ Your mail app should be open with everything filled in. Nothing opened? Write to{' '}
                  <a className="link" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  .
                </p>
              ) : (
                <p>Look good?</p>
              )}
            </div>
          )}
        </div>

        {current ? (
          <form className="terminal__line" onSubmit={submitLine} noValidate>
            <label htmlFor="terminal-input">
              <span className="terminal__prompt" aria-hidden="true">
                ➜ <span>~</span>
              </span>
              <span className="terminal__hint">Enter {current.key}:</span>
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              className="terminal__input"
              type={current.type}
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete={current.autoComplete}
              spellCheck={current.key === 'project'}
              aria-invalid={Boolean(error)}
              enterKeyHint={current.key === 'project' ? 'done' : 'next'}
            />
          </form>
        ) : (
          <div className="terminal__actions">
            <button type="button" className="button" onClick={restart}>
              <span className="button__label">Restart</span>
            </button>
            <button type="button" className="button button--solid" onClick={send}>
              <span className="button__label">{sent ? 'Open again' : 'Send it'}</span>
              <span className="button__icon" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);
  const time = useClock(profile.timeZone);
  const year = new Date().getFullYear();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.contact__details > *, .terminal', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 1.2,
        scrollTrigger: { trigger: '.contact__grid', start: 'top 85%', once: true },
      });
      gsap.from('.footer__wordmark .footer__char', {
        yPercent: 100,
        stagger: 0.025,
        duration: 1.4,
        scrollTrigger: { trigger: '.footer__wordmark', start: 'top 95%', once: true },
      });
    },
    { scope: root }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact" ref={root} tabIndex={-1} aria-labelledby="contact-title">
      <div className="container" data-scene="contact">
        <SectionLabel index="08">Contact</SectionLabel>
        <h2 id="contact-title" className="contact__title">
          <RevealText as="span" className="contact__title-line">
            Let&rsquo;s build
          </RevealText>
          <RevealText as="span" className="contact__title-line contact__title-line--indent" delay={0.1}>
            something <em>fast.</em>
          </RevealText>
        </h2>

        <div className="contact__grid">
          <dl className="contact__details">
            <div>
              <dt className="mono">Email</dt>
              <dd>
                <button type="button" className="copy" onClick={copyEmail}>
                  <span>{profile.email}</span>
                  <span className="copy__hint mono" aria-live="polite">
                    {copied ? 'Copied ✓' : 'Copy'}
                  </span>
                </button>
              </dd>
            </div>
            <div>
              <dt className="mono">Phone</dt>
              <dd>
                <a className="link" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="mono">Elsewhere</dt>
              <dd className="contact__social">
                {profile.social.map((s) => (
                  <a className="link" key={s.name} href={s.url} target="_blank" rel="noreferrer">
                    {s.name} <span aria-hidden="true">↗</span>
                  </a>
                ))}
                <a className="link" href={profile.resume} download>
                  Résumé <span aria-hidden="true">↓</span>
                </a>
              </dd>
            </div>
          </dl>

          <Terminal />
        </div>
      </div>

      <footer className="footer" data-scene="footer">
        <div className="container footer__inner">
          <div className="footer__row">
            <p className="mono">
              © {year} {profile.name}
            </p>
            <p className="mono">All credit goes to my Lord and my savior Jesus Christ</p>
            <p className="mono">{profile.origin}</p>
            <p className="mono">
              ATL <span className="nav__clock">{time}</span>
            </p>
            <Magnetic strength={0.3}>
              <button type="button" className="mono link footer__top" onClick={() => scrollTo(0)}>
                Back to top ↑
              </button>
            </Magnetic>
          </div>
          <p className="footer__wordmark">
            <span className="sr-only">{profile.studio}</span>
            {profile.studio.split(' ').map((word, w) => (
              <span className="footer__word" key={w} aria-hidden="true">
                {word.split('').map((ch, i) => (
                  <span className="footer__char" key={i}>
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </footer>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import { lockScroll, onScroll, scrollTo } from '../lib/scroll';
import { profile, sections } from '../data/content';
import useClock from '../hooks/useClock';
import Scramble from './ui/Scramble';
import Magnetic from './ui/Magnetic';

const links = sections.filter((s) => s.id !== 'top');

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);
  const progressRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const time = useClock(profile.timeZone);

  useEffect(() => {
    let last = 0;
    const off = onScroll((lenis) => {
      const y = lenis.scroll;
      if (Math.abs(y - last) > 6) {
        setHidden(y > 160 && y > last);
        last = y;
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${lenis.progress || 0})`;
    });

    const triggers = sections.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id),
      })
    );
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return undefined;
    lockScroll(open);
    const reduced = prefersReducedMotion();
    const items = menu.querySelectorAll('.menu__reveal');

    if (open) {
      gsap.set(menu, { visibility: 'visible' });
      gsap
        .timeline()
        .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0 : 0.9, ease: 'expo.inOut' })
        .fromTo(items, { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: reduced ? 0 : 1 }, '-=0.45');
      menu.querySelector('a')?.focus({ preventScroll: true });
      const onKey = (e) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }

    if (menu.style.visibility === 'visible') {
      gsap
        .timeline({ onComplete: () => gsap.set(menu, { visibility: 'hidden' }) })
        .to(items, { yPercent: -110, stagger: 0.03, duration: reduced ? 0 : 0.5, ease: 'expo.in' })
        .to(menu, { clipPath: 'inset(0% 0% 0% 100%)', duration: reduced ? 0 : 0.8, ease: 'expo.inOut' }, '-=0.25');
      toggleRef.current?.focus({ preventScroll: true });
    }
    return undefined;
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    setTimeout(
      () => {
        scrollTo(target);
        target.focus({ preventScroll: true });
      },
      wasOpen ? 450 : 0
    );
  };

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>

      <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <a href="#top" className="nav__logo" onClick={go('top')} aria-label="Khoury Smith, back to top">
          <span className="nav__mark" aria-hidden="true">
            KS
          </span>
          <span className="nav__name">
            <Scramble text={profile.name} />
          </span>
        </a>

        <p className="nav__time mono" aria-label={`Local time in Atlanta: ${time}`}>
          <span className="pulse" aria-hidden="true" />
          ATL <span className="nav__clock">{time}</span>
        </p>

        <nav className="nav__links" aria-label="Primary">
          <ul>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
                  <Scramble text={label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Magnetic strength={0.25}>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-text">{open ? 'Close' : 'Menu'}</span>
            <span className="nav__burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </Magnetic>
      </header>

      <div id="menu" className="menu" ref={menuRef} aria-hidden={!open} inert={!open ? true : undefined}>
        <nav aria-label="Menu" className="menu__nav">
          <ol>
            {sections.map(({ id, label }, i) => (
              <li key={id} className="mask">
                <a href={`#${id}`} onClick={go(id)} className="menu__link menu__reveal">
                  <span className="menu__index mono">0{i + 1}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__aside">
          <div className="mask">
            <a className="menu__reveal menu__email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <ul className="menu__social">
            {profile.social.map((s) => (
              <li key={s.name} className="mask">
                <a className="menu__reveal" href={s.url} target="_blank" rel="noreferrer">
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

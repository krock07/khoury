'use client';

import { useEffect, useState } from 'react';
import { ScrollTrigger } from '@/lib/motion';
import { initScroll, lockScroll } from '@/lib/scroll';
import WebGLBackground from './WebGLBackground';
import Cursor from './Cursor';
import Preloader from './Preloader';
import Nav from './Nav';
import Hero from './Hero';
import Work from './Work';
import About from './About';
import Experience from './Experience';
import Process from './Process';
import Services from './Services';
import Testimonials from './Testimonials';
import Faq from './Faq';
import Contact from './Contact';

export default function Site() {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const destroyScroll = initScroll();

    // Trigger positions go stale whenever content height changes (fonts,
    // images, accordions), so re-measure after layout settles.
    let timer = 0;
    let lastHeight = 0;
    const observer = new ResizeObserver(([entry]) => {
      const height = Math.round(entry.contentRect.height);
      if (height === lastHeight) return;
      lastHeight = height;
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.getElementById('main'));

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      destroyScroll();
    };
  }, []);

  useEffect(() => {
    lockScroll(!revealed);
    if (revealed) ScrollTrigger.refresh();
  }, [revealed]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <WebGLBackground />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero revealed={revealed} />
        <Work />
        <About />
        <Experience />
        <Process />
        <Services />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      {loading && <Preloader onReveal={() => setRevealed(true)} onDone={() => setLoading(false)} />}
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import { onScroll } from '../lib/scroll';

function attach(scene) {
  const move = (e) => {
    scene.setPointer((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  };
  const release = (e) => {
    if (e.pointerType !== 'mouse') scene.releasePointer();
  };
  const leaveWindow = () => scene.releasePointer();
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerup', release, { passive: true });
  document.documentElement.addEventListener('pointerleave', leaveWindow);
  const offScroll = onScroll((lenis) => scene.setVelocity(lenis.velocity));

  const triggers = Array.from(document.querySelectorAll('[data-scene]')).map((el) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'clamp(top 55%)',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && scene.setSection(el.dataset.scene),
    })
  );

  return () => {
    triggers.forEach((t) => t.kill());
    offScroll();
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', release);
    document.documentElement.removeEventListener('pointerleave', leaveWindow);
  };
}

export default function WebGLBackground() {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let scene = null;
    let detach = () => {};
    let cancelled = false;

    import('../webgl/ParticleScene')
      .then(({ ParticleScene }) => {
        if (cancelled) return undefined;
        scene = new ParticleScene(canvasRef.current, { reducedMotion: prefersReducedMotion() });
        detach = attach(scene);
        return scene.init();
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      detach();
      scene?.dispose();
    };
  }, []);

  if (failed) return <div className="webgl webgl--fallback" aria-hidden="true" />;
  return <canvas ref={canvasRef} className="webgl" aria-hidden="true" />;
}

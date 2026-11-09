import { useRef } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../../lib/motion';

export default function RevealText({
  as: Tag = 'div',
  children,
  className,
  delay = 0,
  start = 'top 88%',
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      SplitText.create(ref.current, {
        type: 'lines',
        mask: 'lines',
        tag: 'span',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: ref.current, start, once: true },
          }),
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

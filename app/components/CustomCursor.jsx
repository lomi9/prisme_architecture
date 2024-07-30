"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const halo = haloRef.current;

    // Initialiser le curseur et le halo
    gsap.set([cursor, halo], { xPercent: -50, yPercent: -50, display: "block" });

    const moveCursor = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.1,
        ease: 'power1.inOut'
      });
      gsap.to(halo, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const targets = node.matches('.link-hover-target') ? [node] : node.querySelectorAll('.link-hover-target');
            targets.forEach(target => {
              target.addEventListener('mouseenter', () => {
                gsap.to(cursor, { autoAlpha: 0, duration: 0.1 });
                gsap.to(halo, {
                  scale: 1.5,
                  autoAlpha: 0.7,
                  backgroundColor: 'transparent',
                  borderColor: '#00ff00',
                  duration: 0.3
                });
                halo.style.mixBlendMode = 'normal';
              });
              target.addEventListener('mouseleave', () => {
                gsap.to(cursor, { autoAlpha: 1, duration: 0.1 });
                gsap.to(halo, {
                  scale: 1,
                  autoAlpha: 0.3,
                  backgroundColor: 'rgba(0,255,0,0.5)',
                  borderColor: 'transparent',
                  duration: 0.3
                });
                halo.style.mixBlendMode = 'normal';
              });
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={haloRef} className="custom-halo"></div>
    </>
  );
};

export default CustomCursor;

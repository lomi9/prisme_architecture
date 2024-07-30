"use client"
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const HelloScreen = () => {
  useEffect(() => {
    let layouts = ['final', 'plain', 'columns'];
    let container = document.querySelector('.hello_container');
    let curLayout = 0;

    const nextState = () => {
      const state = Flip.getState('.hello_letter, .hello_text', {
        props: 'color,backgroundColor',
        simple: true,
      });

      container.classList.remove(layouts[curLayout]);
      curLayout = (curLayout + 1) % layouts.length;
      container.classList.add(layouts[curLayout]);

      Flip.from(state, {
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power2.inOut',
        onEnter: (elements, animation) =>
          gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, delay: animation.duration() - 0.1 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
      });

      if (curLayout < layouts.length - 1) {
        gsap.delayedCall(1.5, nextState);  // Continue à animer jusqu'à la fin des transitions
      }
    };

    gsap.delayedCall(1, nextState);  // Démarrer les transitions après 1 seconde
  }, []);

  return (
    <div className='w-full h-full relative'>
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className="hello_container final">
          <div className="hello_letter p">P</div>
          <div className="hello_letter r">R</div>
          <div className="hello_letter i">I</div>
          <div className="hello_letter s">S</div>
          <div className="hello_letter m">M</div>
          <div className="hello_letter e">E</div>
          <div className="hello_text">Architecture</div>
        </div>
      </div>
    </div>
  );
};

export default HelloScreen;
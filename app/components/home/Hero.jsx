"use client"
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const Hero = () => {
  const [selectedCard, setSelectedCard] = useState(0); // Card 1 active par défaut

  const cardsDescription = {
    card1: "Architecture",
    card2: "Technologies de pointe - BIM",
    card3: "Projection en réalité virtuelle",
    card4: "ERP - Établissements reçevant du public",
    card5: "Amélioration des espaces handicapé",
    card6: "Primo-accédants"
  };

  useEffect(() => {
    let layouts = ['intro', 'fade', 'columns'],
      container = document.querySelector('.hero-container'),
      curLayout = 0;

    function nextState() {
      const state = Flip.getState('.background, .for', { props: 'color,backgroundColor', simple: true });

      container.classList.remove(layouts[curLayout]);
      curLayout = (curLayout + 1) % layouts.length;
      container.classList.add(layouts[curLayout]);

      Flip.from(state, {
        absolute: true,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.inOut',
        spin: curLayout === 0,
        simple: true,
        onEnter: (elements, animation) => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, delay: animation.duration() - 0.1 }),
        onLeave: elements => gsap.to(elements, { opacity: 0 })
      });

      if (curLayout === 2) {
        gsap.delayedCall(1.4, () => {
          const lettersWithBackground = document.querySelectorAll('.background');
          lettersWithBackground.forEach((letter) => {
            letter.classList.add('show-hero_image');
          });
        });

        gsap.to('.letter', {
          opacity: 0,
          duration: 1,
          delay: 1
        }).then(() => {
          const letters = document.querySelectorAll('.background .number');
          letters.forEach((number, index) => {
            gsap.to(number, {
              opacity: 1,
              duration: 1,
              delay: 0.2 * index
            });
          });

          gsap.to('.background', { flexBasis: '10%', duration: 0 });
          gsap.to('.background:first-child', { flexBasis: '50%', duration: 0 });

          const letterElements = document.querySelectorAll('.background');
          letterElements.forEach((letter) => {
            letter.addEventListener('mouseenter', onMouseEnter);
            letter.addEventListener('mouseleave', onMouseLeave);
          });

          gsap.to('.prisme_top', {
            opacity: 1,
            duration: 2,
            delay: 1
          });

          const firstCard = document.querySelector('.background:first-child .description');
          gsap.fromTo(firstCard, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' });
        });
      } else {
        gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);
      }
    }

    function onMouseEnter(event) {
      if (document.querySelector('.hero-container').classList.contains('columns')) {
        const target = event.currentTarget;
        gsap.to('.background', { flexBasis: '10%', duration: 0.5, ease: 'power2.inOut' });
        gsap.to(target, { flexBasis: '50%', duration: 0.5, ease: 'power2.inOut' });
        gsap.fromTo(target.querySelector('.description'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.inOut' });
      }
    }

    function onMouseLeave(event) {
      const target = event.currentTarget;
      if (document.querySelector('.hero-container').classList.contains('columns')) {
        gsap.to('.background', { flexBasis: '10%', duration: 0.5, ease: 'power2.inOut' });
        gsap.to('.background:first-child', { flexBasis: '50%', duration: 0.5, ease: 'power2.inOut' });
          gsap.to(target.querySelector('.description'), { opacity: 0, duration: 0, ease: 'none' }); // Ajustez ici la durée de disparition
      }
    }

    gsap.delayedCall(1, nextState);
  }, []);

  return (
    <div className='w-full h-full p-8 relative'>
      <span className='prisme_top absolute top-0 left-1/2 transform -translate-x-1/2 opacity-0'>PRISME</span>
      <div className="hero-container intro h-full w-full flex justify-center items-center overflow-hidden">
        <div className="background bg-1" onMouseEnter={() => setSelectedCard(1)}>
          <div className="hero_image img-1 relative border-solid border-r-4">
            <div className='absolute w-full h-full bg-black opacity-60 cursor-pointer'>
            </div>
          </div>
          <div className="number">1.</div>
          <div className={`description ${selectedCard === 1 ? 'show' : ''}`}>{cardsDescription.card1}</div>
          <span className='letter p'>P</span>
        </div>
        <div className="background bg-2" onMouseEnter={() => setSelectedCard(2)}>
          <div className="hero_image img-2 relative border-solid border-r-4">
            <div className='absolute w-full h-full bg-black opacity-60 cursor-pointer'>
            </div>
          </div>
          <div className="number">2.</div>
          <div className={`description ${selectedCard === 2 ? 'show' : ''}`}>{cardsDescription.card2}</div>
          <span className='letter r'>R</span>
        </div>
        <div className="background bg-3" onMouseEnter={() => setSelectedCard(3)}>
          <div className="hero_image img-3 relative border-solid border-r-4">
            <div className='absolute w-full h-full bg-black opacity-20 cursor-pointer'>
            </div>
          </div>
          <div className="number">3.</div>
          <div className={`description ${selectedCard === 3 ? 'show' : ''}`}>{cardsDescription.card3}</div>
          <span className='letter i'>I</span>
        </div>
        <div className="background bg-4" onMouseEnter={() => setSelectedCard(4)}>
          <div className="hero_image img-4 relative border-solid border-r-4">
            <div className='absolute w-full h-full bg-black opacity-60 cursor-pointer'>
            </div>
          </div>
          <div className="number">4.</div>
          <div className={`description ${selectedCard === 4 ? 'show' : ''}`}>{cardsDescription.card4}</div>
          <span className='letter s'>S</span>
        </div>
        <div className="background bg-5" onMouseEnter={() => setSelectedCard(5)}>
          <div className="hero_image img-5 relative border-solid border-r-4">
            <div className='absolute w-full h-full bg-black opacity-60 cursor-pointer'>
            </div>
          </div>
          <div className="number">5.</div>
          <div className={`description ${selectedCard === 5 ? 'show' : ''}`}>{cardsDescription.card5}</div>
          <span className='letter m'>M</span>
        </div>
        <div className="background bg-6" onMouseEnter={() => setSelectedCard(6)}>
          <div className="hero_image img-6 relative">
            <div className='absolute w-full h-full bg-black opacity-60 cursor-pointer'>
            </div>
          </div>
          <div className="number">6.</div>
          <div className={`description ${selectedCard === 6 ? 'show' : ''}`}>{cardsDescription.card6}</div>
          <span className='letter e'>E</span>
        </div>
        <div className="for flex flex-wrap items-baseline">
          <span className='for'>architecture</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;

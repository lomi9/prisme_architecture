"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const cards = [
  { id: 1, image: '/architecture_4.jpg', title: 'Architecture' },
  { id: 2, image: '/maquette.jpeg', title: 'Technologies de pointe : BIM' },
  { id: 3, image: '/statue_vr_2.jpeg', title: 'Projection en réalité virtuelle' },
  { id: 4, image: '/erp_hero.jpg', title: 'ERP' },
  { id: 5, image: '/handi_hero_2.jpg', title: 'Mobilité réduite' },
  { id: 6, image: '/primo_acc.jpg', title: 'Primo Accédants' },
];

const HelloHero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);
  const columnsRef = useRef([]);
  const titleRefs = useRef([]);

  const handleMouseEnter = (index) => {
    setActiveCard(index);
    gsap.to(columnsRef.current, { flex: 1, duration: 0.3, ease: 'power1.inOut', overwrite: true });
    gsap.to(columnsRef.current[index], { flex: 4, duration: 0.3, ease: 'power1.inOut', overwrite: true });
    gsap.to(titleRefs.current, { opacity: 0, duration: 0.1, overwrite: true });
    gsap.to(titleRefs.current[index], { opacity: 1, duration: 0.3, delay: 0.3, ease: 'power1.inOut', overwrite: true });
  };

  const handleMouseLeave = () => {
    setActiveCard(0);
    gsap.to(columnsRef.current, { flex: 1, duration: 0.3, ease: 'power1.inOut', overwrite: true });
    gsap.to(columnsRef.current[0], { flex: 4, duration: 0.3, ease: 'power1.inOut', overwrite: true });
    gsap.to(titleRefs.current, { opacity: 0, duration: 0.1, overwrite: true });
    gsap.to(titleRefs.current[0], { opacity: 1, duration: 0.3, delay: 0.3, ease: 'power1.inOut', overwrite: true });
  };

  useEffect(() => {
    // Initial setup for the first card to be active
    gsap.to(columnsRef.current[0], { flex: 4 });
    gsap.to(titleRefs.current[0], { opacity: 1 });

    const container = containerRef.current;
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className='w-full h-full flex p-10'>
      <div ref={containerRef} className="hello_hero w-full gap-1 h-full flex">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (columnsRef.current[index] = el)}
            className="column overflow-hidden flex-1 h-full relative transition-all duration-300 ease-in-out will-change-transform"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <img
              src={card.image}
              alt={card.title}
              className="min-w-full min-h-full max-h-full object-cover object-center"
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-30'></div>
            <span className="absolute bottom-0 left-0 text-white text-5xl font-thin m-4">0{card.id}.</span>
            <span
              ref={(el) => (titleRefs.current[index] = el)}
              className="hello_hero_title absolute bottom-0 left-34 text-white text-2xl font-thin m-4"
              style={{ opacity: 0 }}
            >
              {card.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelloHero;

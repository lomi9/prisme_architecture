"use client"

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RootLayout from './layout';
import HelloScreen from './hello/components/HelloScreen';
import HelloHero from './hello/components/HelloHero';

export default function Home() {
  const [showScreen, setShowScreen] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const screenRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Animer la disparition de HelloScreen en douceur
    if (showScreen) {
      const screenTimeout = setTimeout(() => {
        gsap.to(screenRef.current, { opacity: 0, duration: 1.5, onComplete: () => setShowScreen(false) });
      }, 5000);
      return () => clearTimeout(screenTimeout);
    }
  }, [showScreen]);

  useEffect(() => {
    // Préparer HelloHero à être affiché légèrement avant la fin de HelloScreen
    if (!showScreen && !showHero) {
      setShowHero(true);
    }
  }, [showScreen, showHero]);


  useEffect(() => {
    if (showHero && heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
    }
  }, [showHero]);
  

  return (
    <RootLayout showNavbar={!showScreen}>
    <main className="w-full h-full bg-background min-h-screen overflow-auto">
      <div className="w-full h-full relative flex flex-wrap justify-center items-center">
        {showScreen && (
          <div ref={screenRef} className='Home-container-1 w-screen h-screen absolute top-0 left-0 z-20' style={{ opacity: 1 }}>
            <HelloScreen />
          </div>
        )}
        {showHero && (
          <>
          <div ref={heroRef} className='Home-container-2 w-screen h-screen absolute top-0 left-0 z-10' style={{ opacity: 0 }}>
            <HelloHero />
          </div>
          <div className='presentation1 flex flex-wrap w-full h-screen bg-transparent'></div>
          <div className='presentation1 flex flex-wrap w-full h-[800px] bg-red-300'></div>
          <div className='presentation1 flex flex-wrap w-full h-[800px] bg-green-300'></div>
          </>
        )}
      </div>
    </main>
    </RootLayout>
  );
}

"use client"

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hamburger = ({ isOpen }) => {
    const menuOverlay = useRef(null);
    const menuContent = useRef(null);
    const arrowRefs = useRef([]);

    arrowRefs.current = []; // Reset refs array

    const addToRefs = (el) => {
        if (el && !arrowRefs.current.includes(el)) {
            arrowRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuOverlay.current, { duration: 0.5, height: "100vh", opacity: 1, display: "flex", ease: "expo.inOut" });
            gsap.fromTo(menuContent.current, 
                        { skewY: -6, y: '-100%' },
                        { duration: 0.5, skewY: 0, y: '0%', ease: "expo.inOut", delay: 0.1 });
        } else {
            gsap.to(menuContent.current, { duration: 0.5, skewY: -6, y: '-100%', ease: "expo.inOut" });
            gsap.to(menuOverlay.current, { duration: 0.5, height: 0, opacity: 0, display: "none", delay: 0.5 });
        }
    }, [isOpen]);

    const handleMouseEnter = (index) => {
        gsap.to(arrowRefs.current[index], { x: 10, opacity: 1, duration: 0.3, ease: 'power1.inOut' });
    };

    const handleMouseLeave = (index) => {
        gsap.to(arrowRefs.current[index], { x: 0, opacity: 0, duration: 0.3, ease: 'power1.inOut' });
    };

    return (
        <div ref={menuOverlay} className="menu-overlay w-full h-0 fixed top-0 left-0 z-50 opacity-0 flex flex-wrap justify-center">
            <div ref={menuContent} className="menu-content absolute w-auto h-screen top-0 text-gray-200 flex flex-col items-start justify-center border-solid border-l border-l-gray-500">
                {["Galerie", "Journal", "Contactez-nous"].map((text, index) => (
                    <div
                        key={text}
                        className='link-71 flex flex-wrap justify-center items-center'
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <p className='link-hover-target cursor-pointer text-4xl p-4 font-extrabold'>{text}</p>
                        <ArrowRight
                            ref={addToRefs}
                            style={{ opacity: 0, transform: 'translateX(0)' }}
                        />
                    </div>
                ))}
            </div>
            <span className='absolute menu-bottom-line h-[1px] w-full bg-gray-200 left-0 bottom-[30px]'></span>
        </div>
    );
};

export default Hamburger;

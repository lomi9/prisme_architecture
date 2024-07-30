"use client"
import { useState } from 'react';
import Hamburger from './Hamburger';


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);


    return (
        <header className="navbar-enter fixed top-0 left-0 w-full h-10 z-[100] bg-transparent">
            <div className="w-full h-full flex flex-wrap py-8 ">
                <div className="navbar-left flex w-1/3 h-full "></div>
                <div className="navbar-center flex w-1/3 h-full justify-center items-center ">
                <p className={`uppercase text-6xl font-thin z-[120] ${isOpen ? 'text-white' : 'text-black'}`}>Prisme</p>
                </div>
                <div className="navbar-right relative flex w-1/3 h-full justify-end items-start pr-10">
                <button className={`${isOpen ? 'text-white' : 'text-black'} link-hover-target link-hover-style z-[120] absolute top-[-20px] right-[15px]`} onClick={toggleMenu}>
                {isOpen ? 'Fermer' : 'Menu'}
            </button>
            <Hamburger isOpen={isOpen} />
                </div>
            </div>
        </header>
    );
}

export default Navbar;

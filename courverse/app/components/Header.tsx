"use client"

import { useRouter } from 'next/router';
import React from 'react';

const Header: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span 
          onClick={() => handleNavigation('/')} 
          className="text-white text-2xl font-bold cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Home"
        >
          Courverse
        </span>
        <nav className="flex space-x-4">
          <span 
            onClick={() => handleNavigation('/about')} 
            className="text-white hover:text-gray-400 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="About"
          >
            About
          </span>
          <span 
            onClick={() => handleNavigation('/contact')} 
            className="text-white hover:text-gray-400 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Contact"
          >
            Contact
          </span>
          <span 
            onClick={() => handleNavigation('/auth/login')} 
            className="text-white hover:text-gray-400 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Login"
          >
            Login
          </span>
          <span 
            onClick={() => handleNavigation('/auth/signup')} 
            className="text-white hover:text-gray-400 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Signup"
          >
            Signup
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;

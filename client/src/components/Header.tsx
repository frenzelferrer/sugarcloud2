import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderNow = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-warm-cream/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 py-3 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <img
            src="/images/sugarcloud-logo.png"
            alt="Sugarcloud Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-2xl font-bold text-deep-mauve">
              Sugarcloud
            </h1>
            <p className="text-xs md:text-sm text-dusty-rose font-medium">
              Homemade Cookies
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('menu');
            }}
            className="text-deep-mauve hover:text-dusty-rose transition-colors duration-200 font-medium"
          >
            Menu
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
            className="text-deep-mauve hover:text-dusty-rose transition-colors duration-200 font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="text-deep-mauve hover:text-dusty-rose transition-colors duration-200 font-medium"
          >
            Contact
          </a>
        </nav>

        {/* Desktop CTA Button */}
        <button
          onClick={handleOrderNow}
          className="hidden md:block bg-dusty-rose hover:bg-deep-mauve text-warm-cream px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:shadow-lg text-base"
        >
          Order Now
        </button>

        {/* Mobile Section (Menu Removed) */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile CTA Button */}
          <button
            onClick={handleOrderNow}
            className="bg-dusty-rose hover:bg-deep-mauve text-warm-cream px-3 py-2 rounded-full font-semibold transition-all duration-200 text-sm"
          >
            Order
          </button>
        </div>
      </div>
    </header>
  );
}

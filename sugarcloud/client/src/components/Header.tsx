import { useEffect, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-warm-cream/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/sugarcloud-logo.png"
            alt="Sugarcloud Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-bold text-deep-mauve">
              Sugarcloud
            </h1>
            <p className="text-xs text-dusty-rose font-medium">
              Homemade Cookies
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#menu"
            className="text-deep-mauve hover:text-dusty-rose transition-colors duration-200 font-medium"
          >
            Menu
          </a>
          <a
            href="#about"
            className="text-deep-mauve hover:text-dusty-rose transition-colors duration-200 font-medium"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-deep-mauve hover:text-dusty-rose transition-colors duration-200 font-medium"
          >
            Contact
          </a>
        </nav>

        {/* CTA Button */}
        <button className="bg-dusty-rose hover:bg-deep-mauve text-warm-cream px-4 md:px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:shadow-lg text-sm md:text-base">
          Order Now
        </button>
      </div>
    </header>
  );
}

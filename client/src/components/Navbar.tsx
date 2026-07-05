import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentView:
    | 'home'
    | 'speakers'
    | 'schedule'
    | 'team'
    | 'tickets-login'
    | 'tickets-management';
  onNavigate: (
    view: 'home' | 'speakers' | 'schedule' | 'team'
  ) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'بداية السمت', view: 'home' as const },
    { name: 'بنائين السمت', view: 'team' as const },
    { name: 'صناع السمت', view: 'speakers' as const },
    { name: 'جدولنا ', view: 'schedule' as const },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-2' : 'bg-transparent py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <span className="font-oswald text-2xl font-bold">
              <span className="text-red-600">TEDx</span>
              <span className="text-white">Shmeisani</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-xs uppercase tracking-widest font-bold hover:text-red-600 transition-colors ${
                  currentView === link.view ? 'text-red-600' : 'text-gray-400'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-red-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-4 text-sm font-bold tracking-widest text-gray-300 hover:text-red-600 border-b border-white/5 uppercase"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Crown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Đọc Ebook', path: '/ebook' },
    { name: 'Chơi trò chơi', path: '/game' },
    { name: 'Bảng xếp hạng', path: '/leaderboard' },
    { name: 'So d? tu duy', path: '/mindmap' },
    { name: 'Về chúng tôi', path: '/about' },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-midas-dark/90 backdrop-blur-md border-b border-midas-gold/20 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group z-50">
              <Crown className="w-8 h-8 text-midas-gold mr-2 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-midas-gold uppercase leading-none">Midas</span>
                <span className="text-[10px] text-midas-ivory/70 uppercase tracking-widest mt-1">Hơn cả một câu chuyện về vàng</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                item.path.startsWith('#') ? (
                  <a 
                    key={item.name} 
                    href={item.path} 
                    className="text-sm font-medium transition-colors hover:text-midas-gold text-midas-ivory/80"
                  >
                    {item.name}
                  </a>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-midas-gold ${
                        isActive ? 'text-midas-gold border-b-2 border-midas-gold pb-1' : 'text-midas-ivory/80'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center z-50">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-midas-gold p-2 -mr-2 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-midas-dark/95 backdrop-blur-xl flex flex-col justify-center items-center h-[100dvh]"
          >
            {/* Cinematic overlay for menu */}
            <div className="absolute inset-0 bg-gradient-to-b from-midas-gold/5 to-transparent pointer-events-none"></div>
            
            <nav className="flex flex-col items-center space-y-8 w-full px-6 z-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="w-full text-center"
                >
                  {item.path.startsWith('#') ? (
                    <a 
                      href={item.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-serif text-midas-ivory hover:text-midas-gold transition-colors inline-block"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `text-2xl font-serif transition-colors inline-block ${
                          isActive 
                            ? 'text-midas-gold border-b-2 border-midas-gold pb-1' 
                            : 'text-midas-ivory hover:text-midas-gold'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-center"
            >
               <Crown className="w-6 h-6 text-midas-gold/30 mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

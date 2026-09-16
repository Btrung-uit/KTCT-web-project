
import { NavLink, Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/about' },
    { name: 'Bảng xếp hạng', path: '/leaderboard' },
    { name: 'Liên hệ', path: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-midas-dark/80 backdrop-blur-md border-b border-midas-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col justify-center">
            <div className="flex items-center text-midas-gold">
              <Crown className="w-5 h-5 mr-2" />
              <span className="font-serif text-2xl font-bold tracking-widest uppercase">Midas</span>
            </div>
            <span className="text-[0.65rem] text-midas-gray tracking-widest uppercase mt-0.5">Hơn cả một câu chuyện về vàng</span>
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



          {/* Mobile menu button (Simplified for now) */}
          <div className="md:hidden flex items-center text-midas-gold">
            <button className="p-2">Menu</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

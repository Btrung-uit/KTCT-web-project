import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-midas-dark via-midas-dark/90 to-transparent border-t border-midas-gold/10 pt-20 pb-10 px-5 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Crown className="w-8 h-8 text-midas-gold mb-3" />
          <span className="font-serif text-2xl font-bold tracking-wider text-midas-gold uppercase leading-none">Midas</span>
          <span className="text-[11px] text-midas-ivory/60 mt-2 uppercase tracking-widest">Vàng, Tiền và những bài học kinh tế</span>
        </div>

        {/* Links */}
        <div className="flex justify-center items-center space-x-6 md:space-x-8 text-sm text-midas-gray/80 w-full mb-8 border-t border-b border-midas-gold/10 py-5 mt-4">
          <Link to="/about" className="hover:text-midas-gold transition-colors font-medium">Về chúng tôi</Link>
          <span className="w-1 h-1 rounded-full bg-midas-gold/30"></span>
          <a href="mailto:25521963@gm.uit.edu.vn" className="hover:text-midas-gold transition-colors font-medium">Liên hệ</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-midas-gray/50">
          &copy; 2024 MIDAS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

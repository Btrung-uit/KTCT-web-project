

const Footer = () => {
  return (
    <footer className="bg-[#050506] border-t border-midas-gold/10 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="font-serif text-xl font-bold text-midas-gold uppercase tracking-wider">Midas</h3>
          <p className="text-sm text-midas-gray mt-1">Vàng, Tiền và những bài học kinh tế</p>
        </div>
        
        <div className="flex space-x-6 text-sm text-midas-gray mb-4 md:mb-0">
          <a href="#" className="hover:text-midas-gold transition-colors">Về chúng tôi</a>
          <a href="#" className="hover:text-midas-gold transition-colors">Liên hệ</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

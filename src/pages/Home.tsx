import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Gamepad2, GraduationCap, Trophy, Users, ChevronRight, ChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col justify-center pt-16 md:pt-24 pb-16 overflow-hidden">
        {/* Subtle Text Backdrop for Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-midas-dark/80 via-midas-dark/40 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col md:flex-row items-center justify-center md:justify-start h-full flex-grow">
          
          {/* Left Content */}
          <div className="w-full md:w-3/5 pr-0 md:pr-10 text-left pt-20 md:pt-0">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-[clamp(2.5rem,9vw,4.5rem)] md:text-7xl font-bold leading-[1.3] md:leading-[1.25] mb-4 uppercase text-glow"
            >
              Khi mọi thứ<br className="hidden md:block" /> đều biến thành<br className="hidden md:block"/> vàng...
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-xl md:text-3xl text-midas-champagne italic mb-5 md:mb-6"
            >
              Liệu đó có phải là giàu có?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-midas-ivory/90 mb-8 max-w-xl font-light leading-relaxed"
            >
              Cùng khám phá câu chuyện Vua Midas và những góc nhìn kinh tế thú vị đằng sau vàng, tiền và sự giàu có.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center space-x-3 md:space-x-4 text-[10px] md:text-xs font-semibold tracking-[0.2em] text-midas-gold uppercase"
            >
              <div className="h-px bg-midas-gold/50 flex-grow max-w-[30px] md:max-w-[50px]"></div>
              <span>Đọc • Suy nghĩ • Khám phá</span>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden flex justify-center w-full"
        >
          <div className="w-10 h-10 rounded-full border border-midas-gold/30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <ChevronDown className="w-5 h-5 text-midas-gold animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* CTA CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full -mt-6 md:-mt-20 relative z-30">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          
          {/* Card 1: Ebook */}
          <Link to="/ebook" className="group block w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(212,175,55,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative min-h-[220px] md:min-h-[280px] rounded-[16px] overflow-hidden border border-midas-gold/40 bg-midas-panel flex flex-col p-6 shadow-xl"
            >
              <div className="absolute inset-0 z-0">
                <img src="/assets/images/ebook-bg.png" alt="Ebook background" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-midas-dark/95 via-midas-dark/60 to-midas-dark/20"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-full bg-midas-gold/20 flex items-center justify-center backdrop-blur-md border border-midas-gold/30">
                      <BookOpen className="w-6 h-6 text-midas-gold" />
                    </div>
                    <ChevronRight className="w-6 h-6 text-midas-gold/50 group-hover:text-midas-gold transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-midas-gold uppercase mb-2">Đọc Ebook</h3>
                  <p className="text-midas-ivory/80 text-sm md:text-base leading-relaxed pr-4">
                    Khám phá toàn bộ câu chuyện, kiến thức và những bài học kinh tế thú vị.
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 2: Game */}
          <Link to="/game" className="group block w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 30px rgba(212,175,55,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              className="relative min-h-[220px] md:min-h-[280px] rounded-[16px] overflow-hidden border border-midas-gold/40 bg-midas-panel flex flex-col p-6 shadow-xl"
            >
              <div className="absolute inset-0 z-0">
                <img src="/assets/images/game-bg.png" alt="Game background" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-midas-dark/95 via-midas-dark/60 to-midas-dark/20"></div>
              </div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-full bg-midas-gold/20 flex items-center justify-center backdrop-blur-md border border-midas-gold/30">
                      <Gamepad2 className="w-6 h-6 text-midas-gold" />
                    </div>
                    <ChevronRight className="w-6 h-6 text-midas-gold/50 group-hover:text-midas-gold transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-midas-gold uppercase mb-2">Chơi Trò Chơi</h3>
                  <p className="text-midas-ivory/80 text-sm md:text-base leading-relaxed pr-4">
                    Thử thách kiến thức của bạn với 20 câu trắc nghiệm thú vị.
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
          
        </div>
      </section>

      {/* QUICK FEATURES */}
      <section className="max-w-3xl mx-auto px-5 sm:px-6 w-full py-10 md:py-16">
        <h3 className="font-serif text-xl md:text-2xl text-midas-ivory font-bold mb-8 md:text-center">Vì sao nên tham gia?</h3>
        
        <div className="flex flex-col space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <div className="w-14 h-14 rounded-xl border border-midas-gold/30 bg-midas-panel flex items-center justify-center flex-shrink-0 mr-4 shadow-lg shadow-black/50">
              <Users className="w-6 h-6 text-midas-gold" />
            </div>
            <div>
              <h4 className="font-bold text-midas-ivory text-lg">20 câu hỏi</h4>
              <p className="text-sm text-midas-gray mt-1">Kiểm tra kiến thức</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center"
          >
            <div className="w-14 h-14 rounded-xl border border-midas-gold/30 bg-midas-panel flex items-center justify-center flex-shrink-0 mr-4 shadow-lg shadow-black/50">
              <Trophy className="w-6 h-6 text-midas-gold" />
            </div>
            <div>
              <h4 className="font-bold text-midas-ivory text-lg">Bảng xếp hạng</h4>
              <p className="text-sm text-midas-gray mt-1">So tài cùng cả lớp</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <div className="w-14 h-14 rounded-xl border border-midas-gold/30 bg-midas-panel flex items-center justify-center flex-shrink-0 mr-4 shadow-lg shadow-black/50">
              <GraduationCap className="w-6 h-6 text-midas-gold" />
            </div>
            <div>
              <h4 className="font-bold text-midas-ivory text-lg">Vừa học vừa chơi</h4>
              <p className="text-sm text-midas-gray mt-1">Ghi nhớ kiến thức dễ dàng hơn</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="px-5 sm:px-6 w-full py-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-midas-gold/20 overflow-hidden bg-midas-panel p-8 md:p-12 shadow-2xl"
        >
          <div className="absolute inset-0 z-0 opacity-10">
            <img src="/assets/images/hero-bg.jpg" alt="Texture" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <span className="text-5xl md:text-6xl text-midas-gold/40 font-serif leading-none block mb-4">“</span>
            <p className="text-xl md:text-2xl text-midas-gold font-serif italic leading-relaxed mb-6">
              Tri thức cũng là một loại tài sản, nhưng không bao giờ mất đi khi được chia sẻ.
            </p>
            <div className="flex items-center text-xs tracking-widest text-midas-gray uppercase font-bold">
              <span className="w-6 h-px bg-midas-gold/50 mr-3"></span>
              Midas
            </div>
          </div>
        </motion.div>
      </section>

      {/* EXPLORE MORE (ABOUT) */}
      <section className="px-5 sm:px-6 w-full py-10 pb-20 max-w-3xl mx-auto">
        <h3 className="font-serif text-xl md:text-2xl text-midas-ivory font-bold mb-6">Khám phá thêm</h3>
        
        <Link to="/about" className="block group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-xl overflow-hidden border border-midas-gold/20 h-32 flex items-end p-5"
          >
            <div className="absolute inset-0 z-0">
               <img src="/assets/images/hero-bg.jpg" alt="Giới thiệu" className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
               <div className="absolute inset-0 bg-gradient-to-t from-midas-dark via-midas-dark/70 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full flex justify-between items-end">
              <div>
                <h4 className="font-serif text-xl font-bold text-midas-ivory mb-1">Giới thiệu</h4>
                <p className="text-xs text-midas-gray">Về dự án và ý nghĩa của Midas</p>
              </div>
              <div className="w-8 h-8 rounded-full border border-midas-gold/30 bg-black/50 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-midas-gold" />
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

    </div>
  );
};

export default Home;

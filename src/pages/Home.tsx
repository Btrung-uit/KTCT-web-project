
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Users, Trophy, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-midas-dark/90 via-midas-dark/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-midas-dark via-midas-dark/10 to-transparent z-10"></div>
          <img 
            src="/assets/images/hero-bg.jpg" 
            alt="Midas Hero" 
            className="w-full h-full object-cover object-center opacity-90"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col md:flex-row items-center">
          
          {/* Left Content */}
          <div className="w-full md:w-3/5 pr-0 md:pr-10 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl font-bold leading-[1.5] mb-4 uppercase text-glow"
            >
              Khi mọi thứ đều<br/>biến thành vàng...
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-2xl md:text-3xl text-midas-champagne italic mb-6"
            >
              Liệu đó có phải là giàu có?
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-midas-ivory/90 mb-8 max-w-xl mx-auto md:mx-0 font-light leading-relaxed"
            >
              Cùng khám phá câu chuyện Vua Midas và những góc nhìn kinh tế thú vị đằng sau vàng, tiền và sự giàu có.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center md:justify-start space-x-4 text-xs font-semibold tracking-widest text-midas-gold uppercase"
            >
              <div className="h-px bg-midas-gold/50 flex-grow max-w-[50px]"></div>
              <span>Đọc • Suy nghĩ • Trải nghiệm • Khám phá</span>
              <div className="h-px bg-midas-gold/50 flex-grow max-w-[50px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TWO MAIN CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <Link to="/ebook" className="group block">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 30px rgba(212,175,55,0.5)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20, opacity: { duration: 0.6 }, y: { duration: 0.6 } }}
              className="relative h-[250px] md:h-[300px] rounded-xl overflow-hidden border border-midas-gold/30 bg-midas-panel backdrop-blur-sm flex flex-col justify-end p-8 border-glow cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img src="/assets/images/ebook-bg.png" alt="Ebook background" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-midas-dark/90 via-midas-dark/50 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-3xl font-bold text-midas-gold uppercase mb-2">Đọc Ebook</h3>
                <p className="text-midas-ivory/80 mb-6 max-w-sm">Khám phá toàn bộ câu chuyện, kiến thức và những bài học kinh tế thú vị.</p>
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-midas-gold to-yellow-600 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all">
                  <BookOpen className="w-5 h-5 mr-2" /> Đọc ngay &rarr;
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Card 2 */}
          <Link to="/game" className="group block">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 30px rgba(212,175,55,0.5)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1, opacity: { duration: 0.6 }, y: { duration: 0.6 } }}
              className="relative h-[250px] md:h-[300px] rounded-xl overflow-hidden border border-midas-gold/30 bg-midas-panel backdrop-blur-sm flex flex-col justify-end p-8 border-glow cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img src="/assets/images/game-bg.png" alt="Game background" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-midas-dark/90 via-midas-dark/50 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-3xl font-bold text-midas-gold uppercase mb-2">Chơi Trò Chơi</h3>
                <p className="text-midas-ivory/80 mb-6 max-w-sm">Thử thách kiến thức của bạn với 20 câu trắc nghiệm thú vị.</p>
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-midas-gold to-yellow-600 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all">
                  <Gamepad2 className="w-5 h-5 mr-2" /> Bắt đầu chơi &rarr;
                </div>
              </div>
            </motion.div>
          </Link>

        </div>
      </section>

      {/* FEATURE BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-midas-panel border border-midas-gold/10 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between shadow-xl"
        >
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 w-full lg:w-2/3 mb-8 lg:mb-0">
            <div className="flex items-start">
              <Users className="w-8 h-8 text-midas-gold mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-midas-ivory uppercase">20 Câu Hỏi</h4>
                <p className="text-sm text-midas-gray">Kiểm tra kiến thức</p>
              </div>
            </div>
            <div className="flex items-start">
              <Trophy className="w-8 h-8 text-midas-gold mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-midas-ivory uppercase">Bảng Xếp Hạng</h4>
                <p className="text-sm text-midas-gray">So tài cùng cả lớp</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="w-8 h-8 text-midas-gold mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-midas-ivory uppercase">Vừa Học Vừa Chơi</h4>
                <p className="text-sm text-midas-gray">Ghi nhớ kiến thức dễ dàng hơn</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 lg:border-l lg:border-midas-gold/20 lg:pl-8 text-center lg:text-left">
            <p className="text-midas-ivory italic font-serif text-lg">"Tri thức cũng là một loại tài sản, nhưng không bao giờ mất đi khi được chia sẻ."</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

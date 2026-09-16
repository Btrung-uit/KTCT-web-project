const fs = require('fs');
const path = require('path');

const files = {
  'src/App.tsx': `
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Ebook from './pages/EbookViewer';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
`,
  'src/components/Navbar.tsx': `
import { NavLink, Link } from 'react-router-dom';
import { Crown, User } from 'lucide-react';

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
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  \`text-sm font-medium transition-colors hover:text-midas-gold \${
                    isActive ? 'text-midas-gold border-b-2 border-midas-gold pb-1' : 'text-midas-ivory/80'
                  }\`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center px-4 py-2 text-sm text-midas-ivory border border-midas-gold/40 rounded-full hover:bg-midas-gold/10 transition-colors">
              <User className="w-4 h-4 mr-2 text-midas-gold" />
              Đăng nhập
            </button>
          </div>

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
`,
  'src/components/Footer.tsx': `
import { Facebook, Instagram, Youtube } from 'lucide-react';

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
          <a href="#" className="hover:text-midas-gold transition-colors">Điều khoản</a>
          <a href="#" className="hover:text-midas-gold transition-colors">Liên hệ</a>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-midas-gray hover:text-midas-gold transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="text-midas-gray hover:text-midas-gold transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-midas-gray hover:text-midas-gold transition-colors"><Youtube className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
`,
  'src/pages/Home.tsx': `
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
          <div className="absolute inset-0 bg-gradient-to-r from-midas-dark via-midas-dark/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-midas-dark via-transparent to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&q=80&w=2000" 
            alt="Ancient Greek Temple" 
            className="w-full h-full object-cover object-right opacity-40 mix-blend-luminosity"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col md:flex-row items-center">
          
          {/* Left Content */}
          <div className="w-full md:w-3/5 pr-0 md:pr-10 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-4 uppercase text-glow"
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

          {/* Right Content - Placeholder for King Midas (can just use a dramatic gold image if preferred) */}
          <div className="w-full md:w-2/5 hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative rounded-lg overflow-hidden border border-midas-gold/20 shadow-2xl shadow-midas-gold/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1618281377488-82bc52c237c7?auto=format&fit=crop&q=80&w=800" 
                alt="Midas Concept" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midas-dark to-transparent"></div>
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative h-[250px] md:h-[300px] rounded-xl overflow-hidden border border-midas-gold/30 bg-midas-panel backdrop-blur-sm flex flex-col justify-end p-8 border-glow cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=1000" alt="Ebook background" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-midas-dark via-midas-dark/80 to-transparent"></div>
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
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative h-[250px] md:h-[300px] rounded-xl overflow-hidden border border-midas-gold/30 bg-midas-panel backdrop-blur-sm flex flex-col justify-end p-8 border-glow cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=1000" alt="Game background" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-midas-dark via-midas-dark/80 to-transparent"></div>
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
        <div className="bg-midas-panel border border-midas-gold/10 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between shadow-xl">
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
        </div>
      </section>
    </div>
  );
};

export default Home;
`,
  'src/pages/EbookViewer.tsx': `
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ebookData } from '../data/ebookData';
import { ChevronLeft, ChevronRight, Book } from 'lucide-react';

const EbookViewer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = ebookData.length;
  const page = ebookData[currentPage];

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(curr => curr + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(curr => curr - 1);
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-midas-gold uppercase tracking-widest flex items-center justify-center">
          <Book className="mr-3 w-6 h-6" /> Midas Ebook
        </h2>
      </div>

      {/* Book Container */}
      <div className="w-full max-w-4xl bg-midas-panel border border-midas-gold/20 rounded-lg shadow-2xl relative overflow-hidden">
        
        {/* Progress bar at top */}
        <div className="h-1 w-full bg-black/50">
          <div 
            className="h-full bg-midas-gold transition-all duration-300" 
            style={{ width: \`\${((currentPage + 1) / totalPages) * 100}%\` }}
          />
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-16 min-h-[400px] flex flex-col justify-center relative bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] bg-blend-overlay">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {currentPage === 0 ? (
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-serif text-midas-gold mb-6 leading-tight">{page.title}</h1>
                  <p className="text-lg md:text-xl text-midas-ivory/90 leading-relaxed font-light">{page.content}</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-serif text-midas-champagne mb-6 border-b border-midas-gold/30 pb-4 inline-block">{page.title}</h2>
                  <p className="text-lg text-midas-ivory/90 leading-relaxed font-light whitespace-pre-line">{page.content}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <div className="bg-black/40 border-t border-midas-gold/20 p-4 flex justify-between items-center">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center px-4 py-2 text-midas-gold hover:bg-midas-gold/10 rounded disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Trang trước
          </button>
          
          <span className="text-midas-gray font-mono text-sm tracking-widest">
            {currentPage + 1} / {totalPages}
          </span>

          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center px-4 py-2 text-midas-gold hover:bg-midas-gold/10 rounded disabled:opacity-30 transition-colors"
          >
            Trang sau <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookViewer;
`,
  'src/pages/Game.tsx': `
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { questions } from '../data/questions';
import { Trophy, Clock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [playerName, setPlayerName] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const navigate = useNavigate();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameState('playing');
      setStartTime(Date.now());
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return; // Prevent double click
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === questions[currentQIndex].correctAnswer) {
      setScore(prev => prev + 50); // 50 pts per question (1000 max)
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setEndTime(Date.now());
      setGameState('result');
    }
  };

  const saveScoreAndViewLeaderboard = () => {
    const timeTakenStr = formatTime(Math.floor((endTime - startTime) / 1000));
    const newEntry = {
      name: playerName,
      score: score,
      correct: correctCount,
      time: timeTakenStr,
      timestamp: Date.now()
    };
    
    const existing = JSON.parse(localStorage.getItem('midasLeaderboard') || '[]');
    existing.push(newEntry);
    localStorage.setItem('midasLeaderboard', JSON.stringify(existing));
    
    navigate('/leaderboard');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return \`\${m}:\${s}\`;
  };

  // --- RENDERS ---

  if (gameState === 'start') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-midas-panel border border-midas-gold/30 p-10 rounded-2xl max-w-lg w-full text-center shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        >
          <Trophy className="w-16 h-16 text-midas-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl text-midas-ivory font-bold mb-2 tracking-wider">MIDAS CHALLENGE</h1>
          <p className="text-midas-champagne text-lg italic mb-8">"Bạn hiểu câu chuyện Midas đến đâu?"</p>
          
          <div className="flex justify-center space-x-8 mb-8 text-sm text-midas-gray">
            <div className="flex flex-col items-center">
              <span className="text-2xl text-midas-gold font-bold">20</span>
              <span>Câu hỏi</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-midas-gold font-bold">1000</span>
              <span>Điểm tối đa</span>
            </div>
          </div>

          <form onSubmit={handleStart} className="flex flex-col space-y-4">
            <input 
              type="text" 
              required
              placeholder="Nhập tên của bạn..." 
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              className="bg-black/50 border border-midas-gold/30 text-white px-4 py-3 rounded text-center focus:outline-none focus:border-midas-gold"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-midas-gold to-yellow-600 text-black font-bold py-3 rounded shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all flex justify-center items-center"
            >
              <Play className="w-5 h-5 mr-2" /> BẮT ĐẦU CHƠI
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'result') {
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-midas-panel border border-midas-gold/30 p-10 rounded-2xl max-w-lg w-full text-center"
        >
          <h1 className="font-serif text-4xl text-midas-gold mb-2">🎉 HOÀN THÀNH!</h1>
          <h2 className="text-2xl text-midas-ivory font-bold mb-6">{playerName}</h2>
          
          <div className="text-6xl font-bold text-midas-gold mb-4 text-glow">{score} <span className="text-2xl text-midas-gray">/ 1000</span></div>
          
          <div className="flex justify-center space-x-6 mb-8 text-midas-ivory/80">
            <div><span className="text-green-400 font-bold">{correctCount}</span> Đúng</div>
            <div><span className="text-red-400 font-bold">{20 - correctCount}</span> Sai</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {formatTime(timeTaken)}</div>
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={saveScoreAndViewLeaderboard}
              className="bg-gradient-to-r from-midas-gold to-yellow-600 text-black font-bold py-3 rounded"
            >
              🏆 LƯU & XEM BẢNG XẾP HẠNG
            </button>
            <button 
              onClick={() => {
                setGameState('start');
                setCurrentQIndex(0);
                setScore(0);
                setCorrectCount(0);
                setSelectedOption(null);
                setShowExplanation(false);
                setPlayerName('');
              }}
              className="border border-midas-gold/50 text-midas-gold py-3 rounded hover:bg-midas-gold/10"
            >
              CHƠI LẠI
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // PLAYING STATE
  const q = questions[currentQIndex];

  return (
    <div className="min-h-[80vh] py-10 px-4 max-w-3xl mx-auto flex flex-col">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-midas-gold font-serif mb-2">
          <span>CÂU {String(currentQIndex + 1).padStart(2, '0')} / 20</span>
          <span>ĐIỂM: {score}</span>
        </div>
        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-midas-gold transition-all duration-300" 
            style={{ width: \`\${((currentQIndex + 1) / 20) * 100}%\` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-midas-panel border border-midas-gold/20 p-8 rounded-xl mb-6 min-h-[150px] flex items-center shadow-lg">
        <h2 className="text-xl md:text-2xl text-midas-ivory leading-relaxed font-medium">{q.question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {q.options.map((opt, idx) => {
          let btnClass = "text-left p-4 rounded-lg border transition-all duration-200 ";
          
          if (selectedOption === null) {
            btnClass += "border-midas-gold/30 hover:border-midas-gold hover:bg-midas-gold/5 bg-black/40";
          } else {
            if (idx === q.correctAnswer) {
              btnClass += "border-green-500 bg-green-500/20 text-green-300"; // Correct answer highlights green
            } else if (idx === selectedOption) {
              btnClass += "border-red-500 bg-red-500/20 text-red-300"; // Wrong selected highlights red
            } else {
              btnClass += "border-midas-gold/10 bg-black/20 opacity-50"; // Others fade out
            }
          }

          return (
            <button 
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={btnClass}
              disabled={selectedOption !== null}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {showExplanation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 border border-midas-gold/30 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <h4 className={\`font-bold mb-1 \${selectedOption === q.correctAnswer ? 'text-green-400' : 'text-red-400'}\`}>
              {selectedOption === q.correctAnswer ? '✅ Chính xác!' : '❌ Chưa chính xác!'}
            </h4>
            <p className="text-midas-ivory/80 text-sm leading-relaxed">{q.explanation}</p>
          </div>
          <button 
            onClick={handleNext}
            className="whitespace-nowrap px-6 py-3 bg-midas-gold text-black font-bold rounded hover:bg-yellow-500 transition-colors"
          >
            {currentQIndex === 19 ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Game;
`,
  'src/pages/Leaderboard.tsx': `
import { useState, useEffect } from 'react';
import { Trophy, Medal, Clock } from 'lucide-react';

interface ScoreEntry {
  name: string;
  score: number;
  correct: number;
  time: string;
  timestamp: number;
}

const Leaderboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('midasLeaderboard') || '[]');
    // Sort: Score Descending, then Time Ascending
    data.sort((a: ScoreEntry, b: ScoreEntry) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.time.localeCompare(b.time); // Simple string compare works for MM:SS
    });
    setScores(data);
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Medal className="w-6 h-6 text-yellow-400" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (index === 2) return <Medal className="w-6 h-6 text-[#cd7f32]" />;
    return <span className="font-bold text-midas-gray w-6 text-center">{index + 1}</span>;
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Trophy className="w-16 h-16 text-midas-gold mx-auto mb-4" />
        <h2 className="text-4xl font-serif text-midas-gold uppercase font-bold mb-2">Bảng Xếp Hạng Midas</h2>
        <p className="text-midas-champagne italic">"Cùng xem ai là người hiểu Midas nhất."</p>
      </div>

      <div className="bg-midas-panel border border-midas-gold/20 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/60 text-midas-gold border-b border-midas-gold/30">
                <th className="p-4 w-20 text-center">Hạng</th>
                <th className="p-4">Người chơi</th>
                <th className="p-4 text-center">Điểm</th>
                <th className="p-4 text-center">Đúng</th>
                <th className="p-4 text-center"><Clock className="w-4 h-4 inline" /></th>
              </tr>
            </thead>
            <tbody>
              {scores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-midas-gray">Chưa có dữ liệu. Hãy là người đầu tiên chơi!</td>
                </tr>
              ) : (
                scores.map((entry, idx) => (
                  <tr 
                    key={idx} 
                    className={\`border-b border-midas-gold/10 hover:bg-white/5 transition-colors \${idx < 3 ? 'bg-midas-gold/5' : ''}\`}
                  >
                    <td className="p-4 flex justify-center items-center">{getRankIcon(idx)}</td>
                    <td className="p-4 font-medium text-midas-ivory">{entry.name}</td>
                    <td className="p-4 text-center font-bold text-midas-gold">{entry.score}</td>
                    <td className="p-4 text-center text-midas-ivory/80">{entry.correct}/20</td>
                    <td className="p-4 text-center text-midas-gray text-sm">{entry.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
`,
  'src/pages/About.tsx': `
const About = () => {
  return (
    <div className="min-h-[80vh] py-16 px-4 max-w-3xl mx-auto text-midas-ivory">
      <h1 className="font-serif text-4xl text-midas-gold font-bold uppercase mb-8 border-b border-midas-gold/20 pb-4 text-center">Về Dự Án Midas</h1>
      
      <div className="space-y-8 text-lg font-light leading-relaxed">
        <section>
          <h2 className="text-2xl text-midas-champagne font-serif mb-4">Ý tưởng dự án</h2>
          <p className="text-midas-ivory/80">
            Dự án "MIDAS: Hơn cả một câu chuyện về vàng" được xây dựng như một nền tảng giáo dục tương tác. Thay vì những bài giảng khô khan, chúng tôi biến kiến thức Kinh tế chính trị Mác - Lênin thành một hành trình khám phá thú vị thông qua câu chuyện thần thoại quen thuộc về Vua Midas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl text-midas-champagne font-serif mb-4">Chủ đề & Mục tiêu</h2>
          <p className="text-midas-ivory/80 mb-4">
            Website giúp người học hiểu rõ bản chất của:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-midas-ivory/70 marker:text-midas-gold">
            <li>Nguồn gốc và bản chất của tiền tệ.</li>
            <li>Sự khác biệt giữa công cụ trao đổi (tiền) và của cải thực sự (giá trị sử dụng).</li>
            <li>Các loại hàng hóa đặc biệt trong nền kinh tế hiện đại (Quyền sử dụng đất, thương hiệu, chứng khoán).</li>
            <li>Hiểm họa của lạm phát và sự sùng bái tiền bạc.</li>
          </ul>
        </section>

        <section className="bg-midas-panel border border-midas-gold/20 p-6 rounded-lg mt-10 text-center">
          <p className="italic text-midas-gold mb-2">"Đừng biến mình thành một Midas của thời hiện đại, chết đói trên chính đống vàng của mình."</p>
          <p className="text-sm text-midas-gray">— Thông điệp từ nhóm phát triển</p>
        </section>
      </div>
    </div>
  );
};

export default About;
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(__dirname, filepath), content);
  console.log('Created:', filepath);
}

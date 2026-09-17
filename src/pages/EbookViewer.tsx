import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import { ebookData } from '../data/ebookData';
import { useNavigate } from 'react-router-dom';

const EbookViewer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();
  
  // Touch variables for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextPage = () => {
    if (currentPage < ebookData.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPage();
    } else if (isRightSwipe) {
      prevPage();
    }
    
    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0
      };
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:min-h-[85vh] bg-transparent pt-16 md:pt-24 pb-20 md:pb-10 max-w-5xl mx-auto md:px-6 relative">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-midas-gold/10 bg-midas-dark/80 backdrop-blur-md sticky top-16 z-30">
        <button onClick={() => navigate('/')} className="flex items-center text-midas-gold">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-serif font-bold tracking-widest uppercase text-sm">Midas</span>
        </button>
        <span className="text-midas-ivory/60 text-sm font-serif">{currentPage + 1} / {ebookData.length}</span>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Main Content Area */}
        <div 
          className="flex-1 flex flex-col items-center justify-center relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full max-w-3xl bg-midas-panel/50 md:border md:border-midas-gold/20 md:rounded-xl shadow-2xl p-6 md:p-12 min-h-[65vh] md:min-h-[500px] flex flex-col mt-4 md:mt-0"
            >
              <div className="flex items-center justify-center mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-midas-gold/30 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-midas-gold" />
                </div>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-midas-gold mb-6 md:mb-8 text-center px-2 leading-snug">
                {ebookData[currentPage].title}
              </h2>
              
              <div className="prose prose-invert prose-p:text-midas-ivory/90 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg max-w-none text-justify px-2 md:px-6">
                {ebookData[currentPage].content.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-[60px] md:bottom-20 left-0 w-full h-1 bg-midas-gold/10">
        <div 
          className="h-full bg-midas-gold transition-all duration-300"
          style={{ width: `${((currentPage + 1) / ebookData.length) * 100}%` }}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed md:absolute bottom-0 left-0 w-full bg-midas-dark/90 md:bg-transparent backdrop-blur-md border-t border-midas-gold/10 md:border-none px-5 py-4 flex items-center justify-between z-30">
        <button 
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-3 bg-midas-panel md:bg-midas-gold text-midas-gold md:text-black font-bold rounded-full md:rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-midas-gold/20 md:hover:bg-yellow-500 transition-all border border-midas-gold/30 md:border-none"
        >
          <ChevronLeft className="w-6 h-6 md:mr-2" />
          <span className="hidden md:inline">Trang trước</span>
        </button>

        <div className="text-midas-ivory/60 font-serif text-sm">
          {currentPage + 1} / {ebookData.length}
        </div>

        <button 
          onClick={nextPage}
          disabled={currentPage === ebookData.length - 1}
          className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-3 bg-midas-panel md:bg-midas-gold text-midas-gold md:text-black font-bold rounded-full md:rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-midas-gold/20 md:hover:bg-yellow-500 transition-all border border-midas-gold/30 md:border-none"
        >
          <span className="hidden md:inline">Trang sau</span>
          <ChevronRight className="w-6 h-6 md:ml-2" />
        </button>
      </div>

    </div>
  );
};

export default EbookViewer;

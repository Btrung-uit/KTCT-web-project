
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
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
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

import { ArrowLeft, BookOpen, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EbookViewer = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-16 md:pt-24 pb-10 max-w-6xl mx-auto px-4 md:px-6 relative w-full h-[100dvh]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between py-4 border-b border-midas-gold/10 bg-midas-dark/80 backdrop-blur-md mb-4 rounded-xl px-5">
        <button onClick={() => navigate('/')} className="flex items-center text-midas-gold hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-serif font-bold tracking-widest uppercase text-sm">Quay lại</span>
        </button>
        <div className="flex items-center text-midas-ivory/80">
          <BookOpen className="w-5 h-5 mr-2 text-midas-gold" />
          <span className="font-serif font-bold">EBOOK</span>
        </div>
        <a 
          href="/assets/midas-ebook.pdf" 
          download="Midas_Ebook.pdf"
          className="flex items-center text-midas-gold hover:text-yellow-400 transition-colors text-sm"
        >
          <Download className="w-5 h-5 mr-1" />
          <span className="hidden md:inline">Tải xuống</span>
        </a>
      </div>

      {/* Main Content Area - PDF Iframe */}
      <div className="flex-1 w-full bg-midas-panel/50 border border-midas-gold/20 rounded-xl shadow-2xl overflow-hidden relative">
        <iframe 
          src="/assets/midas-ebook.pdf#toolbar=0" 
          className="w-full h-full border-none"
          title="Midas Ebook"
        >
          Trình duyệt của bạn không hỗ trợ xem PDF trực tiếp. Vui lòng tải xuống file PDF để xem.
        </iframe>
      </div>
    </div>
  );
};

export default EbookViewer;

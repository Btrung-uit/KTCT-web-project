import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { mindmapData, MindMapNode } from '../data/mindmapData';

// --- Icon Helper ---
const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

// --- Mobile Accordion Node ---
const MobileNode = ({ node, level = 0 }: { node: MindMapNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level === 0); // Root open by default
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div className={`flex flex-col w-full ${level > 0 ? 'mt-3' : ''}`}>
      <div 
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`relative z-10 flex flex-col p-4 rounded-xl border transition-all ${
          level === 0 
            ? 'bg-gradient-to-br from-midas-dark to-black border-midas-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
            : level === 1
              ? 'bg-midas-panel/90 border-midas-gold/50'
              : 'bg-black/60 border-midas-gold/20'
        } ${hasChildren ? 'cursor-pointer active:scale-[0.98]' : ''}`}
      >
        <div className="flex items-start">
          <div className={`p-2 rounded-lg mr-3 ${level === 0 ? 'bg-midas-gold/20 text-midas-gold' : 'bg-midas-dark/50 text-midas-ivory/80'}`}>
            {renderIcon(node.icon, level === 0 ? 'w-6 h-6' : 'w-5 h-5')}
          </div>
          <div className="flex-1">
            <h3 className={`font-serif font-bold ${level === 0 ? 'text-xl text-midas-gold' : 'text-lg text-midas-ivory'}`}>
              {node.title}
            </h3>
            {node.subtitle && <p className="text-sm text-midas-gold/80 italic mt-1">{node.subtitle}</p>}
            
            {node.points.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {node.points.map((pt, i) => (
                  <li key={i} className="text-sm text-midas-ivory/80 flex items-start">
                    <span className="text-midas-gold mr-2 mt-0.5">•</span>
                    <span className="leading-snug">{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {hasChildren && (
            <div className="ml-2 text-midas-gold/50 mt-1">
              {isOpen ? <Icons.ChevronUp className="w-5 h-5" /> : <Icons.ChevronDown className="w-5 h-5" />}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-6 md:pl-8 border-l-2 border-midas-gold/20 ml-6 md:ml-8 mt-2 pb-2">
              {node.children!.map((child) => (
                <MobileNode key={child.id} node={child} level={level + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Desktop Canvas Node ---
const DesktopNode = ({ node, isRoot = false, onClick }: { node: MindMapNode; isRoot?: boolean, onClick?: () => void }) => {
  return (
    <div 
      className={`relative group flex flex-col p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] ${
        isRoot 
          ? 'bg-gradient-to-br from-midas-dark/90 to-black/90 border-midas-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] w-72 text-center' 
          : 'bg-midas-panel/80 border-midas-gold/40 hover:border-midas-gold w-64'
      }`}
      onClick={onClick}
    >
      <div className={`flex items-start ${isRoot ? 'flex-col items-center' : ''}`}>
        <div className={`p-2 rounded-lg ${isRoot ? 'bg-midas-gold/20 text-midas-gold mb-3' : 'bg-black/50 text-midas-gold/80 mr-3'}`}>
          {renderIcon(node.icon, isRoot ? 'w-8 h-8' : 'w-5 h-5')}
        </div>
        <div>
          <h3 className={`font-serif font-bold ${isRoot ? 'text-2xl text-midas-gold' : 'text-lg text-midas-ivory'}`}>
            {node.title}
          </h3>
          {node.subtitle && <p className="text-sm text-midas-gold/80 italic mt-1">{node.subtitle}</p>}
        </div>
      </div>
      
      {node.points.length > 0 && (
        <ul className={`mt-3 space-y-1.5 ${isRoot ? 'text-left' : ''}`}>
          {node.points.map((pt, i) => (
            <li key={i} className="text-sm text-midas-ivory/80 flex items-start leading-snug">
              <span className="text-midas-gold mr-2 mt-0.5">•</span>
              {pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function MindMap() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pan & Zoom State for Desktop
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop Pan/Zoom Handlers
  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const scaleAdjust = e.deltaY > 0 ? 0.9 : 1.1;
    let newScale = transform.scale * scaleAdjust;
    newScale = Math.min(Math.max(0.3, newScale), 2);
    setTransform(prev => ({ ...prev, scale: newScale }));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isMobile) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isMobile) return;
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const resetView = () => {
    setTransform({ x: 0, y: 0, scale: 0.8 });
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative w-full pt-16">
      
      {/* Background Texture & Glow */}
      <div className="fixed inset-0 z-[-1] bg-[#0D0A08]">
        <div className="absolute inset-0 bg-[url('/assets/images/hero-bg.jpg')] opacity-10 object-cover mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#15100D]/80 via-[#0D0A08]/90 to-[#0D0A08]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-midas-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* Header Info */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-4 text-center w-full">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-midas-gold uppercase tracking-widest mb-3 drop-shadow-lg">
          Sơ đồ tư duy Midas
        </h1>
        <p className="text-midas-ivory/80 text-sm md:text-base max-w-2xl mx-auto italic">
          "Từ câu chuyện về vàng → bản chất của tiền → thế nào mới là của cải thực sự?"
        </p>
        
        {/* Summary 30s Box */}
        <div className="mt-8 bg-midas-dark/60 border border-midas-gold/30 rounded-xl p-5 max-w-3xl mx-auto text-left shadow-lg backdrop-blur-sm">
          <div className="flex items-center text-midas-gold mb-3">
            <Icons.Timer className="w-5 h-5 mr-2" />
            <h3 className="font-bold font-serif">NẾU CHỈ CÓ 30 GIÂY, HÃY NHỚ 5 ĐIỀU NÀY:</h3>
          </div>
          <ol className="list-decimal pl-5 text-sm md:text-base text-midas-ivory/90 space-y-2">
            <li>Midas đã nhầm lẫn vàng với của cải thực sự.</li>
            <li>Tiền hình thành từ nhu cầu trao đổi của sản xuất hàng hóa.</li>
            <li>Vàng từng là vật ngang giá chung lý tưởng.</li>
            <li>Tiền có 5 chức năng cốt lõi (Thước đo giá trị, Lưu thông, Cất trữ, Thanh toán, Tiền thế giới).</li>
            <li><strong>Bẫy Midas:</strong> Nhiều tiền hoặc giá tài sản tăng không tự động đồng nghĩa với xã hội giàu thêm.</li>
          </ol>
        </div>
      </div>

      {/* Mind Map Area */}
      <div className="flex-1 relative w-full overflow-hidden mt-4 z-10" ref={containerRef}>
        
        {/* Desktop Controls */}
        {!isMobile && (
          <div className="absolute bottom-6 right-6 z-30 flex space-x-2">
            <button onClick={() => setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, 2) }))} className="p-3 bg-midas-panel border border-midas-gold/30 rounded-lg text-midas-gold hover:bg-midas-gold/20">
              <Icons.ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={() => setTransform(prev => ({ ...prev, scale: Math.max(prev.scale * 0.8, 0.3) }))} className="p-3 bg-midas-panel border border-midas-gold/30 rounded-lg text-midas-gold hover:bg-midas-gold/20">
              <Icons.ZoomOut className="w-5 h-5" />
            </button>
            <button onClick={resetView} className="p-3 bg-midas-panel border border-midas-gold/30 rounded-lg text-midas-gold hover:bg-midas-gold/20">
              <Icons.Focus className="w-5 h-5" />
            </button>
          </div>
        )}

        {isMobile ? (
          /* MOBILE VIEW (Vertical Accordion) */
          <div className="px-4 pb-20 w-full max-w-xl mx-auto space-y-6">
            <MobileNode node={mindmapData} />
            
            {/* Conclusion Node Mobile */}
            <div className="bg-red-900/20 border-2 border-midas-gold p-6 rounded-xl text-center mt-10 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
              <Icons.Crown className="w-10 h-10 text-midas-gold mx-auto mb-4" />
              <h2 className="text-xl font-serif font-bold text-midas-gold mb-4">KẾT LUẬN — MIDAS ĐÃ SAI Ở ĐÂU?</h2>
              <p className="text-midas-ivory/90 mb-3 font-bold">Midas đã đồng nhất vàng và tiền với của cải.</p>
              <p className="text-midas-ivory/70 text-sm mb-6 leading-relaxed">
                Tiền, giá cả và thị giá tài sản có thể tăng, nhưng điều đó không tự động đồng nghĩa với việc xã hội tạo ra thêm của cải tương ứng.
              </p>
              <div className="border-t border-midas-gold/30 pt-4 mt-2">
                <p className="font-serif text-lg text-midas-gold italic">
                  "ĐỪNG NHẦM LẪN GIÀU CÓ TRÊN GIẤY VỚI CỦA CẢI THỰC."
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* DESKTOP VIEW (Pan / Zoom Canvas) */
          <div 
            className="absolute inset-0 touch-none overflow-hidden cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <motion.div 
              className="absolute top-1/2 left-1/2 transform-gpu"
              style={{
                x: transform.x,
                y: transform.y,
                scale: transform.scale,
                translateX: '-50%',
                translateY: '-50%'
              }}
              transition={{ type: 'tween', duration: 0 }}
            >
              <div className="relative w-[1800px] h-[1000px] flex items-center justify-center">
                
                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <g stroke="#C9A24A" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round">
                    {/* Root to Left branches (0, 1) */}
                    <path d="M 900 500 Q 750 500 700 300" />
                    <path d="M 900 500 Q 750 500 700 700" />
                    
                    {/* Root to Right branches (2, 3, 4) */}
                    <path d="M 900 500 Q 1050 500 1100 200" />
                    <path d="M 900 500 Q 1050 500 1100 500" />
                    <path d="M 900 500 Q 1050 500 1100 800" />

                    {/* Left Branch 0 -> Children */}
                    <path d="M 444 300 L 300 250" />
                    <path d="M 444 300 L 300 350" />

                    {/* Left Branch 1 -> Children */}
                    <path d="M 444 700 L 300 600" />
                    <path d="M 444 700 L 300 700" />
                    <path d="M 444 700 L 300 800" />

                    {/* Right Branch 2 -> Children */}
                    <path d="M 1356 200 L 1500 100" />
                    <path d="M 1356 200 L 1500 200" />
                    <path d="M 1356 200 L 1500 300" />

                    {/* Right Branch 3 -> Children */}
                    <path d="M 1356 500 L 1500 360" />
                    <path d="M 1356 500 L 1500 430" />
                    <path d="M 1356 500 L 1500 500" />
                    <path d="M 1356 500 L 1500 570" />
                    <path d="M 1356 500 L 1500 640" />

                    {/* Right Branch 4 -> Children */}
                    <path d="M 1356 800 L 1500 700" />
                    <path d="M 1356 800 L 1500 770" />
                    <path d="M 1356 800 L 1500 840" />
                    <path d="M 1356 800 L 1500 910" />
                  </g>
                </svg>

                {/* CENTRAL ROOT NODE */}
                <div className="absolute left-[756px] top-[400px] z-10">
                  <DesktopNode node={mindmapData} isRoot />
                </div>

                {/* LEFT BRANCHES (0, 1) */}
                {/* Branch 1 */}
                <div className="absolute left-[444px] top-[250px] z-10">
                  <DesktopNode node={mindmapData.children![0]} />
                </div>
                {/* Children of Branch 1 */}
                <div className="absolute left-[44px] top-[180px] z-10"><DesktopNode node={mindmapData.children![0].children![0]} /></div>
                <div className="absolute left-[44px] top-[320px] z-10"><DesktopNode node={mindmapData.children![0].children![1]} /></div>

                {/* Branch 2 */}
                <div className="absolute left-[444px] top-[650px] z-10">
                  <DesktopNode node={mindmapData.children![1]} />
                </div>
                {/* Children of Branch 2 */}
                <div className="absolute left-[44px] top-[550px] z-10"><DesktopNode node={mindmapData.children![1].children![0]} /></div>
                <div className="absolute left-[44px] top-[670px] z-10"><DesktopNode node={mindmapData.children![1].children![1]} /></div>
                <div className="absolute left-[44px] top-[800px] z-10"><DesktopNode node={mindmapData.children![1].children![2]} /></div>


                {/* RIGHT BRANCHES (2, 3, 4) */}
                {/* Branch 3 */}
                <div className="absolute left-[1100px] top-[150px] z-10">
                  <DesktopNode node={mindmapData.children![2]} />
                </div>
                {/* Children of Branch 3 */}
                <div className="absolute left-[1500px] top-[50px] z-10"><DesktopNode node={mindmapData.children![2].children![0]} /></div>
                <div className="absolute left-[1500px] top-[170px] z-10"><DesktopNode node={mindmapData.children![2].children![1]} /></div>
                <div className="absolute left-[1500px] top-[310px] z-10"><DesktopNode node={mindmapData.children![2].children![2]} /></div>

                {/* Branch 4 */}
                <div className="absolute left-[1100px] top-[450px] z-10">
                  <DesktopNode node={mindmapData.children![3]} />
                </div>
                {/* Children of Branch 4 */}
                <div className="absolute left-[1500px] top-[400px] z-10 scale-[0.85] origin-left"><DesktopNode node={mindmapData.children![3].children![0]} /></div>
                <div className="absolute left-[1500px] top-[480px] z-10 scale-[0.85] origin-left"><DesktopNode node={mindmapData.children![3].children![1]} /></div>
                <div className="absolute left-[1500px] top-[560px] z-10 scale-[0.85] origin-left"><DesktopNode node={mindmapData.children![3].children![2]} /></div>
                <div className="absolute left-[1500px] top-[640px] z-10 scale-[0.85] origin-left"><DesktopNode node={mindmapData.children![3].children![3]} /></div>
                <div className="absolute left-[1500px] top-[720px] z-10 scale-[0.85] origin-left"><DesktopNode node={mindmapData.children![3].children![4]} /></div>

                {/* Branch 5 */}
                <div className="absolute left-[1100px] top-[750px] z-10">
                  <DesktopNode node={mindmapData.children![4]} />
                </div>
                {/* Children of Branch 5 */}
                <div className="absolute left-[1500px] top-[760px] z-10 scale-[0.9] origin-left"><DesktopNode node={mindmapData.children![4].children![0]} /></div>
                <div className="absolute left-[1500px] top-[860px] z-10 scale-[0.9] origin-left"><DesktopNode node={mindmapData.children![4].children![1]} /></div>
                <div className="absolute left-[1500px] top-[960px] z-10 scale-[0.9] origin-left"><DesktopNode node={mindmapData.children![4].children![2]} /></div>
                <div className="absolute left-[1500px] top-[1080px] z-10 scale-[0.9] origin-left"><DesktopNode node={mindmapData.children![4].children![3]} /></div>

              </div>
              
              {/* CONCLUSION NODE DESKTOP */}
              <div className="absolute top-[1300px] left-1/2 -translate-x-1/2 w-[800px] z-20 pb-[200px]">
                <div className="bg-red-900/10 border-2 border-midas-gold/60 p-10 rounded-2xl text-center shadow-[0_0_30px_rgba(212,175,55,0.2)] backdrop-blur-md">
                  <Icons.Crown className="w-12 h-12 text-midas-gold mx-auto mb-4" />
                  <h2 className="text-3xl font-serif font-bold text-midas-gold mb-6 tracking-wider">KẾT LUẬN — MIDAS ĐÃ SAI Ở ĐÂU?</h2>
                  <p className="text-midas-ivory/90 mb-4 font-bold text-xl">Midas đã đồng nhất vàng và tiền với của cải.</p>
                  <p className="text-midas-ivory/70 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                    Tiền, giá cả và thị giá tài sản có thể tăng, nhưng điều đó không tự động đồng nghĩa với việc xã hội tạo ra thêm của cải tương ứng. Của cải thực sự gắn với những giá trị sử dụng và hàng hóa, dịch vụ đáp ứng nhu cầu của con người.
                  </p>
                  <div className="border-t border-midas-gold/30 pt-6 mt-4">
                    <p className="font-serif text-2xl text-midas-gold italic font-bold">
                      "ĐỪNG NHẦM LẪN GIÀU CÓ TRÊN GIẤY VỚI CỦA CẢI THỰC."
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </div>

      {/* FOOTER CTA */}
      <div className="relative z-20 border-t border-midas-gold/20 bg-midas-dark/95 py-10 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-2xl text-midas-ivory font-bold mb-6">MUỐN HIỂU MIDAS ĐẦY ĐỦ HƠN?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/ebook" className="px-8 py-4 bg-midas-gold text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center">
              <Icons.BookOpen className="w-5 h-5 mr-2" /> ĐỌC EBOOK CHI TIẾT
            </Link>
            <Link to="/game" className="px-8 py-4 bg-transparent border-2 border-midas-gold text-midas-gold font-bold rounded-lg hover:bg-midas-gold/10 transition-colors flex items-center justify-center">
              <Icons.Gamepad2 className="w-5 h-5 mr-2" /> THỬ THÁCH 20 CÂU HỎI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

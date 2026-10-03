import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { mindmapData, type MindMapNode } from '../data/mindmapData';

// --- Icon Helper ---
const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

// --- Leaf Node (Level 2) ---
const LeafNode = ({ node }: { node: MindMapNode }) => {
  return (
    <div className="bg-midas-dark/40 border border-midas-gold/20 p-4 md:p-6 rounded-xl hover:border-midas-gold/50 transition-colors">
      <div className="flex items-start mb-2">
        <div className="p-2 rounded-lg bg-black/50 text-midas-gold/80 mr-3">
          {renderIcon(node.icon, 'w-5 h-5')}
        </div>
        <div>
          <h4 className="font-serif font-bold text-lg text-midas-ivory">{node.title}</h4>
          {node.subtitle && <p className="text-sm text-midas-gold/80 italic mt-1">{node.subtitle}</p>}
        </div>
      </div>
      {node.points && node.points.length > 0 && (
        <ul className="mt-3 space-y-2">
          {node.points.map((pt, i) => (
            <li key={i} className="text-sm md:text-base text-midas-ivory/80 flex items-start">
              <span className="text-midas-gold mr-2 mt-0.5">•</span>
              <span className="leading-snug">{pt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function MindMap() {
  const [openBranchId, setOpenBranchId] = useState<string | null>('branch-1');

  return (
    <div className="flex flex-col min-h-screen bg-transparent relative w-full pt-16 pb-20">
      
      {/* Background Texture & Glow */}
      <div className="fixed inset-0 z-[-1] bg-[#0D0A08]">
        <div className="absolute inset-0 bg-[url('/assets/images/hero-bg.jpg')] opacity-10 object-cover mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#15100D]/80 via-[#0D0A08]/90 to-[#0D0A08]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-midas-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* Header Info */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 md:px-6 pt-8 pb-4 text-center w-full">
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

      {/* Accordion Tree Area */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-4 mt-8 space-y-6">
        
        {/* Root Node */}
        <div className="bg-gradient-to-br from-midas-dark/90 to-black/90 border-2 border-midas-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] p-6 md:p-8 rounded-2xl text-center mb-10 relative">
          <Icons.Crown className="w-12 h-12 text-midas-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-midas-gold mb-2">{mindmapData.title}</h2>
          {mindmapData.subtitle && <p className="text-midas-gold/80 italic">{mindmapData.subtitle}</p>}
          {/* Decorative connector line going down */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-midas-gold/40 hidden md:block"></div>
        </div>

        {/* Branches Accordion */}
        <div className="space-y-4">
          {mindmapData.children?.map((branch) => {
            const isOpen = openBranchId === branch.id;
            
            return (
              <div key={branch.id} className="relative">
                {/* Branch Header (Clickable) */}
                <div 
                  onClick={() => setOpenBranchId(isOpen ? null : branch.id)}
                  className={`flex items-center justify-between p-4 md:p-6 rounded-xl border transition-all cursor-pointer ${
                    isOpen 
                      ? 'bg-midas-panel border-midas-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : 'bg-black/60 border-midas-gold/30 hover:border-midas-gold/70 hover:bg-midas-dark/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg mr-4 ${isOpen ? 'bg-midas-gold/20 text-midas-gold' : 'bg-midas-dark/80 text-midas-ivory/70'}`}>
                      {renderIcon(branch.icon, 'w-6 h-6')}
                    </div>
                    <div>
                      <h3 className={`font-serif font-bold md:text-xl ${isOpen ? 'text-midas-gold' : 'text-midas-ivory'}`}>
                        {branch.title}
                      </h3>
                      {branch.subtitle && <p className="text-sm md:text-base text-midas-gray mt-1">{branch.subtitle}</p>}
                    </div>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 text-midas-gold' : 'text-midas-gray'}`}>
                    <Icons.ChevronDown className="w-6 h-6" />
                  </div>
                </div>

                {/* Branch Children (Expandable) */}
                <AnimatePresence>
                  {isOpen && branch.children && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {/* Vertical line indicator */}
                      <div className="relative pl-0 md:pl-10 mt-4 md:border-l-2 md:border-midas-gold/20 md:ml-12 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {branch.points.length > 0 && (
                          <div className="col-span-1 md:col-span-2 mb-2 bg-midas-dark/60 p-4 rounded-xl border border-midas-gold/20">
                            <ul className="space-y-2">
                              {branch.points.map((pt, i) => (
                                <li key={i} className="text-sm md:text-base text-midas-ivory/90 flex items-start">
                                  <span className="text-midas-gold mr-2 mt-0.5">•</span>
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {branch.children.map(child => (
                          <LeafNode key={child.id} node={child} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONCLUSION NODE */}
      <div className="relative z-20 mt-16 w-full max-w-4xl mx-auto px-4">
        <div className="bg-red-900/10 border-2 border-midas-gold/60 p-8 md:p-10 rounded-2xl text-center shadow-[0_0_30px_rgba(212,175,55,0.2)] backdrop-blur-md">
          <Icons.Crown className="w-12 h-12 text-midas-gold mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-midas-gold mb-6 tracking-wider">KẾT LUẬN — MIDAS ĐÃ SAI Ở ĐÂU?</h2>
          <p className="text-midas-ivory/90 mb-4 font-bold text-lg md:text-xl">Midas đã đồng nhất vàng và tiền với của cải.</p>
          <p className="text-midas-ivory/70 text-base md:text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
            Tiền, giá cả và thị giá tài sản có thể tăng, nhưng điều đó không tự động đồng nghĩa với việc xã hội tạo ra thêm của cải tương ứng. Của cải thực sự gắn với những giá trị sử dụng và hàng hóa, dịch vụ đáp ứng nhu cầu của con người.
          </p>
          <div className="border-t border-midas-gold/30 pt-6 mt-4">
            <p className="font-serif text-xl md:text-2xl text-midas-gold italic font-bold">
              "ĐỪNG NHẦM LẪN GIÀU CÓ TRÊN GIẤY VỚI CỦA CẢI THỰC."
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

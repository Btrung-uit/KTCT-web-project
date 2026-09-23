import re

with open('scratch.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

branch_group_code = '''
const BranchGroup = ({ branch, isLeft = false }: { branch: MindMapNode, isLeft?: boolean }) => {
  return (
    <div className={lex items-center \}>
      
      <div className="relative z-10">
        <DesktopNode node={branch} />
        {/* Horizontal stub from branch */}
        <div className={bsolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-midas-gold/40 \} />
      </div>

      {branch.children && branch.children.length > 0 && (
        <div className={lex flex-col justify-center gap-6 relative \}>
          {/* Vertical line connecting children */}
          <div className={bsolute top-16 bottom-16 w-[2px] bg-midas-gold/40 \} />
          
          {branch.children.map(child => (
            <div key={child.id} className="relative z-10">
              {/* Horizontal stub to child */}
              <div className={bsolute top-1/2 -translate-y-1/2 w-12 h-[2px] bg-midas-gold/40 \} />
              <DesktopNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MindMap()'''

content = content.replace('export default function MindMap()', branch_group_code)

desktop_view_start = content.find('/* DESKTOP VIEW (Pan / Zoom Canvas) */')
footer_start = content.find('{/* FOOTER CTA */}')

desktop_code = '''/* DESKTOP VIEW (Pan / Zoom Canvas) */
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
              <div className="flex items-center justify-center min-w-[max-content] min-h-[max-content] p-24">
                
                {/* LEFT BRANCHES */}
                <div className="flex flex-col gap-12 relative z-10 mr-16">
                  {/* Vertical stub connecting left branches */}
                  <div className="absolute top-1/4 bottom-1/4 -right-16 w-[2px] bg-midas-gold/40" />
                  <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-16 h-[2px] bg-midas-gold/40" />
                  
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-16 h-[2px] bg-midas-gold/40" />
                    <BranchGroup branch={mindmapData.children![0]} isLeft />
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-16 h-[2px] bg-midas-gold/40" />
                    <BranchGroup branch={mindmapData.children![1]} isLeft />
                  </div>
                </div>

                {/* CENTRAL ROOT NODE */}
                <div className="relative z-20">
                  <DesktopNode node={mindmapData} isRoot />
                </div>

                {/* RIGHT BRANCHES */}
                <div className="flex flex-col gap-12 relative z-10 ml-16">
                  {/* Vertical stub connecting right branches */}
                  <div className="absolute top-[10%] bottom-[10%] -left-16 w-[2px] bg-midas-gold/40" />
                  <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-16 h-[2px] bg-midas-gold/40" />
                  
                  {mindmapData.children!.slice(2).map(branch => (
                    <div key={branch.id} className="relative">
                      <div className="absolute top-1/2 -translate-y-1/2 -left-16 w-16 h-[2px] bg-midas-gold/40" />
                      <BranchGroup branch={branch} />
                    </div>
                  ))}
                </div>

              </div>
              
              {/* CONCLUSION NODE DESKTOP */}
              <div className="mt-16 w-full max-w-[800px] mx-auto pb-32">
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

      '''

new_content = content[:desktop_view_start] + desktop_code + content[footer_start:]

with open('src/pages/MindMap.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

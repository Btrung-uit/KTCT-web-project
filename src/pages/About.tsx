
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

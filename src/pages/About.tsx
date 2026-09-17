import { motion } from 'framer-motion';
import { Users, BookOpen, Crown } from 'lucide-react';

const teamMembers = [
  { id: '25521963', name: 'Nguyễn Đức Bảo Trung', role: 'Đội trưởng' },
  { id: '25520128', name: 'Huỳnh Kim Quốc Bảo', role: 'Thành viên' },
  { id: '25520318', name: 'Bạch Thành Đức', role: 'Thành viên' },
  { id: '25520415', name: 'Đoàn Ngọc Anh Duy', role: 'Thành viên' },
  { id: '25520495', name: 'Võ Thị Bích Hằng', role: 'Thành viên' },
  { id: '25520549', name: 'Nguyễn Chí Hiếu', role: 'Thành viên' },
  { id: '25520743', name: 'Trịnh Gia Huy', role: 'Thành viên' },
  { id: '24520955', name: 'Huỳnh Nguyễn Duy Linh', role: 'Thành viên' },
  { id: '24521125', name: 'Đỗ Thanh Ngân', role: 'Thành viên' },
  { id: '24521267', name: 'Tống Yến Nhi', role: 'Thành viên' },
  { id: '25521323', name: 'Lê Nguyễn Phương Nhi', role: 'Thành viên' },
  { id: '25521422', name: 'Lê Hoàn Phúc', role: 'Thành viên' },
  { id: '24521414', name: 'Man Mỹ Phương', role: 'Thành viên' },
  { id: '25521547', name: 'Lê Bảo Quyên', role: 'Thành viên' },
  { id: '25521735', name: 'Phạm Phương Thảo', role: 'Thành viên' },
  { id: '25521932', name: 'Lê Thị Phương Trinh', role: 'Thành viên' },
];

const About = () => {
  return (
    <div className="py-10 md:py-16 px-4 max-w-4xl mx-auto min-h-screen relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-midas-gold mr-3" />
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-midas-gold uppercase tracking-widest">
            Về chúng tôi
          </h1>
        </div>
        <p className="text-midas-ivory/70 max-w-2xl mx-auto italic">
          Dự án website học tập "Midas - Hơn cả một câu chuyện về vàng"
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-midas-panel/80 backdrop-blur-md border border-midas-gold/20 rounded-2xl p-6 md:p-10 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-serif text-midas-gold mb-2 flex items-center justify-center">
            <Crown className="w-6 h-6 mr-2" />
            Thành viên nhóm
          </h2>
          <p className="text-midas-gray text-sm">Danh sách các thành viên tham gia thực hiện dự án</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-midas-gold/30 text-midas-gold font-serif">
                <th className="py-4 px-4 font-bold w-1/4">MSSV</th>
                <th className="py-4 px-4 font-bold w-2/4">Họ và tên</th>
                <th className="py-4 px-4 font-bold w-1/4 text-center">Chức vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-midas-gold/10">
              {teamMembers.map((member, index) => (
                <tr 
                  key={member.id} 
                  className={`hover:bg-midas-gold/5 transition-colors ${index === 0 ? 'bg-midas-gold/10' : ''}`}
                >
                  <td className="py-4 px-4 font-mono text-midas-ivory/80">{member.id}</td>
                  <td className={`py-4 px-4 ${index === 0 ? 'font-bold text-midas-gold' : 'text-midas-ivory'}`}>
                    {member.name}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      member.role === 'Đội trưởng' 
                        ? 'bg-midas-gold text-black' 
                        : 'bg-midas-dark/50 text-midas-gray border border-midas-gold/20'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

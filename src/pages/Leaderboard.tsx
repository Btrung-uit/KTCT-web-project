
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
      if (b.correct !== a.correct) return b.correct - a.correct;
      return a.time.localeCompare(b.time);
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
                    className={`border-b border-midas-gold/10 hover:bg-white/5 transition-colors ${idx < 3 ? 'bg-midas-gold/5' : ''}`}
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

import { useEffect, useState } from 'react';
import { Trophy, Clock, CheckCircle } from 'lucide-react';
import type { ScoreEntry } from './Game';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Leaderboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPlayer(localStorage.getItem('midas_last_player'));

    if (!db) {
      // Fallback to local storage if Firebase is not configured
      const data = JSON.parse(localStorage.getItem('midas_scores') || '[]');
      data.sort((a: ScoreEntry, b: ScoreEntry) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.correct !== a.correct) return b.correct - a.correct;
        return a.time.localeCompare(b.time);
      });
      setScores(data);
      setLoading(false);
      return;
    }

    // Real-time listener for Firebase
    const unsubscribe = onSnapshot(collection(db, 'leaderboard'), (snapshot) => {
      const data: ScoreEntry[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as ScoreEntry);
      });

      // Sort client-side to avoid forcing composite indexes on Firestore
      data.sort((a: ScoreEntry, b: ScoreEntry) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.correct !== a.correct) return b.correct - a.correct;
        return a.time.localeCompare(b.time);
      });

      setScores(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching leaderboard: ", error);
      // Fallback to local storage
      const data = JSON.parse(localStorage.getItem('midas_scores') || '[]');
      data.sort((a: ScoreEntry, b: ScoreEntry) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.correct !== a.correct) return b.correct - a.correct;
        return a.time.localeCompare(b.time);
      });
      setScores(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getRankIcon = (index: number) => {
    switch(index) {
      case 0: return <span className="text-2xl md:text-3xl">🥇</span>;
      case 1: return <span className="text-2xl md:text-3xl">🥈</span>;
      case 2: return <span className="text-2xl md:text-3xl">🥉</span>;
      default: return <span className="text-midas-gray font-bold text-lg w-8 text-center">#{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-[85vh] py-10 md:py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-midas-gold/20 mb-4 border border-midas-gold/30 shadow-lg shadow-midas-gold/10">
          <Trophy className="w-8 h-8 text-midas-gold" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-midas-gold uppercase tracking-wider mb-2">Bảng Xếp Hạng</h1>
        <p className="text-midas-ivory/70 max-w-md mx-auto">Những bộ óc xuất sắc nhất trong thử thách kinh tế của Vua Midas.</p>
      </div>

      <div className="bg-midas-panel border border-midas-gold/20 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-black/60 p-5 border-b border-midas-gold/20 font-bold text-midas-gold text-sm tracking-widest uppercase">
          <div className="col-span-2 text-center">Hạng</div>
          <div className="col-span-4">Người chơi</div>
          <div className="col-span-2 text-center">Điểm</div>
          <div className="col-span-2 text-center">Đúng</div>
          <div className="col-span-2 text-center">Thời gian</div>
        </div>

        {/* Mobile & Desktop List */}
        <div className="divide-y divide-midas-gold/10 min-h-[200px]">
          {loading ? (
            <div className="p-10 text-center text-midas-gold animate-pulse flex flex-col items-center justify-center h-[200px]">
              <Trophy className="w-8 h-8 mb-3 opacity-50" />
              Đang tải dữ liệu...
            </div>
          ) : scores.length === 0 ? (
            <div className="p-10 text-center text-midas-gray flex flex-col items-center justify-center h-[200px]">
              Chưa có dữ liệu. Hãy là người đầu tiên tham gia thử thách!
            </div>
          ) : (
            scores.map((entry, index) => {
              const isCurrentPlayer = entry.name === currentPlayer;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={index}
                  className={`grid grid-cols-12 gap-3 md:gap-4 p-4 md:p-5 items-center transition-colors ${
                    isCurrentPlayer 
                      ? 'bg-midas-gold/10 border-l-4 border-midas-gold' 
                      : index < 3 ? 'bg-black/20 hover:bg-black/40' : 'hover:bg-black/20'
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-2 flex justify-center">
                    {getRankIcon(index)}
                  </div>
                  
                  {/* Name & Highlight */}
                  <div className="col-span-6 md:col-span-4">
                    <div className="font-bold text-midas-ivory text-base md:text-lg truncate">
                      {isCurrentPlayer ? 'Bạn' : entry.name}
                    </div>
                    {isCurrentPlayer && (
                      <span className="text-xs text-midas-gold uppercase tracking-widest mt-1 block md:hidden">Hiện tại</span>
                    )}
                  </div>
                  
                  {/* Score & Time (Mobile) */}
                  <div className="col-span-4 md:col-span-2 text-right md:text-center">
                    <span className="font-bold text-midas-gold text-lg md:text-xl">{entry.score}</span>
                    <span className="text-xs text-midas-gray block md:hidden">điểm</span>
                    <span className="text-xs text-midas-ivory/50 block md:hidden mt-1">{entry.time}</span>
                  </div>
                  
                  {/* Correct (Desktop Only) */}
                  <div className="hidden md:flex col-span-2 justify-center items-center text-midas-ivory/80">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    {entry.correct}/20
                  </div>
                  
                  {/* Time (Desktop Only) */}
                  <div className="hidden md:flex col-span-2 justify-center items-center text-midas-ivory/80 font-mono">
                    <Clock className="w-4 h-4 mr-2 text-midas-gray" />
                    {entry.time}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Admin Panel (Hidden by default, accessible via ?admin=true) */}
      {window.location.search.includes('admin=true') && (
        <div className="mt-8 p-6 bg-midas-dark/80 border border-red-500/30 rounded-xl text-center flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={async () => {
              if (db) {
                import('firebase/firestore').then(async ({ doc, setDoc, getDoc }) => {
                  try {
                    const docRef = doc(db, 'config', 'gameState');
                    const snap = await getDoc(docRef);
                    const currentStatus = snap.exists() ? snap.data().isOpen : true; // default true
                    
                    await setDoc(docRef, { isOpen: !currentStatus });
                    alert(`Đã ${!currentStatus ? 'MỞ KHÓA' : 'KHÓA'} trò chơi thành công!`);
                  } catch (e) {
                    alert("Lỗi: Không thể kết nối Firebase.");
                  }
                });
              } else {
                alert("Firebase chưa được cấu hình!");
              }
            }}
            className="px-6 py-3 bg-blue-900/50 text-blue-300 border border-blue-500/30 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors w-full md:w-auto"
          >
            🔒 BẬT / TẮT KHÓA TRÒ CHƠI
          </button>

          <button 
            onClick={async () => {
              if (window.confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA TOÀN BỘ BẢNG XẾP HẠNG? Hành động này không thể hoàn tác!")) {
                if (db) {
                  import('firebase/firestore').then(async ({ collection, getDocs, deleteDoc, doc }) => {
                    const snapshot = await getDocs(collection(db, 'leaderboard'));
                    snapshot.forEach((document) => {
                      deleteDoc(doc(db, 'leaderboard', document.id));
                    });
                    alert("Đã xóa sạch dữ liệu trên Firebase!");
                  });
                } else {
                  localStorage.removeItem('midas_scores');
                  setScores([]);
                  alert("Đã xóa sạch dữ liệu Local Storage!");
                }
              }
            }}
            className="px-6 py-3 bg-red-900/50 text-red-300 border border-red-500/30 rounded-lg text-sm font-bold hover:bg-red-800 transition-colors w-full md:w-auto"
          >
            ⚠️ XÓA TOÀN BỘ BẢNG XẾP HẠNG
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

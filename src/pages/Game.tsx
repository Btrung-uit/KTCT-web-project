
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { questions } from '../data/questions';
import { Trophy, Clock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [playerName, setPlayerName] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, startTime]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameState('playing');
      setStartTime(Date.now());
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return; // Prevent double click
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === questions[currentQIndex].correctAnswer) {
      setScore(prev => prev + 50); // 50 pts per question (1000 max)
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setEndTime(Date.now());
      setGameState('result');
    }
  };

  const saveScoreAndViewLeaderboard = () => {
    const timeTakenStr = formatTime(Math.floor((endTime - startTime) / 1000));
    const newEntry = {
      name: playerName,
      score: score,
      correct: correctCount,
      time: timeTakenStr,
      timestamp: Date.now()
    };
    
    const existing = JSON.parse(localStorage.getItem('midasLeaderboard') || '[]');
    existing.push(newEntry);
    localStorage.setItem('midasLeaderboard', JSON.stringify(existing));
    
    navigate('/leaderboard');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // --- RENDERS ---

  if (gameState === 'start') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-midas-panel border border-midas-gold/30 p-10 rounded-2xl max-w-lg w-full text-center shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        >
          <Trophy className="w-16 h-16 text-midas-gold mx-auto mb-4" />
          <h1 className="font-serif text-4xl text-midas-ivory font-bold mb-2 tracking-wider">MIDAS CHALLENGE</h1>
          <p className="text-midas-champagne text-lg italic mb-8">"Bạn hiểu câu chuyện Midas đến đâu?"</p>
          
          <div className="flex justify-center space-x-8 mb-8 text-sm text-midas-gray">
            <div className="flex flex-col items-center">
              <span className="text-2xl text-midas-gold font-bold">20</span>
              <span>Câu hỏi</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-midas-gold font-bold">1000</span>
              <span>Điểm tối đa</span>
            </div>
          </div>

          <form onSubmit={handleStart} className="flex flex-col space-y-4">
            <input 
              type="text" 
              required
              placeholder="Nhập tên của bạn..." 
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              className="bg-black/50 border border-midas-gold/30 text-white px-4 py-3 rounded text-center focus:outline-none focus:border-midas-gold"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-midas-gold to-yellow-600 text-black font-bold py-3 rounded shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all flex justify-center items-center"
            >
              <Play className="w-5 h-5 mr-2" /> BẮT ĐẦU CHƠI
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'result') {
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-midas-panel border border-midas-gold/30 p-10 rounded-2xl max-w-lg w-full text-center"
        >
          <h1 className="font-serif text-4xl text-midas-gold mb-2">🎉 HOÀN THÀNH!</h1>
          <h2 className="text-2xl text-midas-ivory font-bold mb-6">{playerName}</h2>
          
          <div className="text-6xl font-bold text-midas-gold mb-4 text-glow">{score} <span className="text-2xl text-midas-gray">/ 1000</span></div>
          
          <div className="flex justify-center space-x-6 mb-8 text-midas-ivory/80">
            <div><span className="text-green-400 font-bold">{correctCount}</span> Đúng</div>
            <div><span className="text-red-400 font-bold">{20 - correctCount}</span> Sai</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {formatTime(timeTaken)}</div>
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={saveScoreAndViewLeaderboard}
              className="bg-gradient-to-r from-midas-gold to-yellow-600 text-black font-bold py-3 rounded"
            >
              🏆 LƯU & XEM BẢNG XẾP HẠNG
            </button>
            <button 
              onClick={() => {
                setGameState('start');
                setCurrentQIndex(0);
                setScore(0);
                setCorrectCount(0);
                setSelectedOption(null);
                setShowExplanation(false);
                setPlayerName('');
              }}
              className="border border-midas-gold/50 text-midas-gold py-3 rounded hover:bg-midas-gold/10"
            >
              CHƠI LẠI
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // PLAYING STATE
  const q = questions[currentQIndex];

  return (
    <div className="min-h-[80vh] py-10 px-4 max-w-3xl mx-auto flex flex-col">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-end text-midas-gold font-serif mb-2">
          <span>CÂU {String(currentQIndex + 1).padStart(2, '0')} / 20</span>
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {formatTime(elapsedTime)}</span>
            <span>ĐIỂM: {score}</span>
          </div>
        </div>
        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-midas-gold transition-all duration-300" 
            style={{ width: `${((currentQIndex + 1) / 20) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-midas-panel border border-midas-gold/20 p-8 rounded-xl mb-6 min-h-[150px] flex items-center shadow-lg">
        <h2 className="text-xl md:text-2xl text-midas-ivory leading-relaxed font-medium">{q.question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {q.options.map((opt, idx) => {
          let btnClass = "text-left p-4 rounded-lg border transition-all duration-200 ";
          
          if (selectedOption === null) {
            btnClass += "border-midas-gold/30 hover:border-midas-gold hover:bg-midas-gold/5 bg-black/40";
          } else {
            if (idx === q.correctAnswer) {
              btnClass += "border-green-500 bg-green-500/20 text-green-300"; // Correct answer highlights green
            } else if (idx === selectedOption) {
              btnClass += "border-red-500 bg-red-500/20 text-red-300"; // Wrong selected highlights red
            } else {
              btnClass += "border-midas-gold/10 bg-black/20 opacity-50"; // Others fade out
            }
          }

          return (
            <button 
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={btnClass}
              disabled={selectedOption !== null}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {showExplanation && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 border border-midas-gold/30 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <h4 className={`font-bold mb-1 ${selectedOption === q.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
              {selectedOption === q.correctAnswer ? '✅ Chính xác!' : '❌ Chưa chính xác!'}
            </h4>
            <p className="text-midas-ivory/80 text-sm leading-relaxed">{q.explanation}</p>
          </div>
          <button 
            onClick={handleNext}
            className="whitespace-nowrap px-6 py-3 bg-midas-gold text-black font-bold rounded hover:bg-yellow-500 transition-colors"
          >
            {currentQIndex === 19 ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
          </button>
        </motion.div>
      )}

      {/* Give up button */}
      <div className="mt-12 text-center">
        <button 
          onClick={() => navigate('/')}
          className="text-midas-gray hover:text-red-400 text-sm transition-colors border-b border-transparent hover:border-red-400 pb-1"
        >
          Bỏ cuộc & Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Game;

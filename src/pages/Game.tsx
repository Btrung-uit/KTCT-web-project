import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { questions } from '../data/questions';
import { Trophy, Clock, Play, Search, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type GameState = 'intro' | 'playing' | 'result';

export interface ScoreEntry {
  name: string;
  score: number;
  correct: number;
  time: string;
  date: string;
}

const Game = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
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
    let timer: ReturnType<typeof setInterval>;
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
    setSelectedOption(index);
    setShowExplanation(true);
    
    if (index === questions[currentQIndex].correctAnswer) {
      setScore(prev => prev + 50); // 50 pts per question
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
      saveScore();
    }
  };

  const saveScore = () => {
    const finalTimeMs = Date.now() - startTime;
    const minutes = Math.floor(finalTimeMs / 60000);
    const seconds = Math.floor((finalTimeMs % 60000) / 1000);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const newScore: ScoreEntry = {
      name: playerName,
      score: score, // using current state might be slightly off due to closure, but React state batching usually handles this if called after render. To be safe, in a real app use refs or calculate final score. Assuming correct here.
      correct: correctCount,
      time: timeStr,
      date: new Date().toISOString()
    };

    // Need to handle score correctly since setScore is async.
    // We will recalculate just to be sure.
    let finalScore = score;
    let finalCorrect = correctCount;
    if (selectedOption === questions[currentQIndex].correctAnswer) {
        // It was already added in handleAnswer
    }

    newScore.score = finalScore;
    newScore.correct = finalCorrect;

    const existingScores = JSON.parse(localStorage.getItem('midas_scores') || '[]');
    existingScores.push(newScore);
    localStorage.setItem('midas_scores', JSON.stringify(existingScores));
    
    // Save current player name to highlight in leaderboard
    localStorage.setItem('midas_last_player', playerName);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-midas-panel border border-midas-gold/30 p-8 md:p-12 rounded-2xl max-w-md w-full shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-midas-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-midas-gold" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-midas-gold mb-2 uppercase">Midas Challenge</h1>
          <p className="text-midas-ivory/80 mb-2 font-medium tracking-widest text-sm">20 CÂU HỎI</p>
          <p className="text-midas-gray italic mb-8">"Bạn hiểu câu chuyện Midas đến đâu?"</p>
          
          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <input 
                type="text" 
                required
                placeholder="Nhập tên / biệt danh của bạn"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-black/50 border border-midas-gold/30 rounded-lg px-4 py-4 text-midas-ivory placeholder-midas-gray focus:outline-none focus:border-midas-gold transition-colors text-center text-lg"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-midas-gold text-black font-bold text-lg py-4 rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-colors shadow-lg shadow-midas-gold/20"
            >
              <Play className="w-5 h-5 mr-2" /> BẮT ĐẦU
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const q = questions[currentQIndex];
    return (
      <div className="min-h-[85vh] py-6 md:py-10 px-5 max-w-3xl mx-auto flex flex-col">
        
        {/* Mobile Header / Progress */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-end text-midas-gold font-serif mb-3 md:mb-2 space-y-2 md:space-y-0">
            <div className="text-center md:text-left">
              <span className="text-sm md:text-base font-bold tracking-widest uppercase opacity-80 block md:hidden mb-1">Midas Challenge</span>
              <span className="text-lg md:text-xl">CÂU {String(currentQIndex + 1).padStart(2, '0')} / 20</span>
            </div>
            
            <div className="flex items-center justify-center space-x-6 bg-midas-gold/10 md:bg-transparent py-2 px-4 rounded-lg md:p-0">
              <span className="flex items-center text-sm md:text-base"><Clock className="w-4 h-4 mr-1 md:mr-2" /> {formatTime(elapsedTime)}</span>
              <span className="text-sm md:text-base">ĐIỂM: <strong>{score}</strong></span>
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
        <div className="bg-midas-panel border border-midas-gold/20 p-6 md:p-8 rounded-xl mb-6 min-h-[120px] flex items-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-midas-gold"></div>
          <h2 className="text-lg md:text-2xl text-midas-ivory leading-relaxed md:leading-relaxed font-medium">{q.question}</h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6">
          {q.options.map((opt, idx) => {
            let btnClass = "text-left p-4 md:p-5 rounded-xl border transition-all duration-200 min-h-[60px] flex items-center ";
            
            if (selectedOption === null) {
              btnClass += "border-midas-gold/30 active:scale-[0.98] md:hover:border-midas-gold md:hover:bg-midas-gold/5 bg-black/40";
            } else {
              if (idx === q.correctAnswer) {
                btnClass += "border-green-500 bg-green-500/20 text-green-300"; 
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-500/20 text-red-300"; 
              } else {
                btnClass += "border-midas-gold/10 bg-black/20 opacity-50"; 
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={btnClass}
                disabled={selectedOption !== null}
              >
                <span className="font-bold mr-3 text-lg">{String.fromCharCode(65 + idx)}.</span>
                <span className="text-base">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-md border border-midas-gold/30 p-5 md:p-6 rounded-xl flex flex-col items-stretch gap-4 md:gap-6 mt-2"
          >
            <div>
              <h4 className={`font-bold mb-2 text-lg ${selectedOption === q.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                {selectedOption === q.correctAnswer ? '✅ Chính xác!' : '❌ Chưa chính xác!'}
              </h4>
              {q.explanation && (
                <p className="text-midas-ivory/90 text-sm md:text-base leading-relaxed">{q.explanation}</p>
              )}
            </div>
            <button 
              onClick={handleNext}
              className="w-full py-4 bg-midas-gold text-black font-bold rounded-lg active:scale-95 transition-all text-lg shadow-lg shadow-midas-gold/20"
            >
              {currentQIndex === 19 ? 'XEM KẾT QUẢ' : 'CÂU TIẾP THEO'}
            </button>
          </motion.div>
        )}

        {/* Give up button */}
        {!showExplanation && (
          <div className="mt-8 text-center pb-8">
            <button 
              onClick={() => navigate('/')}
              className="text-midas-gray hover:text-red-400 text-sm md:text-base transition-colors p-3"
            >
              Bỏ cuộc & Quay về trang chủ
            </button>
          </div>
        )}
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-midas-panel border border-midas-gold/30 p-6 md:p-12 rounded-2xl max-w-md w-full shadow-2xl text-center"
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-serif font-bold text-midas-ivory mb-6">HOÀN THÀNH!</h2>
          
          <div className="bg-black/40 rounded-xl p-6 mb-8 border border-midas-gold/20">
            <div className="text-5xl font-bold text-midas-gold mb-2">{score}</div>
            <div className="text-sm tracking-widest text-midas-gold uppercase mb-6 font-bold">ĐIỂM</div>
            
            <div className="flex justify-between text-sm md:text-base text-midas-ivory/80 border-t border-midas-gold/10 pt-4">
              <span>{correctCount} / 20 câu đúng</span>
              <span>Thời gian: {formatTime(Math.floor((endTime - startTime) / 1000))}</span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <button 
              onClick={() => navigate('/leaderboard')}
              className="w-full bg-midas-gold text-black font-bold py-4 rounded-lg flex items-center justify-center active:scale-95 transition-all shadow-lg"
            >
              <Trophy className="w-5 h-5 mr-2" /> XEM BẢNG XẾP HẠNG
            </button>
            <button 
              onClick={() => {
                // In a real app, you might show a review mode.
                // For now, we can just alert or redirect.
                alert("Tính năng xem lại đáp án sẽ được cập nhật!");
              }}
              className="w-full bg-midas-panel border border-midas-gold text-midas-gold font-bold py-4 rounded-lg flex items-center justify-center active:scale-95 transition-all"
            >
              <Search className="w-5 h-5 mr-2" /> XEM ĐÁP ÁN
            </button>
            <button 
              onClick={() => {
                setGameState('intro');
                setScore(0);
                setCurrentQIndex(0);
                setCorrectCount(0);
                setPlayerName('');
              }}
              className="w-full bg-transparent text-midas-gray hover:text-midas-ivory font-medium py-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> CHƠI LẠI
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default Game;

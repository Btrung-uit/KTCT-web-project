
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Ebook from './pages/EbookViewer';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        {/* Global Background */}
        <div className="fixed inset-0 z-[-1] bg-midas-dark">
          <div className="absolute inset-0 bg-gradient-to-b from-midas-dark/40 via-midas-dark/80 to-midas-dark z-10 pointer-events-none"></div>
          <img 
            src="/assets/images/hero-bg.jpg" 
            alt="Midas Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <Navbar />
        <main className="flex-grow pt-16 relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from "@/components/ui/button";
import { Clock, Award, RefreshCcw, ArrowRight } from 'lucide-react';

const GameControls: React.FC = () => {
  const { 
    isGameActive, 
    isLevelComplete, 
    level, 
    score, 
    timeLeft, 
    startGame, 
    nextLevel,
    resetGame
  } = useGame();
  
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 glass-morphism rounded-lg">
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="flex items-center gap-2 bg-secondary/40 p-2 rounded">
          <Clock className="text-gray-400" size={18} />
          <span className="font-mono">{timeLeft}s</span>
        </div>
        <div className="flex items-center justify-center gap-2 bg-secondary/40 p-2 rounded">
          <span className="text-gray-400">Level</span>
          <span className="font-mono">{level}</span>
        </div>
        <div className="flex items-center justify-end gap-2 bg-secondary/40 p-2 rounded">
          <Award className="text-gray-400" size={18} />
          <span className="font-mono">{score}</span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {!isGameActive && !isLevelComplete ? (
          <Button 
            className="w-full bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-300 hover:to-white"
            onClick={startGame}
          >
            Start Game
          </Button>
        ) : isLevelComplete ? (
          <Button 
            className="w-full bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-300 hover:to-white"
            onClick={nextLevel}
          >
            Next Level <ArrowRight className="ml-2" size={16} />
          </Button>
        ) : (
          <Button 
            className="w-full bg-gradient-to-r from-white to-gray-300 text-black hover:from-gray-300 hover:to-white"
            onClick={resetGame}
          >
            Reset <RefreshCcw className="ml-2" size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameControls;


import React from 'react';
import GradientLogo from '@/components/GradientLogo';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import GameInstructions from '@/components/GameInstructions';
import { GameProvider } from '@/context/GameContext';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <header className="mb-8">
          <GradientLogo className="mb-6" />
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gradient">
            DePIN Connect: Node Network Challenge
          </h1>
        </header>
        
        <GameProvider>
          <div className="flex flex-col space-y-6">
            <GameBoard />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <GameControls />
              </div>
              <div className="w-full md:w-1/2">
                <GameInstructions />
              </div>
            </div>
          </div>
        </GameProvider>
        
        <footer className="mt-16 text-center text-gray-500 text-xs">
          <p>Gradient Network - Open Layer For Edge Compute</p>
          <p className="mt-1">Educational Game - DePIN Connect</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

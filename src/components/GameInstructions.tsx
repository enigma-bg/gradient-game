
import React from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GameInstructions: React.FC = () => {
  const { currentLevel } = useGame();
  
  return (
    <div className="w-full max-w-md mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="instructions" className="border-white/20">
          <AccordionTrigger className="text-white hover:text-white/80">How to Play</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>In this game, you need to connect nodes to build a DePIN (Decentralized Physical Infrastructure Network) for Gradient Network.</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Click on a node to select it.</li>
                <li>Then click on another node to create a connection.</li>
                <li>Connect all required nodes before the timer runs out.</li>
                <li>The faster you complete the level, the more points you'll earn!</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {currentLevel && (
        <div className="mt-4 p-4 bg-black/50 border border-white/10 rounded-lg">
          <h3 className="font-medium text-white mb-2">DePIN Knowledge:</h3>
          <p className="text-gray-300 text-sm">{currentLevel.factoid}</p>
        </div>
      )}
    </div>
  );
};

export default GameInstructions;

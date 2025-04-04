
import React from 'react';
import { useGame, Node, Connection } from '@/context/GameContext';
import GameNode from './GameNode';
import NodeConnector from './NodeConnector';

const GameBoard: React.FC = () => {
  const { nodes, connections, selectedNode } = useGame();
  
  return (
    <div className="relative w-full h-[400px] bg-black rounded-lg p-4 glass-morphism overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,0)_70%)]"></div>
        {/* Background grid lines */}
        <svg width="100%" height="100%" className="absolute inset-0 z-0 opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Using a single container for both nodes and connections to ensure alignment */}
      <div className="absolute inset-0">
        {/* Connections SVG layer that completely covers the container */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection) => (
            <NodeConnector
              key={`${connection.sourceId}-${connection.targetId}`}
              connection={connection}
              nodes={nodes}
            />
          ))}
        </svg>
        
        {/* Nodes layered on top */}
        {nodes.map((node) => (
          <GameNode
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

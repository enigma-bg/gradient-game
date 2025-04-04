
import React from 'react';
import { useGame, Node } from '@/context/GameContext';
import { Server, Laptop, Database, HardDrive } from 'lucide-react';

interface GameNodeProps {
  node: Node;
  isSelected: boolean;
}

const GameNode: React.FC<GameNodeProps> = ({ node, isSelected }) => {
  const { selectNode } = useGame();
  
  const handleClick = () => {
    selectNode(node.id);
  };
  
  let Icon;
  let nodeColorClass = isSelected ? "bg-white text-black" : "bg-secondary text-white";
  
  if (node.connected) {
    nodeColorClass = "bg-gradient-to-r from-white to-gray-300 text-black";
  }
  
  switch (node.type) {
    case 'server':
      Icon = Server;
      break;
    case 'client':
      Icon = Laptop;
      break;
    case 'storage':
      Icon = Database;
      break;
    case 'compute':
      Icon = HardDrive;
      break;
    default:
      Icon = Server;
  }
  
  return (
    <div
      className={`node absolute flex items-center justify-center w-12 h-12 rounded-full cursor-pointer animate-node-appear ${nodeColorClass} border-2 ${isSelected ? 'border-white' : 'border-gray-600'} z-10`}
      style={{ 
        left: `${node.x}%`, 
        top: `${node.y}%`, 
        transform: 'translate(-50%, -50%)',
        animation: `node-appear 0.5s ease-out forwards ${Math.random() * 0.5}s`
      }}
      onClick={handleClick}
    >
      <Icon size={20} />
      <div className="absolute -bottom-6 text-xs text-gray-400 whitespace-nowrap">
        {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
      </div>
    </div>
  );
};

export default GameNode;

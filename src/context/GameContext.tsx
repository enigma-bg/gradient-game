
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

export interface Node {
  id: string;
  x: number;
  y: number;
  type: 'server' | 'client' | 'compute' | 'storage';
  connected: boolean;
}

export interface Connection {
  sourceId: string;
  targetId: string;
  active: boolean;
}

export interface Level {
  id: number;
  nodes: Node[];
  connections: Connection[];
  targetConnections: number;
  timeLimit: number;
  factoid: string;
}

interface GameContextType {
  level: number;
  score: number;
  timeLeft: number;
  currentLevel: Level | null;
  isGameActive: boolean;
  isLevelComplete: boolean;
  nodes: Node[];
  connections: Connection[];
  selectedNode: string | null;
  startGame: () => void;
  selectNode: (nodeId: string) => void;
  nextLevel: () => void;
  resetGame: () => void;
}

const levels: Level[] = [
  {
    id: 1,
    nodes: [
      { id: 'node1', x: 30, y: 30, type: 'client', connected: false },
      { id: 'node2', x: 70, y: 30, type: 'server', connected: false },
      { id: 'node3', x: 30, y: 70, type: 'compute', connected: false },
      { id: 'node4', x: 70, y: 70, type: 'storage', connected: false },
    ],
    connections: [
      { sourceId: 'node1', targetId: 'node2', active: false },
      { sourceId: 'node3', targetId: 'node4', active: false },
    ],
    targetConnections: 2,
    timeLimit: 30,
    factoid: "DePIN (Decentralized Physical Infrastructure Networks) uses blockchain to coordinate and incentivize the building of real-world infrastructure."
  },
  {
    id: 2,
    nodes: [
      { id: 'node1', x: 20, y: 20, type: 'client', connected: false },
      { id: 'node2', x: 80, y: 20, type: 'server', connected: false },
      { id: 'node3', x: 20, y: 80, type: 'compute', connected: false },
      { id: 'node4', x: 80, y: 80, type: 'storage', connected: false },
      { id: 'node5', x: 50, y: 50, type: 'compute', connected: false },
    ],
    connections: [
      { sourceId: 'node1', targetId: 'node5', active: false },
      { sourceId: 'node2', targetId: 'node5', active: false },
      { sourceId: 'node3', targetId: 'node5', active: false },
      { sourceId: 'node4', targetId: 'node5', active: false },
    ],
    targetConnections: 4,
    timeLimit: 25,
    factoid: "Edge computing moves processing closer to data sources, reducing latency and bandwidth use."
  },
  {
    id: 3,
    nodes: [
      { id: 'node1', x: 20, y: 20, type: 'client', connected: false },
      { id: 'node2', x: 80, y: 20, type: 'server', connected: false },
      { id: 'node3', x: 20, y: 80, type: 'compute', connected: false },
      { id: 'node4', x: 80, y: 80, type: 'storage', connected: false },
      { id: 'node5', x: 50, y: 30, type: 'compute', connected: false },
      { id: 'node6', x: 50, y: 70, type: 'storage', connected: false },
    ],
    connections: [
      { sourceId: 'node1', targetId: 'node5', active: false },
      { sourceId: 'node2', targetId: 'node5', active: false },
      { sourceId: 'node5', targetId: 'node6', active: false },
      { sourceId: 'node3', targetId: 'node6', active: false },
      { sourceId: 'node4', targetId: 'node6', active: false },
    ],
    targetConnections: 5,
    timeLimit: 20,
    factoid: "Gradient Network enables decentralized edge computing, allowing anyone to participate in the network infrastructure."
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setIsGameActive(true);
    setIsLevelComplete(false);
    loadLevel(1);
  };

  const loadLevel = (levelNumber: number) => {
    const levelData = levels.find(l => l.id === levelNumber);
    if (!levelData) return;
    
    setCurrentLevel(levelData);
    setNodes(JSON.parse(JSON.stringify(levelData.nodes)));
    setConnections(JSON.parse(JSON.stringify(levelData.connections)));
    setTimeLeft(levelData.timeLimit);
    
    if (timer) clearInterval(timer);
    
    const newTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(newTimer);
          setIsGameActive(false);
          toast.error("Time's up! Try again.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(newTimer);
  };

  const selectNode = (nodeId: string) => {
    if (!isGameActive || isLevelComplete) return;
    
    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else {
      // Check if this creates a valid connection
      const connection = connections.find(
        c => (c.sourceId === selectedNode && c.targetId === nodeId) ||
             (c.sourceId === nodeId && c.targetId === selectedNode)
      );
      
      if (connection && !connection.active) {
        // Activate the connection
        setConnections(connections.map(c => {
          if ((c.sourceId === selectedNode && c.targetId === nodeId) ||
              (c.sourceId === nodeId && c.targetId === selectedNode)) {
            return { ...c, active: true };
          }
          return c;
        }));
        
        // Mark the nodes as connected
        setNodes(nodes.map(n => {
          if (n.id === nodeId || n.id === selectedNode) {
            return { ...n, connected: true };
          }
          return n;
        }));
        
        // Increase score
        setScore(prev => prev + 100);
        
        // Check if level is complete
        const updatedConnections = connections.map(c => {
          if ((c.sourceId === selectedNode && c.targetId === nodeId) ||
              (c.sourceId === nodeId && c.targetId === selectedNode)) {
            return { ...c, active: true };
          }
          return c;
        });
        
        const activeConnectionsCount = updatedConnections.filter(c => c.active).length;
        
        if (currentLevel && activeConnectionsCount >= currentLevel.targetConnections) {
          if (timer) clearInterval(timer);
          setIsLevelComplete(true);
          // Bonus points for remaining time
          const timeBonus = timeLeft * 10;
          setScore(prev => prev + timeBonus);
          toast.success(`Level Complete! +${timeBonus} time bonus points!`);
        }
      } else if (!connection) {
        toast.error("That's not a valid connection!");
      }
      
      setSelectedNode(null);
    }
  };

  const nextLevel = () => {
    const nextLevelNumber = level + 1;
    
    if (nextLevelNumber <= levels.length) {
      setLevel(nextLevelNumber);
      setIsLevelComplete(false);
      loadLevel(nextLevelNumber);
    } else {
      // Game complete
      toast.success("Congratulations! You've completed all levels!");
      setIsGameActive(false);
    }
  };

  const resetGame = () => {
    if (timer) clearInterval(timer);
    setLevel(0);
    setScore(0);
    setIsGameActive(false);
    setIsLevelComplete(false);
    setCurrentLevel(null);
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const contextValue: GameContextType = {
    level,
    score,
    timeLeft,
    currentLevel,
    isGameActive,
    isLevelComplete,
    nodes,
    connections,
    selectedNode,
    startGame,
    selectNode,
    nextLevel,
    resetGame
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

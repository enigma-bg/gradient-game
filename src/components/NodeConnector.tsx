
import React from 'react';
import { Connection, Node } from '@/context/GameContext';

interface NodeConnectorProps {
  connection: Connection;
  nodes: Node[];
}

const NodeConnector: React.FC<NodeConnectorProps> = () => {
  // Render nothing to remove connection lines
  return null;
};

export default NodeConnector;

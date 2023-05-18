import React, { useState } from 'react';
import Controls from './components/controls/Controls';
import Board from './components/board/Board';

interface Position {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [position, setPosition] = useState<Position>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [scale, setScale] = useState<number>(100);

  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';

    const initialMousePos = { x: e.clientX, y: e.clientY };
    const initialElementPos = { x: position.x, y: position.y };

    setOffset({
      x: initialMousePos.x - initialElementPos.x,
      y: initialMousePos.y - initialElementPos.y,
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
  };

  const handleCenterBoard = () => {
    const boardElement = document.getElementById('board');
    if (boardElement) {
      const boardWidth = boardElement.offsetWidth;
      const boardHeight = boardElement.offsetHeight;

      const centerX = (window.innerWidth - boardWidth) / 2;
      const centerY = (window.innerHeight - boardHeight) / 2;

      setPosition({
        x: centerX,
        y: centerY,
      });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Controls
        scale={scale}
        onScaleChange={handleScaleChange}
        onCenterBoard={handleCenterBoard}
      />
      <Board
        position={position}
        offset={offset}
        scale={scale}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      />
    </div>
  );
};

export default App;

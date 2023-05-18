import React from 'react';

interface Position {
  x: number;
  y: number;
}

interface BoardProps {
  position: Position;
  offset: Position;
  scale: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Board: React.FC<BoardProps> = ({
  position,
  scale,
  onDragStart,
  onDrag,
  onDragEnd,
  onDragOver,
}) => {
  return (
    <div
      id="board"
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `scale(${scale / 100})`,
        transformOrigin: 'top left',
        cursor: 'move',

        whiteSpace: 'nowrap',
      }}
    >
      <span>Text in rectangle</span>
      <button
        style={{
          border: 'none',
          backgroundColor: 'blue',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        +
      </button>
    </div>
  );
};

export default Board;

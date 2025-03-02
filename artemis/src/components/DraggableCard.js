import React, { useState, useEffect, useRef, useCallback } from 'react';
import CartoonyButton from './CartoonyButton';

const DraggableCard = ({ children, onClose }) => {
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardRef.current.offsetHeight;
      setPos({
        x: window.innerWidth / 2 - cardWidth / 2,
        y: window.innerHeight / 2 - cardHeight / 2,
      });
    }
  }, []);

  const onMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  // Memoize onMouseMove to avoid re-creating the function on every render
  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  }, [dragging, offset]);

  // Memoize onMouseUp similarly
  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, onMouseMove, onMouseUp]);

  return (
    <div
      ref={cardRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        cursor: dragging ? 'grabbing' : 'grab',
        width: '90%',
        maxWidth: '400px',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '10px',
        padding: '10px',
        zIndex: 1000,
      }}
    >
      {children}
      <CartoonyButton onClick={onClose} color="rgb(239, 221, 121)" size="medium" width="auto">
        Close
      </CartoonyButton>
    </div>
  );
};

export default DraggableCard;

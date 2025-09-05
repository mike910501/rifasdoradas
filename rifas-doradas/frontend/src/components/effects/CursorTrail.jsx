import React, { useEffect, useState } from 'react';

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      
      setTrail(prev => [...prev.slice(-10), newTrail]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 rounded-full bg-yellow-400 opacity-70"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index + 1) / trail.length * 0.7,
            transform: `scale(${(index + 1) / trail.length})`,
            boxShadow: '0 0 10px #FFD700',
            transition: 'all 0.3s ease-out'
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
import React from 'react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Elementos distribuidos mejor por la pantalla - menos elementos */}
      <div className="absolute top-20 left-16 opacity-5 animate-float">
        <div className="chip-stack">
          <div className="chip"></div>
          <div className="chip"></div>
        </div>
      </div>
      
      <div className="absolute bottom-40 right-20 opacity-5 animate-float" style={{animationDelay: '2s'}}>
        <div className="roulette-container w-12 h-12">
          <div className="roulette"></div>
        </div>
      </div>
      
      <div className="absolute top-1/3 left-2/3 text-4xl opacity-5 animate-float" style={{animationDelay: '3s'}}>
        💰
      </div>
      
      <div className="absolute bottom-1/4 left-10 text-4xl opacity-5 animate-float" style={{animationDelay: '1s'}}>
        🎰
      </div>
    </div>
  );
};

export default FloatingElements;
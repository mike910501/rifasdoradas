import React, { useEffect, useState } from 'react';

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 12;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: ['#FFD700', '#9f00ff', '#00ff41', '#00bfff'][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.2 + 0.05
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 8px ${particle.color}`,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
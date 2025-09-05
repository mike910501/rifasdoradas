import React from 'react';

const HeroImagePlaceholder = () => {
  return (
    <div className="hero-image-placeholder" style={{
      width: '100%',
      height: '500px',
      background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #8A2BE2 100%)',
      borderRadius: '25px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efecto de fondo animado */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 70%)
        `,
        animation: 'placeholderShimmer 4s ease-in-out infinite'
      }} />
      
      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' }}>
          🎰✨💰
        </div>
        <h3 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          fontFamily: 'Bebas Neue, cursive',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
        }}>
          RIFAS DORADAS
        </h3>
        <p style={{ 
          fontSize: '1.2rem', 
          opacity: 0.9,
          fontFamily: 'Poppins, sans-serif'
        }}>
          Tu próxima gran victoria te espera
        </p>
      </div>

      <style jsx>{`
        @keyframes placeholderShimmer {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default HeroImagePlaceholder;
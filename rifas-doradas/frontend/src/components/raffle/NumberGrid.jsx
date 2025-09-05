import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const NumberGrid = ({ totalNumbers = 100, selectedNumbers, onNumberSelect, raffleId }) => {
  const [numbers, setNumbers] = useState([]);
  const [hoveredNumber, setHoveredNumber] = useState(null);
  const [socket, setSocket] = useState(null);
  const [numberStatuses, setNumberStatuses] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const [burstEffect, setBurstEffect] = useState(null);

  useEffect(() => {
    initializeNumbers();
    if (raffleId) {
      connectSocket();
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [raffleId]);

  const initializeNumbers = () => {
    const nums = [];
    for (let i = 1; i <= totalNumbers; i++) {
      nums.push({
        number: i,
        displayNumber: String(i).padStart(3, '0'),
        status: 'disponible'
      });
    }
    setNumbers(nums);
  };

  const connectSocket = () => {
    try {
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3002');
      
      newSocket.on('connect', () => {
        console.log('Connected to server');
        newSocket.emit('join-raffle', raffleId);
      });

      newSocket.on('connect_error', (error) => {
        console.log('Socket connection error:', error);
      });

      newSocket.on('number-update', (data) => {
        setNumberStatuses(prev => ({
          ...prev,
          [data.number]: data.status
        }));
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('Error connecting socket:', error);
    }
  };

  const handleNumberClick = (number, event) => {
    const status = numberStatuses[number.number] || number.status;
    
    if (status === 'vendido') {
      toast.error('Este número ya está vendido');
      return;
    }
    
    if (status === 'pendiente') {
      toast.error('Este número tiene un pago pendiente');
      return;
    }

    // Crear efecto de explosión en el punto de click
    const rect = event.currentTarget.getBoundingClientRect();
    setBurstEffect({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      id: Date.now()
    });

    // Limpiar efecto después de la animación
    setTimeout(() => setBurstEffect(null), 800);

    onNumberSelect(number.number);
    
    if (socket) {
      socket.emit('number-selected', {
        raffleId,
        number: number.number,
        status: selectedNumbers.includes(number.number) ? 'disponible' : 'seleccionado'
      });
    }

    if (!selectedNumbers.includes(number.number)) {
      createSparkles(number.number);
      createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const createParticles = (x, y) => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x,
        y: y,
        angle: (Math.PI * 2 * i) / 8,
        speed: 2 + Math.random() * 3
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    
    // Limpiar partículas después de la animación
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 2000);
  };

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const createSparkles = (numberElement) => {
    const sparkleCount = 10;
    const container = document.getElementById(`number-${numberElement}`);
    if (!container) return;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 1500);
    }
  };

  const getNumberStatus = (number) => {
    if (selectedNumbers.includes(number.number)) return 'seleccionado';
    return numberStatuses[number.number] || number.status;
  };

  const getNumberClass = (number) => {
    const status = getNumberStatus(number);
    let className = 'number-hexagon';
    
    if (status === 'seleccionado') {
      className += ' number-selected';
    } else if (status === 'vendido') {
      className += ' number-sold';
    } else if (status === 'pendiente') {
      className += ' number-pending';
    } else {
      className += ' number-available';
    }
    
    return className;
  };

  return (
    <div className="fortune-matrix-container">
      {/* Header con contador dinámico */}
      <div className="selection-header">
        <h3 className="title-glow">🎯 MATRIZ DE LA FORTUNA</h3>
        <div className="counter-display">
          <span>Números seleccionados: </span>
          <motion.span 
            key={selectedNumbers.length}
            initial={{ scale: 1.5, color: "#FFD700" }}
            animate={{ scale: 1, color: "#FFD700" }}
            className="selected-count"
          >
            {selectedNumbers.length}
          </motion.span>
          <span> / 10 máximo</span>
        </div>
      </div>

      {/* Matriz de números con efectos */}
      <div 
        className="numbers-matrix"
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`
        }}
      >
        {/* Campo de fuerza magnético */}
        <div className="magnetic-field"></div>
        
        {/* Grid de números hexagonales */}
        <div className="numbers-grid">
          <AnimatePresence>
            {numbers.map((number, index) => (
              <motion.div
                key={number.number}
                id={`number-${number.number}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  rotateY: -180,
                  z: -100
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                  z: 0
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  delay: index * 0.01,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotateY: 15,
                  z: 20,
                  transition: { 
                    duration: 0.3, 
                    type: "spring", 
                    stiffness: 300 
                  }
                }}
                whileTap={{ 
                  scale: 0.9, 
                  rotateY: -10,
                  transition: { duration: 0.1 }
                }}
                className={getNumberClass(number)}
                onClick={(e) => handleNumberClick(number, e)}
                onMouseEnter={() => setHoveredNumber(number.number)}
                onMouseLeave={() => setHoveredNumber(null)}
                style={{ 
                  position: 'relative',
                  transformStyle: 'preserve-3d'
                }}
              >
                <span className="number-display">
                  {number.displayNumber}
                </span>
                
                {getNumberStatus(number) === 'vendido' && (
                  <div className="sold-overlay">❌</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Partículas flotantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Partículas de interacción */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="interaction-particle"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: particle.x + Math.cos(particle.angle) * 100,
              y: particle.y + Math.sin(particle.angle) * 100,
              scale: 0,
              opacity: 0
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'fixed',
              width: '6px',
              height: '6px',
              background: '#FFD700',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 1000
            }}
          />
        ))}

        {/* Efecto de explosión */}
        {burstEffect && (
          <motion.div
            className="selection-burst"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: burstEffect.x,
              top: burstEffect.y,
              width: '100px',
              height: '100px',
              border: '3px solid #FFD700',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 1000
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NumberGrid;
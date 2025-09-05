import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import CountDown from '../components/common/CountDown';
import EnhancedCountdown from '../components/common/EnhancedCountdown';
import HeroImagePlaceholder from '../components/common/HeroImagePlaceholder';
import NumberGrid from '../components/raffle/NumberGrid';
import PaymentMethods from '../components/payment/PaymentMethods';
import PaymentSupportSection from '../components/payment/PaymentSupportSection';
import api from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [imageError, setImageError] = useState(false);
  
  // Mock data for demo
  const activeRaffle = {
    id: 1,
    name: 'Gran Rifa Dorada 2024',
    description: 'Participa y gana el premio de tus sueños',
    total_numbers: 100,
    price_per_number: 25000,
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    draw_date: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
    status: 'active',
    prize_description: 'iPhone 15 Pro Max + $5,000,000 COP',
    prize_value: 8000000
  };

  const recentWinners = [
    {
      name: 'María González',
      winning_number: 77,
      prize_value: 5000000,
      draw_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      icon: '👑'
    },
    {
      name: 'Carlos Ruiz',
      winning_number: 23,
      prize_value: 3000000,
      draw_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      icon: '💎'
    },
    {
      name: 'Ana López',
      winning_number: 88,
      prize_value: 2000000,
      draw_date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      icon: '🌟'
    }
  ];

  const stats = {
    totalRaffles: 15,
    totalWinners: 12,
    totalPrizes: 50000000
  };

  const handleNumberSelect = (number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      if (prev.length < 10) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        return [...prev, number];
      }
      return prev;
    });
  };

  const handleProceedToPayment = () => {
    if (selectedNumbers.length > 0) {
      navigate('/payment', { state: { selectedNumbers, raffle: activeRaffle } });
    }
  };

  const handlePrizeCardClick = (type, value) => {
    navigator.clipboard.writeText(`${type}: $${value.toLocaleString('es-CO')}`);
    // You could add a toast notification here if needed
  };

  return (
    <div className="home-page text-center w-full">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      
      {/* Hero Section Horizontal Elegante */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Contenido Textual */}
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">¡Tu Suerte Te Espera!</h1>
            <h2 className="hero-subtitle">Participa en las mejores rifas con premios increíbles</h2>
            <p className="hero-description">
              La plataforma de rifas más confiable de Colombia. Miles de ganadores felices nos respaldan.
            </p>
            
            {/* Grid de Información del Premio */}
            {activeRaffle && (
              <>
                <div className="prize-info-grid">
                  <motion.div 
                    className="prize-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePrizeCardClick('Premio Mayor', activeRaffle.prize_value || 2000000)}
                  >
                    <div className="prize-label">Premio Mayor</div>
                    <div className="prize-amount">${(activeRaffle.prize_value || 2000000).toLocaleString('es-CO')}</div>
                  </motion.div>
                  <motion.div 
                    className="prize-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePrizeCardClick('Precio por Número', activeRaffle.price_per_number || 25000)}
                  >
                    <div className="prize-label">Precio Número</div>
                    <div className="prize-amount">${(activeRaffle.price_per_number || 25000).toLocaleString('es-CO')}</div>
                  </motion.div>
                </div>

                {/* Contador Elegante */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <EnhancedCountdown endDate={activeRaffle.end_date} />
                </motion.div>
              </>
            )}

            {/* Botones CTA */}
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.button 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const numbersSection = document.querySelector('.numbers-section');
                  if (numbersSection) {
                    numbersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                🎯 COMPRAR NÚMEROS
              </motion.button>
              <motion.button 
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const winnersSection = document.querySelector('.winners-section');
                  if (winnersSection) {
                    winnersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                📋 VER GANADORES
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual de la Imagen */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-image-container">
              {imageError ? (
                <HeroImagePlaceholder />
              ) : (
                <>
                  <img 
                    src="/images/hero-casino.png" 
                    alt="Rifa Dorada - Premio Increíble" 
                    className="hero-image"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                  <div className="hero-image-overlay"></div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Números */}
      {activeRaffle && (
        <section className="numbers-section py-20" id="rifas">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-12 font-bebas tracking-wider holographic-text premium-text-shadow">
                SELECCIONA TUS NÚMEROS DE LA SUERTE
              </h2>
              
              <div className="mb-8 text-center">
                <div className="inline-flex items-center space-x-4 bg-black/50 rounded-full px-8 py-4">
                  <span className="text-lg">Números seleccionados:</span>
                  <span className="text-3xl font-bold text-yellow-400">
                    {selectedNumbers.length}
                  </span>
                  <span className="text-lg">/ 10 máximo</span>
                </div>
              </div>

              <NumberGrid
                totalNumbers={activeRaffle.total_numbers}
                selectedNumbers={selectedNumbers}
                onNumberSelect={handleNumberSelect}
                raffleId={activeRaffle.id}
              />

              {selectedNumbers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <div className="bg-gradient-to-r from-purple-900/50 to-purple-600/50 rounded-xl p-6 backdrop-blur-lg">
                    <p className="text-2xl mb-4">
                      Total a pagar: 
                      <span className="text-4xl font-bold text-yellow-400 ml-4">
                        ${(selectedNumbers.length * activeRaffle.price_per_number).toLocaleString('es-CO')} COP
                      </span>
                    </p>
                    <motion.button
                      onClick={handleProceedToPayment}
                      className="btn btn-primary text-xl px-12 py-4 animate-magnetic"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      PROCEDER AL PAGO
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Métodos de Pago */}
      <PaymentMethods />

      {/* Sección Soporte de Pago */}
      <PaymentSupportSection />

      {/* Estadísticas - Diseño Horizontal */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title neon-text holographic-text premium-text-shadow">
            📊 NUESTRAS ESTADÍSTICAS
          </h2>
          
          <div className="stats-container">
            <motion.div
              className="stat-card stat-card-1"
              initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">🎫</div>
              <div className="stat-number font-bebas">{stats.totalRaffles}</div>
              <div className="stat-label font-orbitron">Rifas Realizadas</div>
            </motion.div>
            
            <motion.div
              className="stat-card stat-card-2"
              initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">🏆</div>
              <div className="stat-number font-bebas">{stats.totalWinners}</div>
              <div className="stat-label font-orbitron">Ganadores Felices</div>
            </motion.div>
            
            <motion.div
              className="stat-card stat-card-3"
              initial={{ opacity: 0, scale: 0.6, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.9,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">💰</div>
              <div className="stat-number font-bebas">
                ${stats.totalPrizes?.toLocaleString('es-CO')}
              </div>
              <div className="stat-label font-orbitron">En Premios Entregados</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ganadores Recientes - Diseño Horizontal */}
      {recentWinners.length > 0 && (
        <section className="winners-section">
          <div className="container">
            <h2 className="section-title holographic-text premium-text-shadow">
              🏆 GANADORES RECIENTES
            </h2>
            
            <div className="winners-container">
              {recentWinners.map((winner, index) => (
                <motion.div
                  key={index}
                  className={`winner-card winner-card-${index + 1}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  <div className="winner-icon">
                    {winner.icon}
                  </div>
                  <h3 className="winner-name font-bebas">
                    {winner.name}
                  </h3>
                  <p className="winner-details font-orbitron">
                    Número ganador: {winner.winning_number}
                  </p>
                  <p className="winner-prize font-orbitron">
                    ${winner.prize_value?.toLocaleString('es-CO')} COP
                  </p>
                  <p className="winner-date font-poppins">
                    {new Date(winner.draw_date).toLocaleDateString('es-CO')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
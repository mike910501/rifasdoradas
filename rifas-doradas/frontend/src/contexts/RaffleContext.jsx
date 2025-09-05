import React, { createContext, useContext, useState } from 'react';

const RaffleContext = createContext();

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (!context) {
    throw new Error('useRaffle must be used within RaffleProvider');
  }
  return context;
};

export const RaffleProvider = ({ children }) => {
  const [currentRaffle, setCurrentRaffle] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const value = {
    currentRaffle,
    setCurrentRaffle,
    selectedNumbers,
    setSelectedNumbers
  };

  return (
    <RaffleContext.Provider value={value}>
      {children}
    </RaffleContext.Provider>
  );
};
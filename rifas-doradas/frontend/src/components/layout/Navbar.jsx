import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to sections
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo Simple */}
          <a 
            href="#inicio" 
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('.hero-section');
            }}
          >
            <span className="logo-icon">🎰</span>
            RIFAS DORADAS
          </a>
          
          {/* Navegación Principal */}
          <nav className="main-navigation">
            <a 
              href="#inicio" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.hero-section');
              }}
            >
              Inicio
            </a>
            <a 
              href="#rifas" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.numbers-section');
              }}
            >
              Rifas Activas
            </a>
            <a 
              href="#ganadores" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.winners-section');
              }}
            >
              Ganadores
            </a>
            <a 
              href="#como-jugar" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.payment-methods-section');
              }}
            >
              Cómo Jugar
            </a>
            <a 
              href="#contacto" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.footer');
              }}
            >
              Contacto
            </a>
          </nav>
          
          {/* Inicio de Sesión en la Esquina Superior Derecha */}
          <div className="auth-section">
            <a 
              href="#registro" 
              className="register-btn"
              onClick={(e) => {
                e.preventDefault();
                // Add registration logic here
                console.log('Registro clicked');
              }}
            >
              Registrarse
            </a>
            <a 
              href="#login" 
              className="login-btn"
              onClick={(e) => {
                e.preventDefault();
                // Add login logic here
                console.log('Login clicked');
              }}
            >
              <span>👤</span>
              Iniciar Sesión
            </a>
          </div>
          
          {/* Botón hamburguesa para móvil */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>

        {/* Menú Móvil */}
        <div className={`mobile-navigation ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-links">
            <a 
              href="#inicio" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.hero-section');
              }}
            >
              Inicio
            </a>
            <a 
              href="#rifas" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.numbers-section');
              }}
            >
              Rifas Activas
            </a>
            <a 
              href="#ganadores" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.winners-section');
              }}
            >
              Ganadores
            </a>
            <a 
              href="#como-jugar" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.payment-methods-section');
              }}
            >
              Cómo Jugar
            </a>
            <a 
              href="#contacto" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('.footer');
              }}
            >
              Contacto
            </a>
          </div>
          
          <div className="mobile-auth-section">
            <a 
              href="#registro" 
              className="register-btn"
              onClick={(e) => {
                e.preventDefault();
                console.log('Registro clicked');
                setMobileMenuOpen(false);
              }}
            >
              Registrarse
            </a>
            <a 
              href="#login" 
              className="login-btn"
              onClick={(e) => {
                e.preventDefault();
                console.log('Login clicked');
                setMobileMenuOpen(false);
              }}
            >
              <span>👤</span>
              Iniciar Sesión
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
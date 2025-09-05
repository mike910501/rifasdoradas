import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-info mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="footer-columns">
          
          {/* COLUMNA 1 - INFORMACIÓN DE LA EMPRESA */}
          <div className="footer-column">
            <h3>🏆 RIFAS DORADAS</h3>
            <p>La plataforma de rifas más confiable y emocionante de Colombia.</p>
            <p className="highlight-text">Tu suerte está a solo un click de distancia.</p>
            
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook">📘</i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram">📷</i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter">🐦</i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-telegram">✈️</i>
              </a>
            </div>
          </div>
          
          {/* COLUMNA 2 - MÉTODOS DE PAGO */}
          <div className="footer-column">
            <h3>💳 MÉTODOS DE PAGO</h3>
            <div className="payment-methods">
              <div className="payment-item">
                <i>📱</i>
                <span>Pago Móvil</span>
              </div>
              <div className="payment-item">
                <i>💜</i>
                <span>Nequi</span>
              </div>
              <div className="payment-item">
                <i>💰</i>
                <span>Zelle</span>
              </div>
            </div>
            
            <div className="security-badge">
              <p>
                <i>✅</i>
                Pagos seguros y verificados
              </p>
            </div>
          </div>
          
          {/* COLUMNA 3 - CONTACTO Y SOPORTE */}
          <div className="footer-column">
            <h3>📞 CONTACTO</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i>✉️</i>
                <a href="mailto:info@rifasdoradas.com">info@rifasdoradas.com</a>
              </div>
              <div className="contact-item">
                <i>📱</i>
                <a href="tel:+573012345678">+57 301-234-5678</a>
              </div>
              <div className="contact-item">
                <i>🌐</i>
                <a href="https://rifasdoradas.com">rifasdoradas.com</a>
              </div>
              <div className="contact-item">
                <i>🛠️</i>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* SEPARADOR Y LEGAL */}
        <div className="footer-legal">
          <p>© 2024 Rifas Doradas. Todos los derechos reservados.</p>
          <div className="legal-links">
            <a href="#terminos">Términos y Condiciones</a>
            <span>|</span>
            <a href="#privacidad">Política de Privacidad</a>
            <span>|</span>
            <a href="#responsable">Juego Responsable</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
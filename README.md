# 🎰 RIFAS DORADAS - Sistema de Rifas Premium

[![Deploy Status](https://img.shields.io/badge/deployment-ready-brightgreen.svg)](https://github.com/mike910501/rifasdoradas)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-15+-blue.svg)](https://www.postgresql.org/)

## 🎯 Descripción

**Rifas Doradas** es una plataforma web premium para la gestión y participación en rifas online. Cuenta con diseño cyberpunk-casino, efectos visuales avanzados y una experiencia de usuario excepcional.

### ✨ Características Principales

- 🎨 **Diseño Premium**: Efectos glassmorphism, gradientes dinámicos y animaciones fluidas
- 🎯 **Matriz de la Fortuna**: Sistema hexagonal interactivo para selección de números  
- 💳 **Métodos de Pago**: Integración con Pago Móvil, Nequi y Zelle
- 👥 **Gestión de Usuarios**: Sistema de autenticación y perfiles
- 📊 **Panel Administrativo**: Gestión completa de rifas y usuarios
- 🏆 **Sistema de Ganadores**: Visualización premium de ganadores históricos
- 📱 **Responsive Design**: Optimizado para desktop, tablet y móvil
- ⚡ **Real-time Updates**: Socket.io para actualizaciones en tiempo real

## 🏗️ Arquitectura

```
rifas-doradas/
├── backend/           # API REST + Socket.io (Node.js + Express)
├── frontend/          # React + Vite + Tailwind CSS
├── docs/             # Documentación
└── deploy/           # Configuraciones de deployment
```

## 🚀 Deployment en Render

### Configuración Rápida (15 minutos)
👉 **[Ver guía de configuración rápida](RENDER_QUICK_SETUP.md)**

### Guía Completa de Deployment  
👉 **[Ver guía completa con variables de entorno](RENDER_DEPLOYMENT_GUIDE.md)**

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Framer Motion** - Animaciones avanzadas
- **Socket.io Client** - Real-time communication
- **React Router** - Navegación
- **Axios** - HTTP client

### Backend  
- **Node.js + Express** - Server y API REST
- **PostgreSQL** - Base de datos principal
- **Socket.io** - Real-time communication
- **JWT** - Autenticación
- **Bcrypt** - Hash de passwords
- **Multer** - File upload
- **Nodemailer** - Email notifications

### DevOps & Deployment
- **Render** - Hosting y deployment
- **GitHub** - Version control
- **PostgreSQL Cloud** - Database hosting

## 🎨 Características de Diseño

### Efectos Visuales Premium
- ✨ **Glassmorphism**: Efectos de cristal con backdrop-filter
- 🌈 **Gradientes Dinámicos**: Colores dorado, naranja y púrpura
- 🔥 **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- 💫 **Partículas Flotantes**: Efectos de fondo dinámicos
- 🎯 **3D Effects**: Transformaciones y profundidad visual

### Responsive Design
- 📱 **Mobile First**: Optimizado para dispositivos móviles
- 💻 **Desktop Enhanced**: Experiencia premium en pantallas grandes
- 📊 **Breakpoints**: 480px, 768px, 1024px, 1400px
- 🔄 **Adaptive Layout**: Layouts que se adaptan dinámicamente

## 🎮 Componentes Principales

### Hero Section
- Layout horizontal elegante
- Contador dinámico con efectos shimmer
- Cards de premio interactivas
- Navegación suave a secciones

### Matriz de la Fortuna
- Sistema hexagonal para selección de números
- Efectos magnéticos y partículas
- Estados visuales: disponible, seleccionado, vendido, pendiente
- Animaciones de entrada escalonadas

### Métodos de Pago
- Grid horizontal de 3 métodos
- Click to copy information
- Notificaciones toast con glassmorphism
- Efectos hover premium

### Panel de Administración
- Gestión completa de rifas
- Usuarios y permisos
- Reportes y estadísticas
- Dashboard en tiempo real

## 📊 Variables de Entorno

### Backend (.env)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.onrender.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com
VITE_SOCKET_URL=https://your-backend.onrender.com
VITE_NODE_ENV=production
```

## 🚀 URLs de Producción

- **Frontend**: `https://rifas-doradas-frontend.onrender.com`
- **Backend API**: `https://rifas-doradas-backend.onrender.com`
- **Repositorio**: `https://github.com/mike910501/rifasdoradas`

## 📝 Licencia

Este proyecto es privado y propietario. Todos los derechos reservados.

## 👨‍💻 Desarrollado con

**🎯 Generated with [Claude Code](https://claude.ai/code)**

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐
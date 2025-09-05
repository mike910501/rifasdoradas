# 🎰 Rifas Doradas - Sistema Completo de Rifas y Sorteos

Sistema web completo para gestión de rifas con diseño estilo casino, efectos visuales impresionantes y panel administrativo.

## 🌟 Características Principales

- 🎯 **Selección de Números**: Grid interactivo de 100 números con estados en tiempo real
- 💳 **Múltiples Métodos de Pago**: Pago Móvil, Nequi, Zelle
- 📧 **Emails Automatizados**: Confirmaciones y notificaciones automáticas
- 👨‍💼 **Panel Administrativo**: Control total sobre rifas, pagos y usuarios
- 🎨 **Diseño Casino**: Animaciones, partículas, efectos neón y gradientes
- 📱 **100% Responsive**: Optimizado para móvil, tablet y desktop
- 🔐 **Seguridad**: Autenticación JWT, validación de datos, rate limiting

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/rifas-doradas.git
cd rifas-doradas
```

### Paso 2: Instalar dependencias
```bash
npm run install:all
```

### Paso 3: Configurar variables de entorno

Backend (.env):
```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales
```

### Paso 4: Configurar base de datos
```bash
cd backend
npm run migrate
npm run seed  # Opcional: datos de prueba
```

### Paso 5: Iniciar la aplicación
```bash
# Desde la carpeta raíz
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Socket.io: http://localhost:3001

## 📁 Estructura del Proyecto

```
rifas-doradas/
├── backend/
│   ├── server.js           # Servidor principal Express
│   ├── database/
│   │   ├── config.js       # Configuración PostgreSQL
│   │   ├── schema.sql      # Esquema de base de datos
│   │   └── migrations/     # Migraciones
│   ├── routes/             # Endpoints API
│   ├── controllers/        # Lógica de negocio
│   ├── middleware/         # Auth, validación, etc
│   ├── services/          # Email, pagos, etc
│   └── uploads/           # Archivos subidos
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/        # Páginas principales
│   │   ├── contexts/     # Context API
│   │   ├── services/     # API calls
│   │   ├── styles/       # CSS y animaciones
│   │   └── utils/        # Helpers
│   └── public/           # Assets estáticos
│
└── database/
    └── backups/          # Respaldos automáticos
```

## 🎨 Personalización Visual

### Colores principales (variables CSS):
```css
--color-primary: #FFD700;      /* Dorado */
--color-secondary: #9f00ff;    /* Morado */
--color-accent: #00ff41;       /* Verde neón */
--color-danger: #ff0040;       /* Rojo neón */
--color-bg-dark: #0a0a0a;      /* Negro profundo */
```

### Imagen Hero Personalizada
Reemplazar el placeholder en `HomePage.jsx`:
1. Generar imagen con IA (1200x600px)
2. Guardar en `frontend/public/images/hero-casino.jpg`
3. La imagen se mostrará automáticamente

## 💻 Panel de Administración

Acceso: `/admin`

### Funcionalidades:
- **Dashboard**: Estadísticas en tiempo real
- **Gestión de Rifas**: Crear, editar, finalizar
- **Verificación de Pagos**: Aprobar/rechazar comprobantes
- **Gestión de Usuarios**: Roles y permisos
- **Reportes**: Ventas, ingresos, análisis

### Roles:
- **Super Admin**: Control total
- **Admin**: Gestión de rifas y pagos
- **Verificador**: Solo verificación de pagos
- **Moderador**: Gestión de usuarios

## 🔐 Seguridad

- **Autenticación**: JWT con refresh tokens
- **Encriptación**: Bcrypt para contraseñas
- **Rate Limiting**: Protección contra ataques
- **Validación**: Frontend y backend
- **HTTPS**: Requerido en producción
- **CORS**: Configurado correctamente
- **SQL Injection**: Consultas preparadas

## 📧 Sistema de Emails

Templates incluidos:
- Confirmación de registro
- Recepción de comprobante
- Pago aprobado/rechazado
- Recordatorios de sorteo
- Anuncio de ganadores

## 🚀 Deployment

### Railway (Base de datos):
1. Crear proyecto en Railway
2. Agregar PostgreSQL
3. Copiar DATABASE_URL
4. Configurar en .env

### Render (Aplicación):
1. Conectar repositorio GitHub
2. Configurar build command: `npm run build`
3. Configurar start command: `npm start`
4. Agregar variables de entorno

### Configuración adicional:
- Configurar dominio personalizado
- Habilitar SSL/HTTPS
- Configurar backups automáticos
- Monitoreo con servicios externos

## 🎯 Estados de Números

- 🟢 **Disponible**: Número libre para selección
- 🟡 **Seleccionado**: Seleccionado por usuario actual
- 🟠 **Pendiente**: Esperando verificación de pago
- 🔴 **Vendido**: Pago confirmado

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (5 columnas)
- **Tablet**: 768px - 1199px (8 columnas)
- **Desktop**: ≥ 1200px (10 columnas)

## 🛠️ Comandos Útiles

```bash
# Development
npm run dev           # Iniciar frontend y backend
npm run dev:backend   # Solo backend
npm run dev:frontend  # Solo frontend

# Database
npm run migrate       # Ejecutar migraciones
npm run seed         # Cargar datos de prueba
npm run db:backup    # Crear respaldo

# Production
npm run build        # Construir para producción
npm start           # Iniciar en producción

# Testing
npm test            # Ejecutar tests
npm run test:watch  # Tests en modo watch
```

## 📊 Métricas y Análisis

El sistema incluye tracking de:
- Números más populares
- Horarios de mayor actividad
- Tasas de conversión
- Métodos de pago preferidos
- Tiempo promedio de verificación

## 🤝 Soporte

- Email: soporte@rifasdoradas.com
- WhatsApp: +57 301-234-5678
- Documentación: /docs

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo LICENSE para más detalles.

## 🏆 Créditos

Desarrollado con 💛 por el equipo de Rifas Doradas

---

**Nota**: Recuerda configurar todas las variables de entorno antes de desplegar en producción.
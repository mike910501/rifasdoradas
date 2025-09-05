# 🚀 GUÍA DE DESPLIEGUE EN RENDER - RIFAS DORADAS

## 📋 TABLA DE CONTENIDOS
1. [Variables de Entorno Requeridas](#variables-de-entorno)
2. [Configuración del Backend](#configuración-del-backend)
3. [Configuración del Frontend](#configuración-del-frontend)
4. [Configuración de Base de Datos](#configuración-de-base-de-datos)
5. [Pasos de Despliegue](#pasos-de-despliegue)

---

## 🔐 VARIABLES DE ENTORNO REQUERIDAS

### Backend Variables (Web Service)
```env
# Base de Datos PostgreSQL
DATABASE_URL=postgresql://username:password@hostname:port/database_name
DB_HOST=your-postgres-host
DB_USER=your-postgres-user
DB_PASSWORD=your-postgres-password
DB_NAME=rifas_doradas
DB_PORT=5432

# JWT y Autenticación
JWT_SECRET=your-super-secure-jwt-secret-key-here-min-32-characters
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# Server Configuration
PORT=3002
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.onrender.com

# Email Configuration (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@rifasdoradas.com

# File Upload (opcional)
MAX_FILE_SIZE=5242880
UPLOAD_PATH=/tmp/uploads

# Payment Gateway (configurar según tu proveedor)
PAYMENT_GATEWAY_URL=your-payment-gateway-url
PAYMENT_API_KEY=your-payment-api-key
PAYMENT_SECRET=your-payment-secret

# Socket.io Configuration
SOCKET_ORIGINS=https://your-frontend-url.onrender.com
```

### Frontend Variables (Static Site)
```env
# Backend API URL
VITE_API_URL=https://your-backend-service.onrender.com

# Frontend URL (para CORS)
VITE_FRONTEND_URL=https://your-frontend-url.onrender.com

# Environment
VITE_NODE_ENV=production

# Analytics (opcional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Socket.io URL
VITE_SOCKET_URL=https://your-backend-service.onrender.com
```

---

## ⚙️ CONFIGURACIÓN DEL BACKEND

### 1. Crear Web Service en Render
1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio GitHub: `https://github.com/mike910501/rifasdoradas.git`

### 2. Configuración del Servicio
```yaml
Name: rifas-doradas-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: rifas-doradas/backend
Build Command: npm install
Start Command: npm start
```

### 3. Variables de Entorno del Backend
En la sección "Environment Variables", agrega TODAS las variables listadas arriba.

**⚠️ IMPORTANTE**: 
- `DATABASE_URL` será proporcionada automáticamente cuando conectes PostgreSQL
- `CORS_ORIGIN` debe ser la URL de tu frontend en Render
- `JWT_SECRET` debe ser una cadena segura de al menos 32 caracteres

### 4. Plan Recomendado
- **Desarrollo**: Free plan (tiene limitaciones de sleep)
- **Producción**: Starter plan ($7/mes) para mejor performance

---

## 🎨 CONFIGURACIÓN DEL FRONTEND

### 1. Crear Static Site en Render
1. En Render Dashboard, click "New +" → "Static Site"
2. Conecta el mismo repositorio: `https://github.com/mike910501/rifasdoradas.git`

### 2. Configuración del Sitio Estático
```yaml
Name: rifas-doradas-frontend
Branch: main
Root Directory: rifas-doradas/frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

### 3. Variables de Entorno del Frontend
```env
VITE_API_URL=https://rifas-doradas-backend.onrender.com
VITE_FRONTEND_URL=https://rifas-doradas-frontend.onrender.com
VITE_NODE_ENV=production
VITE_SOCKET_URL=https://rifas-doradas-backend.onrender.com
```

**⚠️ NOTA**: Reemplaza las URLs con tus URLs reales de Render.

---

## 🗄️ CONFIGURACIÓN DE BASE DE DATOS

### 1. Crear PostgreSQL Database
1. En Render Dashboard, click "New +" → "PostgreSQL"
2. Configuración:
```yaml
Name: rifas-doradas-db
Database Name: rifas_doradas
User: rifas_user
Region: Oregon (US West) - (misma región que el backend)
PostgreSQL Version: 15
```

### 2. Conectar Database al Backend
1. Ve a tu Web Service (backend)
2. En "Environment Variables", Render automáticamente agregará:
   - `DATABASE_URL`
   - Otras variables de conexión

### 3. Migración de Base de Datos
El backend ejecutará automáticamente las migraciones al iniciarse.

---

## 🚀 PASOS DE DESPLIEGUE COMPLETO

### Paso 1: Crear Base de Datos
1. Crear PostgreSQL Database primero
2. Copiar la `DATABASE_URL` generada

### Paso 2: Configurar Backend
1. Crear Web Service
2. Configurar todas las variables de entorno
3. Esperar a que termine el build y deployment
4. Probar la API: `https://your-backend.onrender.com/api/health`

### Paso 3: Configurar Frontend
1. Crear Static Site
2. Usar la URL del backend en `VITE_API_URL`
3. Esperar al build y deployment
4. Probar el sitio web

### Paso 4: Actualizar CORS
1. Volver al backend
2. Actualizar `CORS_ORIGIN` con la URL real del frontend
3. Trigger redeploy si es necesario

---

## ⚡ COMANDOS DE BUILD

### Backend (package.json scripts necesarios)
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "npm install",
    "dev": "nodemon server.js"
  }
}
```

### Frontend (package.json scripts necesarios)
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "dev": "vite"
  }
}
```

---

## 🔍 VERIFICACIÓN POST-DESPLIEGUE

### Backend Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

### Frontend Check
- Abrir `https://your-frontend.onrender.com`
- Verificar que se conecta correctamente al backend
- Probar funcionalidades principales

### Database Check
- Verificar que las tablas se crearon correctamente
- Probar inserción/consulta de datos

---

## 🚨 TROUBLESHOOTING COMÚN

### Error: "Cannot connect to database"
- Verificar `DATABASE_URL` en variables de entorno
- Verificar que la región del backend coincida con la de la database

### Error: "CORS blocked"
- Verificar `CORS_ORIGIN` en el backend
- Debe ser exactamente la URL del frontend

### Error: "Build failed"
- Verificar que `package.json` tiene los scripts correctos
- Verificar que las dependencias estén en `dependencies`, no solo en `devDependencies`

### Error: "Environment variables not loading"
- Verificar que las variables estén en la sección correcta
- Reiniciar el servicio si es necesario

---

## 💡 CONSEJOS DE OPTIMIZACIÓN

1. **Free Plan Limitations**: Los servicios free "duermen" después de 15 min de inactividad
2. **Cold Starts**: El primer request después de sleep puede tomar 30+ segundos
3. **Database Connections**: Configurar connection pooling en producción
4. **Static Assets**: Render sirve automáticamente assets estáticos con CDN
5. **Custom Domain**: Se puede configurar dominio personalizado en cualquier plan

---

## 📞 URLS FINALES ESPERADAS

- **Frontend**: `https://rifas-doradas-frontend.onrender.com`
- **Backend API**: `https://rifas-doradas-backend.onrender.com`
- **Database**: Accesible solo desde el backend via `DATABASE_URL`

---

## ✅ CHECKLIST DE DESPLIEGUE

- [ ] ✅ Código subido a GitHub
- [ ] ✅ .gitignore configurado (NO subir .env)
- [ ] 🗄️ PostgreSQL Database creada en Render
- [ ] ⚙️ Backend Web Service configurado
- [ ] 🔐 Variables de entorno del backend configuradas
- [ ] 🎨 Frontend Static Site configurado  
- [ ] 🔐 Variables de entorno del frontend configuradas
- [ ] 🔄 CORS configurado correctamente
- [ ] ✅ Health checks pasando
- [ ] 🌐 Aplicación funcionando en producción

¡Tu aplicación RIFAS DORADAS estará lista para producción! 🎉
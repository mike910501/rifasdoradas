# ⚡ CONFIGURACIÓN RÁPIDA EN RENDER - RIFAS DORADAS

## 🚀 PASOS RÁPIDOS (15 MINUTOS)

### 1️⃣ CREAR BASE DE DATOS (2 min)
```
Dashboard → New + → PostgreSQL
Name: rifas-doradas-db
Database: rifas_doradas  
User: rifas_user
Region: Oregon (US West)
Plan: Free
```

### 2️⃣ CREAR BACKEND (5 min)
```
Dashboard → New + → Web Service
Repository: https://github.com/mike910501/rifasdoradas.git
Name: rifas-doradas-backend
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: rifas-doradas/backend
Build Command: npm install
Start Command: npm start
```

**Variables de Entorno del Backend:**
```env
NODE_ENV=production
PORT=3002
JWT_SECRET=rifas-doradas-super-secure-jwt-secret-key-2024-production-minimum-32-characters
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://rifas-doradas-frontend.onrender.com
MAX_FILE_SIZE=5242880
UPLOAD_PATH=/tmp/uploads
SOCKET_ORIGINS=https://rifas-doradas-frontend.onrender.com
```
*(DATABASE_URL se auto-configura cuando conectes la BD)*

### 3️⃣ CREAR FRONTEND (5 min)
```
Dashboard → New + → Static Site
Repository: https://github.com/mike910501/rifasdoradas.git
Name: rifas-doradas-frontend
Branch: main
Root Directory: rifas-doradas/frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

**Variables de Entorno del Frontend:**
```env
VITE_API_URL=https://rifas-doradas-backend.onrender.com
VITE_FRONTEND_URL=https://rifas-doradas-frontend.onrender.com
VITE_NODE_ENV=production
VITE_SOCKET_URL=https://rifas-doradas-backend.onrender.com
VITE_APP_NAME=Rifas Doradas
VITE_APP_VERSION=1.0.0
```

### 4️⃣ CONECTAR BASE DE DATOS (2 min)
1. Ve al Backend Service
2. Environment → Connect Database
3. Selecciona: rifas-doradas-db
4. Redeploy automático

### 5️⃣ PROBAR (1 min)
- Backend: `https://rifas-doradas-backend.onrender.com/api/health`
- Frontend: `https://rifas-doradas-frontend.onrender.com`

---

## 🔧 URLs FINALES

| Servicio | URL |
|----------|-----|
| **Frontend** | `https://rifas-doradas-frontend.onrender.com` |
| **Backend API** | `https://rifas-doradas-backend.onrender.com` |
| **Database** | *(Solo accesible desde backend)* |

---

## ⚠️ NOTAS IMPORTANTES

1. **Free Plan**: Los servicios "duermen" después de 15 min sin actividad
2. **Cold Start**: Primera carga puede tomar 30-60 segundos
3. **Build Time**: Backend ~2-3 min, Frontend ~3-5 min
4. **Database**: Conexiones limitadas en plan gratuito
5. **CORS**: Debe configurarse EXACTAMENTE como las URLs finales

---

## 🚨 TROUBLESHOOTING RÁPIDO

### ❌ Build Failed
- Verificar que `Root Directory` esté correcto
- Revisar logs de build en Render Dashboard

### ❌ CORS Error
- Verificar `CORS_ORIGIN` en backend = URL exacta del frontend
- Redeploy backend después de cambiar CORS

### ❌ Database Connection Failed
- Verificar que la database esté "Available" 
- Conectar database al backend service
- `DATABASE_URL` debe aparecer automáticamente

### ❌ 404 Not Found
- Frontend: Verificar `Publish Directory: dist`
- Backend: Verificar `Start Command: npm start`

---

## ✅ CHECKLIST RÁPIDO

- [ ] ✅ Código en GitHub: `https://github.com/mike910501/rifasdoradas.git`
- [ ] 🗄️ PostgreSQL Database creada y "Available"
- [ ] ⚙️ Backend Web Service deployado y "Live"  
- [ ] 🎨 Frontend Static Site deployado y "Live"
- [ ] 🔗 Database conectada al backend
- [ ] 🌐 CORS configurado correctamente
- [ ] ✅ URLs respondiendo correctamente
- [ ] 🎯 Aplicación funcional en producción

**¡Listo para producción en 15 minutos! 🚀**
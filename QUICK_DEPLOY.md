# ⚡ Quick Deploy - Render

## 🚀 Pasos Rápidos para Desplegar en Render

### 1. Crear Web Service en Render
- Ve a [Render Dashboard](https://dashboard.render.com/)
- "New +" → "Web Service"
- Conecta tu repositorio GitHub
- Selecciona `atom-challenge-be`

### 2. Configuración Básica
- **Name**: `atom-challenge-be`
- **Environment**: `Node`
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free`

### 3. Variables de Entorno (CRÍTICAS)
```
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-clave-secreta-jwt-aqui
JWT_EXPIRES_IN=24h
FIREBASE_PROJECT_ID=tu-proyecto-firebase-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu-clave-privada-aqui\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=tu-email@tu-proyecto.iam.gserviceaccount.com
CORS_ORIGIN=https://lovely-sprite-4c8d0c.netlify.app
```

### 4. Obtener Firebase Credentials
1. [Firebase Console](https://console.firebase.google.com/)
2. Tu proyecto → ⚙️ → "Cuentas de servicio"
3. "Generar nueva clave privada"
4. Usar valores del JSON descargado

### 5. Desplegar
- "Create Web Service"
- Esperar 5-10 minutos
- URL: `https://tu-backend.onrender.com`

### 6. Verificar
- Health: `https://tu-backend.onrender.com/health`
- Test Firebase: `https://tu-backend.onrender.com/test-firebase`

## 🔗 URLs
- **Frontend**: https://lovely-sprite-4c8d0c.netlify.app
- **Backend**: https://tu-backend.onrender.com

## 📖 Documentación Completa
Ver `RENDER_DEPLOYMENT.md` para detalles completos. 
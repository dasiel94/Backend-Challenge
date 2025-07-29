# 🚀 Render Deployment Guide - Atom Challenge Backend

Este proyecto está configurado para ser desplegado en Render y comunicarse con el frontend en https://lovely-sprite-4c8d0c.netlify.app.

## 📋 Prerrequisitos

1. Cuenta en [Render](https://render.com)
2. Proyecto de Firebase configurado
3. Repositorio de GitHub con este código

## 🔧 Configuración en Render

### 1. Crear Web Service

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `atom-challenge-be`

### 2. Configuración del Servicio

- **Name**: `atom-challenge-be`
- **Environment**: `Node`
- **Region**: Elige la más cercana a tus usuarios
- **Branch**: `main` (o tu rama principal)
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free` (o el plan que prefieras)

### 3. Variables de Entorno

Configura estas variables en la sección "Environment Variables":

#### 🔐 Variables Requeridas:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-clave-secreta-jwt-muy-segura-aqui
JWT_EXPIRES_IN=24h
```

#### 🔥 Variables de Firebase:
```
FIREBASE_PROJECT_ID=tu-proyecto-firebase-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu-clave-privada-completa-aqui\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=tu-email-cliente@tu-proyecto.iam.gserviceaccount.com
```

#### 🌐 Variable de CORS (CRÍTICA):
```
CORS_ORIGIN=https://lovely-sprite-4c8d0c.netlify.app
```

## 🔥 Configuración de Firebase

### Obtener Credenciales de Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a ⚙️ → "Configuración del proyecto" → "Cuentas de servicio"
4. Haz clic en "Generar nueva clave privada"
5. Descarga el archivo JSON

### Configurar Variables en Render:

Del archivo JSON descargado, usa estos valores:

- `FIREBASE_PROJECT_ID`: El valor de `project_id`
- `FIREBASE_PRIVATE_KEY`: El valor de `private_key` (incluye las comillas y `\n`)
- `FIREBASE_CLIENT_EMAIL`: El valor de `client_email`

**⚠️ IMPORTANTE**: 
- La `FIREBASE_PRIVATE_KEY` debe incluir las comillas y los `\n`
- Nunca subas el archivo JSON al repositorio
- En Render, la variable se procesará automáticamente

## 🚀 Despliegue

1. Haz clic en "Create Web Service"
2. Render comenzará el build automáticamente
3. El proceso puede tomar 5-10 minutos
4. Una vez completado, obtendrás una URL como: `https://atom-challenge-be.onrender.com`

## ✅ Verificación Post-Despliegue

### Endpoints de Prueba:

1. **Health Check**: `https://tu-backend.onrender.com/health`
   - Debe devolver: `{"status":"ok","timestamp":"...","environment":"production","version":"1.0.0"}`

2. **API Root**: `https://tu-backend.onrender.com/`
   - Debe devolver un mensaje de bienvenida

3. **Test Firebase**: `https://tu-backend.onrender.com/test-firebase`
   - Debe crear un documento de prueba en Firebase

4. **Swagger (solo desarrollo)**: `https://tu-backend.onrender.com/api`
   - Solo disponible si `NODE_ENV` no es `production`

### Verificar CORS:

1. Abre las herramientas de desarrollador en tu frontend
2. Intenta hacer una petición al backend
3. Verifica que no haya errores de CORS en la consola

## 🔄 Despliegues Automáticos

- Cada push a la rama principal activará un nuevo despliegue
- Puedes ver el estado en el dashboard de Render
- Los logs están disponibles en tiempo real

## 🐛 Troubleshooting

### Problemas Comunes:

#### 1. Error de Build
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Render

#### 2. Error de Variables de Entorno
- Asegúrate de que todas las variables requeridas estén configuradas
- Verifica que no haya espacios extra en los valores

#### 3. Error de Firebase
- Verifica que las credenciales de Firebase sean correctas
- Asegúrate de que la `FIREBASE_PRIVATE_KEY` incluya las comillas y `\n`

#### 4. Error de CORS
- Verifica que `CORS_ORIGIN` coincida exactamente con la URL del frontend
- Revisa los logs del backend para ver qué origen está siendo bloqueado

#### 5. Error de Puerto
- Render asigna automáticamente el puerto, no necesitas configurarlo
- La variable `PORT` es para uso interno

### Logs y Debugging:

1. Ve a tu servicio en Render
2. Haz clic en "Logs"
3. Revisa los logs para identificar problemas
4. Los logs incluyen información de CORS y Firebase

## 🔗 URLs de la Aplicación

- **Frontend**: https://lovely-sprite-4c8d0c.netlify.app
- **Backend**: https://tu-backend.onrender.com (se generará automáticamente)

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en Render
2. Verifica la configuración de variables de entorno
3. Prueba los endpoints de verificación
4. Asegúrate de que Firebase esté configurado correctamente

## 🎉 ¡Listo!

Una vez que todo esté configurado correctamente, tu backend estará disponible y podrá comunicarse con el frontend sin problemas de CORS. 
# Configuración de Despliegue - Atom Challenge

## Variables de Entorno para Render

Configura estas variables en tu servicio de Render:

### Variables Requeridas:
```
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-clave-secreta-jwt-aqui
JWT_EXPIRES_IN=24h
```

### Variables de Firebase:
```
FIREBASE_PROJECT_ID=tu-proyecto-firebase-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu-clave-privada-aqui\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=tu-email-cliente@tu-proyecto.iam.gserviceaccount.com
```

### Variable de CORS (IMPORTANTE):
```
CORS_ORIGIN=https://lovely-sprite-4c8d0c.netlify.app
```

## URLs de la Aplicación

- **Frontend**: https://lovely-sprite-4c8d0c.netlify.app
- **Backend**: https://tu-backend.onrender.com (se generará automáticamente)

## Verificación Post-Despliegue

1. **Health Check**: `https://tu-backend.onrender.com/health`
2. **API Root**: `https://tu-backend.onrender.com/`
3. **Test Firebase**: `https://tu-backend.onrender.com/test-firebase`

## Configuración del Frontend

Asegúrate de que tu frontend esté configurado para hacer peticiones a la URL del backend de Render.

## Notas Importantes

- La variable `CORS_ORIGIN` debe coincidir exactamente con la URL de tu frontend
- Si necesitas múltiples orígenes, sepáralos con comas: `https://dominio1.com,https://dominio2.com`
- En desarrollo local, usa: `http://localhost:4201` 
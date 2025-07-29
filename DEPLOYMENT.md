# Despliegue en Render

Este proyecto está configurado para ser desplegado en Render.

## Configuración en Render

### 1. Crear un nuevo Web Service

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Haz clic en "New +" y selecciona "Web Service"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `atom-challenge-be`

### 2. Configuración del servicio

- **Name**: `atom-challenge-be` (o el nombre que prefieras)
- **Environment**: `Node`
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm run start:prod`
- **Plan**: `Free` (o el plan que prefieras)

### 3. Variables de entorno

Configura las siguientes variables de entorno en Render:

#### Variables requeridas:
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render asignará automáticamente)
- `JWT_SECRET`: Tu clave secreta para JWT
- `JWT_EXPIRES_IN`: `24h` (o el tiempo que prefieras)

#### Variables de Firebase:
- `FIREBASE_PROJECT_ID`: ID de tu proyecto de Firebase
- `FIREBASE_PRIVATE_KEY`: Clave privada de Firebase (incluye las comillas)
- `FIREBASE_CLIENT_EMAIL`: Email del cliente de Firebase

#### Variables opcionales:
- `CORS_ORIGIN`: URL de tu frontend (ej: `https://lovely-sprite-4c8d0c.netlify.app`)

### 4. Configuración de Firebase

Para Firebase en producción:

1. Ve a tu proyecto de Firebase
2. Configuración del proyecto > Cuentas de servicio
3. Genera una nueva clave privada
4. Descarga el archivo JSON
5. Usa los valores del JSON para configurar las variables de entorno en Render

**Importante**: En producción, NO subas el archivo `firebase-service-account.json` al repositorio.

### 5. Despliegue

1. Render detectará automáticamente los cambios en tu repositorio
2. Cada push a la rama principal activará un nuevo despliegue
3. Puedes verificar el estado del despliegue en el dashboard de Render

## Verificación del despliegue

Una vez desplegado, puedes verificar que todo funciona correctamente:

1. Visita la URL de tu aplicación (ej: `https://atom-challenge-be.onrender.com`)
2. Deberías ver una respuesta JSON o la documentación de Swagger (si no estás en producción)
3. Prueba los endpoints de tu API

## Troubleshooting

### Problemas comunes:

1. **Error de build**: Verifica que todas las dependencias estén en `package.json`
2. **Error de variables de entorno**: Asegúrate de que todas las variables requeridas estén configuradas
3. **Error de Firebase**: Verifica que las credenciales de Firebase sean correctas
4. **Error de CORS**: Configura correctamente la variable `CORS_ORIGIN`

### Logs

Puedes ver los logs de tu aplicación en el dashboard de Render:
1. Ve a tu servicio
2. Haz clic en "Logs"
3. Revisa los logs para identificar problemas

## Desarrollo local

Para desarrollo local, crea un archivo `.env` basado en `env.example`:

```bash
cp env.example .env
```

Luego configura las variables de entorno en el archivo `.env`. 
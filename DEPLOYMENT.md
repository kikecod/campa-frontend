# Guía de Despliegue e Integración

## Despliegue en Producción

### Con Vercel (Recomendado)

El proyecto ya incluye un archivo `vercel.json` configurado para SPAs con Vite.

#### 1. Conectar repositorio a Vercel

```bash
# Opción A: Usando Vercel CLI
npm i -g vercel
vercel login
vercel
```

```bash
# Opción B: Via Dashboard
# 1. Ve a https://vercel.com/new
# 2. Importa tu repositorio de GitHub
# 3. Vercel detectará automáticamente la configuración de Vite
```

#### 2. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a **Settings > Environment Variables** y agrega:

| Variable | Valor | Entornos |
|----------|-------|----------|
| `VITE_API_URL` | `https://tu-backend.onrender.com/api` | Production |
| `VITE_APP_NAME` | `Juventud con Propósito` | All |
| `VITE_APP_VERSION` | `0.1.0` | All |

> ⚠️ **Importante**: Las variables de Vite deben tener el prefijo `VITE_` para estar disponibles en el cliente.

#### 3. Desplegar

- **Automático**: Cada push a `main` despliega automáticamente
- **Manual**: Ejecuta `vercel --prod` desde la CLI

#### 4. Verificar Despliegue

Después del despliegue, verifica:
- [ ] La app carga correctamente
- [ ] Las rutas SPA funcionan (navegación directa a `/dashboard`, etc.)
- [ ] La conexión con el backend funciona (login, registro)

### Con Netlify

1. **Conectar repositorio**
   - Ve a netlify.com y conecta tu repositorio de GitHub

2. **Configurar build**
   ```
   Build command: pnpm build
   Publish directory: dist
   ```

3. **Agregar variables de entorno**
   - En Netlify > Settings > Environment Variables
   - Agrega: `VITE_API_URL`

### Con otra plataforma

```bash
# Build
pnpm build

# Los archivos en `dist/` pueden desplegarse en cualquier servidor estático
# (AWS S3, Google Cloud Storage, etc.)
```

## Integración Backend

### Arquitectura Recomendada

```
Frontend (Vite + React)
        ↓
   API Gateway / Auth
        ↓
Backend Services (Node.js, Python, etc.)
        ↓
Database (PostgreSQL, MongoDB, etc.)
```

### Configurar API Base URL

1. **Desarrollo**
   ```bash
   # .env.local
   VITE_API_URL=http://localhost:3001/api
   ```

2. **Producción**
   ```
   VITE_API_URL=https://api.tudominio.com/api
   ```

### Endpoints Requeridos

El backend debe implementar estos endpoints:

#### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual

#### Usuarios
- `GET /api/users/:id` - Obtener perfil
- `PUT /api/users/:id` - Actualizar perfil
- `GET /api/users/:id/stats` - Obtener estadísticas
- `PUT /api/users/:id/stats` - Actualizar estadísticas

#### Retos
- `GET /api/challenges` - Listar todos los retos
- `GET /api/challenges/:id` - Obtener reto específico
- `POST /api/challenges/:id/complete` - Marcar reto como completado
- `GET /api/challenges/user/my` - Obtener retos del usuario

#### Galería
- `GET /api/gallery` - Listar fotos
- `GET /api/gallery/:id` - Obtener foto específica
- `POST /api/gallery/upload` - Subir foto
- `POST /api/gallery/:id/like` - Dar like
- `POST /api/gallery/:id/unlike` - Quitar like
- `POST /api/gallery/:id/comment` - Agregar comentario

### Ejemplo de Request/Response

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "contraseña123"
}

Response 200:
{
  "success": true,
  "data": {
    "token": "jwt-token-aqui",
    "user": {
      "id": "user-123",
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "usuario@email.com",
      "church": "San Pablo",
      "joinedDate": "2026-02-14T00:00:00Z"
    },
    "expiresIn": 86400
  }
}
```

#### Desafíos del Usuario
```bash
GET /api/challenges/user/my
Authorization: Bearer jwt-token-aqui

Response 200:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Oración Matutina",
      "description": "Dedica 10 minutos a orar",
      "category": "Espiritual",
      "completed": true,
      "points": 50,
      "dueDate": "2026-02-14"
    }
  ]
}
```

## Seguridad

### HTTPS
- Asegúrate de usar HTTPS en producción
- Redirige HTTP a HTTPS

### CORS
- Configura CORS correctamente en tu backend
- Permite solo los orígenes confiables

```javascript
// Ejemplo con Express
const cors = require('cors');
app.use(cors({
  origin: ['https://tudominio.com', 'https://www.tudominio.com'],
  credentials: true
}));
```

### Tokens JWT
- Usa tokens con expiración corta (1-2 horas)
- Implementa refresh tokens para renovación
- Almacena tokens en httpOnly cookies cuando sea posible

### Rate Limiting
- Limita las requests por IP para prevenir ataques
- Usa rate limiting especialmente en endpoints de auth

### Validación
- Valida todos los inputs en el backend
- Usa HTTPS para toda transmisión de datos
- Implementa validación de CSRF tokens

## Monitoreo

### Logs
- Implementa logging centralizado (Sentry, LogRocket, etc.)
- Monitorea errores en tiempo real

### Métricas
- Trackea performance de la app
- Monitorea usage de usuarios
- Analiza tendencias de engagement

### Salud de la API
- Implementa health checks
- Monitorea uptime del servidor

## Base de Datos

### Esquema Recomendado

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  church VARCHAR(255),
  profile_image VARCHAR(255),
  joined_date TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### User Stats
```sql
CREATE TABLE user_stats (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  challenges_completed INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Challenges
```sql
CREATE TABLE challenges (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  points INTEGER DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### User Challenge Progress
```sql
CREATE TABLE user_challenge_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  challenge_id UUID REFERENCES challenges(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Photos
```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  author_id UUID REFERENCES users(id),
  category VARCHAR(100),
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Próximos Pasos

1. Crear backend API siguiendo los endpoints especificados
2. Implementar autenticación con JWT
3. Configurar base de datos
4. Integrar servicios de almacenamiento (para fotos)
5. Implementar notificaciones push
6. Agregar analytics
7. Configurar emails transaccionales
8. Implementar pagos (si aplicable)

## Recursos

- [Documentación de Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)
- [Vercel Docs](https://vercel.com/docs)

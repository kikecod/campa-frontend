# Resumen del Proyecto - Juventud con Propósito 2026

## Descripción General

Aplicación web moderna y completa para la campaña juvenil "Juventud con Propósito - Fe con Compromiso" de la iglesia San Pablo. Construida con **React**, **Vite** y **Tailwind CSS**, ofrece una experiencia interactiva y atractiva para jóvenes participantes.

## Características Implementadas

### 1. Landing Page
- Diseño visual impactante basado en el afiche de la campaña
- Información del evento (14-17 de Febrero en Achocalla)
- Cita bíblica inspiradora (1 Timoteo 4:12)
- Símbolo del árbol con raíces (elemento clave del diseño)
- Botones de acción para inscripción e inicio de sesión
- Secciones informativas sobre características de la campaña
- Diseño completamente responsive (mobile, tablet, desktop)

### 2. Sistema de Autenticación
- **Registro**: Formulario completo con validación
  - Nombre y apellido
  - Email único
  - Contraseña segura (mínimo 6 caracteres)
  - Selección de iglesia/comunidad
  - Confirmación de contraseña
- **Login**: Interfaz simple y segura
  - Email y contraseña
  - Visualización de contraseña
  - Persistencia con localStorage (demo) - lista para JWT en producción
- **Protección de rutas**: Redirección automática a login para usuarios no autenticados

### 3. Dashboard Personal
- **Estadísticas en tiempo real**:
  - Retos completados
  - Racha de días consecutivos
  - Puntos ganados
  - Nivel actual
- **Barras de progreso animadas**:
  - Progreso hacia siguiente nivel
  - Racha semanal
  - Próximo logro
- **Acceso rápido** a retos, galería y logros
- **Interfaz intuitiva** con estadísticas visuales

### 4. Sistema de Retos Diarios
- **6 retos diferentes** organizados por categoría:
  - Espiritual
  - Aprendizaje
  - Servicio
  - Testimonio
  - Reflexión
  - Bienestar
- **Interactividad**: Marcar/desmarcar retos completados
- **Puntuación**: Cada reto otorga puntos específicos
- **Bonificación**: 200 puntos bonus por completar todos
- **Filtrado por categoría**
- **Seguimiento de progreso diario**

### 5. Galería de Fotos
- **Grid responsivo** de fotos de la campaña
- **Modal interactivo** para ver fotos en detalle
- **Funciones sociales**:
  - Sistema de "likes" interactivo
  - Información del autor
  - Fecha de publicación
- **Categorización** de fotos
- **6 fotos de ejemplo** con diferentes momentos del evento
- **Interfaz de comentarios** (lista para backend)

### 6. Navegación y UX
- **Barra de navegación** sticky con acceso rápido
- **Menú responsivo** para dispositivos móviles
- **Indicadores visuales** de sección activa
- **Botón de logout** seguro

## Tecnologías Utilizadas

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Frontend Framework** | React | 19.2.3 |
| **Build Tool** | Vite | 5.4.1 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **Routing** | React Router | 6.28.0 |
| **State Management** | Context API | Nativa |
| **Icons** | Lucide React | 0.544.0 |
| **Language** | TypeScript | 5.7.3 |
| **Package Manager** | pnpm | Recomendado |

## Estructura del Proyecto

```
youth-retreat-app/
├── src/
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ChallengesPage.tsx
│   │   └── GalleryPage.tsx
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ProgressCard.tsx
│   │   └── TreeWithRoots.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .env.example
├── .env.local
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
├── README.md
├── DEVELOPMENT.md
├── DEPLOYMENT.md
└── PROJECT_SUMMARY.md
```

## Paleta de Colores

| Uso | Color | Código |
|-----|-------|--------|
| **Primario** | Naranja vibrante | #FF6B35 |
| **Primario Oscuro** | Naranja oscuro | #E85A24 |
| **Secundario** | Negro | #1a1a1a |
| **Acento Dorado** | Dorado | #FFD700 |
| **Acento Naranja** | Naranja claro | #FF8C00 |
| **Fondos** | Gris oscuro | #0a0a0a - #333333 |
| **Texto** | Blanco/Gris | #ffffff - #cccccc |

## Características de Diseño

- **Dark Mode**: Interfaz con tema oscuro (perfecto para jóvenes)
- **Gradientes sutiles**: De naranja a negro, crean profundidad
- **Animaciones**: Transiciones suaves, barras de progreso animadas
- **Iconografía**: 50+ iconos de Lucide React
- **Tipografía**: Sistema nativo de fuentes del navegador
- **Responsive Design**: Mobile-first approach

## Funcionalidades de Seguridad

- **Autenticación**: Sistema JWT-ready (implementado con localStorage para demo)
- **Protección de rutas**: Redirección automática
- **Validación de formularios**: Lado cliente completa
- **CORS**: Listo para configuración backend
- **HTTPS Ready**: Configuración lista para producción

## Cómo Empezar

### Requisitos
- Node.js 16+
- pnpm (o npm)

### Instalación
```bash
# Clonar/descargar proyecto
cd youth-retreat-app

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Abrir en navegador
# http://localhost:5173
```

### Build para Producción
```bash
pnpm build

# Preview
pnpm preview
```

## Rutas Disponibles

| Ruta | Descripción | Autenticado | Componente |
|------|-----------|:----------:|-----------|
| `/` | Landing page | No | LandingPage |
| `/login` | Iniciar sesión | No | LoginPage |
| `/register` | Registrarse | No | RegisterPage |
| `/dashboard` | Panel principal | Sí | DashboardPage |
| `/challenges` | Retos diarios | Sí | ChallengesPage |
| `/gallery` | Galería de fotos | Sí | GalleryPage |

## Datos de Demo

### Usuario de Prueba
- **Email**: `demo@example.com`
- **Contraseña**: `demo123`

O crea un nuevo usuario usando el formulario de registro.

## Próximos Pasos (Recomendaciones)

### Corto Plazo
1. Integración con backend real (Node.js, Python, etc.)
2. Implementar JWT tokens y refresh tokens
3. Conectar base de datos
4. Implementar upload de fotos reales

### Mediano Plazo
1. Notificaciones push
2. Compartir en redes sociales
3. Leaderboard de usuarios
4. Sistema de logros/badges

### Largo Plazo
1. App móvil nativa (React Native)
2. Live streaming del evento
3. Tienda de merchandise
4. Integración de pagos

## Documentación Disponible

- **README.md**: Instrucciones básicas de instalación
- **DEVELOPMENT.md**: Guía completa de desarrollo
- **DEPLOYMENT.md**: Guía de despliegue e integración backend

## Configuración Recomendada

### IDE
- **VS Code** con extensiones:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

### Herramientas
- **Git** para control de versiones
- **GitHub** para repositorio
- **Vercel** para despliegue
- **Sentry** para monitoreo de errores

## Soporte y Contacto

Para información sobre la campaña:
- **Teléfono**: 75253409 | 60597800
- **Iglesia**: San Pablo
- **Ubicación del evento**: Achocalla

## Licencia

Este proyecto es parte de la campaña San Pablo 2026. Todos los derechos reservados.

## Notas Importantes

1. **Autenticación Demo**: Actualmente usa localStorage. Para producción, implementar backend con JWT.
2. **Fotos Demo**: Se usan imágenes de ejemplo de Unsplash. Reemplazar con fotos reales del evento.
3. **API Endpoints**: Los endpoints están definidos en `src/services/api.ts` pero apuntan a un backend que necesita implementarse.
4. **Variables de Entorno**: Copiar `.env.example` a `.env.local` y configurar.

---

**Proyecto completado y listo para desarrollo e integración backend.**
Última actualización: Febrero 2026

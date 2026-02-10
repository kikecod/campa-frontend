# Juventud con Propósito

Aplicación web moderna con sistema de retos, galería de fotos y dashboard interactivo. Construida con React, Vite y Tailwind CSS.

## Características

- **Landing Page**: Página de inicio con diseño moderno y galería de imágenes destacadas
- **Autenticación**: Sistema completo de login y registro con validación
- **Dashboard**: Panel personalizado con estadísticas, racha de días y progreso
- **Retos Diarios**: Sistema interactivo de retos con puntuación y bonificaciones
- **Galería de Fotos**: Galería compartida con likes, comentarios y categorización
- **Navegación Responsiva**: Interfaz adaptable a dispositivos móviles y desktop

## Tecnologías

- **Frontend**: React 19.2.3
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.28.0
- **Icons**: Lucide React 0.544.0

## Requisitos Previos

- Node.js 16.x o superior
- pnpm (recomendado) o npm

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd youth-retreat-app
```

2. Instala las dependencias:
```bash
pnpm install
# o
npm install
```

## Comandos Disponibles

### Desarrollo
```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build
```bash
pnpm build
# o
npm run build
```

### Preview
```bash
pnpm preview
# o
npm preview
```

## Estructura del Proyecto

```
src/
├── pages/
│   ├── LandingPage.tsx          # Página de inicio
│   ├── LoginPage.tsx            # Página de login
│   ├── RegisterPage.tsx         # Página de registro
│   ├── DashboardPage.tsx        # Dashboard principal
│   ├── ChallengesPage.tsx       # Página de retos
│   └── GalleryPage.tsx          # Galería de fotos
├── components/
│   ├── Navigation.tsx           # Barra de navegación
│   ├── ProgressCard.tsx         # Componente de progreso
│   └── TreeWithRoots.tsx        # Símbolo del árbol
├── App.tsx                      # Componente principal
├── main.tsx                     # Entrada de la aplicación
└── index.css                    # Estilos globales
```

## Características Principales

### Landing Page
- Diseño visual moderno con galería de imágenes destacadas
- Llamadas a la acción para registro e inicio de sesión
- Secciones informativas sobre funcionalidades principales
- Navegación clara y intuitiva

### Autenticación
- Registro de nuevos usuarios con validación
- Login seguro con persistencia en localStorage
- Protección de rutas para usuarios autenticados

### Dashboard
- Visualización de estadísticas personales (retos completados, racha, puntos, nivel)
- Barras de progreso animadas
- Acceso rápido a retos, galería y logros

### Retos Diarios
- Sistema interactivo de retos por completar
- Categorización de retos
- Puntuación por cada reto completado
- Racha de días y bonus de puntos

### Galería
- Visualización de fotos en grid responsivo
- Modal interactivo para ver fotos en detalle
- Sistema de likes
- Información del autor y fecha
- Categorización de fotos

## Autenticación

El sistema de autenticación actual utiliza localStorage para demostración. Para producción, se recomienda:
- Integración con un backend (Node.js, Python, etc.)
- Uso de JWT tokens
- Haseo seguro de contraseñas (bcrypt)
- HTTPS para transmisión de datos

## Estilo y Diseño

- **Paleta de Colores**:
  - Primario: #FF6B35 (Naranja vibrante)
  - Secundario: #1a1a1a (Negro)
  - Acentos: #FFD700 (Dorado)
  
- **Tipografía**: Sistema de fuentes nativas del navegador
- **Responsividad**: Mobile-first design con breakpoints en md (768px) y lg (1024px)

## Versioning

- Versión actual: 0.1.0

## Licencia

Este proyecto está disponible para uso comercial y educativo.

---

Desarrollado para conectar comunidades a través de imágenes y funcionalidades interactivas.

# Inicio Rápido

## En 5 Minutos

### 1. Clonar o Descargar
```bash
cd youth-retreat-app
```

### 2. Instalar Dependencias
```bash
pnpm install
```

O si usas npm:
```bash
npm install
```

### 3. Iniciar Servidor de Desarrollo
```bash
pnpm dev
```

### 4. Abrir en Navegador
```
http://localhost:5173
```

## Probar la App

### Registrarse (Opción 1)
1. Haz clic en "Crear Cuenta" en la landing page
2. Completa el formulario con tus datos
3. Inicia sesión con tus credenciales

### Login (Opción 2)
1. Haz clic en "Inicia Sesión"
2. Usa cualquier email y contraseña (mínimo 6 caracteres)
3. ¡Accede a tu dashboard!

## Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `src/App.tsx` | Punto de entrada principal |
| `src/pages/` | Todas las páginas de la app |
| `src/components/` | Componentes reutilizables |
| `src/context/AuthContext.tsx` | Manejo de autenticación |
| `src/index.css` | Estilos globales |
| `vite.config.ts` | Configuración de Vite |
| `tailwind.config.ts` | Configuración de Tailwind |

## Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Ver build en local
pnpm preview

# Lint (si está configurado)
pnpm lint
```

## Estructura de Rutas

```
Landing Page (/):
├── Botón "Inscribirse" → /register
└── Botón "Ya soy participante" → /login

Después de Login:
├── Dashboard (/dashboard)
├── Retos (/challenges)
└── Galería (/gallery)
```

## Cambiar Estilos

### Colores
Edita en `src/index.css`:
```css
:root {
  --primary: #FF6B35;        /* Cambiar color primario */
  --secondary: #1a1a1a;      /* Cambiar color secundario */
  --accent-gold: #FFD700;    /* Cambiar acento */
}
```

### Tipografía
Edita en `tailwind.config.ts`:
```ts
fontFamily: {
  sans: ['Tu Font Aqui'],
}
```

## Agregar Contenido

### Cambiar Logo/Nombre
En `src/components/Navigation.tsx`:
```tsx
<span className="text-2xl font-bold text-orange-500">TU NOMBRE</span>
```

### Cambiar Información de Contacto
En `src/pages/LandingPage.tsx`:
```tsx
<p className="text-lg text-orange-400">TUS NÚMEROS AQUÍ</p>
```

### Agregar Retos
En `src/pages/ChallengesPage.tsx`, dentro del estado inicial:
```tsx
{
  id: 7,
  title: "Tu Nuevo Reto",
  description: "Descripción...",
  icon: <IconoDeLucide />,
  category: "Categoría",
  completed: false,
  points: 50,
}
```

### Agregar Fotos
En `src/pages/GalleryPage.tsx`, dentro del estado inicial:
```tsx
{
  id: 7,
  title: "Título de Foto",
  image: "URL DE LA IMAGEN",
  author: "Tu Nombre",
  likes: 0,
  liked: false,
  category: "Categoría",
  description: "Descripción...",
  date: "17 Feb 2026",
}
```

## Solucionar Problemas Comunes

### Error: "Cannot find module"
```bash
# Reinicia el servidor
Ctrl+C
pnpm dev
```

### Los estilos no se aplican
```bash
# Reinstala dependencias
rm -rf node_modules
pnpm install
pnpm dev
```

### Puerto ya en uso
```bash
# Usa otro puerto
pnpm dev -- --port 3000
```

## Enviar a Producción

### Con Vercel (Recomendado)
1. Push a GitHub
2. Conecta en vercel.com
3. ¡Listo! Se despliega automáticamente

### Otros Hosts
```bash
# Build
pnpm build

# Archivo en `dist/` es lo que subes
```

## Variables de Entorno

Si necesitas un backend:

1. Copia `.env.example` a `.env.local`
2. Edita la URL de tu API:
```
VITE_API_URL=https://tu-api.com/api
```

## Próximo Paso: Backend

Para integrar un backend, revisa `DEPLOYMENT.md` para:
- Endpoints requeridos
- Estructura de API
- Cómo conectar desde el frontend

## Necesitas Ayuda?

1. Lee `README.md` para instrucciones detalladas
2. Lee `DEVELOPMENT.md` para guía de desarrollo
3. Lee `DEPLOYMENT.md` para integración backend
4. Revisa `PROJECT_SUMMARY.md` para visión general

---

**¡Listo para comenzar!** 

Cualquier pregunta, revisa la documentación o experimenta directamente en el código. La estructura es simple y bien documentada.

# Guía de Desarrollo

## Arquitectura de la Aplicación

### Stack Tecnológico
- **Framework**: React 19.2.3 con TypeScript
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.28.0
- **State Management**: Context API + localStorage
- **Icons**: Lucide React

### Estructura de Directorios

```
src/
├── pages/               # Páginas principales (rutas)
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── ChallengesPage.tsx
│   └── GalleryPage.tsx
├── components/          # Componentes reutilizables
│   ├── Navigation.tsx
│   ├── ProgressCard.tsx
│   └── TreeWithRoots.tsx
├── context/            # Context API para estado global
│   └── AuthContext.tsx
├── services/           # Servicios de API y utilidades
│   └── api.ts
├── types/              # Definiciones de tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente raíz
├── main.tsx            # Entrada de la aplicación
└── index.css           # Estilos globales
```

## Guía de Desarrollo

### Ejecutar en Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# La app estará en http://localhost:5173
```

### Agregar una Nueva Página

1. **Crear archivo en `src/pages/`**
```tsx
// src/pages/NewPage.tsx
import { useAuth } from '../context/AuthContext'

export default function NewPage() {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Tu contenido aquí */}
    </div>
  )
}
```

2. **Agregar ruta en `src/App.tsx`**
```tsx
import NewPage from './pages/NewPage'

// En el router:
<Route path="/new-page" element={<NewPage />} />
```

### Agregar un Nuevo Componente

```tsx
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string
  variant?: 'primary' | 'secondary'
}

export default function MyComponent({ title, variant = 'primary' }: MyComponentProps) {
  const baseStyles = 'p-4 rounded-lg'
  const variantStyles = {
    primary: 'bg-orange-500 text-white',
    secondary: 'bg-gray-800 text-gray-100'
  }
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      {title}
    </div>
  )
}
```

### Usar el Contexto de Autenticación

```tsx
import { useAuth } from '../context/AuthContext'

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, stats } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bienvenido {user?.firstName}</p>
          <p>Puntos: {stats?.points}</p>
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <p>Por favor inicia sesión</p>
      )}
    </div>
  )
}
```

### Llamar a la API

```tsx
import { challengesApi } from '../services/api'
import { useEffect, useState } from 'react'

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchChallenges() {
      setLoading(true)
      const response = await challengesApi.getAll()
      if (response.success && response.data) {
        setChallenges(response.data)
      }
      setLoading(false)
    }
    
    fetchChallenges()
  }, [])

  if (loading) return <p>Cargando...</p>
  
  return (
    <div>
      {challenges.map(ch => (
        <div key={ch.id}>{ch.title}</div>
      ))}
    </div>
  )
}
```

## Estilos y Diseño

### Convenciones de Tailwind

- **Colores primarios**: `text-orange-500`, `bg-orange-500`, `border-orange-500`
- **Colores neutrales**: `text-gray-900`, `bg-gray-800`, `text-gray-400`
- **Espaciado**: Usar escala de Tailwind (p-4, m-2, gap-6)
- **Responsive**: `md:` para tablets (768px), `lg:` para desktop (1024px)

### Tema de Colores

```css
/* Variables en index.css */
--primary: #FF6B35          /* Naranja principal */
--primary-dark: #E85A24     /* Naranja oscuro */
--secondary: #1a1a1a        /* Negro */
--accent-gold: #FFD700      /* Dorado */
--accent-orange: #FF8C00    /* Naranja claro */
```

## Testing

### Para agregar tests en el futuro:

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

Crear archivo de test:
```tsx
// src/components/__tests__/ProgressCard.test.tsx
import { render, screen } from '@testing-library/react'
import ProgressCard from '../ProgressCard'

describe('ProgressCard', () => {
  it('renders correctly', () => {
    render(
      <ProgressCard 
        title="Test" 
        description="Test description" 
        progress={50} 
        color="orange" 
      />
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## Debugging

### Console Logs
```tsx
// Usar para debugging durante desarrollo
console.log('[v0] Data:', data)
```

### React DevTools
```bash
# Instalar extensión en Chrome/Firefox
# Ayuda a inspeccionar componentes y props
```

### Network Inspector
- Abre DevTools (F12)
- Ve a Network para inspeccionar requests a la API
- Verifica que la API está respondiendo correctamente

## Performance

### Optimizaciones Recomendadas

1. **Code Splitting**
```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

2. **Memoization**
```tsx
import { memo } from 'react'

const MyComponent = memo(({ data }) => {
  return <div>{data}</div>
})
```

3. **Lazy Images**
```tsx
<img 
  src="image.jpg" 
  loading="lazy" 
  alt="Descripción"
/>
```

## Convenciones de Código

### Nombres de Archivos
- Componentes: PascalCase (LoginPage.tsx)
- Servicios/Utilities: camelCase (api.ts)
- Tipos: PascalCase (index.ts)

### Estructura de Componentes
```tsx
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import MyComponent from '../components/MyComponent'

interface MyPageProps {
  param?: string
}

export default function MyPage({ param }: MyPageProps) {
  // Hooks
  const { user } = useAuth()
  const [state, setState] = useState(null)

  useEffect(() => {
    // Side effects
  }, [])

  // Handlers
  const handleClick = () => {
    setState(null)
  }

  // Render
  return (
    <div className="container">
      {/* JSX */}
    </div>
  )
}
```

### Imports
```tsx
// 1. React/externos
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Internos (context, services)
import { useAuth } from '../context/AuthContext'
import { userApi } from '../services/api'

// 3. Componentes
import Navigation from '../components/Navigation'

// 4. Tipos
import type { User } from '../types'
```

## Git Workflow

```bash
# Crear rama para feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios
git add .
git commit -m "Agregar nueva funcionalidad"

# Push y crear PR
git push origin feature/nueva-funcionalidad
```

## Troubleshooting

### Error: "Cannot find module"
- Verifica que el path es correcto
- Los imports deben ser relativos: `../components/Name`

### Estilos no se aplican
- Verifica que Tailwind está compilando
- Reinicia el dev server: `Ctrl+C` luego `pnpm dev`
- Asegúrate de usar clases de Tailwind, no CSS directo

### Context no funciona
- Verifica que el componente está dentro de AuthProvider
- Usa el hook correctamente: `const { user } = useAuth()`

### API calls no funcionan
- Verifica que `VITE_API_URL` está en `.env.local`
- Revisa Console en DevTools para ver errores
- Usa Network tab para inspeccionar requests

## Recursos Útiles

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev/)

## Soporte

Para preguntas o issues:
1. Revisa la documentación
2. Busca en los archivos de proyecto
3. Consulta los recursos útiles arriba
4. Abre un issue en GitHub (si aplica)

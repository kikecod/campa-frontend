'use client';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ChallengesPage from './pages/ChallengesPage'
import GalleryPage from './pages/GalleryPage'
import AdminPage from './pages/AdminPage'
import Navigation from './components/Navigation'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent"></div>
          <p className="text-gray-400 mt-4">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {isAuthenticated && <Navigation />}
      <Routes>
        {/* Redirigir raíz al dashboard o login */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/challenges"
          element={isAuthenticated ? <ChallengesPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/gallery"
          element={isAuthenticated ? <GalleryPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" replace />}
        />
        {/* Cualquier otra ruta redirige */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App

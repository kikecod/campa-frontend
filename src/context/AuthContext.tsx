'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { CurrentUser } from '../types'
import { authApi } from '../services/api'

interface AuthContextType {
  isAuthenticated: boolean
  user: CurrentUser | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  // On mount: try to restore session from stored token
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      authApi.me()
        .then((userData) => {
          setUser(userData)
          setIsAuthenticated(true)
        })
        .catch(() => {
          // Token expired or invalid
          localStorage.removeItem('authToken')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const response = await authApi.login({ username, password })
    localStorage.setItem('authToken', response.token)

    // Fetch user info after login
    const userData = await authApi.me()
    setUser(userData)
    setIsAuthenticated(true)
  }

  const register = async (username: string, password: string) => {
    const response = await authApi.register({ username, password, role: 'USER' })
    localStorage.setItem('authToken', response.token)

    // Fetch user info after register
    const userData = await authApi.me()
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CurrentUser,
  Challenge,
  ChallengeRequest,
  DayInfo,
  Submission,
} from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// ============================================
// Headers helper
// ============================================

function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (includeAuth) {
    const token = localStorage.getItem('authToken')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

function getAuthHeader(): HeadersInit {
  const token = localStorage.getItem('authToken')
  const headers: HeadersInit = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

// ============================================
// Generic fetch wrapper
// ============================================

async function apiFetch<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown,
  includeAuth = true,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const options: RequestInit = {
    method,
    headers: getHeaders(includeAuth),
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    let errorMessage = `Error ${response.status}`
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorData.error || errorMessage
    } catch {
      // response body wasn't JSON
    }
    throw new Error(errorMessage)
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

// ============================================
// Auth API
// ============================================

export const authApi = {
  login: (credentials: LoginRequest): Promise<AuthResponse> =>
    apiFetch<AuthResponse>('/auth/login', 'POST', credentials, false),

  register: (data: RegisterRequest): Promise<AuthResponse> =>
    apiFetch<AuthResponse>('/auth/register', 'POST', data, false),

  me: (): Promise<CurrentUser> =>
    apiFetch<CurrentUser>('/test/me', 'GET'),
}

// ============================================
// Challenges API
// ============================================

export const challengesApi = {
  getByDay: (day: number): Promise<Challenge[]> =>
    apiFetch<Challenge[]>(`/challenges?day=${day}`, 'GET', undefined, true),

  getDays: (): Promise<DayInfo[]> =>
    apiFetch<DayInfo[]>('/challenges/days', 'GET', undefined, false),

  getById: (id: number): Promise<Challenge> =>
    apiFetch<Challenge>(`/challenges/${id}`, 'GET'),

  create: (data: ChallengeRequest): Promise<Challenge> =>
    apiFetch<Challenge>('/challenges', 'POST', data),

  update: (id: number, data: ChallengeRequest): Promise<Challenge> =>
    apiFetch<Challenge>(`/challenges/${id}`, 'PUT', data),

  delete: (id: number): Promise<void> =>
    apiFetch<void>(`/challenges/${id}`, 'DELETE'),
}

// ============================================
// Submissions API
// ============================================

export const submissionApi = {
  submit: async (challengeId: number, file: File): Promise<Submission> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/submit`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    })

    if (!response.ok) {
      let errorMessage = `Error ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch { /* ignore */ }
      throw new Error(errorMessage)
    }

    return response.json()
  },

  update: async (challengeId: number, file: File): Promise<Submission> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/submit`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: formData,
    })

    if (!response.ok) {
      let errorMessage = `Error ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch { /* ignore */ }
      throw new Error(errorMessage)
    }

    return response.json()
  },

  getMy: (): Promise<Submission[]> =>
    apiFetch<Submission[]>('/submissions/my', 'GET'),

  getAll: (): Promise<Submission[]> =>
    apiFetch<Submission[]>('/submissions/all', 'GET'),

  getPublic: (challengeId: number): Promise<Submission[]> =>
    apiFetch<Submission[]>(`/submissions/public?challengeId=${challengeId}`, 'GET', undefined, false),
}

// ============================================
// Gallery API
// ============================================

export const galleryApi = {
  getByDay: (day: number): Promise<Submission[]> =>
    apiFetch<Submission[]>(`/gallery?day=${day}`, 'GET', undefined, false),
}

export default {
  authApi,
  challengesApi,
  submissionApi,
  galleryApi,
}

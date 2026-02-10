// ============================================
// Auth Types (match backend DTOs)
// ============================================

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  role: 'USER' | 'ADMIN'
}

export interface AuthResponse {
  token: string
}

export interface CurrentUser {
  id: number
  username: string
  role: 'USER' | 'ADMIN'
}

// ============================================
// Challenge Types (match ChallengeResponse DTO)
// ============================================

export interface Challenge {
  id: number
  title: string
  description: string
  startTime: string    // ISO datetime
  limitTime: string    // ISO datetime
  dayNumber: number
  status: 'PENDING' | 'COMPLETED' | 'EXPIRED'
  submissionCount: number
}

export interface ChallengeRequest {
  title: string
  description: string
  startTime: string
  limitTime: string
  dayNumber: number
}

export interface DayInfo {
  day: number
  status: 'ACTIVE' | 'COMPLETED'
  challengeCount: number
  submissionCount: number
}

// ============================================
// Submission Types (match SubmissionResponse DTO)
// ============================================

export interface Submission {
  id: number
  imageUrl: string
  uploadedAt: string   // ISO datetime
  username: string
  challengeId: number
  challengeTitle: string
}

// ============================================
// API Response wrapper
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

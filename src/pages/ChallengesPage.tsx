'use client';

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, Upload, Camera, AlertCircle, Pencil, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { challengesApi, submissionApi } from '../services/api'
import type { Challenge, DayInfo, Submission } from '../types'

export default function ChallengesPage() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [days, setDays] = useState<DayInfo[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [mySubmissions, setMySubmissions] = useState<Submission[]>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [loadingDays, setLoadingDays] = useState(true)
  const [loadingChallenges, setLoadingChallenges] = useState(false)
  const [submittingId, setSubmittingId] = useState<number | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [previewPhoto, setPreviewPhoto] = useState<Submission | null>(null)

  // Load available days
  useEffect(() => {
    challengesApi.getDays()
      .then((data) => {
        setDays(data)
        const dayParam = searchParams.get('day')
        if (dayParam) {
          setSelectedDay(parseInt(dayParam))
        } else if (data.length > 0) {
          const activeDay = data.find(d => d.status === 'ACTIVE')
          setSelectedDay(activeDay ? activeDay.day : data[0].day)
        }
      })
      .catch(console.error)
      .finally(() => setLoadingDays(false))
  }, [])

  // Load challenges and submissions when day changes
  useEffect(() => {
    if (selectedDay === null) return
    setLoadingChallenges(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    Promise.all([
      challengesApi.getByDay(selectedDay),
      submissionApi.getMy()
    ])
      .then(([challengesData, subsData]) => {
        setChallenges(challengesData)
        setMySubmissions(subsData)
      })
      .catch(console.error)
      .finally(() => setLoadingChallenges(false))
  }, [selectedDay])

  const handleDaySelect = (day: number) => {
    setSelectedDay(day)
    setSearchParams({ day: day.toString() })
  }

  // Check if challenge is still open for editing (not expired)
  const canEdit = (challenge: Challenge) => {
    const now = new Date()
    const limitTime = new Date(challenge.limitTime)
    return now < limitTime
  }

  // Get user's submission for a challenge
  const getMySubmission = (challengeId: number) => {
    return mySubmissions.find(s => s.challengeId === challengeId)
  }

  const handleFileSelect = async (challengeId: number, isUpdate: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSubmittingId(challengeId)
    setSubmitError(null)
    setSubmitSuccess(null)

    try {
      if (isUpdate) {
        await submissionApi.update(challengeId, file)
        setSubmitSuccess('¡Foto actualizada!')
      } else {
        await submissionApi.submit(challengeId, file)
        setSubmitSuccess('¡Foto subida!')
      }

      // Refresh data
      if (selectedDay !== null) {
        const [updatedChallenges, updatedSubs] = await Promise.all([
          challengesApi.getByDay(selectedDay),
          submissionApi.getMy()
        ])
        setChallenges(updatedChallenges)
        setMySubmissions(updatedSubs)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al subir foto'
      // Handle 409 conflict (already submitted) - try update instead
      if (!isUpdate && (message.includes('409') || message.toLowerCase().includes('ya subiste'))) {
        try {
          await submissionApi.update(challengeId, file)
          setSubmitSuccess('¡Foto actualizada!')
          if (selectedDay !== null) {
            const [updatedChallenges, updatedSubs] = await Promise.all([
              challengesApi.getByDay(selectedDay),
              submissionApi.getMy()
            ])
            setChallenges(updatedChallenges)
            setMySubmissions(updatedSubs)
          }
        } catch (updateErr) {
          setSubmitError(updateErr instanceof Error ? updateErr.message : 'Error al actualizar')
        }
      } else {
        setSubmitError(message)
      }
    } finally {
      setSubmittingId(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = (challengeId: number, isUpdate: boolean) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.challengeId = challengeId.toString()
      fileInputRef.current.dataset.isUpdate = isUpdate.toString()
      fileInputRef.current.click()
    }
  }

  const completedCount = challenges.filter(c => c.status === 'COMPLETED').length

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Retos</h1>
          <p className="text-gray-500 text-sm mt-1">
            {completedCount}/{challenges.length} completados
          </p>
        </div>

        {/* Day Selector - Horizontal scroll on mobile */}
        <div className="mb-6 -mx-4 px-4">
          {loadingDays ? (
            <div className="h-10 bg-gray-900 rounded-lg animate-pulse"></div>
          ) : days.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <AlertCircle size={32} className="text-gray-700 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Sin retos configurados</p>
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {days.map((day) => (
                <button
                  key={day.day}
                  onClick={() => handleDaySelect(day.day)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${selectedDay === day.day
                      ? 'bg-orange-500 text-white'
                      : day.status === 'ACTIVE'
                        ? 'bg-gray-800 text-orange-400 border border-orange-500/30'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                >
                  Día {day.day}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alerts */}
        {submitError && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            {submitError}
            <button onClick={() => setSubmitError(null)} className="ml-auto">
              <X size={16} />
            </button>
          </div>
        )}
        {submitSuccess && (
          <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} />
            {submitSuccess}
            <button onClick={() => setSubmitSuccess(null)} className="ml-auto">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const id = fileInputRef.current?.dataset.challengeId
            const isUpdate = fileInputRef.current?.dataset.isUpdate === 'true'
            if (id) handleFileSelect(parseInt(id), isUpdate, e)
          }}
        />

        {/* Challenges List */}
        {loadingChallenges ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-900 rounded-xl p-4 animate-pulse">
                <div className="h-5 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : challenges.length > 0 ? (
          <div className="space-y-3">
            {challenges.map((challenge) => {
              const mySubmission = getMySubmission(challenge.id)
              const isCompleted = challenge.status === 'COMPLETED'
              const isExpired = challenge.status === 'EXPIRED'
              const canEditPhoto = isCompleted && canEdit(challenge)
              const canSubmit = !isExpired && !isCompleted && canEdit(challenge)

              return (
                <div
                  key={challenge.id}
                  className={`bg-gray-900 rounded-xl border transition ${isCompleted
                      ? 'border-green-500/30'
                      : isExpired
                        ? 'border-gray-800'
                        : 'border-gray-800 hover:border-orange-500/30'
                    }`}
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${isExpired ? 'text-gray-500' : 'text-white'}`}>
                          {challenge.title}
                        </h3>
                        {challenge.description && (
                          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{challenge.description}</p>
                        )}
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isCompleted
                          ? 'bg-green-500/20 text-green-500'
                          : isExpired
                            ? 'bg-gray-800 text-gray-600'
                            : 'bg-orange-500/20 text-orange-500'
                        }`}>
                        {isCompleted ? <CheckCircle2 size={18} /> : isExpired ? <Clock size={18} /> : <Camera size={18} />}
                      </div>
                    </div>

                    {/* Time info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Clock size={12} />
                      <span>
                        {isExpired ? 'Terminó' : 'Hasta'}: {new Date(challenge.limitTime).toLocaleString('es', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* My submission preview */}
                    {mySubmission && (
                      <div
                        className="mb-3 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setPreviewPhoto(mySubmission)}
                      >
                        <img
                          src={mySubmission.imageUrl}
                          alt="Mi foto"
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${isCompleted
                          ? 'bg-green-500/20 text-green-400'
                          : isExpired
                            ? 'bg-gray-800 text-gray-500'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                        {isCompleted ? 'Completado' : isExpired ? 'Expirado' : 'Pendiente'}
                      </span>

                      {/* Submit/Edit buttons */}
                      {user?.role === 'USER' && (
                        <div className="flex gap-2">
                          {canSubmit && (
                            <button
                              disabled={submittingId === challenge.id}
                              onClick={() => triggerFileInput(challenge.id, false)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
                            >
                              {submittingId === challenge.id ? (
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              ) : (
                                <>
                                  <Camera size={16} />
                                  <span className="hidden sm:inline">Subir</span>
                                </>
                              )}
                            </button>
                          )}

                          {canEditPhoto && (
                            <button
                              disabled={submittingId === challenge.id}
                              onClick={() => triggerFileInput(challenge.id, true)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-lg transition disabled:opacity-50"
                            >
                              {submittingId === challenge.id ? (
                                <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                              ) : (
                                <>
                                  <Pencil size={16} />
                                  <span className="hidden sm:inline">Cambiar foto</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : selectedDay !== null ? (
          <div className="text-center py-12">
            <Camera size={40} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No hay retos para este día</p>
          </div>
        ) : null}
      </div>

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setPreviewPhoto(null)}
          >
            <X size={28} />
          </button>
          <img
            src={previewPhoto.imageUrl}
            alt={previewPhoto.challengeTitle}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

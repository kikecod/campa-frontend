'use client';

import { useState, useEffect } from 'react'
import { X, Camera, Image } from 'lucide-react'
import { challengesApi, galleryApi } from '../services/api'
import type { DayInfo, Submission } from '../types'

export default function GalleryPage() {
  const [days, setDays] = useState<DayInfo[]>([])
  const [photos, setPhotos] = useState<Submission[]>([])
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<Submission | null>(null)
  const [loadingDays, setLoadingDays] = useState(true)
  const [loadingPhotos, setLoadingPhotos] = useState(false)

  // Load available days (only show completed ones for gallery)
  useEffect(() => {
    challengesApi.getDays()
      .then((data) => {
        const completedDays = data.filter(d => d.status === 'COMPLETED')
        setDays(completedDays)
        if (completedDays.length > 0) {
          setSelectedDay(completedDays[0].day)
        }
      })
      .catch(console.error)
      .finally(() => setLoadingDays(false))
  }, [])

  // Load gallery photos when day changes
  useEffect(() => {
    if (selectedDay === null) return
    setLoadingPhotos(true)

    galleryApi.getByDay(selectedDay)
      .then(setPhotos)
      .catch(console.error)
      .finally(() => setLoadingPhotos(false))
  }, [selectedDay])

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Galería</h1>
          <p className="text-gray-500 text-sm mt-1">Fotos de los retos completados</p>
        </div>

        {/* Day Selector */}
        <div className="mb-6 -mx-4 px-4">
          {loadingDays ? (
            <div className="h-10 bg-gray-900 rounded-lg animate-pulse"></div>
          ) : days.length === 0 ? (
            <div className="bg-gray-900 rounded-xl p-8 text-center">
              <Image size={40} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-400 font-medium mb-1">Sin fotos aún</p>
              <p className="text-gray-500 text-sm">Las fotos aparecen cuando los retos expiran</p>
            </div>
          ) : (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {days.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedDay === day.day
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  Día {day.day}
                  <span className="ml-1 opacity-75">({day.submissionCount})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {loadingPhotos ? (
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-gray-900 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.challengeTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs font-medium truncate">@{photo.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedDay !== null ? (
          <div className="text-center py-12">
            <Camera size={40} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No hay fotos para este día</p>
          </div>
        ) : null}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 bg-black/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {selectedPhoto.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{selectedPhoto.username}</p>
                <p className="text-gray-400 text-xs">{selectedPhoto.challengeTitle}</p>
              </div>
            </div>
            <button className="text-white/70 hover:text-white p-2">
              <X size={24} />
            </button>
          </div>

          {/* Image */}
          <div 
            className="flex-1 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.challengeTitle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 p-4 bg-black/80 text-center">
            <p className="text-gray-400 text-sm">
              {new Date(selectedPhoto.uploadedAt).toLocaleString('es', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

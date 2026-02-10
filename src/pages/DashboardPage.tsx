'use client';

import { useState, useEffect } from 'react'
import { Camera, Image, ChevronRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { challengesApi, submissionApi } from '../services/api'
import type { DayInfo, Submission } from '../types'

export default function DashboardPage() {
  const { user } = useAuth()
  const [days, setDays] = useState<DayInfo[]>([])
  const [mySubmissions, setMySubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      challengesApi.getDays(),
      submissionApi.getMy()
    ])
      .then(([daysData, subsData]) => {
        setDays(daysData)
        setMySubmissions(subsData)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalChallenges = days.reduce((sum, d) => sum + d.challengeCount, 0)
  const activeDay = days.find(d => d.status === 'ACTIVE')

  return (
    <div className="min-h-screen bg-gray-950 pt-14">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Welcome */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">Bienvenido</p>
          <h1 className="text-2xl font-bold text-white">
            {user?.username}
          </h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-orange-500">{loading ? '-' : days.length}</p>
            <p className="text-xs text-gray-500">Días</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-purple-500">{loading ? '-' : totalChallenges}</p>
            <p className="text-xs text-gray-500">Retos</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-500">{loading ? '-' : mySubmissions.length}</p>
            <p className="text-xs text-gray-500">Mis fotos</p>
          </div>
        </div>

        {/* Active Day Card */}
        {activeDay && (
          <Link
            to={`/challenges?day=${activeDay.day}`}
            className="block mb-6 bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Zap className="text-orange-500" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Día {activeDay.day} activo</p>
                  <p className="text-gray-400 text-sm">{activeDay.challengeCount} retos disponibles</p>
                </div>
              </div>
              <ChevronRight className="text-orange-500/50" size={20} />
            </div>
          </Link>
        )}

        {/* Main Actions */}
        <div className="space-y-3 mb-6">
          <Link
            to="/challenges"
            className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Camera className="text-orange-500" size={20} />
              </div>
              <div>
                <p className="text-white font-medium">Ver Retos</p>
                <p className="text-gray-500 text-sm">Participa y sube tus fotos</p>
              </div>
            </div>
            <ChevronRight className="text-gray-600" size={20} />
          </Link>

          <Link
            to="/gallery"
            className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Image className="text-purple-500" size={20} />
              </div>
              <div>
                <p className="text-white font-medium">Galería</p>
                <p className="text-gray-500 text-sm">Fotos del campamento</p>
              </div>
            </div>
            <ChevronRight className="text-gray-600" size={20} />
          </Link>
        </div>

        {/* Days List */}
        {days.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Días del Campamento
            </h2>
            <div className="bg-gray-900 rounded-xl overflow-hidden divide-y divide-gray-800">
              {days.map((day) => (
                <Link
                  key={day.day}
                  to={`/challenges?day=${day.day}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${day.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <span className="text-white">Día {day.day}</span>
                    {day.status === 'ACTIVE' && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        Activo
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{day.challengeCount} retos</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* My Photos */}
        {mySubmissions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Mis Fotos
              </h2>
              <Link to="/challenges" className="text-sm text-orange-500">
                Ver retos
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {mySubmissions.slice(0, 6).map((sub) => (
                <div key={sub.id} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={sub.imageUrl}
                    alt={sub.challengeTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && days.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="text-gray-700" size={28} />
            </div>
            <p className="text-gray-500">Los retos aparecerán aquí</p>
          </div>
        )}
      </div>
    </div>
  )
}

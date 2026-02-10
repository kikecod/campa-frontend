import { Link } from 'react-router-dom'
import { ArrowRight, Target, Camera, Flame } from 'lucide-react'
import TreeWithRoots from '../components/TreeWithRoots'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title */}
            <h1 className="hero-title mb-6 animate-fade-in">
              <span className="text-orange-500">JUVENTUD CON</span>
              <br />
              <span className="text-orange-500">PROPÓSITO</span>
            </h1>

            {/* Subtitle */}
            <h2 className="hero-subtitle mb-12 text-gray-300 italic font-normal animate-fade-in animation-delay-200">
              fe con compromiso
            </h2>

            {/* Tree Symbol */}
            <div className="my-12 flex justify-center">
              <TreeWithRoots />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                Inscribirse <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition"
              >
                Ya soy participante
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Showcase Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-orange-500">
            Galería de Momentos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=400&fit=crop',
            ].map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-lg">
                <img
                  src={img || "/placeholder.svg"}
                  alt={`Momento ${idx + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mb-16">
            <Link
              to="/gallery"
              className="inline-block px-8 py-3 border-2 border-orange-500 text-orange-500 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition"
            >
              Ver Galería Completa
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-orange-500">
            Funcionalidades
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-black/50 border border-orange-500/20 rounded-lg p-8 hover:border-orange-500 transition hover:bg-black/70">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Target size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Retos Diarios</h3>
              <p className="text-gray-300">
                Participa en desafíos interactivos y gana puntos. Sigue tu progreso en tiempo real con nuestro sistema de puntuación.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-black/50 border border-orange-500/20 rounded-lg p-8 hover:border-orange-500 transition hover:bg-black/70">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Camera size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Galería Compartida</h3>
              <p className="text-gray-300">
                Sube tus mejores momentos, dale like a fotos y crea una comunidad visual alrededor de experiencias compartidas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-black/50 border border-orange-500/20 rounded-lg p-8 hover:border-orange-500 transition hover:bg-black/70">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <Flame size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Racha de Consistencia</h3>
              <p className="text-gray-300">
                Mantén tu racha de días completando retos. Mayor consistencia, mayores recompensas y reconocimiento en la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-t border-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Completa retos, comparte momentos y conéctate con una comunidad apasionada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-10 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition transform hover:scale-105"
            >
              CREAR CUENTA
            </Link>
            <Link
              to="/login"
              className="px-10 py-4 border-2 border-orange-500 text-orange-500 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition"
            >
              INICIA SESIÓN
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

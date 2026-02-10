interface ProgressCardProps {
  title: string
  description: string
  progress: number
  color: 'orange' | 'purple' | 'blue'
}

export default function ProgressCard({
  title,
  description,
  progress,
  color,
}: ProgressCardProps) {
  const colorClasses = {
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
  }

  const borderClasses = {
    orange: 'border-orange-500/20',
    purple: 'border-purple-500/20',
    blue: 'border-blue-500/20',
  }

  return (
    <div className={`bg-gray-800/30 border ${borderClasses[color]} rounded-lg p-6`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
        <span className="text-sm font-bold text-gray-300">{progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`${colorClasses[color]} h-full rounded-full transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

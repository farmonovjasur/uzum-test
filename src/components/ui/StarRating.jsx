import { Star } from 'lucide-react'

export default function StarRating({ rating, size = 'sm' }) {
  const sizes = {
    xs: 12,
    sm: 14,
    md: 18,
    lg: 22,
  }

  const starSize = sizes[size] || sizes.sm

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = rating >= star ? 1 : rating >= star - 0.5 ? 0.5 : 0
        return (
          <Star
            key={star}
            size={starSize}
            fill={fill === 1 ? 'currentColor' : fill === 0.5 ? 'url(#half)' : 'none'}
            strokeWidth={1}
            className="text-primary"
          />
        )
      })}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

import { Star } from 'lucide-react'
import StarRating from './StarRating'

export default function ReviewCard({ review, variant = 'default' }) {
  if (variant === 'featured') {
    return (
      <div className="md:col-span-2 p-6 md:p-8 rounded-lg bg-surface-container-lowest editorial-shadow">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-container overflow-hidden flex-shrink-0">
            {review.avatar ? (
              <img
                src={review.avatar}
                alt={review.user}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-on-primary-container font-bold text-sm">
                {review.initials}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <p className="font-bold text-on-surface text-sm md:text-base">
                {review.user}
              </p>
              {review.verified && (
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Verified Purchase
                </span>
              )}
            </div>
            <StarRating rating={review.rating} size="sm" />
          </div>
          <span className="ml-auto text-xs font-bold text-on-surface-variant/50 hidden md:block">
            {review.date?.toUpperCase()}
          </span>
        </div>
        <p className="text-base md:text-lg font-medium text-on-surface mb-4 md:mb-6 italic leading-relaxed">
          "{review.text}"
        </p>
        {review.images && review.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {review.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Review photo ${idx + 1}`}
                className="rounded-md w-full aspect-video object-cover"
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 rounded-lg bg-white/50 border border-white/20">
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <div
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            review.rating >= 5
              ? 'bg-secondary-container text-on-secondary-container'
              : 'bg-tertiary-container text-on-tertiary-container'
          }`}
        >
          {review.initials}
        </div>
        <p className="font-bold text-sm">{review.user}</p>
      </div>
      <StarRating rating={review.rating} size="xs" />
      <p className="text-sm font-medium text-on-surface-variant leading-relaxed mt-3">
        "{review.text}"
      </p>
    </div>
  )
}

import { Link } from 'react-router-dom'
import {
  Monitor,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
} from 'lucide-react'
import { useTranslation } from '../../store/useLanguageStore'

const iconMap = {
  devices: Monitor,
  checkroom: Shirt,
  home: Home,
  spa: Sparkles,
  sports_tennis: Dumbbell,
  apparel: Shirt,
  fitness_center: Dumbbell,
}

export default function CategoryIcon({ category, variant = 'desktop' }) {
  const Icon = iconMap[category.icon] || Monitor
  const t = useTranslation()

  // Translate category name
  const translatedName = t(`cat_${category.id}`)

  if (variant === 'mobile') {
    return (
      <Link
        to={`/search?category=${category.id}`}
        className="flex flex-col items-center gap-3 shrink-0"
      >
        <div className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary active:scale-90 transition-transform">
          <Icon size={24} />
        </div>
        <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
          {translatedName}
        </span>
      </Link>
    )
  }

  return (
    <Link
      to={`/search?category=${category.id}`}
      className="group cursor-pointer bg-surface-container-lowest p-6 md:p-8 rounded-lg flex flex-col items-center justify-center transition-all hover:-translate-y-1 hover:shadow-editorial"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-secondary-container/50 flex items-center justify-center text-primary mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon size={28} />
      </div>
      <span className="font-bold text-on-surface text-sm md:text-base">
        {translatedName}
      </span>
    </Link>
  )
}

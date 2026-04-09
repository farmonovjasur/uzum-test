import { useState, useEffect, useCallback, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguageStore } from '../../store/useLanguageStore'

const slides = [
  {
    id: 1,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLckoHcmaNphvrYXhvwIy-tMKroDqFGEs_qVHk74zZZg889Kh-QGEzfETsbuI4Rn-Xmy0yGehQ-cNhrDGDQrLy9YN7_qR5IqWuJlC74qOiFsOOJfKKu-s4Fya5dgiB2t1Y7ttvXDZwf29slrjOZVWsUgDPejaZMVB73_PICCHmTrmhtVqKdpwAN5FUuDU_fmN1jCCVxoctOuxKTTI8wmTI8pX9SVV7zF2qB5Ehge2wxopliK6zDJNtEP4_m7ziD90xt9wsrH7oZmpM',
    alt: 'Modern high-end electronic gadgets display with purple ambient lighting',
    badge: { en: 'Limited Edition', ru: 'Ограниченная серия', uz: 'Cheklangan nashr' },
    title: { en: 'The Future of Sound is Fluid.', ru: 'Будущее звука — это Fluid.', uz: 'Ovozning kelajagi — Fluid.' },
    cta: { en: 'Shop Now', ru: 'Купить', uz: 'Xarid qilish' },
    link: '/product/1',
    gradient: 'from-slate-900/80 via-slate-900/20 to-transparent',
  },
  {
    id: 2,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRd1YFsPFqXZJrnm1RDMERdSG55RlbRiBUoiqHmbwS85bZo4XldMUOkAKAvoN-5Fh4chpnEUXSipcOK6oz1Q8CvtejunziSLPbPckZOu8rSUASvW3l-_Jk7D_oLR41eNQruuA1gXUqXTVEuxaHyDhoPzS5PhldMsMGcd8lYMYcZeeilGSRmdN0eCwHJ9fu_2XOtKVuUdOwN4_hFMqaSOMpT01ymGAkIoeZsMJIKnQ0ASr7lxI9thgAf3xTwPIUyW00lhuKPDy9PyB',
    alt: 'Elegant velvet armchair in modern living room',
    badge: { en: 'New Arrival', ru: 'Новинка', uz: 'Yangi mahsulot' },
    title: { en: 'Design Your Dream Space.', ru: 'Создайте дом мечты.', uz: "Orzudagi uyingizni yarating." },
    cta: { en: 'Explore Home', ru: 'Смотреть', uz: "Ko'rish" },
    link: '/product/4',
    gradient: 'from-emerald-950/80 via-emerald-950/20 to-transparent',
  },
  {
    id: 3,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqwvkbrdqWeOd3EdWaI7fL0ia7g9qwzK8AoAEqgVQXV9CdW_14ClHZxQFJq5HoCthE0MOpcp0Q9rGJOUViEZjKBsQMuJycHtpR3dmShHBJznt3hLxRRe5Z3gwPmofo_Q7slMiXqh3qYabpevx5RhKB0FTTe2so0sudXZa9w29gx8MpAbOhOErTzSkdqvoViTyAx2Evw-XfQHyO6ZyrgbgT9ENxsqOg_7X7c8UqsHexd5U3aXCxfJJi0fqI75aWnRfKPzd65AJR0clr',
    alt: 'Premium tailored beige wool trench coat',
    badge: { en: 'Trending', ru: 'В тренде', uz: 'Trendda' },
    title: { en: 'Architectural Fashion.', ru: 'Архитектурная мода.', uz: 'Arxitektura modasi.' },
    cta: { en: 'View Collection', ru: 'Коллекция', uz: "Kolleksiya" },
    link: '/product/8',
    gradient: 'from-amber-950/80 via-amber-950/20 to-transparent',
  },
]

const AUTO_PLAY_INTERVAL = 5000

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchDelta, setTouchDelta] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  const lang = useLanguageStore((state) => state.language)

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 600)
    },
    [isTransitioning]
  )

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  // Auto-play
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next, isPaused])

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setIsPaused(true)
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (touchStart === null) return
    setTouchDelta(e.touches[0].clientX - touchStart)
  }

  const handleTouchEnd = () => {
    if (touchStart === null) return
    if (Math.abs(touchDelta) > 50) {
      if (touchDelta > 0) prev()
      else next()
    }
    setTouchStart(null)
    setTouchDelta(0)
    setTimeout(() => setIsPaused(false), 1000)
  }

  return (
    <section className="mb-8 md:mb-16">
      <div
        className="relative h-64 md:h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden group cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Hero carousel"
      >
        {/* Slides */}
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              idx === current
                ? 'opacity-100 scale-100 z-[1]'
                : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
            aria-hidden={idx !== current}
          >
            <img
              className="w-full h-full object-cover"
              src={s.image}
              alt={s.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${s.gradient} flex flex-col justify-center px-6 md:px-12 lg:px-16`}
            >
              <span
                className={`font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 md:mb-4 transition-all duration-700 delay-100 ${
                  idx === current
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                } text-primary-fixed`}
              >
                {s.badge[lang] || s.badge.en}
              </span>
              <h1
                className={`text-white text-3xl md:text-5xl lg:text-6xl font-black max-w-md lg:max-w-xl leading-[1.1] mb-4 md:mb-8 tracking-tighter transition-all duration-700 delay-200 ${
                  idx === current
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
              >
                {s.title[lang] || s.title.en}
              </h1>
              <div
                className={`transition-all duration-700 delay-300 ${
                  idx === current
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                <Link
                  to={s.link}
                  className="primary-gradient text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all inline-flex items-center gap-2 md:gap-3 shadow-cta hover:scale-[1.02] active:scale-95"
                >
                  {s.cta[lang] || s.cta.en}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows — show on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25 active:scale-90 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/25 active:scale-90 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${
                idx === current
                  ? 'w-8 md:w-12 bg-white'
                  : 'w-2 md:w-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        {!isPaused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
            <div
              className="h-full bg-white/50 rounded-full progress-bar-animate"
              key={`progress-${current}`}
            />
          </div>
        )}
      </div>
    </section>
  )
}

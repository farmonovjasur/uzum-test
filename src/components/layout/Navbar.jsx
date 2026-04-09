import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, MapPin, Globe, Search, X, Check } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useLanguageStore, useTranslation, languages } from '../../store/useLanguageStore'
import AuthModal from '../ui/AuthModal'

export default function Navbar() {
  const items = useCartStore((state) => state.items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const favoriteItems = useFavoritesStore((state) => state.items)
  const totalFavorites = favoriteItems.length

  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const t = useTranslation()

  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const desktopLangRef = useRef(null)
  const mobileLangRef = useRef(null)
  const navigate = useNavigate()

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      const clickedDesktop = desktopLangRef.current && desktopLangRef.current.contains(e.target)
      const clickedMobile = mobileLangRef.current && mobileLangRef.current.contains(e.target)
      
      if (!clickedDesktop && !clickedMobile) {
        setShowLangDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchFocused(false)
    }
  }

  const currentLang = languages.find((l) => l.code === language)

  return (
    <>
      <nav className="glass fixed top-0 z-50 w-full shadow-editorial">
        <div className="flex justify-between items-center w-full px-4 md:px-6 lg:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <Link
              to="/"
              className="text-xl md:text-2xl font-black tracking-tighter text-primary"
            >
              The Fluid Marketplace
            </Link>
            <div className="hidden lg:flex items-center gap-4 text-on-surface-variant text-sm font-medium">
              <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <MapPin size={15} />
                <span>{t('location')}</span>
              </div>

              {/* Language Selector — redesigned */}
              <div className="relative" ref={desktopLangRef}>
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    showLangDropdown
                      ? 'bg-primary/10 text-primary'
                      : 'hover:text-primary hover:bg-surface-container-low'
                  }`}
                >
                  <Globe size={15} />
                  <span className="font-semibold">{currentLang?.flag} {currentLang?.name}</span>
                </button>

                {showLangDropdown && (
                  <div className="absolute top-full right-0 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 mt-3 bg-surface-container-lowest rounded-2xl shadow-float py-2 min-w-[180px] z-[60] overflow-hidden animate-modal-in origin-top-right lg:origin-top">
                    {/* Arrow (hidden on mobile for simplicity or positioned correctly) */}
                    <div className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface-container-lowest rotate-45 rounded-sm" />
                    <div className="relative z-10">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setShowLangDropdown(false)
                          }}
                          className={`w-full text-left px-5 py-3 text-sm font-medium transition-all flex items-center gap-3 ${
                            language === lang.code
                              ? 'bg-primary/8 text-primary'
                              : 'text-on-surface hover:bg-surface-container-low'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="flex-1">{lang.fullName}</span>
                          {language === lang.code && (
                            <Check size={16} className="text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-xl mx-4 md:mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div
                className={`bg-surface-container-low rounded-full px-4 py-2.5 flex items-center gap-3 transition-all duration-300 ${
                  isSearchFocused
                    ? 'ring-2 ring-primary bg-surface-container-lowest shadow-md'
                    : 'hover:bg-surface-container'
                }`}
              >
                <Search size={18} className="text-on-surface-variant flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={t('search_placeholder')}
                  className="bg-transparent border-none w-full text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none focus:ring-0"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="flex-shrink-0"
                  >
                    <X
                      size={16}
                      className="text-on-surface-variant hover:text-primary transition-colors"
                    />
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            {/* Mobile Language Selector */}
            <div className="lg:hidden relative" ref={mobileLangRef}>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                  showLangDropdown
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                }`}
              >
                <div className="text-lg leading-none">{currentLang?.flag}</div>
              </button>
            </div>

            {/* Mobile search icon */}
            <Link
              to="/search"
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-container-low"
            >
              <Search size={22} strokeWidth={1.5} />
            </Link>

            {/* Favorites with badge - hidden on mobile */}
            <Link
              to="/favorites"
              className="relative hover:text-primary transition-colors text-on-surface-variant hidden md:block"
            >
              <Heart
                size={22}
                strokeWidth={1.5}
                fill={totalFavorites > 0 ? 'currentColor' : 'none'}
                className={totalFavorites > 0 ? 'text-primary' : ''}
              />
              {totalFavorites > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-tertiary text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold animate-badge-in">
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Cart with badge - hidden on mobile */}
            <Link
              to="/cart"
              className="relative hover:text-primary transition-colors text-on-surface-variant hidden md:block"
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-primary text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold animate-badge-in">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                setAuthMode('login')
                setShowAuthModal(true)
              }}
              className="primary-gradient text-on-primary px-4 md:px-6 py-2 rounded-full font-bold text-sm shadow-cta hover:scale-[1.02] active:scale-95 transition-transform hidden md:block"
            >
              {t('login')}
            </button>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  )
}

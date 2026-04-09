import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Bell, Sparkles } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import Footer from '../components/layout/Footer'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useTranslation } from '../store/useLanguageStore'

export default function FavoritesPage() {
  const items = useFavoritesStore((state) => state.items)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const moveToCart = useFavoritesStore((state) => state.moveToCart)
  const t = useTranslation()

  if (items.length === 0) {
    return (
      <div className="bg-surface text-on-surface min-h-screen">
        <Navbar />
        <main className="pt-24 pb-32 px-4 md:px-6 max-w-screen-2xl mx-auto">
          <header className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2">
              {t('my_favorites')}
            </h1>
            <p className="text-on-surface-variant font-medium text-sm md:text-base">
              {t('favorites_empty')}
            </p>
          </header>
          <div className="flex flex-col items-center justify-center py-20 md:py-40 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6 md:mb-8">
              <Heart size={32} className="text-on-surface-variant" />
            </div>
            <h2 className="text-xl md:text-2xl font-black mb-3 md:mb-4">
              {t('no_favorites')}
            </h2>
            <p className="text-on-surface-variant max-w-md mb-8 md:mb-10 text-sm md:text-base">
              {t('no_favorites_subtitle')}
            </p>
            <Link
              to="/"
              className="primary-gradient text-on-primary px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-cta hover:scale-[1.02] active:scale-95 transition-all"
            >
              {t('explore_collections')}
            </Link>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-32 px-4 md:px-6 max-w-screen-2xl mx-auto">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2">
            {t('my_favorites')}
          </h1>
          <p className="text-on-surface-variant font-medium text-sm md:text-base">
            {t('favorites_count', { count: items.length })}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((product) => (
            <div
              key={product.id}
              className="group bg-surface-container-lowest rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-editorial"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleFavorite(product)
                    }}
                    className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/90 backdrop-blur shadow-sm p-2 md:p-3 rounded-full text-primary hover:scale-110 transition-all"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                  {!product.inStock && (
                    <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                      <span className="bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {t('out_of_stock')}
                      </span>
                    </div>
                  )}
                  {product.badges &&
                    product.badges.length > 0 &&
                    product.inStock && (
                      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                            product.badges.includes('Limited Stock')
                              ? 'bg-tertiary-container text-on-tertiary-container'
                              : product.badges.includes("Editor's Pick")
                              ? 'bg-primary-container text-on-primary-container'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {product.badges[0]}
                        </span>
                      </div>
                    )}
                </div>
              </Link>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg md:text-xl font-semibold text-on-surface leading-tight mb-1 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-on-surface-variant text-xs md:text-sm">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-black text-primary">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3 mt-6 md:mt-8">
                  {product.inStock ? (
                    <button
                      onClick={() => moveToCart(product.id)}
                      className="flex-1 primary-gradient text-on-primary py-3 md:py-4 rounded-full font-bold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 active:scale-95"
                    >
                      <ShoppingBag size={16} />
                      {t('move_to_cart')}
                    </button>
                  ) : (
                    <button
                      className="flex-1 bg-surface-container-high text-on-surface-variant py-3 md:py-4 rounded-full font-bold text-sm tracking-wide cursor-not-allowed flex items-center justify-center gap-2"
                      disabled
                    >
                      <Bell size={16} />
                      {t('notify_me')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discovery Section */}
        <div className="mt-12 mb-8">
          <div className="p-8 bg-secondary-container rounded-xl flex flex-col items-center text-center">
            <Sparkles size={36} className="text-on-secondary-container mb-4" />
            <h4 className="text-xl font-bold text-on-secondary-container mb-2">
              {t('discovery')}
            </h4>
            <p className="text-on-secondary-fixed-variant text-sm mb-6">
              {t('discovery_subtitle')}
            </p>
            <Link
              to="/search"
              className="px-8 py-3 bg-on-secondary-container text-surface-container-lowest rounded-full text-sm font-bold shadow-md active:scale-95 transition-all"
            >
              {t('explore_drops')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

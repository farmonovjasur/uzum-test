import { Link, useLocation } from 'react-router-dom'
import { Home, Heart, ShoppingCart, User } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { useTranslation } from '../../store/useLanguageStore'

export default function BottomNav() {
  const location = useLocation()
  const cartItems = useCartStore((state) => state.items)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const favoriteItems = useFavoritesStore((state) => state.items)
  const totalFavorites = favoriteItems.length
  const t = useTranslation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', icon: Home, label: t('nav_shop'), badge: 0 },
    { path: '/favorites', icon: Heart, label: t('nav_wishlist'), badge: totalFavorites },
    { path: '/cart', icon: ShoppingCart, label: t('nav_cart'), badge: totalItems },
    { path: '/profile', icon: User, label: t('nav_profile'), badge: 0 },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 glass rounded-t-[2rem] shadow-bottom-nav pb-safe">
      <div className="flex justify-around items-center w-full px-4 h-20">
        {navItems.map(({ path, icon: Icon, label, badge }) => {
          const active = isActive(path)
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center rounded-full px-3 md:px-5 py-1.5 active:scale-90 transition-transform duration-200 ${
                active
                  ? 'bg-secondary-container text-on-secondary-container -mt-4 shadow-lg shadow-primary/30 scale-[1.15]'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.5}
                  fill={active && path === '/favorites' ? 'currentColor' : 'none'}
                />
                {badge > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-[8px] min-w-[16px] h-[16px] px-0.5 rounded-full flex items-center justify-center font-bold animate-badge-in ${
                      path === '/cart'
                        ? 'bg-primary text-white'
                        : 'bg-tertiary-container text-on-tertiary-container'
                    }`}
                  >
                    {badge > 99 ? '99+' : badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest mt-1">
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

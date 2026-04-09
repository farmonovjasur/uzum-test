import { Link } from 'react-router-dom'
import { Trash2, ArrowRight, CreditCard, Wallet, Nfc, ShoppingBag } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import Footer from '../components/layout/Footer'
import QuantitySelector from '../components/ui/QuantitySelector'
import { useCartStore } from '../store/useCartStore'
import { useTranslation } from '../store/useLanguageStore'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const t = useTranslation()

  // Compute totals directly from items array (not from broken getters)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="bg-surface text-on-surface min-h-screen">
        <Navbar />
        <main className="pt-24 pb-32 px-4 md:px-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20 md:py-40 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6 md:mb-8">
              <ShoppingBag size={32} className="text-on-surface-variant" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">
              {t('cart_empty_title')}
            </h2>
            <p className="text-on-surface-variant max-w-md mb-8 md:mb-10 text-sm md:text-base">
              {t('cart_empty_subtitle')}
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
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Cart Items */}
          <div className="flex-grow space-y-6 md:space-y-8">
            <header className="mb-6 md:mb-10">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mb-2">
                {t('shopping_cart')}
              </h1>
              <p className="text-on-surface-variant font-medium text-sm md:text-base">
                {t('cart_items_count', { count: totalItems })}
              </p>
            </header>

            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-start md:items-center bg-surface-container-lowest p-4 md:p-6 rounded-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-editorial"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="w-24 h-32 md:w-32 md:h-40 bg-surface-container rounded-md overflow-hidden flex-shrink-0 block"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="ml-4 md:ml-8 flex-grow flex flex-col justify-between h-full py-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg md:text-xl font-bold tracking-tight text-on-surface hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1 md:p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-on-surface-variant mt-1">
                      {t('category')}: <span className="font-semibold text-on-surface">{item.category}</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-3 md:mt-0">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      onDecrease={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    />
                    <span className="text-xl md:text-2xl font-black text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 md:mt-12 mb-6 md:mb-8 text-center">
              <Link
                to="/"
                className="text-primary font-semibold text-sm hover:underline decoration-primary/30 underline-offset-4 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                {t('continue_shopping')}
              </Link>
            </div>
          </div>

          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[420px] shrink-0">
            <div className="bg-surface-container-low p-6 md:p-8 rounded-lg sticky top-32">
              <h2 className="text-xl md:text-2xl font-black tracking-tight mb-6 md:mb-8">
                {t('order_summary')}
              </h2>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex justify-between text-on-surface-variant font-medium text-sm md:text-base">
                  <span>{t('subtotal')}</span>
                  <span className="text-on-surface font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-medium text-sm md:text-base">
                  <span>{t('shipping')}</span>
                  <span className="text-tertiary font-bold tracking-widest uppercase text-xs">
                    {t('shipping_free')}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-medium text-sm md:text-base">
                  <span>{t('tax')}</span>
                  <span className="text-on-surface">$0.00</span>
                </div>
              </div>
              <div className="h-[1px] bg-surface-container mb-6 md:mb-8"></div>
              <div className="flex justify-between items-end mb-8 md:mb-10">
                <span className="text-base md:text-lg font-bold">{t('total')}</span>
                <span className="text-3xl md:text-4xl font-black text-primary tracking-tighter">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="space-y-3 md:space-y-4">
                <button className="w-full primary-gradient text-on-primary py-4 md:py-5 rounded-full font-bold text-base md:text-lg shadow-cta hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
                  {t('proceed_checkout')}
                  <ArrowRight size={18} />
                </button>
                <Link
                  to="/"
                  className="w-full text-primary font-bold py-3 hover:opacity-70 transition-opacity text-sm md:text-base block text-center"
                >
                  {t('continue_shopping')}
                </Link>
              </div>
              {/* Payment Badges */}
              <div className="mt-8 md:mt-10 flex justify-center gap-3 md:gap-4 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <CreditCard size={24} className="text-on-surface-variant" />
                <Wallet size={24} className="text-on-surface-variant" />
                <Nfc size={24} className="text-on-surface-variant" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Bottom Checkout Bar */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 z-40 glass p-4 rounded-t-xl shadow-editorial">
        <div className="flex justify-between items-center mb-3">
          <span className="text-on-surface-variant font-medium text-sm">{t('total')}</span>
          <span className="text-2xl font-black text-primary">${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full primary-gradient text-on-primary py-4 rounded-full font-bold text-base shadow-cta active:scale-95 transition-all flex items-center justify-center gap-2">
          {t('proceed_checkout')}
          <ArrowRight size={18} />
        </button>
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}

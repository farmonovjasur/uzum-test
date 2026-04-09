import { Link } from 'react-router-dom'
import { ArrowRight, Timer } from 'lucide-react'
import { categories } from '../data/categories'
import { products } from '../data/products'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import Footer from '../components/layout/Footer'
import HeroBanner from '../components/ui/HeroBanner'
import CategoryIcon from '../components/ui/CategoryIcon'
import ProductCard from '../components/ui/ProductCard'
import { useTranslation } from '../store/useLanguageStore'

export default function HomePage() {
  const t = useTranslation()
  const dealProducts = products.filter((p) => p.discount > 0)
  const popularProducts = products.filter((p) => p.inStock).slice(0, 6)
  const featuredProduct = popularProducts[0]
  const sideProducts = popularProducts.slice(1, 3)
  const wideProduct = popularProducts[3]

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-20 md:pt-24 pb-32">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Hero Carousel */}
          <HeroBanner />

          {/* Category Icons */}
          <section className="mb-12 md:mb-16">
            <div className="flex justify-between items-end mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface">
                  {t('categories')}
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base">
                  {t('categories_subtitle')}
                </p>
              </div>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden hide-scrollbar overflow-x-auto flex gap-4 pb-2">
              {categories.map((cat) => (
                <CategoryIcon key={cat.id} category={cat} variant="mobile" />
              ))}
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {categories.map((cat) => (
                <CategoryIcon key={cat.id} category={cat} variant="desktop" />
              ))}
            </div>
          </section>

          {/* Daily Deals */}
          {dealProducts.length > 0 && (
            <section className="mb-12 md:mb-16">
              <div className="primary-gradient p-6 md:p-12 rounded-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
                  <div className="lg:w-1/3 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
                        {t('daily_deals')}
                      </h2>
                      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                        <Timer size={14} className="text-white" />
                        <span className="text-white font-bold text-xs uppercase tabular-nums">
                          04:22:15
                        </span>
                      </div>
                    </div>
                    <p className="text-primary-fixed text-sm md:text-base mb-4 md:mb-8">
                      {t('daily_deals_subtitle')}
                    </p>
                    <button className="bg-white text-primary font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:shadow-xl transition-shadow text-sm md:text-base">
                      {t('view_all_deals')}
                    </button>
                  </div>
                  <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {dealProducts.slice(0, 2).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant="deal"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Popular Products Grid (Asymmetric Bento Style) */}
          <section className="mb-16 md:mb-24">
            <div className="flex justify-between items-end mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-on-surface">
                  {t('popular_products')}
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base mt-1">
                  {t('popular_subtitle')}
                </p>
              </div>
              <Link
                to="/search"
                className="text-primary font-bold flex items-center gap-2 group text-sm md:text-base"
              >
                {t('see_all')}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {/* Desktop: Bento Grid */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-6 lg:gap-8 h-auto md:h-[700px] lg:h-[800px]">
              {featuredProduct && (
                <ProductCard
                  product={featuredProduct}
                  variant="bento-featured"
                />
              )}
              {sideProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="bento-small"
                />
              ))}
              {wideProduct && (
                <ProductCard product={wideProduct} variant="bento-wide" />
              )}
            </div>

            {/* Mobile: Simple Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {popularProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Newsletter Section (Mobile) */}
          <section className="md:hidden mb-8 bg-surface-container p-6 md:p-8 rounded-xl space-y-4">
            <h3 className="text-xl font-extrabold tracking-tight">
              {t('join_atelier')}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('join_subtitle')}
            </p>
            <div className="flex gap-2">
              <input
                className="bg-surface-container-lowest flex-1 rounded-full border-none px-4 text-sm focus:ring-1 focus:ring-primary outline-none"
                placeholder={t('email_placeholder')}
                type="email"
              />
              <button className="primary-gradient text-white p-3 rounded-full flex items-center justify-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

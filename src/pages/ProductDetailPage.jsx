import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Heart, ShoppingCart, Share, Verified, Truck, Leaf, Star, Plus, Minus } from 'lucide-react'
import { products } from '../data/products'
import { reviews } from '../data/reviews'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import StarRating from '../components/ui/StarRating'
import ReviewCard from '../components/ui/ReviewCard'
import { useCartStore } from '../store/useCartStore'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useTranslation } from '../store/useLanguageStore'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const [mainImage, setMainImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const addToCart = useCartStore((state) => state.addToCart)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product?.id))
  const t = useTranslation()

  if (!product) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black mb-4">{t('product_not_found')}</h1>
          <Link to="/" className="text-primary font-bold hover:underline">
            {t('return_home')}
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    window.location.href = '/cart'
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-24 pb-32 max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-6 md:mb-8 overflow-x-auto hide-scrollbar">
          <Link to="/" className="hover:text-primary transition-colors">
            {t('nav_shop')}
          </Link>
          <ChevronRight size={14} />
          <Link
            to={`/search?category=${product.category.toLowerCase()}`}
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-primary truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Product Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
            <div className="relative rounded-lg overflow-hidden bg-surface-container-lowest editorial-shadow">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-col gap-2">
                  {product.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`px-3 md:px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${
                        badge === 'Limited Stock'
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : badge === "Editor's Pick"
                          ? 'bg-primary-container text-on-primary-container'
                          : badge === 'Sale'
                          ? 'bg-error-container text-on-error-container'
                          : badge === 'Out of Stock'
                          ? 'bg-surface-container-highest text-on-surface-variant'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className={`rounded-md overflow-hidden bg-surface-container-lowest transition-all ${
                      idx === mainImage
                        ? 'ring-2 ring-primary'
                        : 'hover:opacity-80'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} detail ${idx + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm font-semibold text-on-surface-variant">
                {product.rating} ({product.reviewCount?.toLocaleString()}{' '}
                {t('reviews')})
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
              {product.name}
            </h1>

            <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
              {product.description}
            </p>

            {/* Price Block */}
            <div className="p-6 md:p-8 rounded-lg bg-surface-container-low flex flex-col gap-2">
              <div className="flex items-end gap-3 md:gap-4 flex-wrap">
                <span className="text-3xl md:text-4xl font-black text-on-surface">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg md:text-xl text-on-surface-variant line-through opacity-50 mb-1">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-black tracking-tighter uppercase mb-2">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-primary tracking-widest uppercase">
                {t('free_shipping')}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-on-surface-variant">
                {t('quantity')}:
              </span>
              <div className="flex items-center bg-surface-container-low rounded-full px-3 py-1 gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex gap-3 md:gap-4">
                <button
                  className="flex-[2] py-3 md:py-4 primary-gradient text-on-primary rounded-full font-bold text-base md:text-lg shadow-cta hover:scale-[1.02] active:scale-95 transition-all"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  {product.inStock ? t('buy_now') : t('out_of_stock')}
                </button>
                <button
                  className={`flex-1 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all ${
                    addedToCart
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-highest text-primary hover:bg-surface-container'
                  }`}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {addedToCart ? '✓' : t('add_to_cart')}
                </button>
              </div>
              <div className="flex gap-3 md:gap-4">
                <button
                  className={`flex-1 flex items-center justify-center gap-2 py-3 transition-colors text-sm font-semibold ${
                    isFavorite ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => toggleFavorite(product)}
                >
                  <Heart
                    size={18}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                  {isFavorite ? t('saved_wishlist') : t('add_wishlist')}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold">
                  <Share size={18} />
                  {t('share')}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 md:mt-8 grid grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8 border-t border-surface-container">
              <div className="flex flex-col items-center text-center gap-2">
                <Verified size={24} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {t('warranty')}
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={24} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {t('logistics')}
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Leaf size={24} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {t('ethical')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        {product.features && product.features.length > 0 && (
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface mb-8">
              {t('key_features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-surface-container-lowest p-6 rounded-lg">
                  <div className="bg-secondary-container w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-secondary-container">
                      {feat.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface mb-1">{feat.title}</h3>
                    <p className="text-sm text-on-surface-variant">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="mt-16 md:mt-32">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface mb-2">
                {t('customer_reviews')}
              </h2>
              <p className="text-on-surface-variant font-medium">
                {t('voices_community')}
              </p>
            </div>
            <button className="hidden md:block px-6 md:px-8 py-2.5 md:py-3 bg-surface-container-lowest text-primary rounded-full font-bold hover:bg-surface-container-low transition-colors text-sm md:text-base">
              {t('write_review')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {reviews.slice(0, 3).map((review, idx) => (
              <ReviewCard
                key={review.id}
                review={review}
                variant={idx === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-32">
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface mb-2">
                {t('complete_set')}
              </h2>
              <p className="text-on-surface-variant font-medium">
                {t('complete_set_subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Mobile sticky bottom CTA */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 z-40 p-4 glass shadow-editorial">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            className="flex-1 bg-surface-container-high text-primary font-bold py-3.5 rounded-full active:scale-95 transition-all uppercase text-xs tracking-widest"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {addedToCart ? '✓' : t('add_to_cart')}
          </button>
          <button
            className="flex-[1.4] primary-gradient text-white font-bold py-3.5 rounded-full shadow-cta active:scale-95 transition-all uppercase text-xs tracking-widest"
            onClick={handleBuyNow}
            disabled={!product.inStock}
          >
            {product.inStock ? t('buy_now') : t('out_of_stock')}
          </button>
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}

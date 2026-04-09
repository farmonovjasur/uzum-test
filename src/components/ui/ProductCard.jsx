import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'

export default function ProductCard({ product, variant = 'default' }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id))

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  if (variant === 'deal') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="bg-surface-container-lowest rounded-lg p-4 md:p-6 flex gap-4 md:gap-6 items-center hover:scale-[1.01] transition-all duration-300"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-surface-container-low rounded-md overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          {product.discount > 0 && (
            <span className="inline-block bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
              -{product.discount}% OFF
            </span>
          )}
          <h3 className="font-bold text-on-surface leading-tight mb-2 text-sm md:text-base">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-black text-primary">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs md:text-sm text-on-surface-variant line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'bento-small') {
    return (
      <div className="bg-surface-container-lowest rounded-lg p-4 md:p-6 shadow-sm hover:shadow-editorial-hover transition-all duration-300 flex flex-col">
        <div className="aspect-square w-full rounded-md overflow-hidden mb-4 md:mb-6 bg-surface-container-low">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="mt-auto">
          <h3 className="font-bold text-on-surface text-sm md:text-lg mb-2 truncate">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="font-black text-primary text-sm md:text-base">
              ${product.price}
            </span>
            <button
              onClick={handleToggleFavorite}
              className="hover:text-primary transition-colors"
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                fill={isFavorite ? 'currentColor' : 'none'}
                className={isFavorite ? 'text-primary' : 'text-on-surface-variant/30'}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'bento-wide') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="md:col-span-2 bg-secondary-container rounded-lg p-6 md:p-8 flex items-center gap-4 md:gap-8 cursor-pointer relative overflow-hidden group hover:shadow-editorial-hover transition-all duration-300"
      >
        <div className="relative z-10 w-full md:w-1/2">
          <span className="text-on-secondary-fixed-variant text-[10px] font-black uppercase tracking-widest mb-2 block">
            Flash Trend
          </span>
          <h3 className="text-xl md:text-2xl font-black text-on-secondary-container leading-tight mb-2 md:mb-4 tracking-tighter">
            {product.name}
          </h3>
          <span className="text-xl md:text-2xl font-black text-secondary">
            ${product.price}
          </span>
        </div>
        <div className="hidden md:block w-1/2 h-full absolute right-0 top-0 translate-x-4 rotate-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </Link>
    )
  }

  if (variant === 'bento-featured') {
    return (
      <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest rounded-lg p-6 md:p-8 flex flex-col group hover:shadow-editorial-hover transition-all duration-300">
        <div className="h-48 md:h-2/3 w-full rounded-md overflow-hidden mb-4 md:mb-8 bg-surface-container-low">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="mt-auto">
          <span className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-2 block">
            {product.category}
          </span>
          <h3 className="text-xl md:text-3xl font-black text-on-surface mb-2 md:mb-4 tracking-tighter">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-2xl font-black text-primary">
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors active:scale-90"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Default grid card
  return (
    <div className="group bg-surface-container-lowest rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-editorial">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm p-2 md:p-3 rounded-full hover:scale-110 transition-all"
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={isFavorite ? 'currentColor' : 'none'}
              className={isFavorite ? 'text-primary' : 'text-on-surface-variant'}
            />
          </button>
          {product.badges && product.badges.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
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
      </Link>
      <div className="p-4 md:p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-on-surface text-sm md:text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-on-surface-variant text-xs md:text-sm mb-3">
          {product.category}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-primary text-base md:text-xl">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs md:text-sm text-on-surface-variant line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full primary-gradient text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 shadow-cta active:scale-90"
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

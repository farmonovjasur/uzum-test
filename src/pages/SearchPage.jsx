import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, Filter } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { useTranslation } from '../store/useLanguageStore'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '')
  const [localCategory, setLocalCategory] = useState(
    searchParams.get('category') || ''
  )
  const t = useTranslation()

  // Sync from URL params
  useEffect(() => {
    setLocalQuery(searchParams.get('q') || '')
    setLocalCategory(searchParams.get('category') || '')
  }, [searchParams])

  // Live filtering — useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products

    if (localCategory) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === localCategory.toLowerCase()
      )
    }

    if (localQuery.trim()) {
      const q = localQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    return filtered
  }, [localQuery, localCategory])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = {}
    if (localQuery.trim()) params.q = localQuery.trim()
    if (localCategory) params.category = localCategory
    setSearchParams(params)
  }

  // Live search — update URL on each keystroke with debounce effect
  const handleQueryChange = (value) => {
    setLocalQuery(value)
    // Update URL params for bookmarkability
    const params = {}
    if (value.trim()) params.q = value.trim()
    if (localCategory) params.category = localCategory
    setSearchParams(params, { replace: true })
  }

  const handleCategoryChange = (categoryId) => {
    const newCategory = localCategory === categoryId ? '' : categoryId
    setLocalCategory(newCategory)
    const params = {}
    if (localQuery.trim()) params.q = localQuery.trim()
    if (newCategory) params.category = newCategory
    setSearchParams(params)
  }

  const clearFilters = () => {
    setLocalQuery('')
    setLocalCategory('')
    setSearchParams({})
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-24 pb-32 px-4 md:px-6 max-w-screen-2xl mx-auto">
        {/* Search Header */}
        <div className="mb-6 md:mb-8">
          <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-on-surface-variant" />
            </div>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-3 md:py-4 pl-11 pr-12 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none text-sm md:text-base"
              placeholder={t('search_placeholder')}
              type="text"
              value={localQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              autoFocus
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="absolute inset-y-0 right-4 flex items-center"
              >
                <X size={16} className="text-on-surface-variant hover:text-primary" />
              </button>
            )}
          </form>
        </div>

        {/* Filter Toggle (Mobile) */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-on-surface-variant font-medium text-sm"
          >
            <Filter size={16} />
            {t('filters')}
          </button>
        </div>

        {/* Category Filters */}
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block mb-6 md:mb-8`}
        >
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  localCategory === cat.id
                    ? 'primary-gradient text-white shadow-cta'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {t(`cat_${cat.id}`)}
              </button>
            ))}
            {(localQuery || localCategory) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-full text-sm font-medium bg-surface-container-highest text-on-surface-variant hover:bg-surface-container transition-all"
              >
                {t('clear_all')}
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-on-surface">
            {localQuery
              ? t('search_results', { query: localQuery })
              : localCategory
              ? t(`cat_${localCategory}`)
              : t('all_products')}
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            {t('products_found', { count: filteredProducts.length })}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 md:py-40 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6 md:mb-8">
              <Search size={32} className="text-on-surface-variant" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">
              {t('no_products')}
            </h3>
            <p className="text-on-surface-variant max-w-md mb-6 md:mb-8 text-sm md:text-base">
              {t('no_products_subtitle')}
            </p>
            <button
              onClick={clearFilters}
              className="primary-gradient text-on-primary px-6 md:px-8 py-3 rounded-full font-bold text-sm md:text-base shadow-cta hover:scale-[1.02] active:scale-95 transition-all"
            >
              {t('clear_filters')}
            </button>
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

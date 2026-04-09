import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useSearchStore } from '../../store/useSearchStore'

export default function SearchBar({ variant = 'desktop' }) {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()
  const setQuery = useSearchStore((state) => state.setQuery)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setQuery(inputValue.trim())
      navigate('/search')
    }
  }

  const handleClear = () => {
    setInputValue('')
    useSearchStore.getState().clearSearch()
  }

  if (variant === 'mobile') {
    return (
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-outline-variant" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-3.5 pl-11 pr-10 text-on-surface focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 outline-none text-sm"
            placeholder="Search curated collections..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <X size={16} className="text-on-surface-variant hover:text-primary" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-xl mx-4 md:mx-8">
      <form onSubmit={handleSubmit}>
        <div className="bg-surface-container-low rounded-full px-4 py-2.5 flex items-center gap-3">
          <Search size={18} className="text-on-surface-variant" />
          <input
            className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-on-surface-variant/60 outline-none"
            placeholder="Search for products, brands and more..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

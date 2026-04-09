import { create } from 'zustand'
import { products } from '../data/products'

export const useSearchStore = create((set, get) => ({
  query: '',
  category: null,
  results: [],

  setQuery: (text) => {
    set({ query: text })
    get().search()
  },

  setCategory: (category) => {
    set({ category })
    get().search()
  },

  clearSearch: () => {
    set({ query: '', category: null, results: [] })
  },

  search: () => {
    const { query, category } = get()
    let filtered = products

    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    set({ results: filtered })
  },
}))

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCartStore } from './useCartStore'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleFavorite: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id)
          if (exists) {
            return { items: state.items.filter((item) => item.id !== product.id) }
          }
          return { items: [...state.items, product] }
        })
      },

      isFavorite: (productId) => {
        return get().items.some((item) => item.id === productId)
      },

      moveToCart: (productId) => {
        const product = get().items.find((item) => item.id === productId)
        if (product) {
          useCartStore.getState().addToCart(product)
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          }))
        }
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
)

import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center bg-surface-container-low rounded-full px-2 md:px-3 py-1 gap-2 md:gap-4">
      <button
        onClick={onDecrease}
        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors active:scale-90"
        disabled={quantity <= 1}
      >
        <Minus size={14} className="text-on-surface-variant" />
      </button>
      <span className="w-6 md:w-8 text-center font-semibold text-sm md:text-base">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors active:scale-90"
      >
        <Plus size={14} className="text-on-surface-variant" />
      </button>
    </div>
  )
}

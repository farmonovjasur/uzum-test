export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-secondary-container text-on-secondary-container',
    sale: 'bg-error-container text-on-error-container',
    limited: 'bg-tertiary-container text-on-tertiary-container',
    editor: 'bg-primary-container text-on-primary-container',
    outofstock: 'bg-surface-container-highest text-on-surface-variant',
  }

  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${variants[variant] || variants.default}`}
    >
      {children}
    </span>
  )
}

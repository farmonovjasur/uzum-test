import { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useTranslation } from '../../store/useLanguageStore'

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const t = useTranslation()

  // Sync mode when initialMode prop changes
  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setShowPassword(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[420px] animate-modal-in">
        {/* Card */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Top Decorative Header */}
          <div className="relative overflow-hidden">
            <div className="primary-gradient px-8 pt-10 pb-16 text-center">
              {/* Decorative circles */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-4 -left-6 w-24 h-24 rounded-full bg-white/5" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  {mode === 'login' ? (
                    <Lock size={24} className="text-white" />
                  ) : (
                    <User size={24} className="text-white" />
                  )}
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {mode === 'login' ? t('login_title') : t('register_title')}
                </h2>
                <p className="text-white/60 text-sm mt-1.5 font-medium">
                  {mode === 'login' ? t('login_subtitle') : t('register_subtitle')}
                </p>
              </div>
            </div>
          </div>

          {/* Form Area — overlapping card effect */}
          <div className="px-6 pb-6 -mt-8 relative z-10">
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-editorial">
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="relative group">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors"
                    />
                    <input
                      type="text"
                      placeholder={t('full_name')}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-surface-container-low rounded-xl py-3.5 pl-10 pr-4 text-on-surface text-sm border-none focus:ring-2 focus:ring-primary/30 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/40"
                      required
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors"
                  />
                  <input
                    type="email"
                    placeholder={t('email')}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl py-3.5 pl-10 pr-4 text-on-surface text-sm border-none focus:ring-2 focus:ring-primary/30 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/40"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password')}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl py-3.5 pl-10 pr-11 text-on-surface text-sm border-none focus:ring-2 focus:ring-primary/30 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/40"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {mode === 'register' && (
                  <div className="relative group">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('confirm_password')}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange('confirmPassword', e.target.value)
                      }
                      className="w-full bg-surface-container-low rounded-xl py-3.5 pl-10 pr-4 text-on-surface text-sm border-none focus:ring-2 focus:ring-primary/30 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/40"
                      required
                    />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-xs text-primary font-semibold hover:underline underline-offset-2"
                    >
                      {t('forgot_password')}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full primary-gradient text-on-primary py-3.5 rounded-xl font-bold text-sm shadow-cta hover:scale-[1.02] active:scale-95 transition-all mt-2"
                >
                  {mode === 'login' ? t('sign_in') : t('sign_up')}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-surface-container-high" />
                <span className="text-[11px] text-on-surface-variant/50 font-medium uppercase tracking-wider">
                  {t('or_continue')}
                </span>
                <div className="flex-1 h-px bg-surface-container-high" />
              </div>

              {/* Google button */}
              <button
                type="button"
                className="w-full bg-surface-container-low text-on-surface py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 hover:bg-surface-container transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t('google')}
              </button>
            </div>

            {/* Switch mode */}
            <p className="text-center text-sm text-on-surface-variant mt-5">
              {mode === 'login' ? t('no_account') : t('have_account')}{' '}
              <button
                onClick={switchMode}
                className="text-primary font-bold hover:underline underline-offset-2"
              >
                {mode === 'login' ? t('sign_up') : t('sign_in')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

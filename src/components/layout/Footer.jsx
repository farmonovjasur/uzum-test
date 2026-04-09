import { Link } from 'react-router-dom'
import { Share, Star, Mail, ArrowRight } from 'lucide-react'
import { useTranslation } from '../../store/useLanguageStore'

export default function Footer() {
  const t = useTranslation()

  return (
    <footer className="bg-surface-container pt-12 md:pt-16 pb-8 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 max-w-screen-2xl mx-auto px-4 md:px-8 mb-12 md:mb-16 text-sm text-on-surface-variant">
        <div className="flex flex-col gap-4 md:gap-6">
          <span className="text-lg md:text-xl font-bold text-on-surface">
            The Fluid Marketplace
          </span>
          <p className="leading-relaxed">
            {t('footer_description')}
          </p>
          <div className="flex gap-3 md:gap-4">
            <button className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Share size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Star size={14} />
            </button>
            <button className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <Mail size={14} />
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-on-surface mb-4 md:mb-6">{t('company')}</h4>
          <ul className="flex flex-col gap-3 md:gap-4">
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                {t('about_us')}
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                {t('contact')}
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                {t('privacy_policy')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-on-surface mb-4 md:mb-6">{t('support')}</h4>
          <ul className="flex flex-col gap-3 md:gap-4">
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                {t('shipping_link')}
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                {t('returns')}
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                {t('faq')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-on-surface mb-4 md:mb-6">{t('newsletter')}</h4>
          <p className="mb-4">{t('newsletter_subtitle')}</p>
          <div className="flex">
            <input
              className="bg-surface-container-lowest border-none rounded-l-full px-4 py-2 w-full focus:ring-1 focus:ring-primary text-sm outline-none"
              placeholder={t('email_placeholder')}
              type="email"
            />
            <button className="primary-gradient text-white px-4 py-2 rounded-r-full font-bold hover:opacity-90 transition-opacity">
              {t('join')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 pt-6 md:pt-8 border-t border-surface-container-low flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-on-surface-variant/50">
          © 2024 The Fluid Marketplace. An Editorial Experience.
        </span>
        <div className="flex gap-4 md:gap-6 text-xs text-on-surface-variant/50">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Stripe</span>
          <span>Apple Pay</span>
        </div>
      </div>
    </footer>
  )
}

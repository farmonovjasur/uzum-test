import { useState } from 'react'
import { User, LogOut, Settings, Package, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import BottomNav from '../components/layout/BottomNav'
import Footer from '../components/layout/Footer'
import { useTranslation } from '../store/useLanguageStore'
import AuthModal from '../components/ui/AuthModal'

export default function ProfilePage() {
  const t = useTranslation()

  // For this demo, we'll assume the user is NOT logged in initially.
  // In a real app, this would be tied to useAuthStore.
  const isLoggedIn = false

  const [showAuthModal, setShowAuthModal] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="bg-surface text-on-surface min-h-screen">
        <Navbar />
        <main className="pt-24 pb-32 px-4 md:px-6 max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
          <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
            <User size={40} className="text-on-surface-variant" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-3">
            {t('nav_profile')}
          </h1>
          <p className="text-on-surface-variant max-w-md text-center mb-8">
            {t('login_subtitle')}
          </p>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="primary-gradient text-on-primary px-8 py-3 rounded-full font-bold shadow-cta active:scale-95 transition-all"
          >
            {t('login')}
          </button>
        </main>
        <Footer />
        <BottomNav />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-24 pb-32 px-4 md:px-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-black mb-8">{t('nav_profile')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
              <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                JD
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-on-surface-variant mb-6">john.doe@example.com</p>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-surface-container text-error font-medium hover:bg-error/10 transition-colors">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/cart" className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="bg-surface-container w-12 h-12 rounded-full flex items-center justify-center text-primary">
                <Package size={24} />
              </div>
              <div>
                <h3 className="font-bold">My Orders</h3>
                <p className="text-sm text-on-surface-variant">View and track your previous orders</p>
              </div>
            </Link>
            <Link to="/favorites" className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="bg-surface-container w-12 h-12 rounded-full flex items-center justify-center text-tertiary">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="font-bold">{t('my_favorites')}</h3>
                <p className="text-sm text-on-surface-variant">Browse items you've saved</p>
              </div>
            </Link>
            <div className="bg-surface-container-lowest p-5 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-surface-container w-12 h-12 rounded-full flex items-center justify-center text-secondary">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="font-bold">Account Settings</h3>
                <p className="text-sm text-on-surface-variant">Manage your details and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

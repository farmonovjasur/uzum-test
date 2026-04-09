import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const translations = {
  en: {
    // Navbar
    search_placeholder: "Search for products, brands and more...",
    login: "Login",
    register: "Register",
    location: "Location",

    // Home
    categories: "Categories",
    categories_subtitle: "Browse our curated departments",
    daily_deals: "Daily Deals",
    daily_deals_subtitle: "Exclusive 24-hour prices on editorial favorites. Once they're gone, they're gone.",
    view_all_deals: "View All Deals",
    popular_products: "Popular Products",
    popular_subtitle: "The most coveted items in the marketplace this week",
    see_all: "See All",
    join_atelier: "Join the Atelier",
    join_subtitle: "Unlock exclusive editorial collections and early access to drops.",
    email_placeholder: "Email address",

    // Product Detail
    buy_now: "Buy Now",
    add_to_cart: "Add to Cart",
    out_of_stock: "Out of Stock",
    quantity: "Quantity",
    free_shipping: "FREE EXPRESS SHIPPING INCLUDED",
    reviews: "Reviews",
    write_review: "Write a Review",
    customer_reviews: "Customer Reviews",
    voices_community: "Voices from the community",
    complete_set: "Complete the Set",
    complete_set_subtitle: "Curated peripherals for the ultimate experience",
    key_features: "Key Features",
    share: "Share this masterpiece",
    add_wishlist: "Add to Wishlist",
    saved_wishlist: "Saved to Wishlist",
    warranty: "2 Year Warranty",
    logistics: "Global Logistics",
    ethical: "Ethical Sourcing",
    verified: "Verified Purchase",

    // Cart
    shopping_cart: "Shopping Cart",
    cart_items_count: "You have {count} item(s) in your editorial selection.",
    cart_empty_title: "Your atelier is currently empty.",
    cart_empty_subtitle: "Discover our latest collection of architectural fashion and designer electronics to start your editorial journey.",
    explore_collections: "Explore Collections",
    order_summary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    shipping_free: "Free",
    tax: "Tax Estimations",
    total: "Total",
    proceed_checkout: "Proceed to Checkout",
    continue_shopping: "Continue Shopping",
    category: "Category",

    // Favorites
    my_favorites: "My Favorites",
    favorites_count: "You have {count} curated item(s) in your wishlist.",
    favorites_empty: "Your wishlist is currently empty.",
    no_favorites: "No favorites yet",
    no_favorites_subtitle: "Start curating your collection by tapping the heart icon on products you love.",
    move_to_cart: "Move to Cart",
    notify_me: "Notify Me",
    discovery: "Discovery Awaits",
    discovery_subtitle: "Based on your favorites, we thought you'd love these curated pieces.",
    explore_drops: "Explore New Drops",

    // Search
    search_results: 'Results for "{query}"',
    all_products: "All Products",
    products_found: "{count} product(s) found",
    no_products: "No products found",
    no_products_subtitle: "Try adjusting your search or filters to find what you're looking for.",
    clear_filters: "Clear Filters",
    clear_all: "Clear All",
    filters: "Filters",

    // Bottom Nav
    nav_shop: "Shop",
    nav_wishlist: "Wishlist",
    nav_cart: "Cart",
    nav_profile: "Profile",

    // Footer
    footer_description: "A curated editorial experience for the modern shopper. We bring the atelier to your screen.",
    company: "Company",
    about_us: "About Us",
    contact: "Contact",
    privacy_policy: "Privacy Policy",
    support: "Support",
    shipping_link: "Shipping",
    returns: "Returns",
    faq: "FAQ",
    newsletter: "Newsletter",
    newsletter_subtitle: "Get curated weekly picks in your inbox.",
    join: "Join",

    // Auth
    login_title: "Welcome Back",
    login_subtitle: "Sign in to your atelier account",
    register_title: "Create Account",
    register_subtitle: "Join the editorial experience",
    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",
    full_name: "Full Name",
    forgot_password: "Forgot password?",
    no_account: "Don't have an account?",
    have_account: "Already have an account?",
    sign_in: "Sign In",
    sign_up: "Sign Up",
    or_continue: "Or continue with",
    google: "Google",

    // Categories
    cat_electronics: "Electronics",
    cat_fashion: "Fashion",
    cat_home: "Home",
    cat_beauty: "Beauty",
    cat_sports: "Sports",

    // Product Not Found
    product_not_found: "Product Not Found",
    return_home: "Return Home",

    // Common
    sale: "Sale",
    limited_stock: "Limited Stock",
    flash_trend: "Flash Trend",
  },

  ru: {
    // Navbar
    search_placeholder: "Поиск товаров, брендов и многое другое...",
    login: "Войти",
    register: "Регистрация",
    location: "Локация",

    // Home
    categories: "Категории",
    categories_subtitle: "Откройте наши подобранные разделы",
    daily_deals: "Скидки дня",
    daily_deals_subtitle: "Эксклюзивные 24-часовые цены на избранные товары. Пока они не закончились.",
    view_all_deals: "Все скидки",
    popular_products: "Популярные товары",
    popular_subtitle: "Самые востребованные товары на этой неделе",
    see_all: "Все товары",
    join_atelier: "Присоединяйтесь",
    join_subtitle: "Откройте эксклюзивные коллекции и ранний доступ к новинкам.",
    email_placeholder: "Email адрес",

    // Product Detail
    buy_now: "Купить сейчас",
    add_to_cart: "В корзину",
    out_of_stock: "Нет в наличии",
    quantity: "Количество",
    free_shipping: "БЕСПЛАТНАЯ ЭКСПРЕСС ДОСТАВКА",
    reviews: "Отзывы",
    write_review: "Написать отзыв",
    customer_reviews: "Отзывы покупателей",
    voices_community: "Голоса нашего сообщества",
    complete_set: "Дополните комплект",
    complete_set_subtitle: "Подобранные аксессуары для лучшего опыта",
    key_features: "Ключевые особенности",
    share: "Поделиться",
    add_wishlist: "В избранное",
    saved_wishlist: "В избранном",
    warranty: "Гарантия 2 года",
    logistics: "Глобальная логистика",
    ethical: "Этичное производство",
    verified: "Проверенная покупка",

    // Cart
    shopping_cart: "Корзина",
    cart_items_count: "У вас {count} товар(ов) в корзине.",
    cart_empty_title: "Ваша корзина пуста.",
    cart_empty_subtitle: "Откройте нашу последнюю коллекцию архитектурной моды и дизайнерской электроники.",
    explore_collections: "Начать покупки",
    order_summary: "Итого заказа",
    subtotal: "Подитог",
    shipping: "Доставка",
    shipping_free: "Бесплатно",
    tax: "Налоги",
    total: "Итого",
    proceed_checkout: "Оформить заказ",
    continue_shopping: "Продолжить покупки",
    category: "Категория",

    // Favorites
    my_favorites: "Избранное",
    favorites_count: "У вас {count} товар(ов) в избранном.",
    favorites_empty: "Ваш список избранного пуст.",
    no_favorites: "Пока ничего нет",
    no_favorites_subtitle: "Начните добавлять товары в избранное, нажимая на иконку сердца.",
    move_to_cart: "В корзину",
    notify_me: "Уведомить",
    discovery: "Откройте для себя",
    discovery_subtitle: "На основе вашего избранного мы подобрали эти товары.",
    explore_drops: "Новые поступления",

    // Search
    search_results: 'Результаты для "{query}"',
    all_products: "Все товары",
    products_found: "Найдено {count} товар(ов)",
    no_products: "Товары не найдены",
    no_products_subtitle: "Попробуйте изменить запрос или фильтры для поиска нужного товара.",
    clear_filters: "Очистить фильтры",
    clear_all: "Очистить всё",
    filters: "Фильтры",

    // Bottom Nav
    nav_shop: "Главная",
    nav_wishlist: "Избранное",
    nav_cart: "Корзина",
    nav_profile: "Профиль",

    // Footer
    footer_description: "Элитный магазин для современного покупателя. Мы приносим ателье на ваш экран.",
    company: "Компания",
    about_us: "О нас",
    contact: "Контакты",
    privacy_policy: "Политика конфиденциальности",
    support: "Поддержка",
    shipping_link: "Доставка",
    returns: "Возврат",
    faq: "FAQ",
    newsletter: "Рассылка",
    newsletter_subtitle: "Получайте еженедельные подборки на вашу почту.",
    join: "Подписаться",

    // Auth
    login_title: "С возвращением",
    login_subtitle: "Войдите в свой аккаунт",
    register_title: "Создать аккаунт",
    register_subtitle: "Присоединяйтесь к нам",
    email: "Email",
    password: "Пароль",
    confirm_password: "Подтвердить пароль",
    full_name: "Полное имя",
    forgot_password: "Забыли пароль?",
    no_account: "Нет аккаунта?",
    have_account: "Уже есть аккаунт?",
    sign_in: "Войти",
    sign_up: "Зарегистрироваться",
    or_continue: "Или продолжить с",
    google: "Google",

    // Categories
    cat_electronics: "Электроника",
    cat_fashion: "Мода",
    cat_home: "Дом",
    cat_beauty: "Красота",
    cat_sports: "Спорт",

    // Product Not Found
    product_not_found: "Товар не найден",
    return_home: "На главную",

    // Common
    sale: "Скидка",
    limited_stock: "Ограниченный тираж",
    flash_trend: "Тренд",
  },

  uz: {
    // Navbar
    search_placeholder: "Mahsulot, brend qidiring...",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    location: "Joylashuv",

    // Home
    categories: "Kategoriyalar",
    categories_subtitle: "Tanlangan bo'limlarni ko'ring",
    daily_deals: "Kunlik aksiyalar",
    daily_deals_subtitle: "Tanlangan mahsulotlarga 24 soatlik maxsus narxlar. Tugaydi — vaqtida oling.",
    view_all_deals: "Barcha aksiyalar",
    popular_products: "Ommabop mahsulotlar",
    popular_subtitle: "Bu haftaning eng mashhur mahsulotlari",
    see_all: "Barchasini ko'rish",
    join_atelier: "Bizga qo'shiling",
    join_subtitle: "Eksklyuziv kolleksiyalar va yangiliklar haqida birinchi bo'lib xabar oling.",
    email_placeholder: "Email manzil",

    // Product Detail
    buy_now: "Hozir sotib olish",
    add_to_cart: "Savatga qo'shish",
    out_of_stock: "Mavjud emas",
    quantity: "Miqdor",
    free_shipping: "BEPUL YETKAZIB BERISH",
    reviews: "Sharhlar",
    write_review: "Sharh yozish",
    customer_reviews: "Mijozlar fikrlari",
    voices_community: "Jamiyat ovozlari",
    complete_set: "To'plamni yakunlang",
    complete_set_subtitle: "Eng yaxshi tajriba uchun tanlangan aksessuarlar",
    key_features: "Asosiy xususiyatlar",
    share: "Ulashish",
    add_wishlist: "Sevimlilarga",
    saved_wishlist: "Sevimlilarda",
    warranty: "2 yil kafolat",
    logistics: "Global logistika",
    ethical: "Halol ishlab chiqarish",
    verified: "Tasdiqlangan xarid",

    // Cart
    shopping_cart: "Savat",
    cart_items_count: "Savatda {count} ta mahsulot bor.",
    cart_empty_title: "Savatingiz bo'sh.",
    cart_empty_subtitle: "Zamonaviy moda va dizayner elektronika kolleksiyamizni kashf eting.",
    explore_collections: "Xaridni boshlash",
    order_summary: "Buyurtma xulosasi",
    subtotal: "Oraliq jami",
    shipping: "Yetkazib berish",
    shipping_free: "Bepul",
    tax: "Soliq",
    total: "Jami",
    proceed_checkout: "Buyurtmani rasmiylashtirish",
    continue_shopping: "Xaridni davom ettirish",
    category: "Kategoriya",

    // Favorites
    my_favorites: "Sevimlilar",
    favorites_count: "Sevimlilarda {count} ta mahsulot bor.",
    favorites_empty: "Sevimlilar ro'yxati bo'sh.",
    no_favorites: "Hali hech narsa yo'q",
    no_favorites_subtitle: "Yoqtirgan mahsulotlaringizni yurak tugmasini bosib qo'shing.",
    move_to_cart: "Savatga ko'chirish",
    notify_me: "Xabar bering",
    discovery: "Kashfiyot kutmoqda",
    discovery_subtitle: "Sevimlilaringiz asosida siz uchun tanlangan mahsulotlar.",
    explore_drops: "Yangi mahsulotlar",

    // Search
    search_results: '"{query}" bo\'yicha natijalar',
    all_products: "Barcha mahsulotlar",
    products_found: "{count} ta mahsulot topildi",
    no_products: "Mahsulot topilmadi",
    no_products_subtitle: "Izlayotgan narsangizni topish uchun qidiruvni yoki filtrlarni o'zgartiring.",
    clear_filters: "Filtrlarni tozalash",
    clear_all: "Barchasini tozalash",
    filters: "Filtrlar",

    // Bottom Nav
    nav_shop: "Do'kon",
    nav_wishlist: "Sevimli",
    nav_cart: "Savat",
    nav_profile: "Profil",

    // Footer
    footer_description: "Zamonaviy xaridor uchun tanlangan premium do'kon. Biz atelyeni ekraningizga olib kelamiz.",
    company: "Kompaniya",
    about_us: "Biz haqimizda",
    contact: "Aloqa",
    privacy_policy: "Maxfiylik siyosati",
    support: "Yordam",
    shipping_link: "Yetkazib berish",
    returns: "Qaytarish",
    faq: "FAQ",
    newsletter: "Yangiliklar",
    newsletter_subtitle: "Haftalik tanlangan mahsulotlarni pochtangizga oling.",
    join: "Obuna bo'lish",

    // Auth
    login_title: "Xush kelibsiz",
    login_subtitle: "Hisobingizga kiring",
    register_title: "Hisob yaratish",
    register_subtitle: "Bizga qo'shiling",
    email: "Email",
    password: "Parol",
    confirm_password: "Parolni tasdiqlang",
    full_name: "To'liq ism",
    forgot_password: "Parolni unutdingizmi?",
    no_account: "Hisobingiz yo'qmi?",
    have_account: "Hisobingiz bormi?",
    sign_in: "Kirish",
    sign_up: "Ro'yxatdan o'tish",
    or_continue: "Yoki davom eting",
    google: "Google",

    // Categories
    cat_electronics: "Elektronika",
    cat_fashion: "Moda",
    cat_home: "Uy",
    cat_beauty: "Go'zallik",
    cat_sports: "Sport",

    // Product Not Found
    product_not_found: "Mahsulot topilmadi",
    return_home: "Bosh sahifa",

    // Common
    sale: "Chegirma",
    limited_stock: "Cheklangan miqdor",
    flash_trend: "Trend",
  },
}

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
)

// Custom hook that properly re-renders when language changes
export function useTranslation() {
  const language = useLanguageStore((state) => state.language)

  const t = (key, params = {}) => {
    let text = translations[language]?.[key] || translations.en[key] || key
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v)
    })
    return text
  }

  return t
}

export const languages = [
  { code: 'en', name: 'EN', fullName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'RU', fullName: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: 'UZ', fullName: "O'zbekcha", flag: '🇺🇿' },
]

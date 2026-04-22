import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
      translation: {
        "welcome": "Welcome to Our Store",
        "discover": "Discover the best products for you!",
        "shopNow": "Shop Now",
        "featuredProducts": "Featured Products",
        "chooseSubCategories": "Choose SubCategories, Then Press Search...",
        //Homepage
        "appName": "Femtotrade",
        "searchButton": "Search",
        "searchBoxLabel": "Search Products",
        "newProducts": "New Products",
        "TopSellingProducts":"TOP SELLING",
        "searchResuls": "Search Results",
        //Header
        "orderByPhone": "Order By Phone",
        "phonenumber": "+2 01005126629",
        "phonenumber2": "+2 01110124373",
        "emailto": "Email Us",
        "welcome": "Welcome,",
        "guest": "Guest",

        //NavBar
        "home": "Home",
        "contactus": "Contact Us",
        "aboutus": "About Us",
        "login": "Sign in",
        "register": "Register",


      },
    },
    ar: {
      translation: {
        "discover": "اكتشف أفضل المنتجات لك!",
        "shopNow": "تسوق الآن",
        "featuredProducts": "منتجات مميزة",
        "chooseSubCategories": "اختر الفئات الفرعية، ثم اضغط على البحث...",
        //Homepage
        "appName": "فيمتوتريد لمستلزمات الحيوانات الاليفة",
        "searchButton": "بحث",
        "searchBoxLabel": "البحث عن منتجات",
        "newProducts": "منتجات جديدة",
        "TopSellingProducts": "الاكثر مبيعا",
        "searchResuls": "نتائج البحث",
        //Header
        "orderByPhone": "طلب عبر الهاتف",
        "phonenumber": "+2 01005126629",
        "phonenumber2": "+2 01110124373",
        "emailto": "أرسل بريدًا",
        "welcome": "مرحبًا،",
        "guest": "ضيف",

        //NavBar
        "home": "الرئيسية",
        "contactus": "الإتصال بنا",
        "aboutus": "من نحن" ,
        "login": "تسجيل الدخول",
        "register": "حساب جديد",
      },
    },
};

i18n
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: 'en', // ✅ ده المهم
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
  
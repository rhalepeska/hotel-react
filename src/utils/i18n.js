import i18n from 'i18next';
import {initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(initReactI18next).use(LanguageDetector)
.init({
    resources: {
        en: {
            translation: {
                nav: {
                    "1": "Home",
                    "2": "Hotels",
                    "3": "Sign In or Join",
                    "acc": "Account",
                    "greet": "Hello, ",
                    "out": "Logout",
                },
                img: {
                    "text": "Get Away",
                    "btn": "Book Now",
                },
                featured: {
                    "header": "Featured Hotels",
                    "btn": "See More",
                },
                "contact": "Contact Us: "
            }
        },
        es: {
            translation: {
                nav: {
                    "1": "Inicio",
                    "2": "Hoteles",
                    "3": "Iniciar Sesión o Unirse",
                    "acc": "Cuenta",
                    "greet": "Hola, ",
                    "out": "Cerrar Sesión",
                },
                img: {
                    "text": "Aléjate",
                    "btn": "Reservar Ahora",
                },
                featured: {
                    "header": "Hoteles Destacados",
                    "btn": "Ver Más",
                },
                "contact": "Contacta Con Nosotras: "
            }
        }
    },
    fallbackLng: 'en'
});

export default i18n;
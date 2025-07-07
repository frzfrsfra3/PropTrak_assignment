// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          home: "Home",
          postProperty: "Post Property",
          contacts: "Contacts",
          rent: "Rent",
          chat: "Chat",
          properties: "Properties",
          saved: "Saved",
        },
      },
      ar: {
        translation: {
          home: "الرئيسية",
          postProperty: "نشر عقار",
          contacts: "جهات الاتصال",
          rent: "الإيجارات",
          chat: "المحادثات",
          properties: "العقارات",
          saved: "المحفوظات",
        },
      },
    },
  });

export default i18n;

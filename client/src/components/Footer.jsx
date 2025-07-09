import { Logo } from "./";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { userType } = useSelector((store) => store.auth);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="p-4 shadow-sm md:px-6 md:py-8 bg-slate-300 mt-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`sm:flex sm:items-center sm:justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`flex items-center mb-4 sm:mb-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Logo />

          <div className={`flex flex-col ${isRTL ? 'mr-3' : 'ml-3'} justify-center`}>
            <h1 className="font-display text-xl md:text-2xl">{t('appName')}</h1>
            <p className="text-xs md:text-sm">
              {t('appTagline')}
            </p>
          </div>
        </div>
        <ul className={`flex flex-wrap items-center mb-6 text-sm sm:mb-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <li>
            <Link to="/about" className={`${isRTL ? 'ml-4 md:ml-6' : 'mr-4 md:mr-6'} hover:underline`}>
              {t('about.title')}
            </Link>
          </li>
          <li>
            <Link to="/privacy" className={`${isRTL ? 'ml-4 md:ml-6' : 'mr-4 md:mr-6'} hover:underline`}>
              {t('privacyPolicy')}
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
      <span className="block text-sm sm:text-center">
        {t('copyright')} |{" "}
        <Link to={`/${userType}`} className="hover:underline">
          {isRTL ? "بواسطة محمد فراس زيتون" : "By Mhd Feras Zaiter"}
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
import { useSelector } from "react-redux";
import { Header, Logo, Footer, LanguageSwitcher } from "../components";
import about1 from "../assets/images/about1.svg";
import about2 from "../assets/images/about2.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutPageComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mx-auto w-3/4 mb-12">
      <h2 className="font-heading font-bold mt-8 uppercase">
        {t('about.title')}
      </h2>
      <div className="">
        <div className="mt-6">
          <p>{t('about.description')}</p>
        </div>
        <div className="flex mt-6 justify-center flex-col md:flex-row">
          <div className="md:w-1/2">
            <h4 className="font-bold">{t('about.owner.title')}</h4>
            <div>
              <p>{t('about.owner.description')}</p>
            </div>
          </div>
          <div>
            <img src={about1} alt="" />
          </div>
        </div>
        <div className="flex mt-6 justify-center flex-col md:flex-row">
          <div className="hidden md:block">
            <img src={about2} alt="" className="max-w-sm" />
          </div>
          <div className="md:w-1/2">
            <h4 className="font-bold">{t('about.tenant.title')}</h4>
            <div>
              <p>{t('about.tenant.description')}</p>
            </div>
          </div>
          <div className="md:hidden">
            <img src={about2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  if (!user) {
    return (
      <div>
        <header className="flex m-1 shadow-sm">
          <Logo />
          <div className="flex flex-col justify-center ml-2">
            <h5 className="font-display">{t('about.appName')}</h5>
            <p className="hidden text-xs md:block md:text-sm">
              {t('about.appTagline')}
            </p>
          </div>
          <div className="ml-auto flex items-center">
            <LanguageSwitcher />
          </div>
        </header>
        <AboutPageComponent />
        <footer className="p-4 shadow-sm md:px-6 md:py-8 bg-slate-300 mt-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Logo />
              <div className="flex flex-col ml-3 justify-center">
                <h1 className="font-display text-xl md:text-2xl">
                  {t('about.appName')}
                </h1>
                <p className="text-xs md:text-sm">
                  {t('about.appTagline')}
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm sm:mb-0">
              <li>
                <Link to="/about" className="mr-4 hover:underline md:mr-6">
                  {t('about.title')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="mr-4 hover:underline md:mr-6">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
          <span className="block text-sm sm:text-center">
            {t('about.copyright')} |{" "}
            <Link to="/" className="hover:underline">
              {t('about.appName')}
            </Link>
          </span>
        </footer>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <AboutPageComponent />
      <Footer />
    </div>
  );
};

export default AboutPage;
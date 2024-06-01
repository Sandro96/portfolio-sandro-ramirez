import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [t, i18n] = useTranslation('global');
  const [language, setLanguage] = useState(i18n.language);
  const [showNav, setShowNav] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('mobile-nav')) {
      setShowNav(false);
    }
  };

  useEffect(() => {
    if (showNav) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
  }, [showNav]);

  return (
    <nav className="navbar bg-color">
      <div className="content container">
        <h2 className="brand text-white">
          Sandro <span className="highlight text-color">Ramirez</span>
        </h2>
        <div className="links">
          <Link to="home" spy smooth duration={800} className="text-white link">
            {t('navbar.home')}
          </Link>
          <Link to="about" spy smooth duration={800} offset={-80} className="text-white link">
            {t('navbar.about')}
          </Link>
          <Link to="skills" spy smooth duration={800} offset={-80} className="text-white link">
            {t('navbar.skills')}
          </Link>
          <Link to="projects" spy smooth duration={800} offset={-80} className="text-white link">
            {t('navbar.projects')}
          </Link>
          <Link to="contact" spy smooth duration={800} className="text-white link">
            {t('navbar.contact')}
          </Link>
          <button className="text-white" onClick={toggleLanguage}>
            {language === 'en' ? t('navbar.lng') : t('navbar.lng')}
          </button>
        </div>
        <button className="text-white hamburger-menu" onClick={() => setShowNav(!showNav)}>
          ☰
        </button>
      </div>
      {showNav && (
        <div className="mobile-nav" onClick={handleClickOutside}>
          <div className="mobile-nav-content-wrapper">
            <div className="mobile-nav-content">
              <Link to="home" spy smooth duration={800} className="text-white" onClick={() => setShowNav(false)}>
                {t('navbar.home')}
              </Link>
              <Link to="about" spy smooth duration={800} offset={-80} className="text-white" onClick={() => setShowNav(false)}>
                {t('navbar.about')}
              </Link>
              <Link to="skills" spy smooth duration={800} offset={-80} className="text-white" onClick={() => setShowNav(false)}>
                {t('navbar.skills')}
              </Link>
              <Link to="projects" spy smooth duration={800} offset={-80} className="text-white" onClick={() => setShowNav(false)}>
                {t('navbar.projects')}
              </Link>
              <Link to="contact" spy smooth duration={800} className="text-white" onClick={() => setShowNav(false)}>
                {t('navbar.contact')}
              </Link>
              <button className="text-white" onClick={() => { toggleLanguage(); setShowNav(false); }}>
                {language === 'en' ? t('navbar.lng') : t('navbar.lng')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

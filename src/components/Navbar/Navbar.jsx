import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";

const Navbar = () => {
  const [t, i18n] = useTranslation("global");
  const [language, setLanguage] = useState(i18n.language);
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  useEffect(() => {
    if (showNav) {
      document.body.classList.add("mobile-nav-active");
    } else {
      document.body.classList.remove("mobile-nav-active");
    }
  }, [showNav]);

  return (
    <nav className="navbar">
      <div className="container">
        <Link
          to="home"
          spy
          smooth
          duration={800}
          onClick={() => setShowNav(false)}
          className="text-white link"
        >
          <h2>
            Sandro <span className="text-color">Ramirez</span>
          </h2>
        </Link>
        <div className="links">
          {["home", "resume", "projects", "contact"].map((section) => (
            <Link
              key={section}
              to={section}
              spy
              smooth
              duration={800}
              className={`text-white link ${
                activeSection === section ? "active" : ""
              }`}
              onSetActive={() => setActiveSection(section)} 
              onClick={() => setShowNav(false)}
            >
              {t(`navbar.${section}`)}
            </Link>
          ))}
        </div>
        <button
          className="text-white hamburger-menu"
          onClick={() => setShowNav(!showNav)}
        >
          ☰
        </button>
      </div>
      {showNav && (
        <div className="mobile-nav">
          <div className="mobile-nav-content-wrapper">
            <div className="mobile-nav-content">
              {["home", "resume", "projects", "contact"].map(
                (section) => (
                  <Link
                    key={section}
                    to={section}
                    spy
                    smooth
                    duration={800}
                    className={`text-white ${
                      activeSection === section ? "active" : ""
                    }`}
                    onSetActive={() => setActiveSection(section)} 
                    onClick={() => setShowNav(false)}
                  >
                    {t(`navbar.${section}`)}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

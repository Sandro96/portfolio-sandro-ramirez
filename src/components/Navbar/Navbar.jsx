import React, { useState, useEffect, memo } from "react";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import LanguageToggle from "./LanguageToggle";
import { debounce } from "./utils/debounce";

const NavLink = memo(({ section, activeSection, setActiveSection, setShowNav, t }) => {
  const handleClick = debounce(() => {
    setShowNav(false);
  }, 300);

  return (
    <Link
      to={section}
      spy
      smooth
      duration={800}
      href={`#${section}`}
      className={`text-white link ${activeSection === section ? "active" : ""}`}
      onSetActive={() => setActiveSection(section)}
      onClick={handleClick}
    >
      {t(`navbar.${section}`)}
    </Link>
  );
});

const MobileMenu = memo(({ showNav, activeSection, setActiveSection, setShowNav, t }) => (
  <div className="mobile-nav">
    <div className="mobile-nav-content-wrapper">
      <div className="mobile-nav-content">
        {["home", "resume", "projects", "contact"].map((section) => (
          <NavLink
            key={section}
            section={section}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setShowNav={setShowNav}
            t={t}
          />
        ))}
      </div>
    </div>
  </div>
));

const Navbar = () => {
  const [t, i18n] = useTranslation("global");
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "es";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const toggleNav = debounce(() => {
    setShowNav((prev) => !prev);
  }, 300);

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
          href="#home"
          onClick={() => setShowNav(false)}
          className="text-white link logo-link"
        >
          <div className="logo-wrapper">
            {/* ✅ Asegurate que este archivo esté en /public/svg/IconSR.svg */}
            <img
              src="/svg/iconSR.svg"
              alt="Logo SR"
              className="logo-image"
              width={32}
              height={32}
            />
            <h2>
              Sandro<span className="text-color">Ramirez</span>
            </h2>
          </div>
        </Link>
        <div className="links">
          {["home", "resume", "projects", "contact"].map((section) => (
            <NavLink
              key={section}
              section={section}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setShowNav={setShowNav}
              t={t}
            />
          ))}
          <LanguageToggle />
        </div>
        <button className="text-white hamburger-menu" onClick={toggleNav}>
          ☰
        </button>
      </div>
      {showNav && (
        <MobileMenu
          showNav={showNav}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setShowNav={setShowNav}
          t={t}
        />
      )}
    </nav>
  );
};

export default Navbar;
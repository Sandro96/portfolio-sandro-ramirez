import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "./utils/debounce";

const LanguageToggle = () => {
  const [t, i18n] = useTranslation("global");
  const language = i18n.language;

  const toggleLanguage = debounce(() => {
    const newLang = language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }, 300);

  return (
    <button
      className="text-white language-toggle"
      onClick={toggleLanguage}
    >
      {language === "en" ? "ES" : "EN"}
    </button>
  );
};

export default React.memo(LanguageToggle);
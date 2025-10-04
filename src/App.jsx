import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Resume from "./components/Resume/Resume";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const { t, i18n } = useTranslation("global");
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(t("meta.title")); 
  }, [t, i18n.language]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = t("meta.comeback");
      } else {
        document.title = t("meta.title");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [t, i18n.language]);

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={i18n.language} />
        <title>{pageTitle}</title>
        <meta name="description" content={t("meta.description")} />
        <meta name="keywords" content={t("meta.keywords")} />
        <meta name="author" content="Sandro Ramirez" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("meta.og-title")} />
        <meta property="og:description" content={t("meta.og-description")} />
        <meta property="og:url" content="https://ramirezsandro.com" />

        <meta property="og:image" content="https://ramirezsandro.com/img/preview.jpg" />
        <meta property="og:image:alt" content={t("meta.og-image-alt")} />

        <link rel="canonical" href="https://ramirezsandro.com" />
      </Helmet>

      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Header />
              <Resume />
              <Projects />
              <Contact />
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Analytics />
    </HelmetProvider>
  );
}

export default App;
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AiOutlineHome } from "react-icons/ai";
import "./NotFound.css";

const NotFound = () => {
  const { t } = useTranslation("global");

  // Fallback text in case translations don't load
  const fallbackText = {
    title: "Page not found",
    description: "The page you're looking for doesn't exist. But don't worry, you can go back to the home page and explore my portfolio.",
    homeButton: "Go home"
  };

  const getText = (key) => {
    try {
      return t(`notFound.${key}`) || fallbackText[key];
    } catch (error) {
      console.warn(`Translation error for notFound.${key}:`, error);
      return fallbackText[key];
    }
  };

  return (
    <section className="not-found">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="not-found-content"
        >
          <div className="error-code">
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-color"
            >
              404
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="error-message"
          >
            <h2>{getText("title")}</h2>
            <p>{getText("description")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="error-actions"
          >
            <Link to="/" className="btn-primary">
              <AiOutlineHome />
              {getText("homeButton")}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="error-decoration"
          >
            <div className="floating-elements">
              <div className="element element-1"></div>
              <div className="element element-2"></div>
              <div className="element element-3"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;

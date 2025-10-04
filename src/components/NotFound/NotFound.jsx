import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { AiOutlineHome, AiOutlineArrowLeft } from "react-icons/ai";
import "./NotFound.css";

const NotFound = () => {
  const { t } = useTranslation("global");

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
            <h2>{t("notFound.title")}</h2>
            <p>{t("notFound.description")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="error-actions"
          >
            <Link to="/" className="btn-primary">
              <AiOutlineHome />
              {t("notFound.homeButton")}
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

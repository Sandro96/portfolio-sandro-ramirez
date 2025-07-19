import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTranslation } from "react-i18next";
import Typed from "typed.js";
import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillBehanceSquare,
} from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import photo from "../../assets/img/photo01.webp";
import "./Header.css";

const Header = () => {
  const { t, i18n } = useTranslation("global");
  const language = i18n.language;

  const cvFilename =
    language === "en" ? "sandroramirez_cv_eng.pdf" : "sandroramirez_cv.pdf";
  const cvLink = `/pdf/${cvFilename}`;

  const [refTitle, inViewTitle] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [refSocial, inViewSocial] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [refButton, inViewButton] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [refImage, inViewImage] = useInView({ triggerOnce: false, threshold: 0.2 });

  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: t("header.titles", { returnObjects: true }),
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      backDelay: 1500,
    });

    return () => typed.destroy();
  }, [t]);

  return (
    <section className="header container" id="home">
      <div className="text-side">
        <motion.div
          ref={refTitle}
          initial={{ opacity: 0, y: -30 }}
          animate={inViewTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="titles"
        >
          <h1 className="text-color">Sandro Ramirez</h1>
          <h2 className="text-animation">
            <span ref={typedRef} />
          </h2>
        </motion.div>

        <motion.div
          ref={refSocial}
          initial={{ opacity: 0, x: -30 }}
          animate={inViewSocial ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          className="social-media"
        >
          <a
            href="https://www.linkedin.com/in/sandro-ramirez/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/Sandro96"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <AiOutlineGithub />
          </a>
          <a
            href="https://www.behance.net/sandroramirez14"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
          >
            <AiFillBehanceSquare />
          </a>
        </motion.div>

        <motion.a
          ref={refButton}
          initial={{ opacity: 0, y: 30 }}
          animate={inViewButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
          href={cvLink}
          download={cvFilename}
        >
          <button className="fill">
            {t("header.download")} <HiOutlineDownload />
          </button>
        </motion.a>
      </div>

      <div className="photo-side">
        <LazyLoadImage
          src={photo}
          alt="Sandro Ramirez"
          effect="blur"
          className="photo"
        />
        <motion.svg
          className="svg-frame"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#1EB091"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </div>
    </section>
  );
};

export default Header;

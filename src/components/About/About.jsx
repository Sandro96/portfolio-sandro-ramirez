import React from "react";
import "./About.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BiSolidJoystick } from "react-icons/bi";
import { RiMovie2Fill } from "react-icons/ri";
import { IoIosFootball } from "react-icons/io";
import { FaMusic } from "react-icons/fa";
import { calculateAge } from "./utils/helpers";

const About = () => {
  const { t } = useTranslation("global");
  const { ref: presentationRef, inView: isPresentationInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  const { ref: hobbiesRef, inView: areHobbiesInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  const birthDate = "1996-02-01";
  const age = calculateAge(birthDate);

  return (
    <div className="about">
      <motion.div
        ref={presentationRef}
        className="presentation-card"
        initial={{ opacity: 0, y: 30 }}
        animate={isPresentationInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="presentation-content">
          <p>
            {t("resume.me01")
              .split("{{name}}")
              .map((part, i) =>
                i === 0 ? (
                  <span key="before-name">{part}</span>
                ) : (
                  <>
                    <span key="name" className="text-color">
                      Sandro Ramirez
                    </span>
                    {part.split("{{subTitle}}").map((subPart, k) =>
                      k === 0 ? (
                        <span key="after-name">{subPart}</span>
                      ) : (
                        <>
                          <span key="titles">
                            {t("header.titles", { returnObjects: true }).join(" y ")}
                          </span>
                          <span key="after-titles">{subPart}</span>
                        </>
                      )
                    )}
                  </>
                )
              )}
          </p>
        </div>
      </motion.div>

      <motion.div
        ref={hobbiesRef}
        className="hobbies-card"
        initial={{ opacity: 0, y: 30 }}
        animate={areHobbiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <h3 className="hobbies-title">Hobbies</h3>
        <div className="hobbies-grid">
          <div
            className="hobby-item"
            aria-label="Games"
          >
            <div className="hobby-icon">
              <BiSolidJoystick size={24} />
            </div>
            <span className="hobby-label">{t("resume.games")}</span>
          </div>
          <div
            className="hobby-item"
            aria-label="Movies"
          >
            <div className="hobby-icon">
              <RiMovie2Fill size={24} />
            </div>
            <span className="hobby-label">{t("resume.movies")}</span>
          </div>
          <div
            className="hobby-item"
            aria-label="Sports"
          >
            <div className="hobby-icon">
              <IoIosFootball size={24} />
            </div>
            <span className="hobby-label">{t("resume.sports")}</span>
          </div>
          <div
            className="hobby-item"
            aria-label="Music"
          >
            <div className="hobby-icon">
              <FaMusic size={24} />
            </div>
            <span className="hobby-label">{t("resume.music")}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

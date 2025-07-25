import React, { useState } from "react";
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
  const [hoveredHobby, setHoveredHobby] = useState(null);
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
        className="presentation"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isPresentationInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
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
      </motion.div>



      <motion.div
        ref={hobbiesRef}
        className="hobbies"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={areHobbiesInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h4>Hobbies</h4>
        <div className="social-icons">
          <div
            aria-label="Games"
            onMouseEnter={() => setHoveredHobby("Games")}
            onMouseLeave={() => setHoveredHobby(null)}
          >
            <BiSolidJoystick size={28} />
            {hoveredHobby === "Games" && (
              <div className="tooltip">{t("resume.games")}</div>
            )}
          </div>
          <div
            aria-label="Movies"
            onMouseEnter={() => setHoveredHobby("Movies")}
            onMouseLeave={() => setHoveredHobby(null)}
          >
            <RiMovie2Fill size={24} />
            {hoveredHobby === "Movies" && (
              <div className="tooltip">{t("resume.movies")}</div>
            )}
          </div>
          <div
            aria-label="Sports"
            onMouseEnter={() => setHoveredHobby("Sports")}
            onMouseLeave={() => setHoveredHobby(null)}
          >
            <IoIosFootball size={28} />
            {hoveredHobby === "Sports" && (
              <div className="tooltip">{t("resume.sports")}</div>
            )}
          </div>
          <div
            aria-label="Music"
            onMouseEnter={() => setHoveredHobby("Music")}
            onMouseLeave={() => setHoveredHobby(null)}
          >
            <FaMusic size={20} />
            {hoveredHobby === "Music" && (
              <div className="tooltip">{t("resume.music")}</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

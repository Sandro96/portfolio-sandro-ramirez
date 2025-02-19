import React, { useState } from "react";
import "./Resume.css";
import { useTranslation } from "react-i18next";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
import Skills from "../Skills/Skills";
import About from "../About/About";

const Resume = () => {
  const { t } = useTranslation("global");

  const [activeSection, setActiveSection] = useState("experience");

  const sections = {
    experience: <Experience />,
    education: <Education />,
    skills: <Skills />,
    about: <About />,
  };

  return (
    <section className="resume" id="resume">
      <div className="container">
        <div className="content">
          <p className="text-content">{t("resume.me02")}</p>
          <div className="button-group">
            {Object.keys(sections).map((key) => (
              <button
                key={key}
                className={activeSection === key ? "active-button" : ""}
                onClick={() => setActiveSection(key)}
              >
                {t(`resume.${key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="dynamic-view">{sections[activeSection] || null}</div>
      </div>
    </section>
  );
};

export default Resume;
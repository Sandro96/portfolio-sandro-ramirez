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

  const renderSection = () => {
    switch (activeSection) {
      case "experience":
        return <Experience />;
      case "education":
        return <Education />;
      case "skills":
        return <Skills />;
      case "about":
        return <About/>
      default:
        return null;
    }
  };

  return (
    <section className="resume" id="resume">
      <div className="container">
        <div className="content">
          <p className="text-content">
            {t("resume.me03")}
          </p>
          <div className="button-group">
            <button
              className={activeSection === "experience" ? "active-button" : ""}
              onClick={() => setActiveSection("experience")}
            >
              {t("resume.experience")}
            </button>
            <button
              className={activeSection === "education" ? "active-button" : ""}
              onClick={() => setActiveSection("education")}
            >
              {t("resume.education")}
            </button>
            <button
              className={activeSection === "skills" ? "active-button" : ""}
              onClick={() => setActiveSection("skills")}
            >
              {t("resume.skills")}
            </button>
            <button
              className={activeSection === "about" ? "active-button" : ""}
              onClick={() => setActiveSection("about")}
            >
              {t("resume.about")}
            </button>
          </div>
        </div>

        <div className="dynamic-view">
          {renderSection()}
        </div>
      </div>
    </section>
  );
};

export default Resume;
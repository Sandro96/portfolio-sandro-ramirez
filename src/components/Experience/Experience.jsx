import React, { useState, memo } from "react";
import "./Experience.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import experienceData_es from "../../assets/data/experience/experience_es.json";
import experienceData_en from "../../assets/data/experience/experience_en.json";
import detailsData_es from "../../assets/data/detailsExp/detailsExp_es.json";
import detailsData_en from "../../assets/data/detailsExp/detailsExp_en.json";

const Experience = () => {
  const { t, i18n } = useTranslation("global");
  const [selectedDetailId, setSelectedDetailId] = useState(null);

  const experienceData =
    i18n.language === "es" ? experienceData_es : experienceData_en;
  const detailsData = i18n.language === "es" ? detailsData_es : detailsData_en;

  const handleShowDetails = (id) => {
    setSelectedDetailId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="experience" id="experience">
      {experienceData.map((exp) => (
        <ExperienceItem
          key={exp.id}
          exp={exp}
          selectedDetailId={selectedDetailId}
          onShowDetails={handleShowDetails}
          detailsData={detailsData}
          t={t}
        />
      ))}
    </div>
  );
};

const ExperienceItem = memo(
  ({ exp, selectedDetailId, onShowDetails, detailsData, t }) => {
    const isSelected = selectedDetailId === exp.id;
    const { ref, inView } = useInView({
      triggerOnce: false,
      threshold: 0.2,
    });

    return (
      <motion.div
        ref={ref}
        className="experience-item"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>{exp.name}</h2>
        <p className="company-name">{exp.company}</p>
        <p className="text-color">{exp.period}</p>
        <button onClick={() => onShowDetails(exp.id)}>
          {isSelected ? t("resume.hide") : t("resume.show")}
        </button>
        {isSelected && (
          <div className="experience-details">
            {exp.details.map((detailId) => {
              const detail = detailsData.find((d) => d.id === detailId);
              return (
                <div key={detail.id} className="detail-item">
                  <h5 className="customer-name">{detail.customer}</h5>
                  <p>
                    {detail.description.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br /><br />
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    );
  }
);

export default Experience;

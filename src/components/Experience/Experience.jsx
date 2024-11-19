import React, { useState, memo } from "react";
import "./Experience.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import experienceData from "../../assets/data/experience/experience_es.json";
import detailsData from "../../assets/data/detailsExp/detailsExp_es.json";

const Experience = () => {
  const { t } = useTranslation("global");
  const [selectedDetailId, setSelectedDetailId] = useState(null);

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
        />
      ))}
    </div>
  );
};

const ExperienceItem = memo(({ exp, selectedDetailId, onShowDetails }) => {
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
      <h5 className="text-color">{exp.period}</h5>
      <h4>{exp.name}</h4>
      <h5 className="company-name">{exp.company}</h5>
      <button onClick={() => onShowDetails(exp.id)}>
        {isSelected ? "Ocultar" : "Ver más"}
      </button>
      {isSelected && (
        <div className="experience-details">
          {exp.details.map((detailId) => {
            const detail = detailsData.find((d) => d.id === detailId);
            return (
              <div key={detail.id} className="detail-item">
                <h5 className="customer-name">{detail.customer}</h5>
                <p>{detail.description}</p>
                <p className="text-color">{detail.duration}</p>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
});

export default Experience;
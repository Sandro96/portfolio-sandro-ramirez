import React from "react";
import "./Education.css";
import { useTranslation } from "react-i18next";
import { PiCertificateFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import educationData_es from "../../assets/data/education/education_es.json";
import educationData_en from "../../assets/data/education/education_en.json";

const Education = () => {
  const { t, i18n } = useTranslation("global");

  const educationData = i18n.language === "es" ? educationData_es : educationData_en;

  const groupedEducation = educationData.reduce((acc, current) => {
    if (!acc[current.type]) {
      acc[current.type] = [];
    }
    acc[current.type].push(current);
    return acc;
  }, {});

  return (
    <div className="education" id="education">
      <div className="education-container">
        {Object.entries(groupedEducation).map(([type, items]) => (
          <EducationGroup key={type} type={type} items={items} />
        ))}
      </div>
    </div>
  );
};

const EducationGroup = ({ type, items }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      className="education-group"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="education-type">{type}</h3>
      <div className="education-items">
        {items.map((item) => (
          <EducationItem key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

const EducationItem = ({ item }) => {
  return (
    <div className="education-item">
      <p className="education-name">{item.name}</p>
      <p className="education-institution">{item.institution}</p>
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="education-link"
        >
          <PiCertificateFill />
        </a>
      )}
    </div>
  );
};

export default Education;
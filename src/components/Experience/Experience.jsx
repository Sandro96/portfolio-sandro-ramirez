import React, { useState, useEffect } from "react";
import "./Experience.css";
import { useTranslation } from "react-i18next";
import experienceData_es from "../../assets/data/experience/experience_es.json";
import experienceData_en from "../../assets/data/experience/experience_en.json";
import detailsData_es from "../../assets/data/detailsExp/detailsExp_es.json";
import detailsData_en from "../../assets/data/detailsExp/detailsExp_en.json";

const Experience = () => {
  const { t, i18n } = useTranslation("global");
  const experienceData =
    i18n.language === "es" ? experienceData_es : experienceData_en;
  const detailsData = i18n.language === "es" ? detailsData_es : detailsData_en;

  const [selectedDetailId, setSelectedDetailId] = useState(
    experienceData.length > 0 ? experienceData[0].id : null
  );

  useEffect(() => {
    if (experienceData.length > 0 && !selectedDetailId) {
      setSelectedDetailId(experienceData[0].id);
    }
  }, [i18n.language, experienceData, selectedDetailId]);

  const handleSelectExperience = (id) => {
    setSelectedDetailId(id);
  };

  const selectedExperience = experienceData.find((exp) => exp.id === selectedDetailId);

  return (
    <div className="experience" id="experience">
      <div className="experience-list">
        {experienceData.map((exp) => (
          <div
            key={exp.id}
            className={`experience-tab ${selectedDetailId === exp.id ? 'active' : ''}`}
            onClick={() => handleSelectExperience(exp.id)}
          >
            <h3>{exp.name}</h3>
            <p className="company-name">{exp.company}</p>
            <p className="text-color">{exp.period}</p>
          </div>
        ))}
      </div>
      <div className="experience-content">
        {selectedExperience && (
          <div className="experience-details">
            {selectedExperience.details.map((detailId) => {
              const detail = detailsData.find((d) => d.id === detailId);
              return (
                <div key={detail.id} className="detail-item">
                  <h4 className="customer-name">{detail.customer}</h4>
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
      </div>
    </div>
  );
};

export default Experience;

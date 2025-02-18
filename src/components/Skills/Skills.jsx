import React, { useState } from "react";
import "./Skills.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import skillsData from "../../assets/data/skills/skills.json";
import {
  FaReact,
  FaAngular,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiPostman,
  SiOctopusdeploy,
  SiTeamcity,
} from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";

const iconMap = {
  FaReact: FaReact,
  FaAngular: FaAngular,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiNextdotjs: SiNextdotjs,
  SiDotnet: SiDotnet,
  FaNodeJs: FaNodeJs,
  SiMicrosoftsqlserver: SiMicrosoftsqlserver,
  SiMongodb: SiMongodb,
  SiPostman: SiPostman,
  SiOctopusdeploy: SiOctopusdeploy,
  SiTeamcity: SiTeamcity,
};

const Skills = () => {
  const { t } = useTranslation("global");
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredSkills = skillsData
    .filter((skill) => filter === "all" || skill.filter === filter)
    .slice(0, 12);

  const handleFilterClick = (newFilter, index) => {
    setFilter(newFilter);
    setActiveIndex(index);
  };

  return (
    <div className="skills">
      <div className="filter-buttons">
        <a
          onClick={() => handleFilterClick("all", 0)}
          className={activeIndex === 0 ? "active" : ""}
        >
          {t("resume.filter-all")}
        </a>
        <a
          onClick={() => handleFilterClick("front", 1)}
          className={activeIndex === 1 ? "active" : ""}
        >
          Frontend
        </a>
        <a
          onClick={() => handleFilterClick("back", 2)}
          className={activeIndex === 2 ? "active" : ""}
        >
          Backend
        </a>
        <a
          onClick={() => handleFilterClick("other", 3)}
          className={activeIndex === 3 ? "active" : ""}
        >
          {t("resume.filter-other")}
        </a>
        <span style={{ left: `${activeIndex * 100}px` }}></span>
      </div>
      <div className="wrapper">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const SkillCard = ({ skill }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const IconComponent = iconMap[skill.icon];

  return (
    <motion.div
      ref={ref}
      className="card"
      style={{
        backgroundColor: `var(--bg_color)`,
        transition: "0.3s",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `2px solid ${skill.color}`;
        e.currentTarget.style.scale = `1.02`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "2px solid transparent";
        e.currentTarget.style.scale = `1`;
      }}
    >
      {IconComponent && <IconComponent className="icon" size={50} style={{ color: skill.color }} />}
      <div className="skill-name" style={{ color: "#fff" }}>
        {skill.name}
      </div>
    </motion.div>
  );
};

export default Skills;
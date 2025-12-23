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
  SiBootstrap,
  SiDotnet,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiPostman,
  SiOctopusdeploy,
  SiTeamcity,
  SiNextdotjs,
  SiNestjs,
  SiVercel,
  SiRailway,
  SiOpenai,
} from "react-icons/si";

const VercelLogo = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#000000"/>
    <path d="M12 8L16.5 16H7.5L12 8Z" fill={color || "#ffffff"}/>
  </svg>
);


const iconMap = {
  FaReact: FaReact,
  FaAngular: FaAngular,
  FaNodeJs: FaNodeJs,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiBootstrap: SiBootstrap,
  SiNextdotjs: SiNextdotjs,
  SiDotnet: SiDotnet,
  SiNestjs: SiNestjs,
  SiMicrosoftsqlserver: SiMicrosoftsqlserver,
  SiMongodb: SiMongodb,
  SiPostman: SiPostman,
  SiOctopusdeploy: SiOctopusdeploy,
  SiTeamcity: SiTeamcity,
  SiVercel: VercelLogo,
  SiRailway: SiRailway,
  SiOpenai: SiOpenai,
};

const Skills = () => {
  const { t } = useTranslation("global");
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredSkills = skillsData
    .filter((skill) => (filter === "all" || skill.filter === filter) && skill.filter !== "hidden")
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
  const IconComponent2 = skill.icon2 ? iconMap[skill.icon2] : null;

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
      <div className={`icon-container ${IconComponent2 ? 'dual-icons' : ''}`}>
        {IconComponent && (
          skill.icon === 'SiVercel' ? (
            <VercelLogo 
              className="icon vercel-icon" 
              size={IconComponent2 ? 40 : 50} 
              color={skill.color} 
            />
          ) : (
            <IconComponent 
              className="icon" 
              size={IconComponent2 ? 40 : 50} 
              style={{ color: skill.color }} 
            />
          )
        )}
        {IconComponent2 && (
          skill.icon2 === 'SiVercel' ? (
            <VercelLogo 
              className="icon icon-second vercel-icon" 
              size={40} 
              color={skill.color2 || skill.color} 
            />
          ) : (
            <IconComponent2 
              className="icon icon-second" 
              size={40} 
              style={{ color: skill.color2 || skill.color }} 
            />
          )
        )}
      </div>
      <div className={`skill-name ${IconComponent2 ? 'dual-icons-text' : ''}`} style={{ color: "#fff" }}>
        {skill.name}
      </div>
    </motion.div>
  );
};

export default Skills;
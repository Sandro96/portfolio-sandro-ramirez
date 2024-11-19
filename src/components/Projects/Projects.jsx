import './Projects.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import projects_en from '../../assets/data/projects/projects_en.json';
import projects_es from '../../assets/data/projects/projects_es.json';
import skillsData from '../../assets/data/skills/skills.json';
import { AiOutlineGithub } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { MdDesignServices } from "react-icons/md";
import {
  FaReact, FaAngular, FaBootstrap, FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiDotnet, SiMicrosoftsqlserver,
  SiMongodb, SiPostman, SiOctopusdeploy, SiTeamcity
} from "react-icons/si";

// Mapa de iconos para habilidades
const iconMap = {
  FaReact: FaReact,
  FaAngular: FaAngular,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  FaBootstrap: FaBootstrap,
  SiDotnet: SiDotnet,
  FaNodeJs: FaNodeJs,
  SiMicrosoftsqlserver: SiMicrosoftsqlserver,
  SiMongodb: SiMongodb,
  SiPostman: SiPostman,
  SiOctopusdeploy: SiOctopusdeploy,
  SiTeamcity: SiTeamcity,
};

const Projects = () => {
  const { t, i18n } = useTranslation("global");
  const projects = i18n.language === 'en' ? projects_en : projects_es;

  // Estado para controlar el índice del proyecto actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mapear las habilidades a los proyectos
  const mapSkillsToProjects = (projects, skills) => {
    return projects.map(project => {
      const techs = project.techs.map(techId => {
        return skills.find(skill => skill.id === techId);
      });
      return { ...project, techs };
    });
  };

  // Procesamos los proyectos con las habilidades
  const projectsWithSkills = mapSkillsToProjects(projects, skillsData);

  // Navegar entre proyectos
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsWithSkills.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsWithSkills.length) % projectsWithSkills.length);
  };

  // Proyecto actual
  const currentProject = projectsWithSkills[currentIndex];

  // Renderizar los botones
  const renderButtons = (project) => {
    const buttonTranslations = {
      1: ["projects.code", "projects.view", "projects.design"],
      2: ["projects.code", "projects.view"],
      3: ["projects.code", "projects.design"],
      4: ["projects.view", "projects.design"],
      5: ["projects.code"],
      6: ["projects.view"],
      7: ["projects.design"]
    };

    const buttonIcons = {
      "projects.code": <AiOutlineGithub />,
      "projects.view": <TfiWorld />,
      "projects.design": <MdDesignServices />
    };

    return buttonTranslations[project.buttonFlag].map((translationKey, index) => {
      const icon = buttonIcons[translationKey];
      const url = project.urls[translationKey.split('.')[1]];

      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          <button>
            {icon}
            {t(translationKey)}
          </button>
        </a>
      );
    });
  };

  return (
    <section className='projects container'>
    <div className="card-wrapper">
      <div className="card-content">
        <div className="details">
          <h4>0{currentProject.id}</h4>
          <h5>{currentProject.name}</h5>
          <p>{currentProject.description}</p>
          <div className="techs">
            <ul>
              {currentProject.techs.map((tech, techIndex) => (
                <li key={techIndex}>
                  {tech.icon && React.createElement(iconMap[tech.icon], { size: 20 })}
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
          <hr/>
        </div>
        <div className="buttons">
          {renderButtons(currentProject)}
        </div>
      </div>
      <div className="card-image">
        <img src={currentProject.img} alt={currentProject.name} />
      </div>
    </div>
    <div className="navigation">
      <button onClick={handlePrevious}>{"<"}</button>
      <button onClick={handleNext}>{">"}</button>
    </div>
  </section>  
  );
};

export default Projects;

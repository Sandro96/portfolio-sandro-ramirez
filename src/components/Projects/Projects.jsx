import './Projects.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import projects_en from '../../assets/data/projects_en.json';
import projects_es from '../../assets/data/projects_es.json';
import skillsData from '../../assets/data/skills.json';
import projectsIcon01 from '/src/assets/img/projectsIcon01.png';
import projectsIcon02 from '/src/assets/img/projectsIcon02.png';
import projectsIcon03 from '/src/assets/img/projectsIcon03.png';

const Projects = () => {
  const { t, i18n } = useTranslation("global");
  const projects = i18n.language === 'en' ? projects_en : projects_es;

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

  // Función para renderizar los botones
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
      "projects.code": projectsIcon01,
      "projects.view": projectsIcon02,
      "projects.design": projectsIcon03
    };

    return buttonTranslations[project.buttonFlag].map((translationKey, index) => {
      const icon = buttonIcons[translationKey];
      const url = project.urls[translationKey.split('.')[1]]; // Obtener la URL correspondiente

      return (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          <button>
            {icon && <img src={icon} alt="Icon" />} 
            {t(translationKey)}
          </button>
        </a>
      );
    });
  };

  return (
    <div className='projects container'>
      <h3>{t("navbar.projects")}</h3>
      <div className="wrapper">
        {projectsWithSkills.map((project, index) => (
          <div className="card" key={index}>
            <img src={project.img} alt={project.name} />
            <div className='data'>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <div className="btts">
                {renderButtons(project)}
              </div>
              <div className="techs">
                <div className="list">
                  {project.techs.map((tech, techIndex) => (
                    <div className="item" key={techIndex}>
                      <img src={tech.icon} alt={tech.name} />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

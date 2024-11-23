import "./Projects.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import projects_en from "../../assets/data/projects/projects_en.json";
import projects_es from "../../assets/data/projects/projects_es.json";
import skillsData from "../../assets/data/skills/skills.json";
import { AiOutlineGithub } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { MdDesignServices } from "react-icons/md";
import { FaReact, FaAngular, FaBootstrap, FaNodeJs } from "react-icons/fa";
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
  const projects = i18n.language === "en" ? projects_en : projects_es;
  const [currentIndex, setCurrentIndex] = useState(0);

  const mapSkillsToProjects = (projects, skills) => {
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);
    return sortedProjects.map((project) => {
      const techs = project.techs.map((techId) => {
        return skills.find((skill) => skill.id === techId);
      });
      return { ...project, techs };
    });
  };

  const projectsWithSkills = mapSkillsToProjects(projects, skillsData);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsWithSkills.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + projectsWithSkills.length) % projectsWithSkills.length
    );
  };

  const currentProject = projectsWithSkills[currentIndex];

  const formatId = (id, totalProjects) => {
    const maxDigits = totalProjects.toString().length;
    return String(totalProjects - id + 1).padStart(maxDigits + 1, "0");
  };

  return (
    <section className="projects container">
      <div className="card-wrapper">
        <div className="card-content">
          <div className="details">
            <h4>{formatId(currentProject.id, projectsWithSkills.length)}</h4>
            <h5>{currentProject.name}</h5>
            <p>{currentProject.description}</p>
            <div className="techs">
              <ul>
                {currentProject.techs.map((tech, techIndex) => (
                  <li key={techIndex}>
                    {tech.icon &&
                      React.createElement(iconMap[tech.icon], { size: 20 })}
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
            <hr />
          </div>
          <div className="buttons">
            {currentProject.urls.code && (
              <a
                href={currentProject.urls.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <AiOutlineGithub />
                  {t("projects.code")}
                </button>
              </a>
            )}
            {currentProject.urls.view && (
              <a
                href={currentProject.urls.view}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <TfiWorld />
                  {t("projects.view")}
                </button>
              </a>
            )}
            {currentProject.urls.design && (
              <a
                href={currentProject.urls.design}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <MdDesignServices />
                  {t("projects.design")}
                </button>
              </a>
            )}
          </div>
        </div>
        <div className="card-image">
          <img src={currentProject.img} alt={currentProject.name} />
          <div className="indicators">
            {projectsWithSkills.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
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

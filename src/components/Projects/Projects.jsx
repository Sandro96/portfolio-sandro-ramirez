import "./Projects.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import projects_en from "../../assets/data/projects/projects_en.json";
import projects_es from "../../assets/data/projects/projects_es.json";
import skillsData from "../../assets/data/skills/skills.json";
import { AiOutlineGithub } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { MdDesignServices } from "react-icons/md";
import { FaReact, FaAngular, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiPostman,
  SiOctopusdeploy,
  SiTeamcity,
  SiNestjs,
} from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { GiGearHammer } from "react-icons/gi";

const iconMap = {
  FaReact: FaReact,
  FaAngular: FaAngular,
  FaNodeJs: FaNodeJs,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiNextdotjs: SiNextdotjs,
  SiDotnet: SiDotnet,
  SiNestjs: SiNestjs,
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isPageVisibleRef = useRef(true);
  const isImageHoveredRef = useRef(false);
  const AUTO_CHANGE_INTERVAL = 6000; // 6 segundos

  const mapSkillsToProjects = (projects, skills) => {
    const sortedProjects = [...projects].sort((a, b) => b.id - a.id);
    return sortedProjects.map((project) => {
      const techs = project.techs
        .map((techId) => {
          return skills.find((skill) => skill.id === techId);
        })
        .filter((tech) => tech !== undefined);
      return { ...project, techs };
    });
  };

  const projectsWithSkills = mapSkillsToProjects(projects, skillsData);

  const changeProject = useCallback((newIndex) => {
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      currentIndexRef.current = newIndex;
      setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
      }, 300); // Duración de la transición
    }, 50);
  }, []);

  const resetAutoChange = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const totalProjects = projectsWithSkills.length;
    intervalRef.current = setInterval(() => {
      if (!isTransitioningRef.current && isPageVisibleRef.current && !isImageHoveredRef.current) {
        const nextIndex = (currentIndexRef.current + 1) % totalProjects;
        changeProject(nextIndex);
      }
    }, AUTO_CHANGE_INTERVAL);
  }, [changeProject, projectsWithSkills.length]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    const nextIndex = (currentIndex + 1) % projectsWithSkills.length;
    changeProject(nextIndex);
    resetAutoChange();
  }, [currentIndex, projectsWithSkills.length, isTransitioning, changeProject, resetAutoChange]);

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    const prevIndex = (currentIndex - 1 + projectsWithSkills.length) % projectsWithSkills.length;
    changeProject(prevIndex);
    resetAutoChange();
  }, [currentIndex, projectsWithSkills.length, isTransitioning, changeProject, resetAutoChange]);

  const handleIndicatorClick = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    changeProject(index);
    resetAutoChange();
  }, [currentIndex, isTransitioning, changeProject, resetAutoChange]);

  const handleImageMouseEnter = useCallback(() => {
    setIsImageHovered(true);
    isImageHoveredRef.current = true;
    // Pausar el intervalo cuando el mouse está sobre la imagen
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleImageMouseLeave = useCallback(() => {
    setIsImageHovered(false);
    isImageHoveredRef.current = false;
    // Reanudar el intervalo cuando el mouse sale de la imagen
    resetAutoChange();
  }, [resetAutoChange]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isImageHoveredRef.current = isImageHovered;
  }, [isImageHovered]);

  // Page Visibility API para pausar cuando la página no está visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;
      
      if (document.hidden) {
        // Pausar el intervalo cuando la página no está visible
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        // Reanudar el intervalo cuando la página vuelve a estar visible
        resetAutoChange();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resetAutoChange]);

  useEffect(() => {
    // Solo iniciar el intervalo si la página está visible
    if (!document.hidden) {
      resetAutoChange();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoChange]);

  const currentProject = projectsWithSkills[currentIndex];

  const handleImageClick = useCallback(() => {
    if (currentProject.urls.view) {
      window.open(currentProject.urls.view, '_blank', 'noopener,noreferrer');
    }
  }, [currentProject]);

  const formatId = (index, totalProjects) => {
    return String(index + 1).padStart(2, "0");
  };

  return (
    <section className="projects container">
      <div className="card-wrapper">
        <div className={`card-content ${isTransitioning ? "transitioning" : ""}`}>
          <div className="details">
            <p className="numeration">{formatId(currentIndex, projectsWithSkills.length)}</p>
            <h2>{currentProject.name}</h2>
            <p>{currentProject.description}</p>
            <div className="techs">
              <ul>
                {currentProject.techs.map((tech, techIndex) => (
                  tech && (
                    <li key={techIndex} style={{ color: "#ffffff" }}>
                      {tech.icon && iconMap[tech.icon] &&
                        React.createElement(iconMap[tech.icon], { size: 20, color: tech.color })}
                      <span style={{ marginLeft: "8px" }}>{tech.name}</span>
                    </li>
                  )
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
                <button disabled={isTransitioning}>
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
                <button disabled={isTransitioning}>
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
                <button disabled={isTransitioning}>
                  <MdDesignServices />
                  {t("projects.design")}
                </button>
              </a>
            )}
            {!currentProject.urls.code &&
              !currentProject.urls.view &&
              !currentProject.urls.design && (
                <p className="in-develop"><GiGearHammer size={40}/>{t("projects.in-develop")}</p>
              )}
          </div>
        </div>
        <div className="card-image">
          <img 
            src={currentProject.img} 
            alt={currentProject.name}
            className={`${isTransitioning ? "transitioning" : ""} ${isImageHovered ? "hovered" : ""} ${currentProject.urls.view ? "clickable" : ""}`}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            onClick={handleImageClick}
          />
          <div className="indicators">
            {projectsWithSkills.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => handleIndicatorClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="navigation">
        <button onClick={handlePrevious} disabled={isTransitioning}>{"<"}</button>
        <button onClick={handleNext} disabled={isTransitioning}>{">"}</button>
      </div>
    </section>
  );
};

export default Projects;
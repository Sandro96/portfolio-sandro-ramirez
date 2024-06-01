import React, { useState, useEffect } from 'react';
import './Skills.css';
import { useTranslation } from 'react-i18next';
import skillsData from '../../assets/data/skills.json';

const Skills = () => {
  const { t } = useTranslation('global');
  const [skills, setSkills] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const opacityInit = 0.1; // Opacidad inicial
  const opacityHover = 0.4; // Opacidad al pasar el mouse

  // Función para mezclar (shuffle) un array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const shuffledSkills = shuffleArray(skillsData);
    setSkills(shuffledSkills);
  }, []);

  return (
    <div className='skills container'>
      <h3>{t('navbar.skills')}</h3>
      <div className='content'>
        {skills.map((skill) => (
          <div className='row' key={skill.id}>
            <div
              className='card-wrapper'
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className='card'
                style={{
                  backgroundColor: `${skill.color}${Math.round(opacityInit * 255).toString(16)}`,
                  transition: 'background-color 0.3s, border-color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${skill.color}${Math.round(opacityHover * 255).toString(16)}`;
                  e.currentTarget.style.border = `2px solid ${skill.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${skill.color}${Math.round(opacityInit * 255).toString(16)}`;
                  e.currentTarget.style.border = '2px solid transparent';
                }}
              >
                <img className='image' src={skill.icon} alt={skill.name} />
                {hoveredSkill === skill.name && (
                  <div className='tooltip' style={{ borderColor: skill.color, color: skill.color }}>
                    {skill.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

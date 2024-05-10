import React from 'react';
import './About.css';
import { useTranslation } from 'react-i18next';
import photo from '../../assets/img/photo02.png';
import gamesIcon from '../../assets/img/games01.png';
import musicIcon from '../../assets/img/music01.png';
import moviesIcon from '../../assets/img/movies01.png';
import sportsIcon from '../../assets/img/sports01.png';

const About = () => {
    const { t } = useTranslation('global');

    const hobbies = [
        { name: 'Games', imgSrc: gamesIcon },
        { name: 'Music', imgSrc: musicIcon },
        { name: 'Movies', imgSrc: moviesIcon },
        { name: 'Sports', imgSrc: sportsIcon }
    ];

    const [hoveredHobby, setHoveredHobby] = React.useState(null);

    return (
        <div className='about bg-color' id='about'>
            <div className='container'>
                <div className='photo-side'>
                    <img src={photo} alt="Sandro Ramirez" />
                </div>
                <aside className='text-side'>
                    <p className='about-me'>
                        {t("about.me01")}
                        <span className='text-color'>Sandro Ramirez</span>
                        {t("about.me02")} <br />
                        {t("about.me03")}
                    </p>
                    <div className='personal-info'>
                        <h4>{t("about.personal-info")}</h4>
                        <div className='data'>
                            <div className='item'>
                                <span className='text-color'>{t("about.birthday")}</span><span>1  Feb  1996</span>
                            </div>
                            <div className='item'>
                                <span className='text-color'>{t("about.phone")}</span><span>(+598) 094 095 078</span>
                            </div>
                            <div className='item'>
                                <span className='text-color'>{t("about.email")}</span><span>ramirezsandro96@gmail.com</span>
                            </div>
                            <div className='item'>
                                <span className='text-color'>{t("about.location")}</span><span>Montevideo, Uruguay</span>
                            </div>
                        </div>
                    </div>
                    <div className='hobbies'>
                        <h4>Hobbies</h4>
                        <div className='personal-cards'>
                            {hobbies.map((hobby, index) => (
                                <div
                                    key={index}
                                    className='item'
                                    onMouseEnter={() => setHoveredHobby(hobby.name)}
                                    onMouseLeave={() => setHoveredHobby(null)}
                                >
                                    <img src={hobby.imgSrc} alt={hobby.name} />
                                    {hoveredHobby === hobby.name && <div className="tooltip">{t(`about.${hobby.name.toLowerCase()}`)}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default About;

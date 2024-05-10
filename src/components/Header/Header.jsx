import React from 'react';
import './Header.css';
import { useTranslation } from 'react-i18next';
import linkedInIcon from '../../assets/svg/linkedIn01.svg';
import githubIcon from '../../assets/svg/github01.svg';
import behanceIcon from '../../assets/svg/behance01.svg';
import whatsappIcon from '../../assets/svg/wpp01.svg';

const Header = () => {
    const { t, i18n } = useTranslation('global');
    const language = i18n.language;

    const cvFilename = language === 'en' ? 'cv-sandro-ramirez-en.pdf' : 'cv-sandro-ramirez-es.pdf';
    const cvLink = `/pdf/${cvFilename}`;

    return (
        <header className='header container' id='home'>
            <h1 className='title text-color'>{t('header.title')}</h1>
            <h1 className='name unicase'>Sandro Ramirez</h1>
            <div className='social-media'>
                <a className='icon' href='https://www.linkedin.com/in/sandro-ramirez/' target='_blank' rel='noopener noreferrer'>
                    <img src={linkedInIcon} alt='LinkedIn' />
                </a>
                <a className='icon' href='https://github.com/Sandro96' target='_blank' rel='noopener noreferrer'>
                    <img src={githubIcon} alt='Github' />
                </a>
                <a className='icon' href='https://www.behance.net/sandroramirez14' target='_blank' rel='noopener noreferrer'>
                    <img src={behanceIcon} alt='Behance' />
                </a>
                <a className='icon' href='https://wa.me/598094095078' target='_blank' rel='noopener noreferrer'>
                    <img src={whatsappIcon} alt='WhatsApp' />
                </a>
            </div>
            <a href={cvLink} download={`CV_Sandro_Ramirez_${language.toUpperCase()}.pdf`}>
                <button className='download-button'>{t('header.download')}</button>
            </a>
        </header>
    );
};

export default Header;
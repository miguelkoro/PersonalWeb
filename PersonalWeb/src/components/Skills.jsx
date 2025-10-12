import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';
import SkillSection from './SkillSection.jsx';
import Carousel from './Carousel.jsx';

const Skills = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('skills');
    }, []);
    
    return (
        <div>
            <div id="skills" style={{ padding: '4rem 0', textAlign: 'center', paddingBottom: '6rem' }}>
                <h2 className="skills-title" style={{textAlign: 'center'}}>{t('i.skills')}</h2>
                <Carousel/>
                <div className='card-skills-wrapper' >
                    <SkillSection t={t} />
                    <SkillSection t={t} />
                    <SkillSection t={t} />
                    <SkillSection t={t} />
                    <SkillSection t={t} />
                </div>
            </div>
        </div>
    );
}
export default Skills;

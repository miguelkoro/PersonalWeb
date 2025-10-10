import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';

const Skills = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('skills');
    }, []);
    
    return (
        <div>
            <h1>{t('i.skills')}</h1>
            <p>{t('i.skillsText')}</p>
        </div>
    );
}
export default Skills;

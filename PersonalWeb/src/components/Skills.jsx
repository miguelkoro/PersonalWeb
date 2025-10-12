import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';
import SkillSection from './SkillSection.jsx';
import CardCarousel from './CardCarousel.jsx';
import Carousel from './Carousel.jsx';

const Skills = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('skills');
    }, []);

    const cardsArray = [
        <CardCarousel key={1} title="JavaScript" imageSrc="/JS-Logo.png" />,
        <CardCarousel key={2} title="React" imageSrc="/React-Logo.png" />,
        <CardCarousel key={3} title="Node.js" imageSrc="/NodeJS-Logo.png" />,
        <CardCarousel key={4} title="HTML5" imageSrc="/HTML-Logo.png" />,
        <CardCarousel key={5} title="CSS3" imageSrc="/CSS-Logo.png"  />,
        <CardCarousel key={6} title="Git" imageSrc="/Git-Logo.png" />,
        <CardCarousel key={7} title="Docker" imageSrc="/Docker-Logo.png" />,
        <CardCarousel key={8} title="Python" imageSrc="/Python-Logo.png" />,
        <CardCarousel key={9} title="MySQL" imageSrc="/mySQL-Logo.png" />,
        <CardCarousel key={10} title="JSON" imageSrc="/JSON-Logo.png" />,
        <CardCarousel key={11} title="C#" imageSrc="/CSharp-Logo.png" />,
        <CardCarousel key={12} title="Java" imageSrc="/Java-Logo.png" />,
    ]
    
    return (
        <div>
            <div id="skills" style={{  textAlign: 'center', paddingTop: '1rem' }}>
                <h2 className="skills-title" style={{textAlign: 'center'}}>{t('i.skills')}</h2>
                <div style={{marginLeft:"2rem"}}><Carousel cards={cardsArray} /></div>
                <div className='card-skills-wrapper' >
                    <SkillSection title={t('i.skillDev')} description={t('i.skillDevText')} svg="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" />
                    <SkillSection title={t('i.skillSysAdmin')} description={t('i.skillSysAdminText')} svg="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Zm-80 160h160q17 0 28.5-11.5T600-360v-120q0-17-11.5-28.5T560-520v-40q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560v40q-17 0-28.5 11.5T360-480v120q0 17 11.5 28.5T400-320Zm40-200v-40q0-17 11.5-28.5T480-600q17 0 28.5 11.5T520-560v40h-80Z" />
                    <SkillSection title={t('i.skillDB')} description={t('i.skillDBText')} svg="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z" />
                    <SkillSection title={t('i.skillTools')} description={t('i.skillToolsText')} svg="M120-272q0-16 10.5-27t25.5-11q8 0 15.5 2.5T186-300q13 8 26 14t28 6q33 0 56.5-23.5T320-360q0-33-23.5-56.5T240-440q-15 0-29 5t-25 15q-6 5-14 7.5t-16 2.5q-15 0-25.5-11T120-448v-152q0-17 11.5-28.5T160-640h150q-5-15-7.5-30t-2.5-30q0-75 52.5-127.5T480-880q75 0 127.5 52.5T660-700q0 15-2.5 30t-7.5 30h150q17 0 28.5 11.5T840-600v152q0 17-11.5 28.5T800-408q-8 0-14-3.5t-12-8.5q-11-10-25-15t-29-5q-33 0-56.5 23.5T640-360q0 33 23.5 56.5T720-280q15 0 29-5t25-15q5-5 11.5-8.5T800-312q17 0 28.5 11.5T840-272v152q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-152Zm80 112h560v-46q-10 3-19.5 4.5T720-200q-66 0-113-47t-47-113q0-66 47-113t113-47q11 0 20.5 1.5T760-514v-46H578q-17 0-28.5-11T538-598q0-8 2.5-16.5T550-628q17-12 23.5-31.5T580-700q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 21 6.5 40.5T410-628q7 5 9.5 12.5T422-600q0 17-11.5 28.5T382-560H200v46q10-3 19.5-4.5T240-520q66 0 113 47t47 113q0 66-47 113t-113 47q-11 0-20.5-1.5T200-206v46Zm280-320Z" />
                    <SkillSection title={t('i.skillFrameworks')} description={t('i.skillsFrameworksText')} svg="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
                </div>
            </div>
        </div>
    );
}
export default Skills;

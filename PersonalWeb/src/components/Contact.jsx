import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';

const Contact = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('contact');
    }, []);
    
    return (
        <div>
            <h1>{t('i.contact')}</h1>
            <p>{t('i.contactText')}</p>
        </div>
    );
}
export default Contact;

import { createContext, useEffect, useState } from 'react';
import * as dataService from '../vendors/DataService';
import { LOCALES } from '../locales/i18n';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [language, setLanguage] = useState('es');
    const [screen, setScreen] = useState('home'); 
    
    // Función para obtener texto traducido
    const t = (key) => {
        return LOCALES[language]?.[key] || key;
    };

    return (
        <DataContext.Provider value={{ 
            language, 
            setLanguage,
            t, // Función de traducción
            LOCALES, 
            screen, setScreen
        }}>
        {children}
        </DataContext.Provider>
  );
}
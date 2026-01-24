import { createContext, useEffect, useState } from 'react';
import * as dataService from '../vendors/DataService';
import { LOCALES } from '../locales/i18n';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [language, setLanguage] = useState('es');
    const [screen, setScreen] = useState('home'); 
    
    // Función para obtener texto traducido
    const t = (key) => {
        const value = LOCALES[language]?.[key] || key;

        if (typeof value !== 'string') return value;

        // Allow simple line breaks in translations without embedding HTML
        // Usage in locale strings: "... /br ..." (or "/br" without spaces)
        return value.replaceAll(/\s*\/br\s*/g, '\n');
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
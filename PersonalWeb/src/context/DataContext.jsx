import { createContext, useEffect, useState } from 'react';
import * as dataService from '../vendors/DataService';
import { LOCALES } from '../locales/i18n';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {

    const [language, setLanguage] = useState('es');
    
    // Función para obtener texto traducido
    const t = (key) => {
        return LOCALES[language]?.[key] || key;
    };

    return (
        <DataContext.Provider value={{ 
            language, 
            setLanguage,
            t, // Función de traducción
            LOCALES, // Por si necesitas acceso directo
        }}>
        {children}
        </DataContext.Provider>
  );
}
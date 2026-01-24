import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';
const Footer = () => {
    const { t, setScreen } = useContext(DataContext);   
    return (
        <footer>
            {/*<p>&copy; 2024 My Website</p>*/}
              <p>
                {t('i.footerCredits')}
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>: 
                <a href="https://sketchfab.com/3d-models/windows-95-ibm-computer-software-8-24-95-2e8ca3d5daad413ba27e54f2f7bd2b96" target="_blank">
                “Windows 95 (IBM Computer Software)”</a> by Windows Xp Pc
            </p>
        </footer>
    );
}

export default Footer;
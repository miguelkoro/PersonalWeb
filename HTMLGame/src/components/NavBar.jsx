import "../styles/index.scss";
import { useState } from 'react';

const NavBar = () => {

  const [manageMenuOpen, setManageMenuOpen] = useState(false); // Estado para el menú de gestión
  
  const handleManageMouseEnter = () => setManageMenuOpen(true);
  const handleManageMouseLeave = () => setManageMenuOpen(false);

  return (
    <>
    <nav className="navbar">
      <div className="navbar-manage"
          onMouseEnter={handleManageMouseEnter}
          onMouseLeave={handleManageMouseLeave}>
        <span className="manage-title">Gestión</span>
        {manageMenuOpen && (<div className="dropdown-menu-manage">
            <li>Perks</li>
            <li>Quests</li>
        </div>)}
      </div>
    </nav>
    </>
  );
};
export default NavBar;
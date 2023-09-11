import React, { useState } from 'react';
import '../styles/styleSidebar.css'; // Crea un archivo Sidebar.css para tus estilos personalizados

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div id="wrapper" className={isClosed ? 'toggled' : ''}>
      <div className="overlay"></div>
      <nav className="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
        <ul className="nav sidebar-nav">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <a href="#">Brand</a>
            </div>
          </div>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          {/* Agrega el resto de elementos del menú aquí */}
        </ul>
      </nav>
      <div id="page-content-wrapper">
        <button type="button" className="hamburger animated fadeInLeft" onClick={toggleSidebar} data-toggle="offcanvas">
          <span className="hamb-top"></span>
          <span className="hamb-middle"></span>
          <span className="hamb-bottom"></span>
        </button>
        <div className="container">
          {/* Contenido de la página */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

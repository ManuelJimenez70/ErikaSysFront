import React, { useState } from 'react';
import Sidebar from '../Components/SideBar3';
import ProductList from '../Components/ProductList';
import Reports from '../Components/Reports';
import "../styles/homeAdmin.css";
import Venta from '../Components/Venta';

function HomeAdmin() {
    const [currentContent, setCurrentContent] = useState(null);
    const [isSideBarOpen, setIsOpen] = useState(null);

    // Función para cambiar el contenido principal en función del botón seleccionado
    const handleSidebarItemClick = (content) => {
        setCurrentContent(content);
    };

    const alterSideBar = (open) => {
        setIsOpen(open);
    }

    return (
        <div className='app-container'>
            {/* Renderiza el Sidebar2 */}
            <Sidebar onSidebarItemClick={handleSidebarItemClick} sideBarOpen = { alterSideBar } />

            {/* Renderiza el contenido principal */}
            <div className={`content ${isSideBarOpen ? 'content-open' : ''}`}>
                {/* Renderiza el componente correspondiente en función de currentContent */}
                {currentContent === "Productos" && <ProductList />}
                {currentContent === "Reportes" && <Reports />}
                {currentContent === "Venta" && <Venta />}
            </div>
        </div>
    );
}

export default HomeAdmin;

import React, { useState } from 'react';
import Sidebar from '../Components/SideBar3';
import ProductList from '../Components/ProductList';
import TabsComponent from '../Components/TabsComponent';
import Venta from '../Components/Venta';
import "../styles/homeAdmin.css";



function HomeAdmin() {
    const [currentContent, setCurrentContent] = useState("Productos");
    const [isSideBarOpen, setIsOpen] = useState(true);


    // Función para cambiar el contenido principal en función del botón seleccionado
    const handleSidebarItemClick = (content) => {
        setCurrentContent(content);
    };

    const alterSideBar = () => {
        setIsOpen(!isSideBarOpen);
    }

    return (
        <div className='app-container'>
            {/* Renderiza el Sidebar2 */}
            <Sidebar onSidebarItemClick={handleSidebarItemClick} sideBarOpen = { alterSideBar } />

            {/* Renderiza el contenido principal */}
            <div className={`content ${isSideBarOpen ? 'content-open' : ''}`}>
                {/* Renderiza el componente correspondiente en función de currentContent */}
                {currentContent === "Productos" && <ProductList isOpenSideBar={isSideBarOpen}/>}
                {currentContent === "Reportes" && <TabsComponent />}

                {currentContent === "Venta" && <Venta />}
            </div>
        </div>
    );
}

export default HomeAdmin;

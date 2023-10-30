import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/SideBar3';
import ProductList from '../Components/ProductList';
import TabsComponent from '../Components/TabsComponent';
import Venta from '../Components/Venta';
import EmployeesList from '../Components/EmployeesList';
import "../styles/homeAdmin.css";
import Snack from '../Components/Snack';

import { Card2 } from '../Components/Card2';


function HomeAdmin() {
    const [currentContent, setCurrentContent] = useState("Productos");
    const [isSideBarOpen, setIsOpen] = useState(true);
    const [messageSnack, setMessageSnack] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // Función para cambiar el contenido principal en función del botón seleccionado
    const handleSidebarItemClick = (content) => {
        setCurrentContent(content);
    };

    const alterSideBar = () => {
        setIsOpen(!isSideBarOpen);
    }

    const updateMessage = (message, success) => {
        setMessageSnack(message);
        setIsSuccess(success);
    }

    useEffect(() => {
        if (messageSnack !== '') {
            const timer = setTimeout(() => {
                setMessageSnack('');
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [messageSnack]);

    return (
        <div className='app-container'>
            {/* Renderiza el Sidebar2 */}
            <Sidebar onSidebarItemClick={handleSidebarItemClick} sideBarOpen={alterSideBar} />

            {/* Renderiza el contenido principal */}
            <div className={`content ${isSideBarOpen ? 'content-open' : ''}`}>
                {/* Renderiza el componente correspondiente en función de currentContent */}
                {currentContent === "Productos" && <ProductList isOpenSideBar={isSideBarOpen} updateMessage={ updateMessage }/>}
                {currentContent === "Reportes" && <TabsComponent />}
                {currentContent === "Venta" && <Venta />}
                {currentContent === "Empleados" && <EmployeesList isOpenSideBar={isSideBarOpen} updateMessage={ updateMessage }/>}
            </div>

            { messageSnack &&
                <Snack success={ isSuccess} message={ messageSnack } show={ messageSnack ? true : false}></Snack>
            }
        </div>
    );
}

export default HomeAdmin;

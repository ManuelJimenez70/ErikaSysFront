import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faUsers,
    faCogs,
    faChartBar
} from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.svg";
import "../styles/sideBar2.css";

const navItems = [
    { name: "Productos", icon: faShoppingCart },
    { name: "Empleados", icon: faUsers },
    { name: "Servicios", icon: faCogs },
    { name: "Reportes", icon: faChartBar },
];

export const SideBar2 = ({ onSidebarItemClick, sideBarOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        sideBarOpen(!isOpen);
        setIsOpen(!isOpen);
    };

    const handleSidebarItemClick = (content) => {
        onSidebarItemClick(content); // Llama a la función proporcionada por HomeAdmin
    };

    return (
        <nav className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-inner">
                <header className="sidebar-header">
                    <button
                        type="button"
                        className="sidebar-burger"
                        onClick={toggleSidebar}
                    >
                        <span className="material-symbols-outlined">
                            {isOpen ? "close" : "menu"}
                        </span>
                    </button>
                    <img  className="sidebar-logo" alt="Logo" />
                </header>
                <nav className="sidebar-menu">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            type="button"
                            className="sidebar-button"
                            onClick={() => handleSidebarItemClick(item.name)} 
                        >
                            <span className="material-symbols-outlined">
                                <FontAwesomeIcon icon={item.icon} />
                            </span>
                            <p>{isOpen ? item.name : ""}</p>
                        </button>
                    ))}
                </nav>
            </div>
        </nav>
    );
};

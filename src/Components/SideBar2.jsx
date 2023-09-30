import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faUsers,
    faCogs,
    faChartBar,
    faArrowLeft,
    faChevronUp,
    faChevronDown,
    faCubes
} from "@fortawesome/free-solid-svg-icons";
import "../styles/sideBar2.css";

export const SideBar2 = ({ onSidebarItemClick, sideBarOpen }) => {

    const [isOpenProductos, setIsOpenProductos] = useState(false);
    const [isOpenEmployees, setIsOpenEmployees] = useState(false);
    const [isOpenServices, setIsOpenServices] = useState(false);
    const [isOpenReports, setIsOpenReports] = useState(false);

    const handleSidebarItemClick = (buttonName) => {
        if (buttonName === 'Productos') {
            setIsOpenProductos(!isOpenProductos);
        } else if (buttonName === 'Empleados') {
            setIsOpenEmployees(!isOpenEmployees);
        } else if (buttonName === 'Servicios') {
            setIsOpenServices(!isOpenServices);
        } else if (buttonName === 'Reportes') {
            setIsOpenReports(!isOpenReports);
            changePage("Reportes");
        }
    };

    const changePage = (pageName) => {
        onSidebarItemClick(pageName);
    }

    const navItems = [
        { name: "Productos", icon: faShoppingCart },
        { name: "Empleados", icon: faUsers },
        { name: "Servicios", icon: faCogs },
        { name: "Reportes", icon: faChartBar },
    ];


    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        sideBarOpen(!isOpen);
        setIsOpen(!isOpen);
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
                    <img className="sidebar-logo" alt="" />
                </header>
                <nav className="sidebar-menu">
                    <div>
                        {/* Botón de Productos */}
                        <button
                            key={"Productos"}
                            type="button"
                            className={`sidebar-button ${isOpenProductos ? "clicked" : ""}`}
                            onClick={() => handleSidebarItemClick('Productos')}
                        >
                            <span className={`material-symbols-outlined iconDropDown ${isOpenProductos ? "clicked" : ""}`} >
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </span>

                            <p>Productos</p>

                            <span className={`material-symbols-outlined iconDropDown ${isOpenProductos ? "clicked" : ""}`} >
                                {isOpenProductos ? (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </span>
                        </button>

                        {/* Lista de elementos de Productos */}
                        {isOpenProductos && (
                            <div className="dropdown-container">
                                <button
                                    key={"Productos"}
                                    type="button"
                                    className="sidebar-button"
                                    onClick={() => changePage("Productos")}
                                >
                                    <span className="material-symbols-outlined">
                                        <FontAwesomeIcon icon={faCubes} />
                                    </span>
                                    <p>{isOpen ? "Gestionar" : ""}</p>
                                </button>
                            </div>
                        )}

                        {/* Botón de Empleados */}
                        <button
                            key={"Empleados"}
                            type="button"
                            className={`sidebar-button ${isOpenEmployees ? "clicked" : ""}`}
                            onClick={() => handleSidebarItemClick('Empleados')}
                        >
                            <span className="material-symbols-outlined">
                                <FontAwesomeIcon icon={faUsers} />
                            </span>

                            <p>Empleados</p>

                            <span className="material-symbols-outlined iconDropDown">
                                {isOpenEmployees ? (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </span>

                        </button>

                        {/* Lista de elementos del Otro Botón */}
                        {isOpenEmployees && (
                            <div className="dropdown-container">
                                <a href="#">Elemento 1</a>
                                <a href="#">Elemento 2</a>
                                <a href="#">Elemento 3</a>
                            </div>
                        )}

                        {/* Botón de Servicios */}
                        <button
                            key={"Servicios"}
                            type="button"
                            className={`sidebar-button ${isOpenServices ? "clicked" : ""}`}
                            onClick={() => handleSidebarItemClick('Servicios')}
                        >
                            <span className="material-symbols-outlined">
                                <FontAwesomeIcon icon={faCogs} />
                            </span>

                            <p>Servicios</p>

                            <span className="material-symbols-outlined iconDropDown">
                                {isOpenServices ? (
                                    <FontAwesomeIcon icon={faChevronUp} />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronDown} />
                                )}
                            </span>

                        </button>

                        {/* Lista de elementos de Servicios */}
                        {isOpenServices && (
                            <div className="dropdown-container">
                                <a href="#">Elemento 1</a>
                                <a href="#">Elemento 2</a>
                                <a href="#">Elemento 3</a>
                            </div>
                        )}

                        {/* Botón de Reportes */}
                        <button
                            key={"Reportes"}
                            type="button"
                            className={`sidebar-button ${isOpenReports ? "clicked" : ""}`}
                            onClick={() => handleSidebarItemClick('Reportes')}
                        >
                            <span className="material-symbols-outlined">
                                <FontAwesomeIcon icon={faChartBar} />
                            </span>

                            <p>Reportes</p>

                        </button>

                        {/* Lista de elementos de Servicios */}
                        {isOpenReports && (
                            <div className="dropdown-container">
                                { /* Más botones para mostrar */}
                            </div>
                        )}
                    </div>

                    <button
                        key={"salir"}
                        type="button"
                        className="sidebar-button"
                        onClick={() => window.location.href = "/"}
                    >
                        <span className="material-symbols-outlined">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </span>
                        <p>{isOpen ? "Salir" : ""}</p>
                    </button>
                </nav>
            </div>
        </nav>
    );
};

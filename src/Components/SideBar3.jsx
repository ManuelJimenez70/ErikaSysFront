import React, { useState, useEffect  } from 'react';
import '../styles/sideBar3.css'; // Asegúrate de ajustar la ruta correcta a tu archivo CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../Components/AuthContext'; 
import {
    faShoppingCart,
    faUsers,
    faChartBar,
    faArrowLeft,
    faChevronUp,
    faChevronDown,
    faPenToSquare,
    faUserPen,
    faChevronLeft,
    faChevronRight,
    faHotel,
    faSwimmingPool,
    faBellConcierge,
    faBed,
    faDollar
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../images/Logo2.jpg";

export const Sidebar = ({ onSidebarItemClick, sideBarOpen }) => {

    const [userName, setUserName] = useState('');
    const { userId } = useAuth();
    const [isOpenProductos, setIsOpenProductos] = useState(false);
    const [isOpenEmployees, setIsOpenEmployees] = useState(false);
    const [isOpenServices, setIsOpenServices] = useState(false);
    const [isOpenReports, setIsOpenReports] = useState(false);
    const [isOpenPool, setIsOpenPool] = useState(false);
    const [isOpenReceipt, setIsOpenReceipt] = useState(false);
    const [isOpenRooms, setIsOpenRooms] = useState(false);
    const [isOpenGestionProducts, setIsOpenGestionProducts] = useState(false);
    const [isOpenGestionEmpleados, setIsOpenGestionEmpleados] = useState(false);
    const [isOpenVenta , setIsOpenVenta] = useState(false);

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
        } else if (buttonName === 'GesP') {
            setIsOpenGestionProducts(!isOpenGestionProducts);
            changePage("Productos");
        } else if (buttonName === 'Pool') {
            setIsOpenPool(!isOpenPool);
            changePage("Pool");
        } else if (buttonName === 'Receipt') {
            setIsOpenReceipt(!isOpenReceipt);
            changePage("Bookin");
        } else if (buttonName === 'Rooms') {
            setIsOpenRooms(!isOpenRooms);
            changePage("Rooms");
        } else if (buttonName === 'GesE') {
            setIsOpenGestionEmpleados(!isOpenGestionEmpleados);
            changePage("Empleados");
        } else if (buttonName === 'VentP'){
            setIsOpenVenta(!isOpenVenta);
            changePage("Venta")
            
        }
    };

    const changePage = (pageName) => {
        onSidebarItemClick(pageName);
    }

    useEffect(() => {
        if (userId) {
          // Realiza la solicitud a la API usando el userId
          const fetchUserInfo = async () => {
            try {
              const response = await fetch(`http://www.erikasys.somee.com/api/User/getUserById/${userId}`);
              const userData = await response.json();
    
              if (userData.state === 'SUCCESS') {
                const { name } = userData.data;
                setUserName(name.value); // Actualiza el estado con el nombre del usuario
              }
            } catch (error) {
              console.error('Error al obtener la información del usuario:', error);
            }
          };
    
          fetchUserInfo(); // Llama a la función para obtener la información del usuario
        }
      }, [userId]);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        sideBarOpen(!isCollapsed);
    };

    return (
        <div className={`body ${isCollapsed ? "collapsed" : ""}`}>
            <nav className='navBar'>
                <div className="sidebar-top">
                    <span className="expand-btn" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
                    </span>
                    <img
                        src={Logo}
                        className="logo"
                    ></img>
                    <h3 className="hide">{userName}</h3> {/* Muestra el nombre del usuario */}
                </div>
                <div className="sidebar-links">
                    <ul>
                        <li>
                            <button
                                type="button"
                                className={`${isOpenProductos ? "active" : ""}`}
                                onClick={() => handleSidebarItemClick('Productos')}
                            >
                                <div className="icon">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </div>
                                <span className="link hide">Productos</span>

                                <span className={`material-symbols-outlined iconDropDown hide`} >
                                    {isOpenProductos ? (
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    ) : (
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    )}
                                </span>
                            </button>

                            {/* Lista de elementos de Productos */}
                            {isOpenProductos && (
                                <div className={`dropdown-container ${isCollapsed ? "menuCol" : ""}`}>
                                    <button
                                        type="button"
                                        className={`subMenu ${isOpenGestionProducts ? "activeSub" : ""}`}
                                        onClick={() => handleSidebarItemClick("GesP")}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </div>
                                        <span className="link hide">Gestionar</span>
                                    </button>

                                    <button
                                        type="button"
                                        className={`subMenu ${isOpenGestionProducts ? "activeSub" : ""}`}
                                        onClick={() => handleSidebarItemClick("VentP")}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faDollar} />
                                        </div>
                                        <span className="link hide">Venta</span>
                                    </button>

                                </div>
                            )}

                            {/* Botón de Empleados */}

                            <button
                                type="button"
                                className={`${isOpenEmployees ? "active" : ""}`}
                                onClick={() => handleSidebarItemClick('Empleados')}
                            >
                                <div className="icon">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <span className="link hide">Empleados</span>

                                <span className={`material-symbols-outlined iconDropDown hide`} >
                                    {isOpenEmployees ? (
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    ) : (
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    )}
                                </span>
                            </button>

                            {/* Lista de elementos de Empleados */}
                            {isOpenEmployees && (
                                <div className={`dropdown-container ${isCollapsed ? "menuCol" : ""}`}>
                                    <button href="#portfolio" className={`subMenu ${isOpenGestionEmpleados ? "activeSub" : ""}`}
                                        onClick={() => handleSidebarItemClick("GesE")}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faUserPen} />
                                        </div>
                                        <span className="link hide">Gestionar</span>
                                    </button>
                                </div>
                            )}

                            {/* Botón de Servicios */}

                            <button
                                type="button"
                                className={`${isOpenServices ? "active" : ""}`}
                                onClick={() => handleSidebarItemClick('Servicios')}
                            >
                                <div className="icon">
                                    <FontAwesomeIcon icon={faHotel} />
                                </div>
                                <span className="link hide">Servicios</span>

                                <span className={`material-symbols-outlined iconDropDown hide`} >
                                    {isOpenServices ? (
                                        <FontAwesomeIcon icon={faChevronUp} />
                                    ) : (
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    )}
                                </span>
                            </button>

                            {/* Lista de elementos de Servicios */}
                            {isOpenServices && (
                                <div className={`dropdown-container ${isCollapsed ? "menuCol" : ""}`}>
                                    <button className={`subMenu ${isOpenPool ? "activeSub" : ""}`}
                                        onClick={() => handleSidebarItemClick("Pool")}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faSwimmingPool} />
                                        </div>
                                        <span className="link hide">Piscina</span>
                                    </button>

                                    <button className={`subMenu ${isOpenReceipt ? "activeSub" : ""}`}
                                        onClick={() => handleSidebarItemClick("Receipt")}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faBellConcierge} />
                                        </div>
                                        <span className="link hide">Recepcion</span>
                                    </button>

                                    <button className={`subMenu ${isOpenRooms ? "activeSub" : ""}`}
                                        onClick={() => handleSidebarItemClick("Rooms")}
                                    >
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faBed} />
                                        </div>
                                        <span className="link hide">Habitaciones</span>
                                    </button>
                                </div>
                            )}

                            <button
                                type="button"
                                className={`${isOpenReports ? "active" : ""}`}
                                onClick={() => handleSidebarItemClick('Reportes')}
                            >
                                <div className="icon">
                                    <FontAwesomeIcon icon={faChartBar} />
                                </div>
                                <span className="link hide">Reportes</span>

                            </button>

                            {/* Lista de elementos de Servicios */}
                            {isOpenReports && (
                                <div className="dropdown-container">
                                    { /* Más botones para mostrar */}
                                </div>
                            )}

                            {/* Botón de Salir*/}
                            <div className='closedDiv'>
                                <button
                                    type="button"
                                    className={"closed"}
                                    onClick={() => window.location.href = "/"}
                                >
                                    <div className="icon">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </div>
                                    <span className="link hide">Salir</span>

                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;

import React from 'react';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import "../styles/style4.css";
import ProductList from '../pages/ProductList';

function Sidebar() {
    const [nameUser, setNameUser] = useState("Jorge Ayala");

    useEffect(() => {
        // Función que se ejecutará al montar el componente (equivalente a componentDidMount)
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });

        // Asegúrate de desvincular el evento al desmontar el componente (equivalente a componentWillUnmount)
        return () => {
            $('#sidebarCollapse').off('click');
        };
    }, []);
    return (
        <div className="wrapper">
            {/* Sidebar Holder */}
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>{nameUser.toUpperCase()}</h3>
                    <strong>{nameUser.toUpperCase().split(' ').map(nameUser => nameUser.charAt(0)).join('')}</strong>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
                            <i className="glyphicon glyphicon-home"></i>
                            Empleados
                        </a>
                        <ul className="collapse list-unstyled" id="homeSubmenu">
                            <li><a href="#">Home 1</a></li>
                            <li><a href="#">Home 2</a></li>
                            <li><a href="#">Home 3</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className="glyphicon glyphicon-briefcase"></i>
                            Productos
                        </a>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
                            <i className="glyphicon glyphicon-duplicate"></i>
                            Servicios
                        </a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li><a href="#">Page 1</a></li>
                            <li><a href="#">Page 2</a></li>
                            <li><a href="#">Page 3</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i className="glyphicon glyphicon-link"></i>
                            Reportes
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i class="glyphicon glyphicon-link"></i>
                            Cerrar Sesion
                        </a>
                    </li>
                    
                </ul>
                
            </nav>

            {/* Page Content Holder */}
            <div id="content">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                                <span>Muestrame</span>
                            </button>
                            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                                <span>Agregar</span>
                            </button>
                        </div>
                    </div>
                </nav>
                
                <ProductList></ProductList>
            </div>
        </div>
    );
}

export default Sidebar;

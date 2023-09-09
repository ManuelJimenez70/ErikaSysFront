import React, { useState } from 'react';
import "../styles/homeAdmin.css";
import empLog from "../images/employee.png";
import prodLog from "../images/caja.png";
import servLog from "../images/campanas.png";
import repLog from "../images/reporte.png";
import close from "../images/cerca.png"
import menu from "../images/menu.png"


function HomeAdmin() {

    const [showSideBar, setSideBar] = useState(false);

    const toggleShowSideBar = () => {
        setSideBar(!showSideBar);
    };

    return (
        <div className='genealContainer'>
            <div className='header'>
                <div className='divBTNMenu'>
                    <img
                        src={showSideBar ? menu : close}
                        onClick={toggleShowSideBar}
                    />
                </div>
                <div className='divAux'>
                    <h3>Usuario administrador</h3>
                    <img src={empLog}></img>
                </div>
            </div>
            <div className='aside'>
                <div className='divUserAd'>
                    <div className='divBClose'> <img src={close}></img></div>
                    <div className='divLog'>
                        <img src={empLog}></img>
                        <h3>Usuario administrador</h3>
                    </div>
                </div>

                <div className='divList'>
                    <ol>
                        <li>
                            <img src={empLog}></img>
                            <h3>Gestionar empleados</h3>

                        </li>
                        <li>
                            <img src={prodLog}></img>
                            <h3>Gestionar productos</h3>

                        </li>
                        <li>
                            <img src={servLog}></img>
                            <h3>Gestionar servicios</h3>

                        </li>
                        <li>
                            <img src={repLog}></img>
                            <h3>Generar reportes</h3>

                        </li>
                    </ol>
                </div>

                <div className='divButtonLO'></div>
            </div>
            <div className='body'></div>

        </div>
    );
}

export default HomeAdmin;
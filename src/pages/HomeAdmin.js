import React, { useState } from 'react';
import empLog from "../images/employee.png";
import { useNavigate } from 'react-router-dom';
import menu from "../images/menu.png";
import "../styles/homeAdmin.css";
import prodLog from "../images/caja.png";
import servLog from "../images/campanas.png";
import repLog from "../images/reporte.png";






function HomeAdmin() {

    const [showSideBar, setSideBar] = useState(false);
    const navigate = useNavigate();
    const handleModal = async () => {
        try {
          navigate('/homeAdmin');  
        } catch (error) {
          console.error('Error de autenticación:', error);
        }
      };

    return (
        <div>
            <div className='header'>
                <button class="btn btn btn-outline-primary border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    <img
                        src={menu}
                    />
                </button>
                <div className='divAux ph'>
                    <h3>Usuario administrador</h3>
                    <img src={empLog}></img>
                </div>
            </div>
            <div class="offcanvas offcanvas-start bg-primary-subtle aside" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">

                <div class="offcanvas-body d-flex aside">
                    <div className="z-0 p-2 w-100">

                            <div className='divUserAd'>
                                <div className='divLog'>
                                    <img src={empLog}></img>
                                    <h3>Usuario administrador</h3>
                                </div>
                            </div>

                            <div className='divList'>
                                <ol>
                                    <li class="pt-4 pb-2">
                                        <img src={empLog}></img>
                                        <h4>Gestionar empleados</h4>

                                    </li>
                                    <li class="pb-2">
                                        <img src={prodLog}></img>
                                        
                                        <h4>Gestionar productos</h4>

                                    </li>
                                    <li class="pb-2">
                                        <img src={servLog}></img>
                                        <h4>Gestionar servicios</h4>

                                    </li>
                                    <li class="pb-2">
                                        <img src={repLog}></img>
                                        <h4>Generar reportes</h4>

                                    </li>
                                </ol>
                            </div>

                    </div>
                    <a type="button" class="z-1 btn-close bn-sm" data-bs-dismiss="offcanvas" aria-label="Close"></a>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
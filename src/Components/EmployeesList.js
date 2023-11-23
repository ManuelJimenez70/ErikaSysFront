import React, { useState, useEffect } from 'react';
import "../styles/formModal.css";
import "../styles/productList.css";
import FormEmployee from './formEmployee';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faPlus,
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import CardEmployee from './CardEmployee';


function EmployeesList({ isOpenSideBar, updateMessage }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        updateList();
    }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

    const updateList = () => {
        axios.get('http://www.erikasys.somee.com/api/User/getUsersByRange?numI=0&numF=50&state=Activo')
            .then(response => {
                // Almacena los datos de productos en el estado
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Error al cargar los usuarios:', error);
            });
    }

    const [page, setPage] = useState(1);
    const cardsPerPage = 10;
    const totalPages = Math.ceil(products.length / cardsPerPage);

    // Calcula el rango de índices de las tarjetas que se mostrarán en la página actual.
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = products.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className='contentList'>
            <div className='searchPanel'>
                <nav className="navbar navbar-light bg-light container-centered">
                    <div className="container-fluid">
                        <button type="button" onClick={() => window.location.href = "#modal1"}>
                            <span>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                            Agregar
                        </button>
                        <div className="formContent">
                            <div className='searchBar'>
                                <input className="form-control me-2" type="search" placeholder="Nombre del usuario"></input>
                                <button type='button'>
                                    <span>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="card-container">
                <div className={`cardsContainer ${isOpenSideBar ? "collapsed" : ""}`}>
                    {cardsToShow.map(employee => (
                        <CardEmployee
                            key={employee.id_user}
                            idEmpleado={employee.id_user}
                            nombre={employee.name.value}
                            apellido={employee.lastName.value}
                            documento={employee.identification.value}
                            direccion={employee.direction.value}
                            rol={employee.rol_Users}
                            email={employee.email.value}
                            updateList={updateList}
                            updateMessage={updateMessage}
                        />
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={page === 1}>
                        <span>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </span>

                        Página anterior
                    </button>

                    <span>Página {page} de {totalPages}</span>

                    <button onClick={handleNextPage} disabled={page === totalPages}>
                        Página siguiente
                        <span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </button>
                </div>

            </div>

            <div id="modal1" className="modalmask">
                <div className="modalbox movedown">
                    <FormEmployee updateThisList={updateList} metod="create" updateMessage={updateMessage}></FormEmployee>
                </div>
            </div>
        </div>
    );
};

export default EmployeesList;


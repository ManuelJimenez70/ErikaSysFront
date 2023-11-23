import React, { useState } from 'react';
import axios from 'axios';
import "../styles/productList.css";
import FormRoom from './formRoom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faBucket
} from "@fortawesome/free-solid-svg-icons";


const CardRoom = ({ idRoom, numero, capacidadMaxima, precioPorNoche, estado, updateList, updateMessage }) => {

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        // Abre el pop-up de confirmación
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        // Confirma la eliminación y cierra el pop-up
        handleUpdateState();
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        // Cancela la eliminación y cierra el pop-up
        setShowConfirmation(false);
    };

    const handleUpdateState = async (e) => {
        try {

            const requestData = {
                id: idRoom,
                number: numero,
                max_capacity: capacidadMaxima,
                price_per_nigth: precioPorNoche,
                state: "Inactivo",
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Room/updateRoom/',
                requestData
            );

            console.log(response)

            if (response.data.state === 'SUCCESS') {
                updateList();
                updateMessage(response.data.message, true);
            } else {
                updateMessage(response.data.message, false)
            }
        } catch (error) {
            console.error('Error al agregar:', error);
        }
    };

    return (
        <div className='cardInfo'>
            <div className="our_solution_category">
                <div className="solution_cards_box">
                    <div className="our_solution_category">
                        <div className="solution_cards_box"></div>
                        <div className="solution_card">
                            <div className="hover_color_bubble"></div>
                            <div className="so_top_icon">
                                <svg
                                    id="Layer_1"
                                    height="50"
                                    viewBox="0 0 512 512"
                                    width="40"
                                    xmlns="https://www.sublimaco.com/wp-content/uploads/2020/07/Manillas-para-eventos-Tyvek-Dorado-sublimaco.jpg"
                                >
                                    <image
                                        x="0"  // Posición X de la imagen en el SVG
                                        y="0"  // Posición Y de la imagen en el SVG
                                        width="50"  // Ancho de la imagen
                                        height="50"  // Altura de la imagen
                                        xlinkHref="https://www.sublimaco.com/wp-content/uploads/2020/07/Manillas-para-eventos-Tyvek-Dorado-sublimaco.jpg"  // Ruta de la imagen que deseas agregar
                                    />
                                </svg>
                            </div>
                            <div className="solu_title">
                                <h3> {`Habitación ${numero}`} </h3>
                            </div>
                            <div className="solu_description">
                                <p>
                                    Id: {idRoom}
                                </p>
                                <p>
                                    Capacidad Máxima: {capacidadMaxima}
                                </p>
                                <p>
                                    Precio por noche: {precioPorNoche}
                                </p>
                                <p>
                                    Estado: {estado}
                                </p>

                                <div className="ButtonsDiv">
                                    <button onClick={() => window.location.href = "#modal" + idRoom}>
                                        <span>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </span>
                                        Editar
                                    </button>
                                    <button type="button" className="read_more_btn" onClick={handleDeleteClick}>
                                        <span>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                        Borrar
                                    </button>
                                </div>

                                {/* Pop-up de confirmación */}
                                {showConfirmation && (
                                    <div className="confirmation-popup">
                                        <p>¿Estás seguro de que deseas eliminar la habitación?</p>
                                        <button onClick={handleConfirmDelete}>Sí</button>
                                        <button onClick={handleCancelDelete}>Cancelar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id={`modal${idRoom}`} className="modalmask">
                <div className="modalbox movedown">
                    <FormRoom idRoom={idRoom} numero={numero} capacidadMaxima={capacidadMaxima} precioPorNoche={precioPorNoche} updateThisList={updateList} metod="update" updateMessage={updateMessage}></FormRoom>
                </div>
            </div>

        </div>
    );
}

export default CardRoom;
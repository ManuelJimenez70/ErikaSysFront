import React, { useState } from 'react';
import "../styles/card2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHashtag,
    faTag,
    faEdit,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import FormProduct from './formProduct';

export const Card2 = ({ idProduct, title, description, image, price, stock, updateList, updateMessage }) => {

    const [deleteError, setDeleteError] = useState('');
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
                id: idProduct,
                state: 'inactivo',
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/updateProduct/',
                requestData
            );

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                console.log(response.data.data)
                console.log(idProduct)
                updateList();

            } else {
                setDeleteError(response.data.data);
            }
        } catch (error) {
            setDeleteError('Error al agregar producto');
            console.error('Error al agregar:', deleteError);

        }
    };

    return (
        <div className="plan [ card ]">
            <div className="inner">
                <span className="pricing">
                    <span>
                        ${price} <small>/ u</small>
                    </span>
                </span>
                <h2 className="title">{title}</h2>
                <p className="info">{description}</p>
                <ul className="features">
                    <li>
                        <span className="icon">
                            <FontAwesomeIcon icon={faTag} />
                        </span>
                        <span><strong>ID: </strong>{idProduct}</span>
                    </li>
                    <li>
                        <span className="icon">
                            <FontAwesomeIcon icon={faHashtag} />
                        </span>
                        <span><strong>{stock}</strong> unidades</span>
                    </li>
                </ul>
                <div className="ButtonsDiv">
                    <button onClick={() => window.location.href = "#modal" + idProduct}>
                        <span>
                            <FontAwesomeIcon icon={faEdit} />
                        </span>
                    </button>
                    <button type="button" className="read_more_btn" onClick={handleDeleteClick}>
                        <span>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </button>
                </div>

                {/* Pop-up de confirmación */}
                {showConfirmation && (
                    <div className="confirmation-popup">
                        <p>¿Estás seguro de que deseas eliminar este producto?</p>
                        <button onClick={handleConfirmDelete}>Sí</button>
                        <button onClick={handleCancelDelete}>Cancelar</button>
                    </div>
                )}
            </div>

            <div id={`modal${idProduct}`} className="modalmask">
                <div className="modalbox movedown">
                    <FormProduct idProduct={idProduct} newTitle={title} newDescription={description} newPrice={price} newStock={stock} updateThisList={updateList} metod="update" updateMessage={updateMessage}></FormProduct>
                </div>
            </div>
        </div>
    );

}
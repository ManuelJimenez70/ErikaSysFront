import React, { useState } from 'react';
import axios from 'axios';
import "../styles/productList.css";
import FormProduct from './formProduct';

const CardProduct = ({ idProduct, title, description, image, price, stock, updateList }) => {

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
                window.location.href = "/homeAdmin";
                
            } else {
                setDeleteError(response.data.data);
            }
        } catch (error) {
            console.error('Error al agregar:', error);
            setDeleteError('Error al agregar producto');
        }
    };

    return (
        <div>
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
                                <h3> {title} </h3>
                            </div>
                            <div className="solu_description">
                                <p>
                                    Nombre: {title}
                                </p>
                                <p>
                                    Descripción: {description}
                                </p>
                                <p>
                                    Costo: {price}
                                </p>
                                <p>
                                    Stock: {stock}
                                </p>
                                <div className="ButtonsDiv">
                                    <button type="button" className="read_more_btn" onClick={() => window.location.href = "#modal" + idProduct}>
                                        Editar
                                    </button>
                                    <button type="button" className="read_more_btn" onClick={handleDeleteClick}>
                                        Borrar
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
                        </div>
                    </div>
                </div>
            </div>

            <div id={`modal${idProduct}`} className="modalmask">
                <div className="modalbox movedown">
<<<<<<< HEAD
                    <FormProduct idProduct = {idProduct} newTitle={title} newDescription={description} newPrice={price} newStock={stock} updateThisList= { updateList } metod = "update"></FormProduct>
=======
                    <FormProduct idProduct={idProduct} newTitle={title} newDescription={description} newPrice={price} newStock={stock} updateList={updateList} metod="update"></FormProduct>
>>>>>>> origin/Pagination
                </div>
            </div>

        </div>
    );
}

export default CardProduct;
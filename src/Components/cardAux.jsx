import React, { useState } from 'react';
import axios from 'axios';
import "../styles/productList.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const CardProduct = ({ idProduct, title, description, image, price, stock }) => {

    const [newTitle, setTitle] = useState('');
    const [newDescription, setDescripcion] = useState('');
    const [newImage, setImage] = useState('');
    const [newPrice, setPrice] = useState(0);
    const [newStock, setStock] = useState(0);
    const [loginError, setLoginError] = useState('');
    const [actionSuccess, setActionSuccess] = useState('');

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                idProduct: idProduct,
            };
            if (title) {
                requestData.title = newTitle;
            }
            if (description) {
                requestData.description = newDescription;
            }
            if (image) {
                requestData.image = newImage;
            }
            if (price) {
                requestData.price = newPrice;
            }
            if (stock) {
                requestData.stock = newStock;
            }

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/updateProduct/',
                requestData
            );

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                console.log(response.data.data)
                setActionSuccess('Producto correctamente agregado')
            } else {
                setLoginError(response.data.data);
            }
        } catch (error) {
            console.error('Error al agregar:', error);
            setLoginError('Error al agregar producto');
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
                                    Descripción: {description}
                                </p>
                                <p>
                                    Costo: {price}
                                </p>
                                <p>
                                    Stock: {stock}
                                </p>
                                <div className="ButtonsDiv">
                                    <button type="button" className="read_more_btn" onClick={() => window.location.href = "#modal1"}>
                                        Editar
                                    </button>
                                    <button type="button" className="read_more_btn">
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="modal1" className="modalmask">
                <div className="modalbox movedown">
                    <div className='body'>
                        
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CardProduct;
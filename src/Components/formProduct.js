import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import "../styles/formModal.css";
import axios from "axios";

const FormProduct = ({ idProduct, newTitle, newDescription, newPrice, newStock, updateList, metod }) => {

    const [title, setTitle] = useState('');
    const [description, setDescripcion] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [id, setId] = useState(idProduct);
    const [state, setState] = useState('');
    const [loginError, setLoginError] = useState('');
    const [actionSuccess, setActionSuccess] = useState('');


    const handleCreateProduct = async (e) => {
        window.location.href = "#";
        try {
            const requestData = {
                title: title,
                description: description,
                image: image,
                price: price,
                stock: stock
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/createProduct/',
                requestData
            );
            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {

                //Actualizar productos
                axios.get('http://www.erikasys.somee.com/api/Product/getProductsByRange?numI=0&numF=50')
                    .then(response => {
                        // Almacena los datos de productos en el estado
                        updateList(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error al cargar los productos:', error);
                    });

                console.log(response.data.message)
            } else {
                setLoginError(response.data.message);
            }
        } catch (error) {
            console.error('Error al agregar:', error);
            setLoginError('Error al agregar producto');
        }
    };

    const handleUpdateProduct = async (e) => {
        window.location.href = "#";
        e.preventDefault();
        try {
            const requestData = {
                idProduct:id,
              };
              if (title) {
                requestData.title = newTitle;
              }
              if (description) {
                requestData.description = newDescription;
              }
              if (image) {
                requestData.image = "";
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
                axios.get('http://www.erikasys.somee.com/api/Product/getProductsByRange?numI=0&numF=50')
                    .then(response => {
                        // Almacena los datos de productos en el estado
                        updateList(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error al cargar los productos:', error);
                    });
            } else {
                setLoginError(response.data.data);
            }
        } catch (error) {
            console.error('Error al agregar:', error);
            setLoginError('Error al agregar producto');
        }
    };

    const handleUpdateState = async (e) => {
        window.location.href = "#";
        e.preventDefault();
        try {
            const requestData = {
                id: id,
                state: state,
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/updateProduct/',
                requestData
            );

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                console.log(response.data.data)

                //Actualizamos la lista de datos
                axios.get('http://www.erikasys.somee.com/api/Product/getProductsByRange?numI=0&numF=50')
                    .then(response => {
                        // Almacena los datos de productos en el estado
                        updateList(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error al cargar los productos:', error);
                    });
            } else {
                setLoginError(response.data.data);
            }
        } catch (error) {
            console.error('Error al agregar:', error);
            setLoginError('Error al agregar producto');
        }
    };

    return (
        <div className="contentForm">
            <div className="imageContent">
                <img src=" "></img>
            </div>
            <div className="bodyContent">

                <div className="dataInput">
                    <div className="label">
                        <p>ID</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="ID del producto"
                            name="id" readOnly
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Nombre</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Nombre del producto"
                            name="nombre"
                            value={title ? title : newTitle}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Descripción</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Descripción del producto"
                            name="descripcion"
                            value={description ? description : newDescription}
                            onChange={(e) => setDescripcion(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Costo</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Costo del producto"
                            name="precio"
                            value={price ? price : newPrice}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Beneficios</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Beneficios del producto"
                            name="beneficios"
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Promociones</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Promociones del producto"
                            name="promociones"
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Stock</p>
                    </div>
                    <div className="input">
                        <input type="number" placeholder="Unidades disponibles"
                            value={stock ? stock : newStock}
                            onChange={(e) => setStock(e.target.value)}
                        ></input>
                    </div>
                </div>

            </div>
            <div className="footerContent">
                <button
                    type="button"
                    className="myButton"
                    onClick={metod === "create" ? handleCreateProduct : handleUpdateProduct}
                >
                    <span className="material-symbols-outlined">
                        <FontAwesomeIcon icon={faSave} />
                    </span>
                </button>

                <button
                    type="button"
                    className="myButton"
                    onClick={() => window.location.href = "#"}
                >
                    <span className="material-symbols-outlined">
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </button>
            </div>
        </div>
    );

}

export default FormProduct;
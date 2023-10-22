import React, { useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import "../styles/formModal.css";
import axios from "axios";
import Snack from './Snack';

const FormProduct = ({ idProduct, newTitle, newDescription, newPrice, newStock, updateThisList, metod }) => {

    const [title, setTitle] = useState(newTitle);
    const [description, setDescripcion] = useState(newDescription);
    const [image] = useState('hola');
    const [price, setPrice] = useState(newPrice);
    const [stock, setStock] = useState(newStock);
    const [id] = useState(idProduct);
    const [showSnack, setShowSnack] = useState(false);
    const [loginError, setLoginError] = useState('');


    const handleCreateProduct = async (e) => {
        window.location.href = "#";
        console.log("Creando el producto de nombre: " + title);
        try {

            const requestData = {
                id: id,
                title: title,
                description: description,
                image: image,
                price: price,
                stock: stock,
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/createProduct/',
                requestData
            );

            console.log("Respuesta: " + response.data.data)
            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                updateThisList();
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
        try {

            const requestData = {
                id: id,
                title: title,
                price: price,
                description: description,
                image: image,
                stock: stock,
                state: "Activo",
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/updateProduct/',
                requestData
            );

            console.log("Respuesta: " + requestData)

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                updateThisList();
                window.location.href = "#";
                console.log(response.data.message)

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
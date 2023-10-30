import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import "../styles/formModal.css";
import axios from "axios";
import { useAuth } from './AuthContext';
import {
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

const FormProduct = ({ idProduct, newTitle, newDescription, newPrice, newStock, updateThisList, metod, updateMessage }) => {

    const [title, setTitle] = useState(newTitle);
    const [description, setDescripcion] = useState(newDescription);
    const [image] = useState('hola');
    const [price, setPrice] = useState(newPrice);
    const [stock, setStock] = useState(newStock);
    const [id] = useState(idProduct);
    const [module, setModule] = useState("Restaurante");
    const [isOpenDrop, setOpenDrop] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [flag, setFlag] = useState(newStock);
    const { userId, setUserId } = useAuth();
    const [moduleId, setModuleId] = useState(null);

    const changeOpen = () => {
        setOpenDrop(!isOpenDrop);
    }

    const changeModule = (module) => {
        setModule(module);
        setOpenDrop(false);
    }

    const handleBuys = async (e) => {
        if (stock > flag && stock > 0 && flag > 0) {
            try {
                const response = await fetch(`http://www.ErikaSys.somee.com/api/Product/getProductById/${id}`);
                const data = await response.json()

                let newStock = stock - flag;

                const requestData = {
                    id_user: userId,
                    id_action: 5,
                    id_product: id,
                    id_module: data.data.id_module.value,
                    quantity: newStock,
                };
                if (data.data.id_module.value !== null) {
                    
                    try {
                        const response = await axios.post(
                            'http://www.ErikaSys.somee.com/api/Action/recordAction/',
                            requestData
                        );
                        console.log("chechirris",response)
                        if (response.data.data === 'SUCCESS') {
                            console.log("Bacano")
                            updateThisList();
                        } else {
                            setLoginError(response.data.message);
                        }
                    } catch (error) {
                        console.log(error)
                    }


                }

            } catch (error) {
                console.error('Error al agregar:', error);
                setLoginError('Error al agregar producto');
            }
        }
        handleUpdateProduct();
    }

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
                updateMessage(response.data.message, true);
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
        try {
            var requestData = {}
            if (stock < flag) {
                requestData = {
                    id: id,
                    title: title,
                    price: price,
                    description: description,
                    image: image,
                    state: "Activo",
                    stock: stock
                };
            } else {
                requestData = {
                    id: id,
                    title: title,
                    price: price,
                    description: description,
                    image: image,
                    state: "Activo",
                };
            }


            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Product/updateProduct/',
                requestData
            );

            console.log("Respuesta: " + requestData)

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                updateThisList();
                updateMessage(response.data.message, true);
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
                        <p>Módulo</p>
                    </div>
                    <div className="input">
                        <div class="dropdown" onClick={changeOpen}>
                            <div className='contentDrop'>
                                <a >{module}</a>
                                <ul className={isOpenDrop ? "openDrop" : "closeDrop"}>
                                    <li onClick={() => changeModule("Restaurante")}>
                                        Restaurante
                                    </li>
                                    <li onClick={() => changeModule("Cafeteria")}>
                                        Cafetería
                                    </li>
                                    <li onClick={() => changeModule("Recepcion")}>
                                        Recepción
                                    </li>
                                </ul>
                            </div>
                            <span className={isOpenDrop ? "up" : "down"}>
                                <FontAwesomeIcon icon={faChevronDown} className='iconBut' />
                            </span>
                        </div>
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
                    onClick={metod === "create" ? handleCreateProduct : handleBuys}
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
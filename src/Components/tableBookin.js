import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import "../styles/formModal.css";
import axios from "axios";
import {
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

const FormRoom = ({ idRoom, numero, capacidadMaxima, precioPorNoche, updateThisList, metod, updateMessage }) => {

    const [id, setIdRoom] = useState(idRoom);
    const [numeroNuevo, setNumero] = useState(numero);
    const [capacidad, setCapacidad] = useState(capacidadMaxima);
    const [image] = useState('hola');
    const [precio, setPrecio] = useState(precioPorNoche);
    const [isOpenDrop, setOpenDrop] = useState(false);
    const [loginError, setLoginError] = useState('');

    const changeOpen = () => {
        setOpenDrop(!isOpenDrop);
    }

    const handleCreateEmployee = async (e) => {
        window.location.href = "#";

        try {
            const requestData = {
                //id: id,
                number: numeroNuevo,
                max_capacity: capacidad,
                price_per_nigth: precio,
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Room/createRoom/',
                requestData
            );

            console.log(response);

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                updateThisList();
                updateMessage(response.data.message, true);
            } else {
                setLoginError(response.data.message);
                updateMessage(response.data.message, false);
            }
        } catch (error) {
            updateMessage("Upsss, no pudimos hacer esto.", false);
        }
    };

    const handleUpdateEmployee = async (e) => {
        window.location.href = "#";

        try {
            const requestData = {
                id: idRoom,
                number: numeroNuevo,
                max_capacity: capacidad,
                price_per_nigth: precio,
                state: "Activo"
            };

            console.log("Respuesta: ", requestData);

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Room/updateRoom/',
                requestData
            );

            console.log(response);

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                updateThisList();
                updateMessage(response.data.message, true);
            } else {
                setLoginError(response.data.message);
                updateMessage(response.data.message, false);
            }
        } catch (error) {
            updateMessage("Upsss, no pudimos hacer esto.", false);
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
                        <p>Id</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Id de habitación"
                            name="id"
                            value={id ? id : idRoom}
                            onChange={(e) => setIdRoom(e.target.value)}
                            readOnly
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Número</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Número"
                            name="numero"
                            value={numero ? numero : numeroNuevo}
                            onChange={(e) => setNumero(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Capacidad</p>
                    </div>
                    <div className="input">
                        <input type="number" placeholder="Capacidad"
                            name="capacidad"
                            value={capacidad ? capacidad : capacidadMaxima}
                            onChange={(e) => setCapacidad(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Precio</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Precio"
                            name="precio"
                            value={precio ? precio : precioPorNoche}
                            onChange={(e) => setPrecio(e.target.value)}
                        ></input>
                    </div>
                </div>

            </div>
            <div className="footerContent">
                <button
                    type="button"
                    className="myButton"
                    onClick={metod === "create" ? handleCreateEmployee : handleUpdateEmployee}
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

export default FormRoom;
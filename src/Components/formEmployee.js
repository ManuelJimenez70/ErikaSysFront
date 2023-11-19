import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import "../styles/formModal.css";
import axios from "axios";
import {
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";

const FormEmployee = ({ idEmpleado, newNombre, newRol, newApellido, newDocumento, newDireccion, newEmail, newPassword, updateThisList, metod, updateMessage }) => {

    console.log("Id: ", idEmpleado);

    const [nombre, setNombre] = useState(newNombre);
    const [apellido, setApellido] = useState(newApellido);
    const [direccion, setDireccion] = useState(newDireccion);
    const [documento, setDocumento] = useState(newDocumento);
    const [isOpenDrop, setIsOpenDrop] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState(newEmail);
    const [password, setPassword] = useState(newPassword);
    const [rol, setRol] = useState(newRol);

    const changeOpen = () => {
        setIsOpenDrop(!isOpenDrop);
    }

    const changeRol = (newRole) => {
        setRol(newRole);
    }

    const handleCreateEmployee = async (e) => {
        window.location.href = "#";

        try {
            const requestData = {
                //id: id,
                email: email,
                name: nombre,
                lastName: apellido,
                typeDocument: "CC",
                document_number: documento,
                direction: direccion,
                password: password,
                roles: [rol === "Administrador" ? 1 : 2],
                state: "Activo"
            };

            const response = await axios.post(
                'http://www.erikasys.somee.com/api/User/createUser/',
                requestData
            );

            console.log(response);

            // Mueve este bloque dentro del .then
            if (response.data.state === 'SUCCESS') {
                updateThisList();
                updateMessage(response.data.message, true);
            } else {
                setLoginError(response.data.message);
                updateMessage(loginError, false);
            }
        } catch (error) {
            updateMessage("Upsss, no pudimos hacer esto.", false);
        }
    };

    const handleUpdateEmployee = async (e) => {
        window.location.href = "#";

        try {
            const requestData = {
                id: idEmpleado,
                email: email,
                name: nombre,
                lastName: apellido,
                typeDocument: "CC",
                document_number: documento,
                direction: direccion,
                state: "Activo",
                description: "Por que si"
            };

            console.log("Respuesta: ", requestData);

            const response = await axios.post(
                'http://www.erikasys.somee.com/api/User/updateUser/',
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
                <img src=" " alt='img'></img>
            </div>
            <div className="bodyContent">

                <div className="dataInput">
                    <div className="label">
                        <p>Rol</p>
                    </div>
                    <div className="input">
                        <div class="dropdown" onClick={changeOpen}>
                            <div className='contentDrop'>
                                <a >{rol}</a>
                                <ul className={isOpenDrop ? "openDrop" : "closeDrop"}>
                                    <li onClick={() => changeRol("Administrador")}>
                                        Administrador
                                    </li>
                                    <li onClick={() => changeRol("Trabajador")}>
                                        Trabajador
                                    </li>
                                </ul>
                            </div>
                            <span className= { isOpenDrop ? "up" : "down"}>
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
                        <input type="text" placeholder="Nombre"
                            name="nombre"
                            value={nombre ? nombre : newNombre}
                            onChange={(e) => setNombre(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Apellido</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Apellido"
                            name="apellido"
                            value={apellido ? apellido : newApellido}
                            onChange={(e) => setApellido(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Documento</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Direccion"
                            name="documento"
                            value={ documento ? documento : newDocumento}
                            onChange={(e) => setDocumento(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Dirección</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Direccion"
                            name="direccion"
                            value={direccion ? direccion : newDireccion}
                            onChange={(e) => setDireccion(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Email</p>
                    </div>
                    <div className="input">
                        <input type="email" placeholder="Correo electrónico"
                            name="email"
                            value={email ? email : newEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className="dataInput">
                    <div className="label">
                        <p>Contraseña</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Contraseña"
                            name="contraseña"
                            value={password ? password : newPassword}
                            onChange={(e) => setPassword(e.target.value)}
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

export default FormEmployee;
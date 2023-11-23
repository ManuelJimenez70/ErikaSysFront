import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ventaProducto.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faSearch,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

function CheckOut({ updateMessage }) {

    const [bookings, setBookings] = useState([]);
    const [showBookings, setShowBookings] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        updateList();
    }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

    const updateList = async () => {
        axios.get('http://www.erikasys.somee.com/api/Room/getChecksByRangeState?numI=0&numF=100&state=Activo')
            .then(response => {
                const filteredBookings = response.data.data.filter(booking => booking.id_reservation !== null);
                // Almacena los datos de productos en el estado
                setBookings(filteredBookings);
                setShowBookings(filteredBookings);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });

    }

    const updateStateCheck = async (id) => {
        try {
            const checkInfo = {
                id: id,
                checkout_date: new Date().toISOString(),
                productsTotal: 1,
                state: "Inactivo"
            };

            console.log("Info a enviar: ", checkInfo);

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Room/updateCheck/',
                checkInfo
            );

            console.log(response);

            if (response.data.state === 'SUCCESS') {
                updateMessage(response.data.message, true);
                updateList();
            } else {
                updateMessage(response.data.message, false)
            }
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    }

    const fetchProductInfo = async () => {
        setIsSearching(true);
    };

    const searchBooking = (nameClient) => {
        const filteredProducts = bookings.filter(product => {
            const titularName = product.titular_person_name.value.toLowerCase();
            return titularName.includes(nameClient.toLowerCase());
        });
        setShowBookings(filteredProducts);
    }

    return (
        <div className='contentCheck'>
            <h2>Realiza el Check-Out...</h2>

            <div className={`${isSearching ? "searchButton" : "search"}`}>
                <input
                    type="text"
                    placeholder='Nombre del cliente'
                    onChange={(e) => searchBooking(e.target.value)}
                />
                <button className={`mt-2 ${isSearching ? "searching" : ""}`} onClick={fetchProductInfo}>
                    <FontAwesomeIcon icon={isSearching ? faAdd : faSearch} />
                </button>
            </div>

            <div className='contentTable tableNew'>
                <table class='styled-table'>
                    <thead>
                        <tr>
                            <th>ID/C</th>
                            <th>ID/Room</th>
                            <th>ID/Rv</th>
                            <th>Fecha de entrada</th>
                            <th>Fecha de salida</th>
                            <th>Cliente</th>
                            <th>Id cliente</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showBookings.map((booking) => (
                            <tr key={booking.id_check}>
                                <td> <p>{booking.id_check}</p></td>
                                <td> <p>{booking.id_room.value}</p></td>
                                <td> <p>{booking.id_reservation.value}</p></td>
                                <td> <p>{new Date(booking.checkin_date.value).toLocaleDateString()}</p></td>
                                <td> <p>{new Date().toLocaleDateString()}</p></td>
                                <td> <p>{booking.titular_person_name.value}</p></td>
                                <td> <p>{booking.titular_person_id.value}</p></td>
                                <td> <p>${((new Date() - new Date(booking.checkin_date.value))/ (1000 * 60 * 60 * 24)).toFixed(3)}</p></td>
                                <td> <button className='checkButton' onClick={() => updateStateCheck(booking.id_check)}><FontAwesomeIcon icon={faCheck} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CheckOut;

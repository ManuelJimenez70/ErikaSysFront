import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ventaProducto.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faSearch,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

function CheckIn({ updateMessage }) {

    const [bookings, setBookings] = useState([]);
    const [showBookings, setShowBookings] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        updateList();
    }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

    const updateList = async () => {
        axios.get('http://www.erikasys.somee.com/api/Room/getReservationsByRangeState?numI=0&numF=200&state=Activo')
            .then(response => {
                // Almacena los datos de productos en el estado
                setBookings(response.data.data);
                setShowBookings(response.data.data);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });
    }

    const createCheckIn = async (idRoom, idReservation, titularPersonId, titularPersonName) => {
        try {
            console.log("Id a actualizar: ", idReservation);
            const checkInfo = {
                id_room: idRoom,
                id_reservation: idReservation,
                num_hosts: 1,
                titular_person_id: titularPersonId,
                titular_person_name: titularPersonName
            };

            console.log(checkInfo);

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Room/createCheckIn/',
                checkInfo
            );


            if (response.data.state === 'SUCCESS') {
                updateMessage(response.data.message, true);
                console.log("El id que envío: ", idReservation)
                updateStateBooking(idReservation);
            } else {
                updateMessage(response.data.message, false)
            }
        } catch (error) {
            console.error('Error al realizar checkIn:', error);
        }

    }

    const updateStateBooking = async (id) => {
        try {
            const checkInfo = {
                id: id,
                state: "Inactivo"
            };

            const response = await axios.post(
                'http://www.ErikaSys.somee.com/api/Room/updateReservation/',
                checkInfo
            );

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
            <h2>Visualiza todas las reservas...</h2>

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
                            <th>ID/R</th>
                            <th>ID/H</th>
                            <th>Fecha de reserva</th>
                            <th>Cliente</th>
                            <th>Id cliente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showBookings.map((booking) => (
                            <tr key={booking.id_reservation}>
                                <td> <p>{booking.id_reservation}</p></td>
                                <td> <p>{booking.id_room.value}</p></td>
                                <td> <p>{booking.reservation_date.value}</p></td>
                                <td> <p>{booking.titular_person_name.value}</p></td>
                                <td> <p>{booking.titular_person_id.value}</p></td>
                                <td> <button className='checkButton' onClick={() => createCheckIn(booking.id_room.value, booking.id_reservation, booking.titular_person_id.value, booking.titular_person_name.value)}><FontAwesomeIcon icon={faCheck} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CheckIn;

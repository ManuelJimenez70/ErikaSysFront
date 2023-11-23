import React, { useState, useEffect } from 'react';
import "../styles/formModal.css";
import "../styles/productList.css";
import axios from 'axios';

import "../styles/checkin.css";

import {
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Bookin({ updateMessage }) {
  const [guestName, setGuestName] = useState('');
  const [persons, setPersons] = useState("");
  const [checkInDate, setCheckInDate] = useState('');
  const [selectedModule, setSelectedModule] = useState('Selecciona');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [roomsToShow, setRoomsToShow] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [idRoom, setIdRoom] = useState("");
  const [idPerson, setIdPerson] = useState("");
  const [selectedTime, setTime] = useState("");
  const [combinedDate, setCombinedDate] = useState(null);

  const [originalProducts, setOriginalProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Realiza la solicitud GET a la API
    updateList();
  }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

  const [products, setProducts] = useState([]);

  const updateList = () => {
    axios.get('http://www.erikasys.somee.com/api/Room/getRoomsByRangeState?numI=0&numF=10&state=Activo')
      .then(response => {
        // Almacena los datos de productos en el estado
        setProducts(response.data.data);
        setOriginalProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error al cargar los productos:', error);
      });
  }

  const changeRoom = (room, capacity, idRoom) => {
    setSelectedModule(room);
    setCapacity(capacity);
    setIdRoom(idRoom)
  }

  useEffect(() => {
    // Realiza la solicitud GET a la API
    updateRooms();
  }, [persons]);

  const updateRooms = () => {
    // Filtra las habitaciones con capacidad máxima mayor o igual al número de personas
    const filteredProducts = products.filter(product => product.max_capacity.value >= persons);
    setRoomsToShow(filteredProducts);
  };

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  }

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  }

  const handleCreateBookin = async (e) => {
    try {

      // Crear un objeto Date en base al valor del input de tipo date (en zona horaria local)
      const localDate = new Date(checkInDate + "T00:00:00");

      const finalDate = new Date(localDate);
      const [hours, minutes] = selectedTime.split(':');
      finalDate.setHours(parseInt(hours, 10));
      finalDate.setMinutes(parseInt(minutes, 10));

      console.log("fecha final: ", finalDate);

      const newDate = finalDate.toISOString();

      const requestData = {
        id_room: idRoom,
        reservation_date: newDate,
        titular_person_name: guestName,
        titular_person_id: idPerson
      };

      const response = await axios.post(
        'http://www.ErikaSys.somee.com/api/Room/createReservation/',
        requestData
      );

      console.log(response);

      // Mueve este bloque dentro del .then
      if (response.data.state === 'SUCCESS') {
        updateMessage(response.data.message, true);
      } else {
        updateMessage(response.data.data, false);
      }
    } catch (error) {
      console.log(error);
      updateMessage("Upsss, no pudimos hacer esto.", false);
    }
  };

  return (
    <div className='contentCheck'>
      <h2>Reservación</h2>

      <div>
        <label>Nombre del huésped:</label>
        <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
      </div>

      <div>
        <label>Número de documento:</label>
        <input type="text" value={idPerson} onChange={(e) => setIdPerson(e.target.value)} />
      </div>

      <div>
        <label>Fecha de reserva</label>
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
      </div>

      <div>
        <label>Cantidad de personas</label>
        <input type="number" className='personsInput' value={persons} onChange={(e) => setPersons(e.target.value)} />
      </div>

      <div className='contentModules'>
        <div className='content1'>
          <label>Habitación:</label>
          <select onChange={handleModuleChange}>
            {roomsToShow.map(product => (
              <option key={product.number.value} onClick={() => changeRoom(product.number.value, product.max_capacity.value, product.id_room)}>
                {product.number.value}
              </option>
            ))}
            {/* Aquí deberías generar dinámicamente las opciones de los módulos */}
          </select>
        </div>

        <div className='content2'>
          <label>Hora:</label>
          <input type="time" value={selectedTime} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      <p>Capacidad: {capacity}</p>

      <button onClick={handleCreateBookin}>
        <span className='iconCheck'>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        Hecho
      </button>
    </div>
  );
}

export default Bookin;

import React, { useState } from 'react';
import "../styles/checkin.css";

function CheckInCheckOutComponent() {
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [products, setProducts] = useState([]);

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  }

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  }

  const addProduct = () => {
    if (selectedModule && selectedProduct) {
      const productToAdd = {
        module: selectedModule,
        product: selectedProduct,
      };

      setProducts([...products, productToAdd]);
      setSelectedModule('');
      setSelectedProduct('');
    }
  }

  return (
    <div className='content'>
      <h2>Check-In / Check-Out</h2>

      <div>
        <label>Nombre del huésped:</label>
        <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
      </div>

      <div>
        <label>Fecha de check-in:</label>
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
      </div>

      <div>
        <label>Fecha de check-out:</label>
        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
      </div>

      <div className='contentModules'>
        <div className='content1'>
          <label>Módulo:</label>
          <select value={selectedModule} onChange={handleModuleChange}>
            <option value="">Seleccionar módulo</option>
            {/* Aquí deberías generar dinámicamente las opciones de los módulos */}
          </select>
        </div>

        <div className='content2'>
          <label>Producto:</label>
          <select value={selectedProduct} onChange={handleProductChange}>
            <option value="">Seleccionar producto</option>
            {/* Aquí deberías generar dinámicamente las opciones de productos en función del módulo seleccionado */}
          </select>
        </div>
      </div>

      <button onClick={addProduct}>Agregar Producto</button>

      <div>
        <h3>Productos Seleccionados:</h3>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              Módulo: {product.module}, Producto: {product.product}
            </li>
          ))}
        </ul>
      </div>

      <button>Realizar Check-In</button>
    </div>
  );
}

export default CheckInCheckOutComponent;

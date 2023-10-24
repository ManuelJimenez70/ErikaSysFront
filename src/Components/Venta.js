import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Components/AuthContext';
import "../styles/ventaProducto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd
} from "@fortawesome/free-solid-svg-icons";

function Venta() {
  const [productId, setProductId] = useState('');
  const { userId } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState(null); // Información del producto seleccionado
  const [mensaje, setMensaje] = useState('');
  const [total, setTotal] = useState(0);



  // Función para manejar la adición de productos
  const handleAddProduct = () => {
    if (productId && quantity > 0) {
      // Verifica si el producto ya está en la lista
      const existingProductIndex = products.findIndex(product => product.id === productId);

      if (existingProductIndex !== -1) {
        // Si el producto ya está en la lista, actualiza la cantidad
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex].quantity += quantity;
        setProducts(updatedProducts);
      } else {
        // Si el producto no está en la lista, agrégalo
        const newProduct = {
          id: productId,
          name: productInfo.title.value,
          price: productInfo.price.value,
          quantity: quantity,
        };
        console.log(newProduct);

        setProducts([...products, newProduct]);
      }
      // Limpia los campos después de agregar un producto
      setProductId('');
      setProductInfo(null);
    }
  };

  // Función para calcular el total
  const calculateTotal = () => {
    let newTotal = 0;
    console.log(products);
    products.forEach(product => {
      newTotal += product.price * product.quantity;
      console.log(newTotal);
    });
    setTotal(newTotal);
  };

  // Función para obtener información de un producto por su ID
  const fetchProductInfo = async () => {
    try {
      console.log(productId)
      const response = await axios.get(`http://www.erikasys.somee.com/api/Product/getProductById/${productId}`);
      const producto = response.data.data;
      console.log(producto);
      // Actualiza el estado "productInfo" con la información del producto
      setProductInfo(producto);
      if (producto === null) {
        setMensaje('No se pudo encontrar el producto.');
      }


    } catch (error) {
      console.error('Error al buscar el producto:', error);
      setMensaje('No se pudo encontrar el producto.');
    }
  };

  useEffect(() => {
    if (mensaje !== '') {
      const timer = setTimeout(() => {
        setMensaje('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [mensaje]);

  useEffect(() => {

    // Verifica si productInfo no es null
    if (productInfo) {
      console.log(productInfo.title.value);
      console.log("Entro pa");
      handleAddProduct();
      calculateTotal(); // Actualiza el total cuando se agrega un producto
    }
  }, [productInfo]);

  useEffect(() => {
    calculateTotal(); // Actualiza el total cuando se agrega un producto
  }, [products]);

  // Manejar cambios en el campo de ID del producto
  const handleProductIdChange = (e) => {
    const newProductId = e.target.value;
    setProductId(newProductId);
  };
  const fetchProductSell = async () => {
    try {
      // Crea un objeto con la información de la venta
      for (const product of products) {
        // Crea un objeto con la información de cada producto
        const saleData = {
          id_user: userId, // Cambia esto al ID del usuario actual
          id_action: 6, // ID correspondiente a la acción de venta
          id_product: product.id, // ID del producto actual
          id_module: 1, // Cambia esto al ID del módulo correspondiente
          quantity: product.quantity, // Cantidad del producto actual
          state: 'Success',
        };

        // Realiza la solicitud POST para registrar el producto
        const response = await axios.post('http://www.erikasys.somee.com/api/Action/recordAction', saleData);

        // Verifica si el producto se registró con éxito
        if (response.status === 200) {
          // Realiza alguna acción adicional si es necesario
          console.log(`Venta del producto ${product.id} registrada con éxito`);
          setProductId('');
          setProducts([]);
          setProductInfo(null); // Información del producto seleccionado
          setMensaje('Venta registrada con éxito.');
        }
      }
    } catch (error) {
      setMensaje('Error al registrar la venta.');
      console.error('Error al registrar la venta:', error);
    }
  }
  const handleQuantityKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Llama a la función para agregar el producto cuando se presiona "Enter"
      fetchProductInfo();
    }
  };


  return (
    <div class='m-4'>
      <div className='editId'>
        <label>ID del Producto:</label>
        <div className='searchButton'>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            onKeyDown={handleQuantityKeyPress} // Maneja la tecla "Enter"
          />
          <button class='mt-2' onClick={fetchProductInfo}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
      </div>


      {productInfo && (
        <div>
          <h3>Información del Producto:</h3>
          <p>Nombre: {productInfo?.title?.value}</p>
          <p>Precio: ${productInfo?.price?.value}</p>
        </div>
      )}
      <table class='styled-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>${product.price * product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ${total}</p>
      <button onClick={fetchProductSell}>Registrar venta</button>
      {
        mensaje !== '' ? (
          mensaje === 'Venta registrada con éxito.' ? (
            <div className="alert alert-success mt-2" role="alert">
              {mensaje}
            </div>
          ) : (
            <div className="alert alert-danger mt-2" role="alert">
              {mensaje}
            </div>
          )
        ) : null
      }
    </div>
  );
}
export default Venta;


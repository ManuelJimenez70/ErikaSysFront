import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Components/AuthContext';
import "../styles/ventaProducto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faSearch,
  faChevronDown, 
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { set } from 'lodash';

function Venta() {

  const [productId, setProductId] = useState('');
  const { userId } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [productsByModule, setProductsByModule] = useState([]);
  const [productsBM, setProductsBM] = useState([]);
  const [productInfo, setProductInfo] = useState(null); // Información del producto seleccionado
  const [mensaje, setMensaje] = useState('');
  const [total, setTotal] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [moduleNum, setModuleNum] = useState(3);
  const [isOpenDrop, setOpenDrop] = useState(false);
  const [module, setModule] = useState("Selecciona..");
  const [isOpenDropP, setOpenDropP] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET a la API
    axios.get('http://www.ErikaSys.somee.com/api/Product/getProductsByRangeState?numI=0&numF=100&state=Activo')
      .then(response => {
        // Almacena los datos de productos en el estado
        setProductsByModule(response.data.data);
        console.log("Obtuvimos los siguientes productos: ", response.data.data); // Agrega un console.log para verificar los datos obtenidos
      })
      .catch(error => {
        console.error('Error al cargar los productos:', error);
      });
  }, [productsByModule]); // Agrega productsByModule como una dependencia
  

  // Función para manejar la adición de productos
  const handleAddProduct = (e) => {
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
    setIsSearching(true);
    if (isSearching) {
      try {
        const response = await axios.get(`http://www.erikasys.somee.com/api/Product/getProductById/${productId}`);
        const producto = response.data.data;

        // Actualiza el estado "productInfo" con la información del producto
        if (producto.id_module.value === "" + moduleNum) {
          setProductInfo(producto);
        } else {
          setMensaje('El producto no pertenece al módulo.');
        }

        if (producto === null) {
          setMensaje('No se pudo encontrar el producto.');
        }

      } catch (error) {
        console.error('Error al buscar el producto:', error);
        setMensaje('No se pudo encontrar el producto.');
      }
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

  //Método para añadir un producto desde la tabla
  const addProductFromTable = (idP) => {
    setProductId("" + idP);
  };

  useEffect(() => {
    if (productId !== '') {
      fetchProductInfo();
    }
  }, [productId]);

  const fetchProductSell = async () => {
    try {
      // Crea un objeto con la información de la venta
      for (const product of products) {
        // Crea un objeto con la información de cada producto
        const saleData = {
          id_user: userId, // Cambia esto al ID del usuario actual
          id_action: 6, // ID correspondiente a la acción de venta
          id_product: product.id, // ID del producto actual
          id_module: moduleNum, // Cambia esto al ID del módulo correspondiente
          quantity: product.quantity, // Cantidad del producto actual
          state: 'Success',
        };

        console.log("Información de la venta: ", saleData);

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

  const changeOpen = (dropdown) => {
    if (dropdown === "modulo") {
      setOpenDrop(!isOpenDrop);
    } else {
      setOpenDropP(!isOpenDropP);
    }

  }

  // Método para filtrar productos por módulo
  const filterProductsByModule = (module) => {
    const filteredProducts = productsByModule.filter(product => {
      // Verifica si id_module no es null antes de comparar su valor
      return product.id_module && product.id_module.value === module;
    });
    setProductsBM(filteredProducts);
  };

  const changeModule = (module) => {
    setModule(module);
    setOpenDrop(false);
    const newModuleNum = module === "Recepcion" ? 1 : module === "Cafeteria" ? 2 : 3;
    setModuleNum(newModuleNum);
    setProducts([]);
    filterProductsByModule("" + newModuleNum);
  }

  const removeItem = (idItem) => {
    // Filtra la lista para excluir el elemento con el ID especificado
    const updatedProducts = products.filter(product => product.id !== idItem);
    setProducts(updatedProducts);
  }  

  return (
    <div class='m-4'>
      <div className='editId'>
        <p>Vender productos / <span>{module}</span></p>
        <div class="dropdown" onClick={() => changeOpen("modulo")}>
          <div className={`contentDrop ${isOpenDrop ? "openD" : "closeD"}`}>
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

        <div className={`${isSearching ? "searchButton" : "search"}`}>
          <input
            type="text"
            value={productId}
            placeholder='Nombre o id del producto'
            onChange={handleProductIdChange}
            onKeyDown={handleQuantityKeyPress} // Maneja la tecla "Enter"
          />
          <button className='mt-2' onClick={fetchProductInfo}>
            <FontAwesomeIcon icon={isSearching ? faAdd : faSearch} />
          </button>
        </div>
      </div>

      <div className='tables'>
        <div className='contentTable'>
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
                  <td> <p>{product.id}</p></td>
                  <td><p>{product.name}</p></td>
                  <td><p>${product.price}</p></td>
                  <td><p>{product.quantity}</p></td>
                  <td><p>${product.price * product.quantity}</p></td>
                  <td><button onClick={() => removeItem(product.id)}><FontAwesomeIcon icon={faTimes}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='contentT'>
          <table className='styled-table tableDat'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody className='tableBody'>
              {productsBM.map((product) => (
                <tr key={product.id_product} onClick={() => addProductFromTable(product.id_product)}>
                  <td><p>{product.title.value}</p></td>
                  <td> <p>{product.id_product}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </div >
  );
}
export default Venta;


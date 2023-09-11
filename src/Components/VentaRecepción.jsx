import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CardVentaRecepcion from './CardVentaRecepcion';


const VentaRecepción = () => {
    // Desestructura las propiedades para usarlas fácilmente
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState(0);
    const [productQuantity, setProductQuantity] = useState({});

    const [errorProductget, setErrorProductget] = useState('');
    const [succesVenta, setSuccesVenta] = useState('');
    const inputRef = useRef(null);



    const handleRemoveProduct = (id_product) => {

        if (products.some(product => product.id_product === id_product)) {
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.quantity > -1
                        ? { ...product, quantity: product.quantity - 1 }
                        : setProductQuantity(prevQuantity => ({
                            ...prevQuantity,
                            [id_product]: (prevQuantity[id_product] || 0) - 1
                        }))
                )
            );
        }

        setProductQuantity(prevQuantity => ({
            ...prevQuantity,
            [id_product]: (prevQuantity[id_product] || 0) - 1
        }));

        const updatedProducts = products.filter(product => product.quantity > 1);
        console.log(updatedProducts.length)

        setProducts(updatedProducts);


        // Calcula el nuevo total restando el precio del producto eliminado
        const removedProduct = products.find(product => product.id_product === id_product);
        if (removedProduct) {
            setTotal(prevTotal => prevTotal - removedProduct.price.value);
        }
    };


    const handleEnterKey = () => {
        axios.get('http://www.ErikaSys.somee.com/api/Product/getProductById/' + idProduct)
            .then(response => {
                if (response.data.state === "SUCCESS" && response.data.data != null) {
                    setSuccesVenta("");
                    setErrorProductget("");
                    const newProduct = response.data.data;
                    const productId = newProduct.id_product;

                    // Verifica si el producto ya está en la lista
                    if (products.some(product => product.id_product === productId)) {
                        // Si el producto ya está en la lista, actualiza la cantidad y subtotal
                        setProducts(prevProducts =>
                            prevProducts.map(product =>
                                product.id_product === productId
                                    ? { ...product, quantity: product.quantity + 1 }
                                    : product
                            )
                        );
                    } else {
                        // Si el producto no está en la lista, agrégalo con cantidad 1
                        newProduct.quantity = 1;
                        setProducts(prevProducts => [...prevProducts, newProduct]);
                    }

                    setProductQuantity(prevQuantity => ({
                        ...prevQuantity,
                        [productId]: (prevQuantity[productId] || 0) + 1
                    }));
                    setTotal(prevTotal => prevTotal + newProduct.price.value);
                } else {
                    setErrorProductget("Producto no encontrado");
                }
            })
            .catch(error => {
                console.error('Error al cargar producto:', error);
            });
    };


    const registrarVenta = async (e) => {
        try {
            e.preventDefault();
            products.forEach(async product => {
                const requestData = {
                    id_user: 2,
                    id_action: 5,
                    id_product: product.id_product,
                    quantity: product.quantity
                };

                const response = await axios.post(
                    'http://localhost:7289/api/Action/recordAction/',
                    requestData
                );
    
                if (response.data.state === 'SUCCESS') {
                    setProducts([]);
                    setSuccesVenta("Venta registrada correctamente");
                    inputRef.current.value = ''; // Esto borra el valor del input
                    setTotal(0);
                } else {
                    setErrorProductget("Error al registrar venta");
                }
            });
           
            // Mueve este bloque dentro del .then
        
        } catch (error) {
            setErrorProductget("Error al registrar venta" + error);
        }
    };


    // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

    return (<div class='container p-5 text-center'>
        <div class="row row-cols-12 justify-content-center">
            <form class='col-10'>
                <div class="mb-3">
                    <label class="form-label">Código Producto: </label>
                    <input
                        type="number"
                        className="form-control w-50 mx-auto"
                        onChange={(e) => setIdProduct(e.target.value)} // Usar e.target.value para obtener el valor
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Evita la recarga de la página
                                handleEnterKey();
                            }
                        }}
                        autoFocus
                        ref={inputRef}
                    />
                    <div class="form-text">Ingresa los productos mediante el lector de codigo de barras.</div>
                    {errorProductget && <div class="alert alert-danger mt-3 p-1" role="alert">{errorProductget} </div>}
                    {succesVenta && <div class="alert alert-success mt-3 p-1" role="success">{succesVenta} </div>}

                </div>
                <div class='container w-90 h-100 m-3 justify-content-center'>
                    <div class="row row-cols-9 justify-content-center w-100">
                        {products.map((product, index) => (
                            <CardVentaRecepcion key={index} name={product.title.value} cost={product.price.value} id_product={product.id_product} productQuantity={productQuantity} handleRemoveProduct={handleRemoveProduct}></CardVentaRecepcion>
                        ))}
                    </div>
                </div>
                <div class="row row-cols-2 sticky-bottom p-3 bg-white border-top">
                    <button type="submit" class="col btn btn-primary" onClick={registrarVenta}>Registrar Venta</button>
                    <h3 class="col">Total: ${total}</h3>
                </div>
            </form>
        </div>
    </div>);
}

export default VentaRecepción; 
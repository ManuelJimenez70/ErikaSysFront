import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/productList.css";
import CardProduct from "../Components/CardProduct";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        axios.get('http://www.erikasys.somee.com/api/Product/getProductsByRange?numI=0&numF=100')
            .then(response => {
                // Almacena los datos de productos en el estado
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });
    }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

    console.log("Tamaño: " + products.length);

    const [page, setPage] = useState(1);
    const cardsPerPage = 8;
    const totalPages = Math.ceil(products.length / cardsPerPage);

    // Calcula el rango de índices de las tarjetas que se mostrarán en la página actual.
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToShow = products.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="card-container">
            <div className='cardsContainer'>
                {cardsToShow.map(product => (
                    <CardProduct name={product.title.value} description={product.description.value} cost={product.price.value} quantity={product.stock.value}></CardProduct>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>Página anterior</button>
                <span>Página {page} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>Página siguiente</button>
            </div>
        </div>
    );
};

export default ProductList;

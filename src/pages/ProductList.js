import React, { useState, useEffect } from 'react';
import "../styles/formModal.css";
import "../styles/productList.css";
import CardProduct from "../Components/CardProduct";
import FormProduct from '../Components/formProduct';
import axios from 'axios';


function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        axios.get('http://www.erikasys.somee.com/api/Product/getProductsByRange?numI=0&numF=50')
            .then(response => {
                // Almacena los datos de productos en el estado
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });
    }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

    const updateList = (list) =>{
        setProducts(list);
    }

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
        <div>
            <div className='searchPanel'>
                <nav class="navbar navbar-light bg-light container-centered">
                    <div class="container-fluid">
                        <button type="button" class="btn btn-outline-primary" onClick={() => window.location.href = "#modal1"}>Agregar</button>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Nombre del producto" aria-label="Buscar"></input>
                            <input class="btn btn-primary" type="submit" value="Buscar"></input>
                        </form>
                    </div>
                </nav>
            </div>

            <div className="card-container">
                <div className='cardsContainer'>
                    {cardsToShow.map(product => (
                        <CardProduct
                            key={product.id_product}
                            idProduct={ product.id_product}
                            title={product.title.value}
                            description={product.description.value}
                            price={product.price.value}
                            stock={product.stock.value}
                            
                        />
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={page === 1}>Página anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button onClick={handleNextPage} disabled={page === totalPages}>Página siguiente</button>
                </div>

            </div>

            <div id="modal1" className="modalmask">
                <div className="modalbox movedown">
                    <FormProduct updateList= { updateList } metod = "create"></FormProduct>
                </div>
            </div>
        </div>
    );
};

export default ProductList;


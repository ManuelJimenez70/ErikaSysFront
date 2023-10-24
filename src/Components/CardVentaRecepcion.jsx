import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardVentaRecepcion = (props) => {
    const { name, cost, id_product ,productQuantity, handleRemoveProduct } = props;
    const quantity = productQuantity[id_product] || 0; // Obtén la cantidad del producto
    const subtotal = cost * quantity; // Calcula el subtotal
    return (
        <div class="w-25  h-10 m-2">
            <h1>hola</h1>
            <div class="card">
                <div class="card-header">
                    Producto: {name}
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p class="card-text">Precio (u): {cost}</p>
                        <h4 class="card-text">Cantidad: {quantity}</h4>
                        <footer class="blockquote-footer">
                            <h5>Subtotal: {subtotal}</h5>
                            <button
                                type="button"
                                class="btn btn-danger btn-sm"
                                style={{ width: '30%' }}
                                onClick={() => handleRemoveProduct(id_product)} // Llama a la función al hacer clic
                            >
                                x
                            </button>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default CardVentaRecepcion;

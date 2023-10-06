import React, { useState } from 'react';
import "../styles/modal.css";
import axios from 'axios';
import UpdateProduct from '../Components/UpdateProduct';

function ModalProduct() {

    const [title, setTitle] = useState('');
    const [description, setDescripcion] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [id, setId] = useState(0);
    const [state, setState] = useState('');
    const [loginError, setLoginError] = useState('');
    const [actionSuccess, setActionSuccess] = useState('');


    const handleCreateProduct = async (e) => {
        try {
          const requestData = {
            title: title,
            description: description,
            image: image,
            price: price,
            stock: stock
          };
    
          const response = await axios.post(
            'http://www.ErikaSys.somee.com/api/Product/createProduct/',
            requestData
          );
          // Mueve este bloque dentro del .then
          if (response.data.state === 'SUCCESS') {
            setActionSuccess('Producto correctamente agregado')
            console.log(response.data.message)
          } else {
            setLoginError(response.data.message);
          }
        } catch (error) {  
          console.error('Error al agregar:', error);
          setLoginError('Error al agregar producto');
        }
      };

      
    return (
        <div>
            <UpdateProduct idProduct="12" title="Checho" description="Loca" image='asd' price='adsasd' stock='sdf' ></UpdateProduct>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">CREAR PRODUCTO</button>
            <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="producto-preview">
                        <img src="https://manillasdecontrol.com/wp-content/uploads/2023/03/amarillo-bandera.png" alt="Producto"></img>
                    </div>
                    <div class="modal-content">
                        <div class="modal-body">
                            <form method='POST'>
                                <label for="exampleFormControlInput1" class="form-label">Tipo Manilla</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Manilla Amarilla" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                                
                                <label for="exampleFormControlInput1" class="form-label">Descripción</label>
                                <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="Descripción..." value={description} onChange={(e) => setDescripcion(e.target.value)}></input>
                                
                                <div class="mb-3">
                                <label for="formFile" class="form-label">Seleccionar Imagen</label>
                                <input type="text" class="form-control" id="exampleFormControlInput3" placeholder="Url Imagen" value={image} onChange={(e) => setImage(e.target.value)}></input>
                                </div>

                                <label for="exampleFormControlInput1" class="form-label">Precio</label>
                                <input type="number" class="form-control" id="exampleFormControlInput3" value={price} onChange={(e) => setPrice(e.target.value)}></input>

                                <label for="exampleFormControlInput1" class="form-label">Stock</label>
                                <input type="number" class="form-control" id="exampleFormControlInput4" value={stock} onChange={(e) => setStock(e.target.value)}></input>
                            </form>

                        </div>
                        {loginError && <div class="alert alert-danger mt-3 p-1" role="alert">{loginError} </div>}
                        {actionSuccess && <div class="alert alert-success mt-3 p-1" role="alert">{actionSuccess}</div>}

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" class="btn btn-primary" id='guardar' onClick={handleCreateProduct}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
  

        
    );
}

export default ModalProduct;
import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({idProduct, title, description, image, price, stock}) =>{
    // Desestructura las propiedades para usarlas fácilmente
    const [newTitle, setTitle] = useState('');
    const [newDescription, setDescripcion] = useState('');
    const [newImage, setImage] = useState('');
    const [newPrice, setPrice] = useState(0);
    const [newStock, setStock] = useState(0);
    const [loginError, setLoginError] = useState('');
    const [actionSuccess, setActionSuccess] = useState('');
    console.log("Titulo" + title)
    
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
          const requestData = {
            idProduct:idProduct,
          };
          if (title) {
            requestData.title = newTitle;
          }
          if (description) {
            requestData.description = newDescription;
          }
          if (image) {
            requestData.image = newImage;
          }
          if (price) {
            requestData.price = newPrice;
          }
          if (stock) {
            requestData.stock = newStock;
          }
    
          const response = await axios.post(
            'http://www.ErikaSys.somee.com/api/Product/updateProduct/',
            requestData
          );
    
          // Mueve este bloque dentro del .then
          if (response.data.state === 'SUCCESS') {
            console.log(response.data.data)
            setActionSuccess('Producto correctamente agregado')
          } else {
            setLoginError(response.data.data);
          }
        } catch (error) {
          console.error('Error al agregar:', error);
          setLoginError('Error al agregar producto');
        }
      };

    return (
      <div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#UpdateModal">ACTUALIZAR PRODUCTO</button>
            <div class="modal fade" id="UpdateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <button type="submit" class="btn btn-primary" id='guardar' onClick={handleUpdateProduct}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  
}

export default UpdateProduct;
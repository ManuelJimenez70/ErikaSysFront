import React, { useState } from 'react';


function ModalProduct() {

    return (
        <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Manilla</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Tipo Manilla</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Manilla Amarilla"></input>
                                <label for="exampleFormControlInput1" class="form-label">Descripción</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Descripción..."></input>
                                
                                <div class="mb-3">
                                <label for="formFile" class="form-label">Seleccionar Imagen</label>
                                <input class="form-control" type="file" id="formFile"></input>
                                </div>

                                <label for="exampleFormControlInput1" class="form-label">Precio</label>
                                <input type="number" class="form-control" id="exampleFormControlInput1"></input>

                                <label for="exampleFormControlInput1" class="form-label">Stock</label>
                                <input type="number" class="form-control" id="exampleFormControlInput1"></input>
                            </div>         
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
  

        
    );
}

export default ModalProduct;
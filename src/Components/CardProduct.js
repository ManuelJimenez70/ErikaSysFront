import React from "react";
import "../styles/productList.css";

const CardProduct = ({ name, description, cost, quantity }) => {
    return (
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <div className="our_solution_category">
                <div className="solution_cards_box">
                    <div className="our_solution_category">
                        <div className="solution_cards_box"></div>
                        <div className="solution_card">
                            <div className="hover_color_bubble"></div>
                            <div className="so_top_icon">
                                <svg
                                    id="Layer_1"
                                    height="50"
                                    viewBox="0 0 512 512"
                                    width="40"
                                    xmlns="https://www.sublimaco.com/wp-content/uploads/2020/07/Manillas-para-eventos-Tyvek-Dorado-sublimaco.jpg"
                                >
                                    <image
                                        x="0"  // Posición X de la imagen en el SVG
                                        y="0"  // Posición Y de la imagen en el SVG
                                        width="50"  // Ancho de la imagen
                                        height="50"  // Altura de la imagen
                                        xlinkHref="https://www.sublimaco.com/wp-content/uploads/2020/07/Manillas-para-eventos-Tyvek-Dorado-sublimaco.jpg"  // Ruta de la imagen que deseas agregar
                                    />
                                </svg>
                            </div>
                            <div className="solu_title">
                                <h3> {name} </h3>
                            </div>
                            <div className="solu_description">
                                <p>
                                    Descripción: {description}
                                </p>
                                <p>
                                    Costo: {cost}
                                </p>
                                <p>
                                    Stock: {quantity}
                                </p>
                                <div className="ButtonsDiv">
                                    <button type="button" className="read_more_btn">
                                        Editar
                                    </button>
                                    <button type="button" className="read_more_btn">
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;
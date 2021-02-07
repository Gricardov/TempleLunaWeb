import React, { useRef, useEffect } from 'react'
import './pestanas.css'

const Pestanas = ({ data, indice, seleccionar, cargando, children }) => {

    const porcAnchoPestana = 100 / data.length;

    const hijos = React.Children.toArray(children);

    const cambiarPestana = (e, indice) => {
        e.preventDefault();
        seleccionar(indice);
    }

    return (
        <div>
            <div className="material-tabs">
                {
                    data.map((pestana, index) => (
                        <a key={index} onClick={(e) => cambiarPestana(e, index)} className="active">{pestana}</a>
                    ))
                }
                <span className="tab-bar" style={{ width: `${porcAnchoPestana}%`, left: `${porcAnchoPestana * indice}%` }}></span>
            </div>
            {
                cargando
                    ?
                    'Cargando...'
                    :
                    hijos[indice]
            }
        </div>
    )
}

export default Pestanas;

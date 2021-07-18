import React from 'react';
import GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 from './ins_evento_GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1':
            return <GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
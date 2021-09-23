import React from 'react';
import GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 from './ins_evento_GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1';
import GRAN_INAUGURACION_TL from './ins_evento_GRAN-INAUGURACION-TL';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1':
            return <GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 />;
        case 'GRAN-INAUGURACION-TL':
            return <GRAN_INAUGURACION_TL />
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
import React from 'react';
import GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 from './ins_evento_GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1';
import GRAN_REUNION_ARTISTAS_TEMPLE_LUNA_FFOSTER_1 from './ins_evento_GRAN-REUNION-ESCRITORES-TEMPLE-LUNA-FFOSTER-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1':
            return <GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 />;
        case 'GRAN-REUNION-ARTISTAS-TEMPLE-LUNA-FFOSTER-1':
            return <GRAN_REUNION_ARTISTAS_TEMPLE_LUNA_FFOSTER_1 />
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
import React from 'react';
import GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 from './ins_evento_YO_PUBLIQUE_Y_TE_ENSENO_A_LOGRARLO_LACZU_1';
import YO_PUBLIQUE_Y_TE_ENSENO_A_LOGRARLO_LACZU_1 from './ins_evento_YO_PUBLIQUE_Y_TE_ENSENO_A_LOGRARLO_LACZU_1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'GRUPO-LECTURA-LA-TERTULIA-WMUNIZ-1':
            return <GRUPO_LECTURA_LA_TERTULIA_WMUNIZ_1 />;
        case 'YO-PUBLIQUE-Y-TE-ENSENO-A-LOGRARLO-LACZU-1':
            return <YO_PUBLIQUE_Y_TE_ENSENO_A_LOGRARLO_LACZU_1 />
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
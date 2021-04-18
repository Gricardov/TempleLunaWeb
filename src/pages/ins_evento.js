import React from 'react'
import OBRA_PROFESIONAL_CCADENA_1 from './ins_evento_OBRA-PROFESIONAL-CCADENA-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'OBRA-PROFESIONAL-CCADENA-1':
            return <OBRA_PROFESIONAL_CCADENA_1 />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
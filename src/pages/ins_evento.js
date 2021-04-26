import React from 'react'
import OBRA_PROFESIONAL_CCADENA_2 from './ins_evento_OBRA-PROFESIONAL-CCADENA-2';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'OBRA-PROFESIONAL-CCADENA-2':
            return <OBRA_PROFESIONAL_CCADENA_2 />;
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
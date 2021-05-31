import React from 'react';
import OBRA_PROFESIONAL_CCADENA_2 from './ins_evento_OBRA-PROFESIONAL-CCADENA-2';
import GRAN_TALLER_APRENDE_ORTOGRAFIA_ERENDIRA_1 from './ins_evento_GRAN-TALLER-APRENDE-ORTOGRAFIA-ERENDIRA-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'OBRA-PROFESIONAL-CCADENA-2':
            return <OBRA_PROFESIONAL_CCADENA_2 />;
        case 'GRAN-TALLER-APRENDE-ORTOGRAFIA-ERENDIRA-1':
            return <GRAN_TALLER_APRENDE_ORTOGRAFIA_ERENDIRA_1 />
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
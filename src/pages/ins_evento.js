import React from 'react'
import OBRA_PROFESIONAL_CCADENA_2 from './ins_evento_OBRA-PROFESIONAL-CCADENA-2';
import APRENDE_SER_PAGADO_POR_ESCRIBIR_CRISTI_1 from './ins_evento_APRENDE-SER-PAGADO-POR-ESCRIBIR-CRISTI-1';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        case 'OBRA-PROFESIONAL-CCADENA-2':
            return <OBRA_PROFESIONAL_CCADENA_2 />;
        case 'APRENDE-SER-PAGADO-POR-ESCRIBIR-CRISTI-1':
            return <APRENDE_SER_PAGADO_POR_ESCRIBIR_CRISTI_1 />
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
import React from 'react';

const Inscripcion = ({ match }) => {

    switch (match.params.id) {
        default:
            return <div>Código de inscripción inválido</div>;
    }
}

export default Inscripcion;
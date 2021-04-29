import React, { useState, useEffect } from 'react';
import PerfilPersona from './perfil_persona';
import PerfilEditorial from './perfil_editorial';

const profileData = {
    type: 'PERSON',
    name: 'Shany Dubi',
    networks: ['', ''],
    roles: ['COLAB'],
    services: ['CRI', 'DIS'],
    likes: 20,
    views: 30,
    statistics: [{ type: 'CRI', cound: 10 }, { type: 'DIS', count: 2 }],
    editorial: {
        name: 'Editorial Pedro Castillo',
        id: 'sdf',
        mainColor: 'sdf',
        contrastColor: 'asd'
    }
}

const Perfil = () => {

    switch (profileData.type) {
        case 'PERSON':
            return <PerfilPersona {...profileData} />
        case 'EDITORIAL':
            return <PerfilEditorial {...profileData} />
        default:
            return <div>Tipo de perfil inválido</div>;
    }
}

export default Perfil;
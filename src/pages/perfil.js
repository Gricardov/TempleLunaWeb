import React, { useState, useEffect } from 'react';
import PerfilPersona from './perfil_persona';
import PerfilEditorial from './perfil_editorial';

const profileData = {
    /*
    type: 'PERSON',
    name: 'Shany Dubi',
    networks: [
        'https://firebase.google.com/docs/firestore/security/rules-fields',
        'https://firebase.google.com/docs/firestore/security/rules-fields',
        'https://firebase.google.com/docs/firestore/security/rules-fields'
    ],
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
    */

    type: 'EDITORIAL',
    name: 'Editorial Pedro Castillo',
    followName: 'EditorialPedroCastillo',
    networks: [
        'https://wattpad.com',
        'youtube.com',
        'temple.com'
    ],
    roles: ['COLAB'],
    services: ['CRI', 'DIS'],
    members: [],
    about: {
        whoWeAre: 'Te voy a quitar todo, todo, todito. ¿Tienes? Dirás tenemos. Bienvenido a mi gobierno, junto al COVID-21 vamos a ser tu peor pesadilla',
        objective: '',
        joinable: false,
        contact: {
            messengerType: '',
            number: ''
        },
        createAt: ''
    },
    likes: 20,
    views: 30,
    statistics: [{ type: 'CRI', cound: 10 }, { type: 'DIS', count: 2 }],
    theme: {
        main: '#BE67C1',
        contrast: '#FFF'
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
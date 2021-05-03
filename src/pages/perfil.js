import React, { useState, useEffect } from 'react';
import PerfilPersona from './perfil_persona';
import PerfilEditorial from './perfil_editorial';
import LoadingScreen from '../componentes/loading-screen';
import { getProfileByQueryFollowName } from '../api';

const profileData = {
    /*
    type: 'PERSON',
    fName: 'Shany',
    lName:'Dubi',
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
    services: [{ id: 'CRI' }, { id: 'DIS' }],
    members: [],
    about: {
        whoWeAre: 'Te voy a quitar todo, todo, todito. ¿Tienes? Dirás tenemos. Bienvenido a mi gobierno, junto al COVID-21 vamos a ser tu peor pesadilla',
        objective: '',
        joinable: false,
        contact: {
            messengerType: '',
            number: ''
        },
        createdAt: ''
    },
    /*likes: 20,
    views: 30,
    statistics: [{ type: 'CRI', count: 10 }, { type: 'DIS', count: 2 }],*/
    theme: {
        main: '#333333',
        contrast: '#FFF'
    }
}

const Perfil = ({ match }) => {

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const qFollowName = match.params.id;
        return getProfileByQueryFollowName(qFollowName.toLowerCase())
            .then(({ profile, error }) => {
                if (!error) {
                    setLoading(false);
                    setProfileData(profile);
                } else {
                    setLoading(false);
                    alert('Ha ocurrido un error al obtener al perfil');
                }
            })
    }, []);

    if (loading) {
        return <LoadingScreen text={'Obteniendo perfil'} />
    } else if (profileData) {
        switch (profileData.type) {
            case 'PERSON':
                return <PerfilPersona {...profileData} />
            case 'EDITORIAL':
                return <PerfilEditorial {...profileData} />
            default:
                return <PerfilPersona {...profileData} />
        }
    } else {
        return <div>No hay información del perfil</div>
    }
}

export default Perfil;
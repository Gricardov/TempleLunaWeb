import React, { useContext } from 'react';
import Avatar from '../avatar';
import { getDateText, getExpDateText } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaintBrush, faEye, faBoxOpen, faTasks } from '@fortawesome/free-solid-svg-icons';
import { getProfileStorage } from '../../helpers/userStorage';
import './card.css'

const Card = React.forwardRef(({ data, select }, ref) => {

    const { logged } = useContext(AuthContext);
    const history = useHistory();

    const isTakenByMe = data?.takenBy == logged.uid;

    const profile = getProfileStorage();
    const artist = {
        fName: profile.fName || '',
        lName: profile.lName || '',
        contactEmail: profile.contactEmail || '',
        networks: profile.networks || []
    };
    data.artist = artist;
    
    return (
        <div ref={ref} className='request-card-container'>
            <div className='header-container'>
                <Avatar clases='request-avatar img-avatar-container' />
                <div className='title-container'>
                    <h4 className='clamp clamp-1'>{data?.title}</h4>
                    <p>
                        {
                            data?.status == 'DISPONIBLE' || isTakenByMe && data?.status == 'HECHO'
                                ?
                                getDateText(data?.createdAt.seconds * 1000)
                                :
                                isTakenByMe && data?.status == 'TOMADO'
                                    ?
                                    getExpDateText(data?.expDate.seconds * 1000)
                                    :
                                    null
                        }
                    </p>
                </div>
            </div>
            <div className='description-container'>
                <p className='clamp clamp-2'>
                    {data.about || data.intention}
                </p>
            </div>
            <div className='footer-card-container'>
                <div className='button-container'>
                    {
                        data?.status == 'TOMADO' && isTakenByMe
                        && (
                            data?.type == 'CRITICA'
                                ?
                                <button onClick={() => history.push('prep_critica', { data })} className='button button-green button-option-request'>
                                    <FontAwesomeIcon color={'#fff'} icon={faEdit} className='icon' />
                                    Iniciar crítica
                                </button>
                                :
                                data?.type == 'DISENO'
                                    ?
                                    <button onClick={() => history.push('prep_diseno', { data })} className='button button-green button-option-request'>
                                        <FontAwesomeIcon color={'#fff'} icon={faPaintBrush} className='icon' />
                                    Iniciar diseño
                                </button>
                                    :
                                    data?.type == 'CORRECCION'
                                        ?
                                        <button onClick={() => history.push('prep_correccion', { data })} className='button button-green button-option-request'>
                                            <FontAwesomeIcon color={'#fff'} icon={faTasks} className='icon' />
                                    Iniciar corrección
                                </button>
                                        :
                                        null
                        )
                    }
                    {
                        data?.status == 'HECHO' && isTakenByMe
                        && (
                            <button onClick={() => history.push(`prev_resultado?id=${data.id}&origin=tl`)} className='button button-green button-option-request'>
                                <FontAwesomeIcon color={'#fff'} icon={faEye} className='icon' />
                                Ir a resultado
                            </button>
                        )
                    }
                    <button onClick={() => select(data)} className='button button-blue button-option-request'>
                        <FontAwesomeIcon color={'#fff'} icon={faBoxOpen} className='icon' />
                        Abrir
                </button>
                </div>
            </div>
        </div>
    )
})

export default Card;
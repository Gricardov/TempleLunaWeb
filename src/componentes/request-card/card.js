import React, { useContext } from 'react';
import Avatar from '../avatar';
import { getDateText } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaintBrush, faEye } from '@fortawesome/free-solid-svg-icons';
import './card.css'

const Card = React.forwardRef(({ data, select }, ref) => {

    const { logged } = useContext(AuthContext);
    const history = useHistory();

    return (
        <div ref={ref} className='request-card-container'>
            <div className='header-container'>
                <Avatar clases='request-avatar' />
                <div className='title-container'>
                    <h3 className='clamp clamp-1'>{data?.title}</h3>
                    <p>{getDateText(data?.createdAt.seconds * 1000)}</p>
                </div>
            </div>
            <div className='description-container'>
                <p className='clamp clamp-2'>
                    {data.intention}
                </p>
            </div>
            <div className='footer-card-container'>
                <div className='button-container'>
                    {
                        data?.status == 'TOMADO' && data?.takenBy == logged.uid
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
                                    null
                        )
                    }
                    <button onClick={() => select(data)} className='button button-blue button-option-request'>
                        <FontAwesomeIcon color={'#fff'} icon={faEye} className='icon' />
                        Ver
                </button>
                </div>
            </div>
        </div>
    )
})

export default Card;
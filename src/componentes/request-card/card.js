import React from 'react'
import Avatar from '../avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faCheckCircle, faEye, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import './card.css'

const Card = ({ data }) => {
    return (
        <div className='request-card-container'>
            <div className='header-container'>
                <Avatar clases='request-avatar' />
                <div className='title-container'>
                    <h3 className='clamp clamp-1'>{data.title}</h3>
                    <p>Ayer a las 5:35</p>
                </div>
            </div>
            <div className='description-container'>
                <p className='clamp clamp-2'>
                    {data.intention}
                </p>
            </div>
            <div className='footer-container'>
                <div className='button-container'>
                    <button className='button button-green button-option-request'>
                        <FontAwesomeIcon color={'#fff'} icon={faEye} className='eye-icon' />
                        Ver
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;
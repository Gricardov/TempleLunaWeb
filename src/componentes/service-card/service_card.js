import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './service_card.css'

const Card = ({ titulo, vistas, img }) => {
    return (
        <div className='service_card' style={{ backgroundImage: `url(${img})` }}>
            <div className='service_card_overlay'>
                <div className='service_card_controls'>
                    <p>{titulo}</p>
                    <div>
                        <FontAwesomeIcon icon={faEye} size='sm' className='card_icon' />
                        {vistas}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ImgPortada from '../../img/portada1.jpg'
import './story_card.css'

const Card = ({ titulo, vistas }) => {
    return (
        <div className='story_card_container' style={{ backgroundImage: `url(${ImgPortada})` }}>
            <div className='story_card_overlay'>
                <div className='story_card_controls'>
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
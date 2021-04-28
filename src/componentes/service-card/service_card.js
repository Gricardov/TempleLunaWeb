import React from 'react';
import { hexToRgb } from '../../helpers/functions';
import './service_card.css';

const Card = ({ titulo, img, contrastColor }) => {

    contrastColor = contrastColor ? 'rgba(' + hexToRgb(contrastColor) + ',0.25)' : 'transparent';
    
    return (
        <div className='service_card' style={{ backgroundImage: `url(${img})` }}>
            <div className='service_card_overlay' style={{ backgroundColor: contrastColor }} >
                <div className='service_card_controls'>
                    <p>{titulo}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
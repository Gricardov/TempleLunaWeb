import React from 'react';
import { getServiceById } from '../../helpers/functions';
import './service_card.css';

const Card = ({ id, img, color }) => {

    const serviceData = getServiceById(id);

    if (serviceData) {

        return (
            <div className='service_card' style={{ backgroundImage: `url(${img || serviceData.img})`, backgroundColor: color || serviceData.color, backgroundSize: img && '100% 100%' }}>
                <div className='service_card_overlay'>
                    <div className='service_card_controls'>
                        <p>{serviceData.name}</p>
                    </div>
                </div>
            </div>
        )
    }

    return null;

}

export default Card;
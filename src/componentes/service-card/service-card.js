import React from 'react';
import { getServiceById } from '../../helpers/functions';
import './service-card.css';

const Card = ({ id, img, color }) => {

    const serviceData = getServiceById(id);

    if (serviceData) {

        return (
            <div className='service-card' style={{ backgroundImage: `url(${img || serviceData.editorialImg})`, backgroundColor: color || serviceData.color, backgroundSize: img && '100% 100%' }}>
                <div className='service-card__overlay'>
                    <div className='service-card__controls-standard'>
                        <p className='service-card__description clamp clamp-2'>{serviceData.name}</p>
                    </div>
                </div>
            </div>
        )
    }

    return null;

}

export default Card;
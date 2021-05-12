import React from 'react';
import { getServiceById } from '../../helpers/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import './result-preview-card.css';

const Card = ({ id, title, type, img, views = 0, likes = 0, onClick }) => {

    const serviceData = getServiceById(type);

    if (serviceData) {

        return (
            <div onClick={() => onClick(id)} className='result-preview-card' style={{ backgroundImage: `url(${img || serviceData.prevImg})`, cursor: onClick ? 'pointer' : 'unset' }}>
                <div className='result-preview-card__overlay'>
                    <div className='result-preview-card__controls-standard'>
                        <p className='result-preview-card__description clamp clamp-2'>{title}</p>
                        <div className='result-preview-card__statistics'>
                            <div className='result-preview-card__statistic'>
                                <FontAwesomeIcon icon={faEye} className='result-preview-card__statistic-icon' />
                                {views}
                            </div>
                            <div className='result-preview-card__statistic'>
                                <FontAwesomeIcon icon={faHeart} className='result-preview-card__statistic-icon' />
                                {likes}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    return null;

}

export default Card;
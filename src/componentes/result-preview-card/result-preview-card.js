import React from 'react';
import { getServiceById } from '../../helpers/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faLock } from '@fortawesome/free-solid-svg-icons';
import './result-preview-card.css';

const Card = ({ id, title, type, resultUrl, img, views = 0, likes = 0, hidden, isOwner, onClick }) => {

    const serviceData = getServiceById(type);

    if (serviceData) {

        return (
            <div onClick={() => (onClick && (isOwner || !hidden)) && onClick(id)} className='result-preview-card' style={{ backgroundImage: `url(${((!hidden || isOwner) && type == 'DISENO' && resultUrl) || img || serviceData.prevImg})`, cursor: onClick && (!hidden || isOwner) ? 'pointer' : 'unset', opacity: (hidden && !isOwner) ? '0.6' : '1' }}> {/*Se mostrará la imagen de fondo de diseño si está pública, caso contrario, la predeterminada*/}
                <div className='result-preview-card__overlay'>
                    <div className='result-preview-card__controls-standard'>
                        <div className='result-preview-card__description clamp clamp-2 no-break'>
                            {
                                hidden &&
                                <FontAwesomeIcon icon={faLock} className='result-preview-card__lock-icon' />
                            }
                            {' ' + title}
                        </div>
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
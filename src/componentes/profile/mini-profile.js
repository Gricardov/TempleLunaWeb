import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSnIconByUrl } from '../../helpers/functions';
import Avatar from '../avatar';
import './mini-profile.css';

export const MiniProfile = ({ img, title, networks = [], description, editorial }) => {

    const history = useHistory();

    const navigateTo = (route) => {
        history.push(route);
    }

    return (
        <div className='mini-profile'>
            <div className='mini-profile__img-container'>
                <Avatar img={img} onClick={() => navigateTo("/profile/gricardov")} />
            </div>
            <div className='mini-profile__data-container'>
                <div className='mini-profile__pre-header'>
                    <span className='mini-profile__pre-title'>Realizado por</span>
                </div>
                <div className='mini-profile__header'>
                    <a className='mini-profile__title clamp clamp-1'>{title}</a>
                    {
                        editorial
                            ?
                            <span style={{ color: editorial.contrastColor, background: editorial.mainColor }} className='mini-profile__tag'>{editorial.name}</span>
                            :
                            <span className='mini-profile__tag'>Independiente</span>
                    }
                </div>
                <div className='mini-profile__body'>
                    <div className='mini-profile__description clamp clamp-2 no-break'>
                        {description}
                    </div>
                    <div className='mini-profile__rs'>
                        {
                            networks.slice(0, 3).map(network => {
                                const iconData = getSnIconByUrl(network);

                                if (iconData) {
                                    return (
                                        <a target='_blank' href={network} className={`mini-profile__sn-icon ${iconData.className}`}>
                                            <img src={iconData.imgSrc} alt='img-icon' />
                                        </a>
                                    )
                                }
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniProfile;

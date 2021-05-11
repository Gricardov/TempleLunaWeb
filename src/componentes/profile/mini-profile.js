import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getSnIconByUrl } from '../../helpers/functions';
import Avatar from '../avatar';
import './mini-profile.css';

export const MiniProfile = ({ id, img, title, networks = [], editorial }) => {

    const history = useHistory();

    const navigateTo = (route) => {
        history.push(route);
    }

    return (
        <div className='mini-profile'>

            <div className='mini-profile__always-visible'>
                <div className='mini-profile__img-container'>
                    <Avatar img={img} onClick={() => navigateTo(`/perfil/${id}`)} />
                </div>
                <div className='mini-profile__data-container'>
                    <div className='mini-profile__pre-header'>
                        <span className='mini-profile__pre-title'>Realizado por</span>
                    </div>
                    <div className='mini-profile__header'>
                        <Link to={`/perfil/${id}`} className='mini-profile__title clamp clamp-1'>{title}</Link>
                        {
                            editorial
                                ?
                                <Link to={`/perfil/${editorial.id}`} style={{ color: editorial.contrastColor, background: editorial.mainColor }} className='mini-profile__tag clamp clamp-1'>{editorial.name}</Link>
                                :
                                <span className='mini-profile__tag'>Independiente</span>
                        }
                    </div>
                </div>
                <div className='mini-profile__rs-container'>
                    <div className='mini-profile__rs-title'>Sígueme en:</div>
                    <div className='mini-profile__rs'>
                        {
                            networks.slice(0, 3).map(network => {
                                const iconData = getSnIconByUrl(network);

                                if (iconData) {
                                    return (
                                        <a target='_blank' href={network} className={`mini-profile__sn-icon`}>
                                            <img src={iconData.imgSrc} alt='img-icon' />
                                        </a>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='mini-profile__only-mobile'>
                <div className='mini-profile__only-mobile__rs-title'>Sígueme en: </div>
                {
                    networks.slice(0, 3).map(network => {
                        const iconData = getSnIconByUrl(network);

                        if (iconData) {
                            return (
                                <a target='_blank' href={network} className={`mini-profile__only-mobile__sn-icon`}>
                                    <img src={iconData.imgSrc} alt='img-icon' />
                                </a>
                            )
                        }
                    })
                }
                {
                    editorial
                        ?
                        <Link to={`/perfil/${editorial.id}`} style={{ color: editorial.contrastColor, background: editorial.mainColor }} className='mini-profile__only-mobile__tag clamp clamp-1'>{editorial.name}</Link>
                        :
                        <span className='mini-profile__only-mobile__tag'>Independiente</span>
                }
            </div>

        </div>
    )
}

export default MiniProfile;

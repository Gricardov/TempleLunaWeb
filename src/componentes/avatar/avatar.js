import React, { useState, useEffect } from 'react'
import GenericUserImg from '../../img/usuario-generico.svg'
import './avatar.css';

const Avatar = ({ img, clases }) => {
    const [avatarImg, setAvatarImg] = useState(GenericUserImg);

    useEffect(() => {
        setAvatarImg(avatarImg);
    }, [img])

    return (
        <div className={clases+' img-avatar-container'}>
            <img className='img-avatar' onError={() => setAvatarImg(GenericUserImg)} alt='img-avatar' src={avatarImg} />
        </div>
    )
}

export default Avatar;

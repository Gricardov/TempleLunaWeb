import React, { useState, useEffect } from 'react'
import GenericUserImg from '../../img/usuario-generico.svg'

const Avatar = ({ img, clases }) => {
    const [avatarImg, setAvatarImg] = useState(GenericUserImg);

    useEffect(() => {
        setAvatarImg(avatarImg);
    }, [img])

    return (
        <img onError={() => setAvatarImg(GenericUserImg)} alt='img-avatar' src={avatarImg} className={clases} />
    )
}

export default Avatar;

import React, { useState, useEffect } from 'react';
import GenericUserImg from '../../img/usuario-generico.svg';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import './avatar.css';

const override = css`
  display: block;
  width: 50%;
  height: 50%;
`;

const Avatar = ({ img = GenericUserImg, clases, defaultImg = GenericUserImg, onClick }) => {

    const [avatarImg, setAvatarImg] = useState(img);
    const [loading, setLoading] = useState(true);

    const updateImg = () => {
        setLoading(false);
        setAvatarImg(defaultImg);
    }

    useEffect(() => {
        setAvatarImg(img);
    }, [img]);

    return (
        <>
            {
                loading
                &&
                <div className={'flex-all-center img-avatar-container__img ' + clases}>
                    <ClipLoader color={'black'} loading className='loader' css={override} />
                </div>
            }
            <div onClick={onClick} className={`${'flex-all-center img-avatar-container__img ' + clases} ${loading ? 'd-none' : 'd-block'}`} style={{ backgroundImage: `url(${avatarImg})`, cursor: onClick && 'pointer' }} />
            <img className={'d-none'} onLoad={() => setLoading(false)} onError={() => updateImg(defaultImg)} alt='img-avatar' src={avatarImg} />
        </>
    )
}

export default Avatar;

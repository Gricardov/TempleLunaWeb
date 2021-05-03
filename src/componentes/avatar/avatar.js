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

const Avatar = ({ img = GenericUserImg, clases, defaultImg = GenericUserImg }) => {

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
                <div className={'flex-all-center ' + clases}>
                    <ClipLoader color={'black'} loading className='loader' css={override} />
                </div>
            }
            <img className={`${'flex-all-center ' + clases} ${loading ? 'd-none' : 'd-block'}`} onLoad={() => setLoading(false)} onError={() => updateImg(defaultImg)} alt='img-avatar' src={avatarImg} />
        </>
    )
}

export default Avatar;

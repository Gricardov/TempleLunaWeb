import React from 'react'
import PuffLoader from "react-spinners/PuffLoader"
import { css } from "@emotion/core"
import Logo from '../../img/logo.png'

const override = css`
  display: block;
  margin: 0 auto;
`;

const Screen = ({ text }) => {
    return (
        <div className='loading-screen'>
            <div className='loader-container'>
                <PuffLoader color={'#fff'} loading className='loader' css={override} size={300} />
                <div className='content-loader-container'>
                    <img alt='logo' src={Logo} />
                    {
                        text
                        &&
                        <p className='clamp clamp-2'>{text}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Screen;
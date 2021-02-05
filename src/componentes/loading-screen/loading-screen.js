import React from 'react'
import PuffLoader from "react-spinners/PuffLoader"
import { css } from "@emotion/core"
import Logo from '../../img/logo.png'
import './loading-screen.css'

const override = css`
  display: block;
  margin: 0 auto;
`;

const Screen = () => {
    return (
        <div className='loading-screen'>
            <div className='loader-container'>
            <PuffLoader color={'#fff'} loading className='loader' css={override} size={300} />
                <img alt='logo' src={Logo} />
            </div>
        </div>
    )
}

export default Screen;
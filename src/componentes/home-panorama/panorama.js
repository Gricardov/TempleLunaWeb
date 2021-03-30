import React from 'react'
import Navbar from '../navbar'
import Fade from 'react-reveal/Fade';
import ImgColaboracion from '../../img/colaboracion.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './panorama.css'

export const Panorama = () => {
    return (
        <div className='panorama'>
            <Navbar startTransparent={true} />
            <div className='container-xl container-header'>
                <div className='container-controls-header'>
                    <Fade left>
                        <h1>(prueba) Empieza a ser admirado por tu forma de escribir</h1>
                    </Fade>
                    <Fade left>
                        <a target='_blank' rel="noreferrer" href='https://www.facebook.com/groups/1004324056570387' className='button button-green'>
                            Únete al grupo
                        {' '}
                            <FontAwesomeIcon icon={faAngleRight} size='lg' />
                        </a>
                    </Fade>
                </div>
                <div className='img-container'>
                    <img src={ImgColaboracion} className='img-colaboration' alt='img-colaboracion' />
                </div>
            </div>
        </div>
    )
}

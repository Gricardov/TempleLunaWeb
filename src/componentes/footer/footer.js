import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import ImgFooter1 from '../../img/img-footer-1.svg';
import ImgFooter2 from '../../img/img-footer-2.svg';
import './footer.css'

const Footer = () => {
    return (
        <footer className='main-footer'>
            <div className='container-sm text-align-center main-container-footer'>
                <h2>¿Quieres ser de los primeros?</h2>
                <p>
                    Sigue el lanzamiento 2021 y promociona tu obra en nuestro grupo oficial.
                </p>
                <a target='_blank' rel="noreferrer" href='https://www.facebook.com/groups/1004324056570387' className='button button-green btn-footer'>
                    Únete
                    {' '}
                    <FontAwesomeIcon icon={faAngleRight} size='lg' />
                </a>
            </div>
            <img src={ImgFooter1} className='img-footer-1' alt='img-footer-1' />
            <img src={ImgFooter2} className='img-footer-2' alt='img-footer-2' />
            <div className='container-xl'>
                <p className='made-text-footer text-align-center'>
                    Hecho con
                    {' '}
                    <FontAwesomeIcon icon={faHeart} size='sm' color='#FF4141' />
                    {' '}
                    por <b>Temple Luna</b>
                </p>
            </div>
        </footer>
    )
}

export default Footer;
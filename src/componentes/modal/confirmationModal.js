import React, { useEffect } from 'react';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import './modals.css';

const Modal = ({ isOpen, title, message, confirm, close }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    let styles = '';
    if (isOpen) {
        styles = 'open';
    } else {
        styles = 'close';
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    return (
        <div className='confirmation-modal-container'>
            <div className={'overlay overlay-modal ' + styles} onClick={close}>
            </div>
            <Zoom bottom collapse when={isOpen}>
                <div className={'modal modal-fit modal-center ' + styles}>
                    <div className='modal-container'>
                        <div className='header-container position-relative'>
                            <div className='title-container'>
                                <h3 className='clamp clamp-1'>{title}</h3>
                            </div>
                        </div>
                        <div className='description-container'>
                            <p>{message}</p>
                        </div>
                        <div className="footer-card-container">
                            <div className='button-container'>
                                <button onClick={confirm} className='button button-blue button-option-request'>
                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} className='icon' />
                                    Sí, continuar
                                </button>
                                <button onClick={close} className='button button-red button-option-request'>
                                    <FontAwesomeIcon color={'#fff'} icon={faArrowLeft} className='icon' />
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Zoom>
        </div>
    )
}

export default Modal;
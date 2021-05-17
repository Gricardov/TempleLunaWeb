import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './modals.css';

const Modal = ({ isOpen, close, authorName, title, message }) => {

    let styles = '';

    if (isOpen) {
        styles = 'open';
    } else {
        styles = 'close';
    }

    return (
        <>
            <div className={'overlay overlay-modal ' + styles} onClick={close}>
            </div>
            <Zoom bottom collapse when={isOpen}>
                <div className={`modal modal-fit modal-center`}>

                    <div className='modal-container'>
                        <div className='header-container position-relative'>
                            <div className='title-container'>
                                <h3 className='clamp clamp-2'>Obra: {title}</h3>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                        </div>
                        <div className='description-container'>
                            <p>
                                {<><b>{authorName} comentó: </b> {message}</> || <i>{authorName + ' dejó un mensaje vacío'}</i>}
                            </p>
                        </div>
                        <div className="footer-card-container">
                            <button onClick={close} className='button button-green stretch'>
                                <FontAwesomeIcon icon={faCheck} size='xl' />
                                {' '}
                                        Listo
                            </button>
                        </div>
                    </div>

                </div>
            </Zoom>
        </>
    )
}

export default Modal;
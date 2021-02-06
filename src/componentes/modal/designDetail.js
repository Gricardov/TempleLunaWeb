import React, { useEffect } from 'react';
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import './designDetail.css';

const Modal = ({ isOpen, data, close }) => {

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
        <>
            <div className={'overlay ' + styles} onClick={close}>
                <Zoom bottom collapse when={isOpen}>
                    <div onClick={() => { }} className={'modal ' + styles}>
                        <div className='request-modal-container'>
                            <div className='header-container position-relative'>
                                <Avatar clases='request-modal-avatar' />
                                <div className='title-container'>
                                    <h3 className='clamp clamp-1'>{data?.title}</h3>
                                    <p>Ayer a las 5:35</p>
                                </div>
                                <FontAwesomeIcon icon={faAngleDown} className='close-icon' />
                            </div>
                            <div className='description-container'>
                                <p>{data?.intention}</p>
                                <h4>Link de la obra</h4>
                                {
                                    data?.link
                                        ?
                                        <a href="#">{data?.link}</a>
                                        :
                                        <p>No existe link</p>
                                }
                                <h4>Puntos solicitados</h4>
                                <ul>
                                    {
                                        data?.points?.map(point => (
                                            <li>{point}</li>
                                        ))
                                    }
                                </ul>
                                {
                                    (!data?.points || data?.points?.length < 1)
                                    &&
                                    <p>No se han especificado puntos</p>
                                }
                                <h4>Contacto del solicitante</h4>
                                <p>Disponible al aceptar el pedido</p>
                            </div>
                        </div>

                    </div>

                </Zoom>
            </div>
        </>
    )
}

export default Modal;

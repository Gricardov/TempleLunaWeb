import React, { useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { designTypes } from '../../data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHandPaper, faTimes } from '@fortawesome/free-solid-svg-icons';
import './requestDetail.css';

const iconSize = 20;
const color = '#756F86';

const Modal = ({ isOpen, data, close }) => {

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

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

    const getDesignType = (type) => {
        const obj = designTypes.find(e => e.type == type);
        if (obj) {
            return obj;
        }
        return {};
    }
    const { icon, text } = getDesignType(data?.designType)
    return (
        <div>

            <div className={'overlay overlay-modal ' + styles} onClick={close}>
            </div>

            <Zoom bottom collapse when={isOpen}>
                <div className={'modal ' + styles}>
                    <div className='request-modal-container'>
                        <div className='header-container position-relative'>
                            <Avatar clases='request-modal-avatar' />
                            <div className='title-container'>
                                <h3 className='clamp clamp-1'>{data?.title}</h3>
                                <p>Ayer a las 5:35 - Expira en 3 días</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                        </div>
                        <div className='description-container'>
                            <h4>Tipo de diseño</h4>
                            <span className={icon} style={{ color, fontSize: iconSize }}>{data?.icon}</span>
                            <p className='d-inline ml-1'>{text}</p>
                            <h4>¿Qué quiero transmitir?</h4>
                            <p>{data?.intention || 'No hay intención'}</p>
                            <h4>Boceto de referencia</h4>
                            {
                                data?.urlImg
                                    ?
                                    <div>
                                        <a target='_blank' href={data?.urlImg}>
                                            <img src={data?.urlImg} alt='img-boceto' className='sample-design-detail' />
                                        </a>
                                    </div>
                                    :
                                    <p>'No hay boceto de referencia</p>
                            }
                            <h4>Link de la obra</h4>
                            {
                                data?.link
                                    ?
                                    <a target='_blank' href={data?.link}>{data?.link}</a>
                                    :
                                    <p>No existe link</p>
                            }
                            <h4>Pseudónimo del autor</h4>
                            <p>{data?.author || 'Sin nombre'}</p>
                        </div>
                        <div className="footer-card-container">
                            <div className='button-container'>
                                <button onClick={() => setOpenConfirmationModal(true)} className='button button-blue button-option-request'>
                                    <FontAwesomeIcon color={'#fff'} icon={faHandPaper} className='icon' />
                                    Tomar pedido
                                </button>
                                <button onClick={close} className='button button-red button-option-request'>
                                    <FontAwesomeIcon color={'#fff'} icon={faTimes} className='icon' />
                                    Cerrar
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
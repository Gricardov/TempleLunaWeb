import React, { useEffect } from 'react';
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { critiquePoints } from '../../data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHandPaper, faTimes } from '@fortawesome/free-solid-svg-icons';
import './modals.css';

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

    const getAbrevPointName = (id) => {
        const obj = critiquePoints.find(e => e.id == id);
        if (obj) {
            return obj.abrev;
        }
        return '';
    }

    return (
        <>
            <div className={'overlay overlay-modal ' + styles} onClick={close}>
            </div>
            <Zoom bottom collapse when={isOpen}>
                <div className={'modal ' + styles}>
                    <div className='modal-container'>
                        <div className='header-container position-relative'>
                            <Avatar clases='modal-avatar' />
                            <div className='title-container'>
                                <h3 className='clamp clamp-1'>{data?.title}</h3>
                                <p>Ayer a las 5:35 - Expira en 3 días</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                        </div>
                        <div className='description-container'>
                            <p>{data?.about || 'No hay descripción'}</p>
                            <h4>Link de la obra</h4>
                            {
                                data?.link
                                    ?
                                    <a target='_blank' href={data?.link}>{data?.link}</a>
                                    :
                                    <p>No existe link</p>
                            }
                            <h4>¿Qué quiero transmitir?</h4>                            
                            <p>{data?.intention || 'No hay intención'}</p>                            
                            <h4>Puntos a criticar</h4>
                            <ul>
                                {
                                    data?.points?.map(point => (
                                        <li>{getAbrevPointName(point)}</li>
                                    ))
                                }
                            </ul>
                            {
                                (!data?.points || data?.points?.length < 1)
                                &&
                                <p>No se han especificado puntos</p>
                            }
                        </div>
                        <div className="footer-card-container">
                            <div className='button-container'>
                                <button onClick={() => { }} className='button button-blue button-option-request'>
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
        </>
    )
}

export default Modal;
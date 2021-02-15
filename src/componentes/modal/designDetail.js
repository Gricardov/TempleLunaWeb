import React, { useContext, useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { contactTypes } from '../../data/data';
import { useHistory } from 'react-router-dom';
import { designTypes } from '../../data/data';
import { AuthContext } from '../../context/AuthContext';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHandPaper, faPaintBrush, faTimes } from '@fortawesome/free-solid-svg-icons';
import './modals.css';

const iconSize = 20;
const color = '#756F86';

const overrideSpinnerInline = css`
  display: inline-block;
  margin-left: .6rem;
  vertical-align: middle;
`;

const Modal = ({ isOpen, data, takeRequest, takingRequest, succesfulRequestTake, close }) => {

    const { logged } = useContext(AuthContext);

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    const history = useHistory();

    const getMessengerTypeName = (type) => {
        const messengerType = contactTypes.find(c => c.type == type);
        if (messengerType) {
            return messengerType.name;
        }
        return '';
    }

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
    const { icon, text } = getDesignType(data?.designType);

    const confirm = () => {
        setOpenConfirmationModal(false);
        takeRequest(data?.id);
    }

    const isTakenByMe = data?.status == 'TOMADO' && data?.takenBy == logged.uid;

    return (
        <>
            <ConfirmationModal
                isOpen={openConfirmationModal}
                title='Casi listo'
                message='Al aceptar, tienes tres días para entregar la crítica o acordar una fecha con la persona interesada. ¿Continuar?'
                confirm={confirm}
                close={() => setOpenConfirmationModal(false)} />
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
                            {
                                isTakenByMe
                                &&
                                <>
                                    <h4>Datos de contacto</h4>
                                    <p className="m-0"><b>Nombre:</b> {data?.name}</p>
                                    <p className="m-0"><b>Contacto:</b> {data?.phone} ({getMessengerTypeName(data?.messengerType)})</p>
                                    <p className="m-0 mb-2"><b>Correo:</b> {data?.email}</p>
                                </>
                            }
                        </div>
                        <div className="footer-card-container">
                            <div className='button-container'>
                                {
                                    takingRequest
                                        ?
                                        <button onClick={() => { }} className='button button-blue button-option-request'>
                                            Cargando
                                                {' '}
                                            <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                        </button>
                                        :
                                        <>
                                            <>
                                                {
                                                    data?.status == 'DISPONIBLE'
                                                        ?
                                                        <button onClick={() => setOpenConfirmationModal(true)} className='button button-blue button-option-request'>
                                                            <FontAwesomeIcon color={'#fff'} icon={faHandPaper} className='icon' />
                                                            Tomar pedido
                                                        </button>
                                                        :
                                                        isTakenByMe
                                                            ?
                                                            <button onClick={() => history.push('prep_diseno', { data })} className='button button-green button-option-request'>
                                                                <FontAwesomeIcon color={'#fff'} icon={faPaintBrush} className='icon' />
                                                            Iniciar diseño
                                                            </button>
                                                            :
                                                            null
                                                }
                                            </>
                                            <button onClick={close} className='button button-red button-option-request'>
                                                <FontAwesomeIcon color={'#fff'} icon={faTimes} className='icon' />
                                                Cerrar
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Zoom>
        </>
    )
}

export default Modal;
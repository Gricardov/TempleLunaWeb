import React, { useContext } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { getDateText, getExpDateText, getMessengerTypeName, getDesignType, getFormattedPhone, extractLink } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faExchangeAlt, faEye, faHandPaper, faPaintBrush, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './modals.css';

const overrideSpinnerInline = css`
  display: inline-block;
  margin-left: .6rem;
  vertical-align: middle;
`;

const Modal = ({ isOpen, data, loading, openConfirmationModal, close }) => {

    const history = useHistory();

    const { logged } = useContext(AuthContext);
    const { icon, name } = getDesignType(data?.designType);
    const isTakenByMe = data?.takenBy == logged.uid;
    const messengerType = data?.messengerType;
    const formattedPhone = getFormattedPhone(data?.phone);
    const formattedLink = extractLink(data?.link);

    let styles = '';
    if (isOpen) {
        styles = 'open';
    } else {
        styles = 'close';
    }

    if (isTakenByMe) {
        getExpDateText(data?.takenAt, data?.expDate)
    }

    return (
        <>
            <div className={'overlay overlay-modal ' + styles} onClick={close} />
            <Zoom bottom collapse when={isOpen}>
                <div className={'modal ' + styles}>
                    <div className='modal-container'>
                        <div className='header-container position-relative'>
                            <Avatar clases='modal-avatar img-avatar-container' />
                            <div className='title-container'>
                                <h3 className='clamp clamp-2'>{data?.title}</h3>
                                <p>{
                                    data?.status == 'DISPONIBLE' || isTakenByMe && data?.status == 'HECHO'
                                        ?
                                        getDateText(data?.createdAt.seconds * 1000)
                                        :
                                        isTakenByMe && data?.status == 'TOMADO'
                                            ?
                                            getExpDateText(data?.expDate.seconds * 1000)
                                            :
                                            null
                                }</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                        </div>
                        <div className='description-container'>
                            <h4>Tipo de diseño</h4>
                            <p>
                                <span className={icon + ' mr-1'}>{data?.icon}</span>
                                {name}
                            </p>
                            {
                                data?.designType == 'CR'
                                &&
                                <>
                                    <h4>Días para el lanzamiento</h4>
                                    <p>{data?.daysLeft}</p>
                                </>
                            }
                            <h4>¿Qué me gustaría ver?</h4>
                            <p>{data?.intention || 'No hay especificaciones'}</p>
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
                                    <p>No hay boceto de referencia</p>
                            }
                            <h4>Link de la obra</h4>
                            {
                                formattedLink
                                    ?
                                    <a target='_blank' className='clamp clamp-1' href={formattedLink}>{formattedLink}</a>
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
                                    <p className="m-0"><b>Contacto:</b> {data?.phone} ({getMessengerTypeName(messengerType)})</p>
                                    {
                                        messengerType == 'WSP' && formattedPhone
                                        &&
                                        <button onClick={() => window.open('https://web.whatsapp.com/send?phone=' + formattedPhone)} className='button button-whatsapp button-blue button-option-request my-1'>
                                            <FontAwesomeIcon color={'#fff'} icon={faWhatsapp} className='icon' />
                                                Contactar
                                        </button>
                                    }
                                    <p className="m-0 mb-2"><b>Correo:</b> {data?.email}</p>
                                </>
                            }
                        </div>
                        <div className="footer-card-container">
                            <div className='button-container'>
                                {
                                    loading
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
                                                        <button onClick={() => openConfirmationModal(true, 'TAKE_REQUEST')} className='button button-blue button-option-request'>
                                                            <FontAwesomeIcon color={'#fff'} icon={faHandPaper} className='icon' />
                                                            Tomar pedido
                                                        </button>
                                                        :
                                                        data?.status == 'TOMADO' && isTakenByMe
                                                            ?
                                                            <>
                                                                <button onClick={() => history.push('prep_diseno', { data })} className='button button-green button-option-request'>
                                                                    <FontAwesomeIcon color={'#fff'} icon={faPaintBrush} className='icon' />
                                                                    Iniciar diseño
                                                                </button>
                                                                <button onClick={() => openConfirmationModal(true, 'RESIGN_REQUEST')} className='button button-dark-purple button-option-request'>
                                                                    <FontAwesomeIcon color={'#fff'} icon={faExchangeAlt} className='icon' />
                                                                    Devolver pedido
                                                                </button>
                                                            </>
                                                            :
                                                            null
                                                }
                                            </>
                                            {
                                                data?.status == 'HECHO' && isTakenByMe
                                                && (
                                                    <button onClick={() => history.push(`prev_resultado?id=${data.id}&origin=tl`)} className='button button-green button-option-request'>
                                                        <FontAwesomeIcon color={'#fff'} icon={faEye} className='icon' />
                                                        Ir a resultado
                                                    </button>
                                                )
                                            }
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
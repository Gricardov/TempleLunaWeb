import React, { useContext, useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { contactTypes } from '../../data/data';
import { getDateText, getExpDateText } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { critiquePoints } from '../../data/data';
import { AuthContext } from '../../context/AuthContext';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEdit, faHandPaper, faLayerGroup, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getProfileStorage } from '../../helpers/userStorage';
import './modals.css';

const overrideSpinnerInline = css`
  display: inline-block;
  margin-left: .6rem;
  vertical-align: middle;
`;

const Modal = ({ isOpen, data, takeRequest, takingRequest, close }) => {

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

    const getAbrevPointName = (id) => {
        const obj = critiquePoints.find(e => e.id == id);
        if (obj) {
            return obj.abrev;
        }
        return '';
    }

    const confirm = () => {
        setOpenConfirmationModal(false);
        takeRequest(data?.id);
    }

    const isTakenByMe = data?.takenBy == logged.uid;

    const profile = getProfileStorage();
    const artist = {
        fName: profile?.fName || '',
        lName: profile?.lName || '',
        contactEmail: profile?.contactEmail || '',
        networks: profile?.networks || []
    };
    if (data){
        data.artist = artist;
    }    

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
                                        <li key={point}>{getAbrevPointName(point)}</li>
                                    ))
                                }
                            </ul>
                            {
                                (!data?.points || data?.points?.length < 1)
                                &&
                                <p>No se han especificado puntos</p>
                            }
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
                                                        data?.status == 'TOMADO' && isTakenByMe
                                                            ?
                                                            <button onClick={() => history.push('prep_critica', { data })} className='button button-green button-option-request'>
                                                                <FontAwesomeIcon color={'#fff'} icon={faEdit} className='icon' />
                                                            Iniciar crítica
                                                            </button>
                                                            :
                                                            null
                                                }
                                            </>
                                            {
                                                data?.status == 'HECHO' && isTakenByMe
                                                && (
                                                    <button onClick={() => history.push('prev_resultado', { data })} className='button button-green button-option-request'>
                                                        <FontAwesomeIcon color={'#fff'} icon={faLayerGroup} className='icon' />
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
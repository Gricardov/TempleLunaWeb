import React, { useContext, useState } from 'react';
import ConfirmationModal from './confirmationModal';
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { contactTypes } from '../../data/data';
import { getDateText, getExpDateText } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { designTypes } from '../../data/data';
import { addCommentRequestResult } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './modals.css';

const iconSize = 20;
const color = '#756F86';

const overrideSpinnerInline = css`
  display: inline-block;
  margin-left: .6rem;
  vertical-align: middle;
`;

const Modal = ({ requestId, isOpen, type, close }) => {

    const { logged } = useContext(AuthContext);
    const [alias, setAlias] = useState('');
    const [feedback, setFeedback] = useState('');
    const [sendingFeedback, setSendingFeedback] = useState(false);
    const [success, setSuccess] = useState(false);

    let title = '';
    let message = '';
    let messagePlaceholder = '';
    let styles = '';
    if (isOpen) {
        styles = 'open';
    } else {
        styles = 'close';
    }

    switch (type) {
        case 'LIKE':
            title = '¡Maravilloso!';
            message = 'Has dado amor a esta crítica. ¿Deseas dejarle un mensaje al crítico?';
            messagePlaceholder = 'Me encantó la crítica, tu punto de vista me ayudará en mucho.';
            break;
        case 'UNLIKE':
            title = '¡Listo!';
            message = 'Siempre puedes decirle al crítico en qué podria mejorar';
            messagePlaceholder = 'Pienso que podrías mejorar estos aspectos: ...'
            break;
    }

    const addComment = () => {
        setSendingFeedback(true);
        if (!checkErrors()) {
            addCommentRequestResult(requestId, alias, feedback).then(({ data, error }) => {
                if (!error) {
                    setSendingFeedback(false);
                    setSuccess(true);
                } else {
                    setSendingFeedback(false);
                    alert('No se pudo agregar el mensaje');
                }
            });
        }
    }

    const checkErrors = () => {

        if (alias.length > 50) {
            alert('Tu alias debe tener de 1 a 50 caracteres');
            return true;
        }

        if (feedback.length > 1000) {
            alert('Tu mensaje debe tener de 1 a 1000 caracteres');
            return true;
        }

        return false;
    }

    return (
        <>
            <div className={'overlay overlay-modal ' + styles} onClick={close}>
            </div>
            <Zoom bottom collapse when={isOpen}>
                <div className={'modal modal-fit modal-center ' + styles}>
                    {
                        success
                            ?
                            <div className='modal-container'>
                                <div className='header-container position-relative'>
                                    <div className='title-container'>
                                        <h3 className='clamp clamp-1'>¡Listo!</h3>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                                </div>                                
                                <div className="footer-card-container">
                                    <button onClick={close} className='button button-green stretch'>
                                        <FontAwesomeIcon icon={faCheck} size='xl' />
                                        {' '}
                                        Volver
                                    </button>
                                </div>
                            </div>
                            :
                            <div className='modal-container'>
                                <div className='header-container position-relative'>
                                    <div className='title-container'>
                                        <h3 className='clamp clamp-1'>{title}</h3>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                                </div>
                                <div className='description-container'>
                                    <p>{message}</p>
                                    <form>
                                        <div className='form-group'>
                                            <label htmlFor="txtAlias">Tu alias</label>
                                            <input minLength="1" maxLength="50" type="text" value={alias} onChange={(e) => setAlias(e.target.value)} id="txtAlias" placeholder="Ingresa tu alias" />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtFeedback">Mensaje</label>
                                            <textarea minLength="1" maxLength="1000" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)} id="txtFeedback" placeholder={messagePlaceholder}></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="footer-card-container">
                                    {
                                        sendingFeedback
                                            ?
                                            <button className='button button-green stretch'>
                                                <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                            </button>
                                            :
                                            <button onClick={addComment} className='button button-green stretch'>
                                                <FontAwesomeIcon icon={faCheck} size='xl' />
                                                {' '}
                                    Enviar
                                    </button>
                                    }

                                </div>
                            </div>
                    }

                </div>
            </Zoom>
        </>
    )
}

export default Modal;
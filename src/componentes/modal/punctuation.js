import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Zoom from 'react-reveal/Zoom';
import { addCommentRequestResult } from '../../api';
import { css } from "@emotion/core";
import { FacebookShareButton } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import './modals.css';

const overrideSpinnerInline = css`
  display: inline-block;
  margin-left: .6rem;
  vertical-align: middle;
`;

const Modal = ({ isOpen, requestId, url, shareQuote, onFinishedSharedIntention, close }) => {

    const [alias, setAlias] = useState('');
    const [feedback, setFeedback] = useState('');
    const [sendingFeedback, setSendingFeedback] = useState(false);
    const [success, setSuccess] = useState(false);

    let styles = '';

    if (isOpen) {
        styles = 'open';
    } else {
        styles = 'close';
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
                <div className={`modal modal-fit modal-center ${success && 'punctuation-modal'}`}>
                    {
                        success
                            ?
                            <div className='modal-container'>
                                <div className='header-container position-relative'>
                                    <div className='title-container'>
                                        <h3 className='clamp clamp-1 text-align-center'>¡Mensaje enviado!</h3>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                                </div>
                                <div className='description-container'>
                                    <p>{'Por favor, ayúdanos compartiendo el trabajo del artista '}
                                        <FacebookShareButton
                                            onShareWindowClose={onFinishedSharedIntention}
                                            url={url.toString().replace(/templated=true/g, "")}
                                            quote={shareQuote}
                                            hashtag='#templeluna'
                                            style={{ color: '#8b81ec' }}>
                                            aquí.
                                        </FacebookShareButton>
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
                            :
                            <div className='modal-container'>
                                <div className='header-container position-relative'>
                                    <div className='title-container'>
                                        <h3 className='clamp clamp-1 text-align-center'>{'¡Has dado amor!'}</h3>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                                </div>
                                <div className='description-container'>
                                    <p>{'Motívalo con un mensaje de agradecimiento y compartiendo su trabajo'}</p>
                                    <form>
                                        <div className='form-group'>
                                            <label htmlFor="txtAlias">Tu alias</label>
                                            <input minLength="1" maxLength="50" type="text" value={alias} onChange={(e) => setAlias(e.target.value)} id="txtAlias" placeholder="Ingresa tu alias" />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtFeedback">Mensaje</label>
                                            <textarea minLength="1" maxLength="1000" rows="3" value={feedback} onChange={(e) => setFeedback(e.target.value)} id="txtFeedback" placeholder={'Por ejemplo: Me encantó, tu punto de vista me ayudará en mucho.'}></textarea>
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
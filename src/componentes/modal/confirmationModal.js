import React, { useEffect } from 'react';
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { critiquePoints } from '../../data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHandPaper, faTimes } from '@fortawesome/free-solid-svg-icons';
import './requestDetail.css';

const Modal = ({ isOpen, close }) => {

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
        <div>
            <div className={'overlay overlay-modal ' + styles} onClick={close}>
            </div>
            <Zoom bottom collapse when={isOpen}>
                <div className={'modal ' + styles}>
                    <div className='request-modal-container'>
                        {'Confirmación'}
                    </div>
                </div>

            </Zoom>
        </div>
    )
}

export default Modal;
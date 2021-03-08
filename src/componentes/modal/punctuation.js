import React, { useContext, useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { contactTypes } from '../../data/data';
import { getDateText, getExpDateText } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { designTypes } from '../../data/data';
import { AuthContext } from '../../context/AuthContext';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faHandPaper, faLayerGroup, faPaintBrush, faTimes } from '@fortawesome/free-solid-svg-icons';
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
                <div className={'modal ' + styles}>
                    <div className='modal-container'>
                        <div className='header-container position-relative'>
                            <div className='title-container'>
                                <h3 className='clamp clamp-1'>Califica esta crítica</h3>
                            </div>
                            <FontAwesomeIcon icon={faAngleDown} onClick={close} className='close-icon' />
                        </div>
                        <div className='description-container'>

                        </div>
                        <div className="footer-card-container">

                        </div>
                    </div>
                </div>
            </Zoom>
        </>
    )
}

export default Modal;
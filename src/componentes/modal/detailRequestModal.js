import React, { useContext, useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from '../avatar';
import Zoom from 'react-reveal/Zoom';
import { getDateText, getExpDateText, getMessengerTypeName, getFormattedPhone, getAbrevPointName, extractLink } from '../../helpers/functions';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEdit, faEye, faHandPaper, faLayerGroup, faTasks, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getProfileStorage } from '../../helpers/userStorage';
import './modals.css';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import CorrectionModal from './correctionDetail';
import CritiqueModal from './critiqueDetail';
import DesignModal from './designDetail';

const overrideSpinnerInline = css`
  display: inline-block;
  margin-left: .6rem;
  vertical-align: middle;
`;

const Modal = (props) => {

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }        
    }, [props.isOpen]);

    const confirm = () => {
        setOpenConfirmationModal(false);
        props.takeRequest(props.data?.id);
    }

    const determineModal = (type) => {
        switch (type) {
            case 'CRITICA':
                return <CritiqueModal {...props} openConfirmationModal={setOpenConfirmationModal} />
            case 'DISENO':
                return <DesignModal {...props} openConfirmationModal={setOpenConfirmationModal} />
            case 'CORRECCION':
                return <CorrectionModal {...props} openConfirmationModal={setOpenConfirmationModal} />
            default:
                return null;
        }
    }

    return (
        <>
            <ConfirmationModal
                isOpen={openConfirmationModal}
                title='Casi listo'
                message='Al aceptar, tienes hasta 7 días para entregar la corrección o acordar una fecha con la persona interesada. ¿Continuar?'
                confirm={confirm}
                close={() => setOpenConfirmationModal(false)} />
            {
                determineModal(props.data?.type)
            }
        </>
    )
}

export default Modal;

/*const profile = getProfileStorage();
   const artist = {
       fName: profile?.fName || '',
       lName: profile?.lName || '',
       contactEmail: profile?.contactEmail || '',
       networks: profile?.networks || []
   };
   if (data) {
       data.artist = artist;
}*/
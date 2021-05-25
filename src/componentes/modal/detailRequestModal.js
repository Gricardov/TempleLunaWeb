import React, { useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import './modals.css';
import CorrectionModal from './correctionDetail';
import CritiqueModal from './critiqueDetail';
import DesignModal from './designDetail';

const maxDaysExp = 7;

const Modal = (props) => {

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [confirmationType, setConfirmationType] = useState('TAKE_REQUEST');

    useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => document.body.style.overflow = 'unset';
    }, [props.isOpen]);

    const openModal = (status, type) => {
        setOpenConfirmationModal(status);
        setConfirmationType(type);
    }

    const confirm = () => {
        setOpenConfirmationModal(false);
        switch (confirmationType) {
            case 'TAKE_REQUEST':
                props.takeRequest(props.data?.id);
                break;

            case 'RESIGN_REQUEST':
                props.resignRequest(props.data?.id);
                break;
        }
    }

    const determineModal = (type) => {
        switch (type) {
            case 'CRITICA':
                return <CritiqueModal {...props} openConfirmationModal={openModal} />
            case 'DISENO':
                return <DesignModal {...props} openConfirmationModal={openModal} />
            case 'CORRECCION':
                return <CorrectionModal {...props} openConfirmationModal={openModal} />
            default:
                return null;
        }
    }

    let confTitle;
    let confMsg;

    switch (confirmationType) {
        case 'TAKE_REQUEST':
            confTitle = 'Casi listo';
            confMsg = 'Al aceptar, tienes hasta ' + maxDaysExp + ' días para entregar la corrección o acordar una fecha con la persona interesada. ¿Continuar?';
            break;

        case 'RESIGN_REQUEST':
            confTitle = '¿Seguro(a)?';
            confMsg = 'Al aceptar, este pedido se liberará y podrá ser tomado por alguien más. ¿Continuar?';
            break;
    }

    return (
        <>
            <ConfirmationModal
                isOpen={openConfirmationModal}
                title={confTitle}
                message={confMsg}
                confirm={confirm}
                close={() => setOpenConfirmationModal(false)} />
            {
                determineModal(props.data?.type)
            }
        </>
    )
}

export default Modal;
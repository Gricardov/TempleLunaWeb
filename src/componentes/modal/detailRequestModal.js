import React, { useState, useEffect } from 'react';
import ConfirmationModal from './confirmationModal';
import './modals.css';
import CorrectionModal from './correctionDetail';
import CritiqueModal from './critiqueDetail';
import DesignModal from './designDetail';

const maxDaysExp = 7;

const Modal = (props) => {

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => document.body.style.overflow = 'unset';
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
                message={'Al aceptar, tienes hasta ' + maxDaysExp + ' días para entregar la corrección o acordar una fecha con la persona interesada. ¿Continuar?'}
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
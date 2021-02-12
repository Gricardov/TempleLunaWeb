import React, { useContext, useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import DesignDetailModal from '../componentes/modal/designDetail';
import CritiqueDetailModal from '../componentes/modal/critiqueDetail';
import RequestCard from '../componentes/request-card';
import Tabs from '../componentes/tabs';
import Footer from '../componentes/footer/footer';
import PuffLoader from "react-spinners/PuffLoader";
import ImgVacio from "../img/reading-sitting.svg";
import { AuthContext } from '../context/AuthContext';
import { css } from "@emotion/core";
import { requestStatuses, requestTypes } from '../data/data';
import { getRequests, getRequest, takeRequest } from '../api';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const requestTypeList = requestTypes;
const tabList = requestStatuses;
const limit = 3;

const Admin = () => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [requestType, setRequestType] = useState('DISENO');
    const [requestList, setRequestList] = useState([]);
    const [isLast, setIsLast] = useState(false);
    const [loadingRequestList, setLoadingRequestList] = useState(false);
    const [isOpenDesignModal, setOpenDesignModal] = useState(false);
    const [isOpenCritiqueModal, setOpenCritiqueModal] = useState(false);
    const [registry, setRegistry] = useState(null);

    const [takingRequest, setTakingRequest] = useState(false);
    const [succesfulRequestTake, setSuccesfulRequestTake] = useState(false);

    const { logged } = useContext(AuthContext);

    const openModal = (request) => {
        setRegistry(request);
        setTakingRequest(false);
        setSuccesfulRequestTake(false);

        switch (request.type) {
            case 'CRITICA':
                setOpenCritiqueModal(true);
                break;
            case 'DISENO':
                setOpenDesignModal(true);
                break;
        }
    }

    const updRequestType = (val) => {
        setRequestType(val);
    }

    const getLastElement = (field) => {
        return requestList[requestList.length - 1] ? requestList[requestList.length - 1][field] : undefined;
    }

    const requestMoreData = () => {
        if (!loadingRequestList) {
            setLoadingRequestList(true);
            getRequests(logged.uid, requestType, tabList[activeTabIndex].id, getLastElement('updatedAt'), limit)
                .then(data => {
                    setLoadingRequestList(false);
                    setIsLast(data.isLast);
                    setRequestList((state) => ([...state, ...data.list]));
                })
                .catch(error => {
                    setLoadingRequestList(false);
                    alert('Ha ocurrido un error. Vuelve a intentarlo más tarde');
                });
        }
    }

    const requestData = () => {
        if (!loadingRequestList) {
            setLoadingRequestList(true);
            getRequests(logged.uid, requestType, tabList[activeTabIndex].id, undefined, limit)
                .then(data => {
                    setLoadingRequestList(false);
                    setIsLast(data.isLast);
                    setRequestList(data.list);
                })
                .catch(error => {
                    setLoadingRequestList(false);
                    alert('Ha ocurrido un error. Vuelve a intentarlo más tarde');
                });
        }
    }

    const confirmRequest = (requestId) => {
        if (logged && logged.uid) {
            setTakingRequest(true);
            takeRequest('solicitudes', logged.uid, requestId)
                .then(_ => {
                    getRequest(requestId).then(({ data, error }) => {
                        setTakingRequest(false);
                        if (!error) {
                            setRegistry(data); // Establezco el nuevo registro actualizado
                            setRequestList(requestList.filter(req => req.id !== data.id));// Elimino el registro de la lista actual
                            setSuccesfulRequestTake(true);
                        } else {
                            setSuccesfulRequestTake(false);
                            alert('Hubo un error al actualizar la solicitud. Recargue e intente otra vez');
                        }
                    })
                })
                .catch(error => {
                    alert('Hubo un error al tomar esta solicitud. Intenta otra vez');
                    setTakingRequest(false);
                    setSuccesfulRequestTake(true);
                })
        }
    }

    useEffect(() => {
        requestData(true);
    }, [activeTabIndex, requestType]);

    return (
        <div>
            <Navbar />
            <DesignDetailModal
                data={registry}
                isOpen={isOpenDesignModal}
                close={() => setOpenDesignModal(false)}
                takingRequest={takingRequest}
                succesfulRequestTake={succesfulRequestTake}
                takeRequest={confirmRequest} />
            <CritiqueDetailModal
                data={registry}
                isOpen={isOpenCritiqueModal}
                close={() => setOpenCritiqueModal(false)}
                takingRequest={takingRequest}
                succesfulRequestTake={succesfulRequestTake}
                takeRequest={confirmRequest} />

            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section'>
                    <div className='title-admin-container'>
                        <h2 className='m-0'>¿Qué eliges para hoy?</h2>
                        <div className='dropdown-container'>
                            <DropdownImage
                                stretch
                                list={requestTypeList}
                                select={updRequestType} />
                        </div>
                    </div>
                </section>
                <section className='container-xl section'>
                    <Tabs
                        loading={loadingRequestList}
                        requestList={requestList}
                        requestMoreData={requestMoreData}
                        hasMore={!isLast}
                        loader={<PuffLoader color={'#8B81EC'} loading={loadingRequestList} css={override} size={100} />}
                        activeIndex={activeTabIndex}
                        select={setActiveTabIndex}
                        tabs={tabList.map(e => e.name)}>
                        <div>
                            {
                                requestList && requestList.length > 0
                                    ?
                                    requestList.map(request => (
                                        <RequestCard key={request.id} data={request} select={openModal} />
                                    ))
                                    :
                                    <div>
                                        <img src={ImgVacio} className="img-vacio" alt="img-vacio" />
                                        <h2 className="text-align-center m-0 text-empty">Oops! aún nada por aquí</h2>
                                    </div>
                            }
                        </div>
                    </Tabs>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Admin;
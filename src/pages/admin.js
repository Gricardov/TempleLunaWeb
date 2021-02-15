import React, { useContext, useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import DesignDetailModal from '../componentes/modal/designDetail';
import CritiqueDetailModal from '../componentes/modal/critiqueDetail';
import RequestCard from '../componentes/request-card';
import Tabs from '../componentes/tabs';
import Footer from '../componentes/footer/footer';
import PuffLoader from "react-spinners/PuffLoader";
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
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
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

    const getUidBasedOnRequestStatus = (reqStatus) => { // Las solicitudes marcadas como disponibles no necesitan filtro de id usuario
        if (reqStatus == 'DISPONIBLE') {
            return undefined;
        } else {
            return logged.uid;
        }
    }

    const requestMoreData = () => {
        if (!initialLoading && !loadingMore) {
            setLoadingMore(true);
            const requestStatus = tabList[activeTabIndex].id;
            getRequests(getUidBasedOnRequestStatus(requestStatus), requestType, requestStatus, getLastElement('updatedAt'), limit)
                .then(data => {
                    setLoadingMore(false);
                    setIsLast(data.isLast);
                    setRequestList((state) => ([...state, ...data.list]));
                })
                .catch(error => {
                    setLoadingMore(false);
                    alert('Ha ocurrido un error. Vuelve a intentarlo más tarde');
                });
        }
    }

    const requestData = () => {
        //if (!initialLoading && !loadingMore) {
            setInitialLoading(true);
            const requestStatus = tabList[activeTabIndex].id;
            getRequests(getUidBasedOnRequestStatus(requestStatus), requestType, requestStatus, undefined, limit)
                .then(data => {
                    setInitialLoading(false);
                    setIsLast(data.isLast);
                    setRequestList(data.list);
                })
                .catch(error => {
                    setInitialLoading(false);
                    alert('Ha ocurrido un error. Vuelve a intentarlo más tarde');
                });
        //}
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
        requestData();
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
                        initialLoading={initialLoading}
                        loadingMore={loadingMore}
                        requestList={requestList}
                        requestMoreData={requestMoreData}
                        hasMore={!isLast}
                        loader={<PuffLoader color={'#8B81EC'} loading={true} css={override} size={100} />}
                        activeIndex={activeTabIndex}
                        select={setActiveTabIndex}
                        tabs={tabList.map(e => e.name)}>
                        <div>
                            {
                                requestList.map(request => (
                                    <RequestCard key={request.id} data={request} select={openModal} />
                                ))
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
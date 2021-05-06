import React, { useContext, useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import DesignDetailModal from '../componentes/modal/designDetail';
import CritiqueDetailModal from '../componentes/modal/critiqueDetail';
import CorrectionDetailModal from '../componentes/modal/correctionDetail';
import RequestCard from '../componentes/request-card';
import Tabs from '../componentes/tabs';
import Footer from '../componentes/footer/footer';
import PuffLoader from "react-spinners/PuffLoader";
import { AuthContext } from '../context/AuthContext';
import { css } from "@emotion/core";
import { requestStatuses, editorialServices } from '../data/data';
import { getStatistics, getRequests, getRequest, takeRequest } from '../api';
import { setAdminRequestType, getAdminRequestType, setAdminMainTabIndex, getAdminMainTabIndex, getProfileStorage } from '../helpers/userStorage';
import { getServiceById } from '../helpers/functions';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const requestTypeList = editorialServices;
const limit = 3;

const Admin = () => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [requestType, setRequestType] = useState(requestTypeList[0]);
    const [requestList, setRequestList] = useState([]);
    const [isLast, setIsLast] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isOpenDesignModal, setOpenDesignModal] = useState(false);
    const [isOpenCritiqueModal, setOpenCritiqueModal] = useState(false);
    const [isOpenCorrectionModal, setOpenCorrectionModal] = useState(false);
    const [registry, setRegistry] = useState(null);
    const [tabList, setTabList] = useState(requestStatuses);

    const [takingRequest, setTakingRequest] = useState(false);
    const [succesfulRequestTake, setSuccesfulRequestTake] = useState(false);

    const { logged } = useContext(AuthContext);

    const { services = [] } = getProfileStorage();

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
            case 'CORRECCION':
                setOpenCorrectionModal(true);
                break;
        }
    }

    const updRequestType = (val) => {
        setAdminRequestType(val);
        setRequestType(val);
    }

    const updActiveTabIndex = (val) => {
        setAdminMainTabIndex(val);
        setActiveTabIndex(val);
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

    const updateStatistics = (timeout = 0) => {
        setTimeout(() => {
            getStatistics([requestType.id, logged.uid + '-' + requestType.id])
                .then(data => setTabList([
                    !data[0].error ? { ...tabList[0], statistics: data[0].statistics.available } : { ...tabList[0], statistics: 0 },
                    !data[1].error ? { ...tabList[1], statistics: data[1].statistics.taken } : { ...tabList[1], statistics: 0 },
                    !data[1].error ? { ...tabList[2], statistics: data[1].statistics.done } : { ...tabList[1], statistics: 0 }
                ]))
        }, timeout);
    }

    const requestMoreData = () => {
        if (!initialLoading && !loadingMore) {
            setLoadingMore(true);
            const requestStatus = tabList[activeTabIndex].id;
            getRequests(getUidBasedOnRequestStatus(requestStatus), requestType.id, requestStatus, getLastElement('createdAt'), limit, requestStatus == 'TOMADO' || requestStatus == 'HECHO' ? 'desc' : 'asc')
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
        setInitialLoading(true);
        const requestStatus = tabList[activeTabIndex].id;
        getRequests(getUidBasedOnRequestStatus(requestStatus), requestType.id, requestStatus, undefined, limit, requestStatus == 'TOMADO' || requestStatus == 'HECHO' ? 'desc' : 'asc')
            .then(data => {
                updateStatistics();
                setInitialLoading(false);
                setIsLast(data.isLast);
                setRequestList(data.list);
            })
            .catch(error => {
                setInitialLoading(false);
                alert('Ha ocurrido un error. Vuelve a intentarlo más tarde');
            });
    }

    const confirmRequest = (requestId) => {
        if (logged && logged.uid) {
            setTakingRequest(true);
            takeRequest(requestId, requestType.id)
                .then(({ error }) => {
                    if (!error) {
                        getRequest(requestId).then(({ data, error }) => {
                            setTakingRequest(false);
                            if (!error) {
                                updateStatistics(5000); // Actualizo las estadísticas
                                setRegistry(data); // Establezco el nuevo registro actualizado
                                setRequestList(requestList.filter(req => req.id !== data.id));// Elimino el registro de la lista actual
                                setSuccesfulRequestTake(true);
                            } else {
                                setSuccesfulRequestTake(false);
                                alert('Hubo un error al actualizar la solicitud. Recargue e intente otra vez');
                            }
                        })
                    } else {
                        alert('Hubo un error al tomar esta solicitud. Intenta otra vez');
                        setTakingRequest(false);
                        setSuccesfulRequestTake(true);
                    }
                })
        }
    }

    useEffect(() => {
        requestData();
    }, [activeTabIndex, requestType.id]);

    useEffect(() => {
        setRequestType(getAdminRequestType(requestTypeList[0]));
        setActiveTabIndex(getAdminMainTabIndex());
        window.scrollTo(0, 0);
    }, []);

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
            <CorrectionDetailModal
                data={registry}
                isOpen={isOpenCorrectionModal}
                close={() => setOpenCorrectionModal(false)}
                takingRequest={takingRequest}
                succesfulRequestTake={succesfulRequestTake}
                takeRequest={confirmRequest}
            />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section'>
                    <div className='title-admin-container'>
                        <h2 className='m-0'>¿Qué eliges para hoy?</h2>
                        <div className='dropdown-container'>
                            <DropdownImage
                                stretch
                                selectedItem={requestType}
                                list={services.map(service => getServiceById(service))}
                                select={updRequestType} />
                        </div>
                    </div>
                </section>
                <section className='container-xl section'>
                    <Tabs
                        initialLoading={initialLoading}
                        loadingMore={loadingMore}
                        requestMoreData={requestMoreData}
                        hasMore={!isLast}
                        loader={<PuffLoader color={'#8B81EC'} loading={true} css={override} size={100} />}
                        activeIndex={activeTabIndex}
                        select={updActiveTabIndex}
                        tabs={tabList.map(tab => tab.name + ` (${tab.statistics ? tab.statistics : 0})`)}>
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
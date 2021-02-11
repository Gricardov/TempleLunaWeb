import React, { useRef, useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import DesignDetailModal from '../componentes/modal/designDetail';
import CritiqueDetailModal from '../componentes/modal/critiqueDetail';
import RequestCard from '../componentes/request-card';
import Tabs from '../componentes/tabs';
import Footer from '../componentes/footer/footer';
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { requestStatuses, requestTypes } from '../data/data';
import { getRequests, takeRequest } from '../api';

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

    const openModal = (request) => {
        setRegistry(request);
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
            getRequests(undefined, requestType, tabList[activeTabIndex].id, getLastElement('updatedAt'), limit)
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
            getRequests(undefined, requestType, tabList[activeTabIndex].id, undefined, limit)
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

    const confirmRequest = (workerId, requestId) => {
        takeRequest('solicitudes', workerId, requestId)
            .then(data => {
                alert('Listo')
            })
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
                takeRequest={confirmRequest} />
            <CritiqueDetailModal data={registry} isOpen={isOpenCritiqueModal} close={() => setOpenCritiqueModal(false)} />

            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section'>
                    <div className='title-admin-container'>
                        <h2 className='m-0'>¿Cuál tomamos hoy?</h2>
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
                        loading={false}
                        requestList={requestList}
                        requestMoreData={requestMoreData}
                        hasMore={!isLast}
                        loader={<PuffLoader color={'#8B81EC'} loading={loadingRequestList} css={override} size={100} />}
                        activeIndex={activeTabIndex}
                        select={setActiveTabIndex}
                        tabs={tabList.map(e => e.name)}>
                        <div>
                            {requestList.map(request => (
                                <RequestCard key={request.id} data={request} select={openModal} />
                            ))}
                        </div>
                    </Tabs>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Admin;
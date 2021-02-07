import React, { useRef, useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import DesignDetailModal from '../componentes/modal/designDetail';
import RequestCard from '../componentes/request-card';
import Pestanas from '../componentes/pestanas';
import Footer from '../componentes/footer/footer';
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { requestStatuses, requestTypes } from '../data/data';
import { getRequests } from '../api';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const requestTypeList = requestTypes;
const tabList = requestStatuses;
const offsetBeforeLoading = 50;

const Admin = () => {
    const lastRef = useRef();

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [requestType, setRequestType] = useState('DISENO');
    const [requestList, setRequestList] = useState([]);
    const [loadingRequestList, setLoadingRequestList] = useState(false);
    const [lastElement, setLastElement] = useState(null); // For use a starting point for next scroll
    const [isOpenDesignModal, setOpenDesignModal] = useState(false);
    const [isOpenCritiqueModal, setOpenCritiqueModal] = useState(false);
    const [registry, setRegistry] = useState(null);

    const openDesignModal = (request) => {
        setRegistry(request);
        setOpenDesignModal(true);
    }

    const updRequestType = (val) => {
        setRequestType(val);
    }

    const handleScroll = () => {
        if (lastRef.current) {
            const { top } = lastRef.current?.getBoundingClientRect();
            const vpHeight = window.innerHeight; // Viewport height
            if (top + offsetBeforeLoading < vpHeight) {
                if (lastElement) {
                    requestData();
                }
            }
        }
    }

    const requestData = () => {
        setLastElement(null);
        setLoadingRequestList(true);
        getRequests(undefined, requestType, tabList[activeTabIndex].id, lastElement, 4)
            .then(data => {
                setLoadingRequestList(false);
                if (data[data.length - 1]) {
                    setLastElement(data[data.length - 1].updatedAt);
                }
                setRequestList(state => ([...state, ...data]));
            })
            .catch(error => {
                setLoadingRequestList(false);
                alert('Ha ocurrido un error. Vuelve a intentarlo más tarde');
            });
    }

    useEffect(() => {
        setRequestList([]);
        requestData();
    }, [activeTabIndex, requestType]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastElement]);

    return (
        <div>
            <Navbar />
            <DesignDetailModal data={registry} isOpen={isOpenDesignModal} close={() => setOpenDesignModal(false)} />
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
                <section onLoad={handleScroll} className='container-xl section'>
                    <Pestanas cargando={false} indice={activeTabIndex} seleccionar={setActiveTabIndex} data={tabList.map(e => e.name)}>
                        <div className='tab-content'>
                            {
                                requestList.map(request => (
                                    <RequestCard ref={lastRef} key={request.id} data={request} select={openDesignModal} />
                                ))
                            }
                            {
                                <PuffLoader color={'#8B81EC'} loading={loadingRequestList} css={override} size={100} />
                            }
                        </div>
                    </Pestanas>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Admin;
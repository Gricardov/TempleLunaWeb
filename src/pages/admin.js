import React, { useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import DesignDetailModal from '../componentes/modal/designDetail';
import RequestCard from '../componentes/request-card';
import Pestanas from '../componentes/pestanas';
import Footer from '../componentes/footer/footer';
import { requestStatuses, requestTypes } from '../data/data';
import { listenRequests } from '../api';

const requestTypeList = requestTypes;
const tabList = requestStatuses;

const Admin = () => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [requestType, setRequestType] = useState('DISENO');
    const [requestList, setRequestList] = useState([]);
    const [isOpenDesignModal, setOpenDesignModal] = useState(false);
    const [isOpenCritiqueModal, setOpenCritiqueModal] = useState(false);
    const [registry, setRegistry] = useState(null);

    const openDesignModal = (request) => {
        setRegistry(request);
        setOpenDesignModal(true);
    }

    useEffect(() => {
        listenRequests(undefined, requestType, tabList[activeTabIndex].id, undefined, data => setRequestList(data));
    }, [activeTabIndex, requestType]);

    const updRequestType = (val) => {
        setRequestType(val);
    }

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
                <section className='container-xl section'>
                    <Pestanas cargando={false} indice={activeTabIndex} seleccionar={setActiveTabIndex} data={tabList.map(e => e.name)}>
                        <div className='tab-content'>
                            {
                                requestList.map(request => (
                                    <RequestCard key={request.id} data={request} select={openDesignModal} />
                                ))
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
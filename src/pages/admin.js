import React, { useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdown-image';
import Navbar from '../componentes/navbar';
import RequestCard from '../componentes/request-card';
import Pestanas from '../componentes/pestanas';
import Footer from '../componentes/footer/footer';
import { listenRequests } from '../api';

const requestTypeList = [{ type: 'DISENO', icon: 'fas fa-paint-brush', text: 'Diseños' }, { type: 'CRITICA', icon: 'fas fa-glasses', text: 'Críticas' }];
const tabList = [{ id: 'DISPONIBLE', name: 'Nuevos (1)' }, { id: 'TOMADO', name: 'En proceso (2)' }, { id: 'TERMINADO', name: 'Listos (9)' }];

const Admin = () => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [requestType, setRequestType] = useState('DISENO');
    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        listenRequests(undefined, requestType, tabList[activeTabIndex].id, undefined, data => setRequestList(data));
    }, [activeTabIndex, requestType]);

    const updRequestType = (val) => {
        setRequestType(val);
    }

    return (
        <div>
            <Navbar />
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
                                    <RequestCard key={request.id} data={request} />
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
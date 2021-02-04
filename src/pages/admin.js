import React, { useState, useEffect } from 'react';
import DropdownImage from '../componentes/dropdownImage';
import Navbar from '../componentes/navbar';
import Pestanas from '../componentes/pestanas';
import Footer from '../componentes/footer/footer';
import { getRequests } from '../api';

const requestTypeList = [{ type: 'DISENO', icon: 'fas fa-paint-brush', text: 'Diseños' }, { type: 'CRITICA', icon: 'fas fa-glasses', text: 'Críticas' }];
const tabList = ['Nuevos', 'En proceso', 'Listos'];

const Admin = () => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [requestType, setRequestType] = useState('DISENO');
    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        getRequests(requestType, 'DISPONIBLE').then(data => {
            setRequestList(data);
        })
    }, [requestType]);

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
                    <Pestanas cargando={false} indice={activeTabIndex} seleccionar={setActiveTabIndex} data={tabList}>
                        <div>
                            {
                                requestList.map(r => (
                                    <div key={r.id}>
                                        {
                                            r.email
                                        }
                                    </div>
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
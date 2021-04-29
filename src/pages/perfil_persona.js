import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import ImgPerfil from '../img/crushita.jpg';
import WattpadIcon from '../img/wattpad.svg';
import SampleEditorialIcon from '../img/sample-editorial-icon.svg';
import Tabs from '../componentes/tabs';
import PuffLoader from "react-spinners/PuffLoader";
import ServiceCard from '../componentes/service-card';
import { css } from "@emotion/core";
import { login } from '../api';
import { editorialServices } from '../data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faHeart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { setProfileStorage } from '../helpers/userStorage';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const tabList = editorialServices;

const Perfil = ({ name, likes, views, networks, services, editorial }) => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [initialLoading, setInitialLoading] = useState(false);
    const [requestList, setRequestList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const updActiveTabIndex = (val) => {
        setActiveTabIndex(val);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar'>
                <section className='profile-header-container' style={{ background: 'white' }}>
                    <div className='profile-container'>
                        <div>
                            <div className='profile-img'>
                                <div className='sn-container'>
                                    <div className='sn-icon sn-wattpad'>
                                        <img src={WattpadIcon} alt='img-wattpad' />
                                    </div>
                                    <div className='sn-icon sn-facebook'>
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </div>
                                </div>
                                <div className='editorial-tag clamp clamp-1'>
                                    <img src={SampleEditorialIcon} alt='img-editorial' />
                                    <span className='clamp clamp-1'>
                                        Editorial Pedro Castillo
                                </span>
                                </div>
                                <img src={ImgPerfil} alt='img-perfil' />
                            </div>
                        </div>
                        <div className='profile-data'>
                            <h2 className='clamp clamp-2 no-break'>{name}</h2>
                            <div className='statistics'>
                                <div className='statistic'>
                                    {views + ' '}
                                    <FontAwesomeIcon icon={faEye} className='icon' />
                                </div>
                                <div className='statistic'>
                                    {likes + ' '}
                                    <FontAwesomeIcon icon={faHeart} className='icon' />
                                </div>
                            </div>
                            <div className='description'>
                                <p>Fundadora de su editorial</p>
                                <p>Crítica, diseñadora y <b>3 más</b></p>
                            </div>
                        </div>
                        <div className='profile-editorial'>
                            <div className='editorial-tag clamp clamp-1'>
                                <img src={SampleEditorialIcon} alt='img-editorial' />
                                <span className='clamp clamp-1'>
                                    Editorial Pedro Castillo
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <Tabs
                    initialLoading={initialLoading}
                    loadingMore={false}
                    requestMoreData={() => { }}
                    hasMore={false}
                    loader={<PuffLoader color={'#8B81EC'} loading={true} css={override} size={100} />}
                    activeIndex={activeTabIndex}
                    select={updActiveTabIndex}
                    tabs={tabList.map(e => e.name + ` (${e.statistics ? e.statistics : 0})`)}>
                    <div className='services-profile-container'>
                        {
                            editorialServices.map(service => (
                                <div className='service-card-container'>
                                    <ServiceCard img={service.img} titulo={service.name} contrastColor={service.color} />
                                </div>
                            ))
                        }
                    </div>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}

export default Perfil;
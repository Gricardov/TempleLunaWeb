import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import ImgPerfil from '../img/pedrito.png';
import Tabs from '../componentes/tabs';
import HelmetMetaData from "../componentes/helmet";
import PuffLoader from "react-spinners/PuffLoader";
import ServiceCard from '../componentes/service-card';
import { css } from "@emotion/core";
import { getSnIconByUrl } from '../helpers/functions';
import { editorialTabs } from '../data/data';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { setProfileStorage } from '../helpers/userStorage';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const Perfil = ({ id, name, likes, views, networks, followName, about, services, theme }) => {

    // Tema
    const style = {
        background: (theme && theme.main) || '',
        color: (theme && theme.contrast) || ''
    };

    const { logged } = useContext(AuthContext);

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
            <HelmetMetaData title={`${logged ? name + ' - Temple Luna' : '¡' + name + ' está en Temple Luna!'}`} />
            <Navbar defaultColor={style.background} />
            <main className='main-body below-navbar'>
                <section className='profile-header-container' style={style}>
                    <div className='profile-container'>
                        <div>
                            <div className='profile-img'>
                                <img src={ImgPerfil} alt='img-perfil' />
                            </div>
                        </div>
                        <div className='profile-data'>
                            <h2 className='clamp clamp-2 no-break'>{name}</h2>
                            <div className='follow-name clamp clamp-1'>
                                @{followName}
                            </div>
                            <div className='description d-none d-md-block'>
                                <p className='clamp clamp-3 no-break'>{about.whoWeAre}</p>
                            </div>
                        </div>
                        <div className='sn-container'>
                            {
                                networks.slice(0, 3).map(network => {
                                    const iconData = getSnIconByUrl(network);

                                    if (iconData) {
                                        return (
                                            <a target='_blank' href={network} className={`sn-icon ${iconData.className}`}>
                                                <img src={iconData.imgSrc} alt='img-icon' />
                                            </a>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </section>
                <Tabs
                    theme={theme}
                    initialLoading={initialLoading}
                    loadingMore={false}
                    requestMoreData={() => { }}
                    hasMore={false}
                    loader={<PuffLoader color={'#8B81EC'} loading={true} css={override} size={100} />}
                    activeIndex={activeTabIndex}
                    select={updActiveTabIndex}
                    tabs={editorialTabs.map(e => e.name)}>
                    <div className='services-profile-container'>
                        {
                            services.map(service => (
                                <div className='service-card-container'>
                                    <ServiceCard id={service.id} img={service.img} color={service.color} />
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
import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import SampleEditorialIcon from '../img/sample-editorial-icon.svg';
import Tabs from '../componentes/tabs';
import HelmetMetaData from "../componentes/helmet";
import PuffLoader from "react-spinners/PuffLoader";
import ServiceCard from '../componentes/service-card';
import Tooltip from '../componentes/tooltip';
import Avatar from '../componentes/avatar';
import { css } from "@emotion/core";
import { getServiceById, getUserRoleById, getSnIconByUrl } from '../helpers/functions';
import { editorialServices } from '../data/data';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getStatistics } from '../api';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const Perfil = ({ id, fName, lName, likes, views, networks, imgUrl, theme, roles, services, editorial }) => {

    // Tema
    const style = {
        background: (theme && theme.main) || '',
        color: (theme && theme.contrast) || ''
    };

    const { logged } = useContext(AuthContext);

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [initialLoading, setInitialLoading] = useState(false);
    const [requestList, setRequestList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [tabList, setTabList] = useState(services.map(service => getServiceById(service)));

    const [roleTooltipOpen, setRoleTooltipOpen] = useState(false);
    const [servTooltipOpen, setServiceTooltipOpen] = useState(false);

    const updActiveTabIndex = (val) => {
        setActiveTabIndex(val);
    }

    const updateStatistics = () => {
        getStatistics(tabList.map(tab => id + '-' + tab.id))
            .then(data => setTabList(tabList.map((e, i) => !data[i].error ? { ...tabList[i], statistics: data[i].statistics.done } : tabList[i])));
    }

    useEffect(() => {
        updateStatistics();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <HelmetMetaData title={`${logged ? fName + ' ' + lName + ' - Temple Luna' : '¡' + fName + ' ' + lName + ' está en Temple Luna!'}`} image={imgUrl} />
            <Navbar />
            <main className='main-body below-navbar'>
                <section className='profile-header-container' style={{ background: 'white' }}>
                    <div className='profile-container'>
                        <div>
                            <div className='profile-img'>
                                <div className='sn-container'>
                                    {
                                        networks.slice(0, 2).map(network => {
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
                                {
                                    editorial
                                        ?
                                        <div className='editorial-tag clamp clamp-1'>
                                            <img src={SampleEditorialIcon} alt='img-editorial' />
                                            <span className='clamp clamp-1'>
                                                {editorial.name}
                                            </span>
                                        </div>
                                        :
                                        <div className='editorial-tag clamp clamp-1'>
                                            <span className='clamp clamp-1'>
                                                Independiente
                                        </span>
                                        </div>
                                }
                                <Avatar img={imgUrl} clases='profile-img img-avatar-container border-shadow' />
                            </div>
                        </div>
                        <div className='profile-data'>
                            <h2 className='clamp clamp-2 no-break'>{fName + ' ' + lName}</h2>
                            <div className='statistics'>
                                <div className='statistic'>
                                    {views || 0 + ' '}
                                    <FontAwesomeIcon icon={faEye} className='icon' />
                                </div>
                                <div className='statistic'>
                                    {likes || 0 + ' '}
                                    <FontAwesomeIcon icon={faHeart} className='icon' />
                                </div>
                            </div>
                            <div className='description'>
                                {
                                    <p className={'position-relative'}>{getUserRoleById(roles[0])?.name}
                                        {
                                            roles.length > 1
                                            &&
                                            <>
                                                {' y '}
                                                <b onMouseEnter={() => setRoleTooltipOpen(true)} onMouseLeave={() => setRoleTooltipOpen(false)} className='cursor-pointer'>
                                                    {roles.length - 1} más
                                                </b>
                                                <Tooltip isOpen={roleTooltipOpen}>
                                                    {
                                                        roles.slice(1, roles.length).map(role => <p>{getUserRoleById(role)?.name}</p>)
                                                    }
                                                </Tooltip>
                                            </>
                                        }
                                    </p>
                                }
                                {
                                    // Solo se deben mostrar 2 en pantalla y el resto en tooltip                                    
                                    <p className={'position-relative'}>Servicio de {services.slice(0, 2).map(service => getServiceById(service)?.name).join(services.length > 2 ? ', ' : ' y ').toLowerCase()}
                                        {
                                            services.length > 2
                                            &&
                                            <>
                                                {' y '}
                                                <b onMouseEnter={() => setServiceTooltipOpen(true)} onMouseLeave={() => setServiceTooltipOpen(false)} className='cursor-pointer'>
                                                    {services.length - 2} más
                                                </b>
                                                <Tooltip isOpen={servTooltipOpen}>
                                                    {
                                                        services.slice(2, services.length).map(service => <p>{getServiceById(service).name}</p>)
                                                    }
                                                </Tooltip>
                                            </>
                                        }
                                    </p>

                                }
                            </div>
                        </div>
                        <div className='profile-editorial'>
                            {
                                editorial
                                    ?
                                    <div className='editorial-tag clamp clamp-1'>
                                        <img src={SampleEditorialIcon} alt='img-editorial' />
                                        <span className='clamp clamp-1'>
                                            {editorial.name}
                                        </span>
                                    </div>
                                    :
                                    <div className='editorial-tag clamp clamp-1'>
                                        <img src={SampleEditorialIcon} alt='img-editorial' />
                                        <span className='clamp clamp-1'>
                                            Independiente
                                        </span>
                                    </div>
                            }
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
                    tabs={tabList.map(tab => tab.name + ` (${tab.statistics ? tab.statistics : 0})`)}>
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
        </div >
    );
}

export default Perfil;
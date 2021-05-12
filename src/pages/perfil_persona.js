import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import SampleEditorialIcon from '../img/sample-editorial-icon.svg';
import Tabs from '../componentes/tabs';
import HelmetMetaData from "../componentes/helmet";
import PuffLoader from "react-spinners/PuffLoader";
import ResultPreviewCard from '../componentes/result-preview-card';
import Tooltip from '../componentes/tooltip';
import Avatar from '../componentes/avatar';
import { css } from "@emotion/core";
import { getServiceById, getUserRoleById, getSnIconByUrl } from '../helpers/functions';
import { editorialServices } from '../data/data';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getStatistics, getRequests } from '../api';
import { useHistory } from 'react-router-dom';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const limit = 3;

const Perfil = ({ id, fName, lName, likes, views, networks, imgUrl, theme, roles, services, editorial }) => {

    const history = useHistory();

    // Tema
    const style = {
        background: (theme && theme.main) || '',
        color: (theme && theme.contrast) || ''
    };

    const { logged } = useContext(AuthContext);

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [requestList, setRequestList] = useState([]);
    const [tabList, setTabList] = useState(services.map(service => getServiceById(service)));

    const [roleTooltipOpen, setRoleTooltipOpen] = useState(false);
    const [servTooltipOpen, setServiceTooltipOpen] = useState(false);

    const navigateTo = (route) => {
        history.push(route);
    }

    const updActiveTabIndex = (val) => {
        setActiveTabIndex(val);
    }

    const updateStatistics = () => {
        getStatistics(tabList.map(tab => id + '-' + tab.id))
            .then(data => setTabList(tabList.map((e, i) => !data[i].error ? { ...tabList[i], statistics: data[i].statistics.done } : tabList[i])));
    }

    const getLastElement = (field) => {
        return requestList[requestList.length - 1] ? requestList[requestList.length - 1][field] : undefined;
    }

    const requestData = () => {
        setInitialLoading(true);
        const requestType = tabList[activeTabIndex].id;
        getRequests(id, requestType, 'HECHO', undefined, limit, 'desc')
            .then(data => {
                setInitialLoading(false);
                setIsLast(data.isLast);
                setRequestList(data.list);
            })
            .catch(error => {
                setInitialLoading(false);
                alert('Ha ocurrido un error. Vuelve a intentarlo más tarde (EC.RD)');
            });
    }

    const requestMoreData = () => {
        if (!initialLoading && !loadingMore) {
            setLoadingMore(true);
            const requestType = tabList[activeTabIndex].id;
            getRequests(id, requestType, 'HECHO', getLastElement('createdAt'), limit, 'desc')
                .then(data => {
                    setLoadingMore(false);
                    setIsLast(data.isLast);
                    setRequestList((state) => ([...state, ...data.list]));
                })
                .catch(error => {
                    setLoadingMore(false);
                    alert('Ha ocurrido un error. Vuelve a intentarlo más tarde (EC.RMD)');
                });
        }
    }

    useEffect(() => {
        requestData();
    }, [activeTabIndex]);

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
                                {/*
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
                                */}
                                <div className='editorial-tag clamp clamp-1'>
                                    <span className='clamp clamp-1'>
                                        Independiente
                                    </span>
                                </div>
                                <Avatar img={imgUrl} clases='profile-img img-avatar-container border-shadow' />
                            </div>
                        </div>
                        <div className='profile-data'>
                            <h2 className='clamp clamp-2 no-break'>{fName + ' ' + lName}</h2>
                            <div className='statistics'>
                                <div className='statistic'>
                                    {(views ? views >= 1000 ? (views / 1000).toFixed(1) + 'k' : views : 0) + ' '}
                                    <FontAwesomeIcon icon={faEye} className='icon' />
                                </div>
                                <div className='statistic'>
                                    {(likes ? likes >= 1000 ? (likes / 1000).toFixed(1) + 'k' : likes : 0) + ' '}
                                    <FontAwesomeIcon icon={faHeart} className='icon' />
                                </div>
                            </div>
                            <div className='description'>
                                {
                                    <p>{getUserRoleById(roles[0])?.name}
                                        {
                                            roles.length > 1
                                            &&
                                            <>
                                                {' y '}
                                                <b onMouseEnter={() => setRoleTooltipOpen(true)} onMouseLeave={() => setRoleTooltipOpen(false)} className='position-relative cursor-pointer'>
                                                    {roles.length - 1} más
                                                    <Tooltip isOpen={roleTooltipOpen}>
                                                        {
                                                            roles.slice(1, roles.length).map(role => <p>{getUserRoleById(role)?.name}</p>)
                                                        }
                                                    </Tooltip>
                                                </b>
                                            </>
                                        }
                                    </p>
                                }
                                {
                                    // Solo se deben mostrar 2 en pantalla y el resto en tooltip                                    
                                    <p>Servicio de {services.slice(0, 2).map(service => getServiceById(service)?.name).join(services.length > 2 ? ', ' : ' y ').toLowerCase()}
                                        {
                                            services.length > 2
                                            &&
                                            <>
                                                {' y '}
                                                <b onMouseEnter={() => setServiceTooltipOpen(true)} onMouseLeave={() => setServiceTooltipOpen(false)} className='position-relative cursor-pointer'>
                                                    {services.length - 2} más
                                                    <Tooltip isOpen={servTooltipOpen}>
                                                        {
                                                            services.slice(2, services.length).map(service => <p>{getServiceById(service).name}</p>)
                                                        }
                                                    </Tooltip>
                                                </b>
                                            </>
                                        }
                                    </p>

                                }
                            </div>
                        </div>
                        <div className='profile-editorial'>
                            {/*
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
                            */}
                            <div className='editorial-tag clamp clamp-1'>
                                <img src={SampleEditorialIcon} alt='img-editorial' />
                                <span className='clamp clamp-1'>
                                    Independiente
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <Tabs
                    initialLoading={initialLoading}
                    loadingMore={loadingMore}
                    requestMoreData={requestMoreData}
                    hasMore={!isLast}
                    loader={<PuffLoader color={'#8B81EC'} loading={true} css={override} size={100} />}
                    activeIndex={activeTabIndex}
                    select={updActiveTabIndex}
                    tabs={tabList.map(tab => tab.name + ` (${tab.statistics ? tab.statistics : 0})`)}>
                    <div className='container-xl services-profile-container'>
                        {
                            requestList.map(request => (
                                <ResultPreviewCard
                                    id={request.id}
                                    likes={request.likes}
                                    views={request.views}
                                    onClick={(id) => navigateTo(`/prev_resultado?id=${id}`)}
                                    title={request.title}
                                    type={request.type} />
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
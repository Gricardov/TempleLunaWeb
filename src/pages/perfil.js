import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import ImgPerfil from '../img/crushita.jpg';
import WattpadIcon from '../img/wattpad.svg';
import SampleEditorialIcon from '../img/sample-editorial-icon.svg';
import Tabs from '../componentes/tabs';
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { login } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faHeart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { setProfileStorage } from '../helpers/userStorage';

const override = css`
  display: block;
  margin: 5rem auto;
`;

const tabList = [{ id: 'CRI', name: 'Críticas', statistics: 5 }, { id: 'DIS', name: 'Diseños', statistics: 9 }, { id: 'COR', name: 'Correc...', statistics: 10 }, { id: 'ENT', name: 'Entrevistas', statistics: 9 }, { id: 'BKT', name: 'Booktrailers', statistics: 2 }];

const Login = () => {

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [initialLoading, setInitialLoading] = useState(false);
    const [requestList, setRequestList] = useState([]);

    const updActiveTabIndex = (val) => {
        setActiveTabIndex(val);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar light-theme'>
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
                            <h2 className='clamp clamp-2 no-break'>Shany Dubi Loedrin</h2>
                            <div className='statistics'>
                                <div className='statistic'>
                                    {'20 '}
                                    <FontAwesomeIcon icon={faEye} className='icon' />
                                </div>
                                <div className='statistic'>
                                    {'50 '}
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
                    requestList={requestList}
                    requestMoreData={() => { }}
                    hasMore={false}
                    loader={<PuffLoader color={'#8B81EC'} loading={true} css={override} size={100} />}
                    activeIndex={activeTabIndex}
                    select={updActiveTabIndex}
                    tabs={tabList.map(e => e.name + ` (${e.statistics ? e.statistics : 0})`)}>
                    <div>
                        {
                            requestList.map(request => (
                                <div>asd</div>
                            ))
                        }
                    </div>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
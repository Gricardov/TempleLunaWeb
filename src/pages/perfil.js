import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import ImgPerfil from '../img/crushita.jpg';
import Tabs from '../componentes/tabs';
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "@emotion/core";
import { useHistory } from "react-router-dom";
import { login } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
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
            <main className='main-body below-navbar colored-background'>
                <section className='profile-header-container' style={{ background: 'white' }}>
                    <div className='profile-container'>
                        <div className='profile-img'>
                            <img src={ImgPerfil} alt='img-perfil' />
                        </div>
                        <h2 className='clamp clamp-2'>Shany Dubi</h2>
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
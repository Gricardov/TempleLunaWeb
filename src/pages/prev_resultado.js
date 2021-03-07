import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import ClipLoader from "react-spinners/ClipLoader";
import queryString from 'query-string';
import critiqueImg from '../img/critiqueImg.PNG';
import { getRequest } from '../api';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Previsualizacion = ({ location }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const { type, resultUrl, title, name } = location.state.data;
            setIsLoading(false);
            setType(type);
            setResultUrl(resultUrl);
            setTitle(title);
            setAuthor(name);
        } else {
            const id = queryString.parse(location.search).id;
            if (id) {
                getRequest(id).then(({ data, error }) => {
                    if (!error) {
                        const { type, resultUrl, title, name } = data;
                        setType(type);
                        setResultUrl(resultUrl);
                        setTitle(title);
                        setAuthor(name);
                        setIsLoading(false);
                    } else {
                        alert('No se encontró el archivo. Intente más tarde');
                    }
                });
            }
        }
    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);        
    }, []);

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section position-relative'>
                    <div className='floating-form b-shadow-none container-background-prev position-relative'>
                        <div className='loader-container'>
                            <ClipLoader css={override} loading={isLoading} size={50} color={'#8B81EC'} />
                        </div>
                        {
                            !isLoading && resultUrl
                            &&
                            <>
                                <div className='background-prev' style={{ backgroundImage: `url(${type == 'CRITICA' ? critiqueImg : resultUrl})` }}>
                                </div>
                                <div className='form-container content-prev text-align-center'>
                                    <div className='content-prev-row'>
                                        <div className='content-prev-img'>
                                            <img alt='img-previsualizacion' src={type == 'CRITICA' ? critiqueImg : resultUrl} />
                                        </div>
                                        <div className='content-prev-description'>
                                            <h3 className='m-0 clamp clamp-2'>{type == 'CRITICA' ? 'Crítica: ' : type == 'DISENO' ? 'Diseño: ' : ''}{title}</h3>
                                            <div className='prev-header-container'>
                                                <img alt="img-avatar" src="/static/media/usuario-generico.167daf89.svg" className="prev-avatar" />
                                                <div className='title-container'>
                                                    <p className='clamp clamp-1'>{author}</p>
                                                </div>
                                            </div>
                                            <div className='prev-content-container'>
                                                <button onClick={() => window.open(resultUrl, '_blank')} className="button button-blue stretch">
                                                    {
                                                        type == 'CRITICA'
                                                            ?
                                                            <>
                                                                <FontAwesomeIcon color={'#fff'} icon={faEye} className='icon' />
                                                                {' '}
                                                        Abrir
                                                    </>
                                                            :
                                                            type == 'DISENO'
                                                                ?
                                                                <>
                                                                    <FontAwesomeIcon color={'#fff'} icon={faEye} className='icon' />
                                                                    {' '}
                                                            Abrir en máx. res.
                                                        </>
                                                                :
                                                                null
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Previsualizacion;
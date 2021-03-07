import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import ClipLoader from "react-spinners/ClipLoader";
import LoadingScreen from '../componentes/loading-screen';
import queryString from 'query-string';
import critiqueImg from '../img/critiqueImg.PNG';
import { getRequest } from '../api';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye, faShareAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


const Previsualizacion = ({ location }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('Obteniendo tu archivo...');
    const [type, setType] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const [numPages, setNumPages] = useState(0);
    //const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const { type, resultUrl, title, name } = location.state.data;
            setLoadingMsg('Obtenido: ' + title);
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
                        setLoadingMsg('Obtenido: ' + title);
                        setType(type);
                        setResultUrl(resultUrl);
                        setTitle(title);
                        setAuthor(name);
                        //setIsLoading(false);
                    } else {
                        alert('No se encontró el archivo. Intente más tarde');
                        setIsLoading(false);
                        setSuccess(false);
                    }
                });
            }
        }
    }, [location]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setIsLoading(false);
        setSuccess(true);
        setNumPages(numPages);
    }

    const onDocumentError = () => {
        setIsLoading(false);
        setSuccess(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {
                isLoading && <LoadingScreen text={loadingMsg} />
            }
            <Navbar />
            <main className='main-body below-navbar'>
                <section className='container-pdf-preview position-relative'>
                    <div>
                        <Document
                            file={resultUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentError}
                            
                            externalLinkTarget={'_blank'}>
                            {
                                Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page                                        
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                        />
                                    ),
                                )
                            }
                        </Document>
                    </div>
                </section>
            </main>
            <div className='bottom-prev-navbar'>
                <nav className='container-xl'>
                    <button className='button-purple'>
                        <FontAwesomeIcon color={'#fbffba'} icon={faStar} className='icon' />
                        {' '}
                        Califica
                    </button>
                    <button className='button-purple'>
                        <FontAwesomeIcon color={'#fbffba'} icon={faShareAlt} className='icon' />
                        {' '}
                        Comparte
                    </button>
                    <button className='button-purple' onClick={() => window.open(resultUrl)}>
                        <FontAwesomeIcon color={'#fbffba'} icon={faDownload} className='icon' />
                    </button>
                </nav>
            </div>
        </div>
    );
}

export default Previsualizacion;
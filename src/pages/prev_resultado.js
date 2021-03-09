import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import LoadingScreen from '../componentes/loading-screen';
import PunctuationModal from '../componentes/modal/punctuation';
import queryString from 'query-string';
import HelmetMetaData from "../componentes/helmet";
import Fade from 'react-reveal/Fade';
import { getRequest } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faDownload, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { FacebookShareButton } from "react-share";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import SpeechBubble from '../componentes/speech-bubble/speech-bubble';

const Previsualizacion = ({ location }) => {

    const [isOpenPunctuationModal, setIsOpenPunctuationModal] = useState(false);
    const [punctuationType, setPunctuationType] = useState('LIKE');

    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('Obteniendo tu archivo...');
    const [type, setType] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const [numPages, setNumPages] = useState(0);
    const [hasScrolledToOffset, setHasScrolledToOffset] = useState(false);

    const checkScroll = () => {
        const body = document.body;
        const html = document.documentElement;
        const offsetY = window.scrollY; // Scrolled height
        const vpHeight = window.innerHeight; // Viewport height

        const totalHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        if ((totalHeight - (offsetY + vpHeight)) <= 350) {
            if (!hasScrolledToOffset) {
                setHasScrolledToOffset(true);
            }
        } else {
            if (hasScrolledToOffset) {
                setHasScrolledToOffset(false);
            }

        }
    }
    useEffect(() => {
        if (location && location.state && location.state.data) {
            const { type, resultUrl, title, name, id } = location.state.data;
            setLoadingMsg('Obtenido: ' + title);
            setId(id);
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
                        setId(id);
                        setType(type);
                        setResultUrl(resultUrl);
                        setTitle(title);
                        setAuthor(name);
                    } else {
                        alert('No se encontró el archivo. Intente más tarde');
                        setIsLoading(false);
                        setSuccess(false);
                    }
                });
            }
        }
    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [hasScrolledToOffset]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setIsLoading(false);
        setSuccess(true);
        setNumPages(numPages);
    }

    const onDocumentError = () => {
        setIsLoading(false);
        setSuccess(false);
    }

    const like = () => {
        setPunctuationType('LIKE');
        togglePunctuationModal();
    }

    const unlike = () => {
        setPunctuationType('UNLIKE');
        togglePunctuationModal();
    }

    const togglePunctuationModal = () => {
        setIsOpenPunctuationModal(!isOpenPunctuationModal);
    }

    return (
        <div>
            {
                isLoading && <LoadingScreen text={loadingMsg} />
            }
            <HelmetMetaData title={title + " - Temple Luna"} />
            <Navbar />
            <PunctuationModal
                type={punctuationType}
                isOpen={isOpenPunctuationModal}
                close={() => setIsOpenPunctuationModal(false)} />
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
            <div className='bottom-prev-navbar position-relative'>
                <div className='speech-container'>
                    <Fade when={hasScrolledToOffset}>
                        <SpeechBubble text='Comparte esta crítica y genera interés en tu obra' />
                    </Fade>
                </div>

                <nav className='container-xl'>
                    <button className='button-purple' onClick={() => { }}>
                        <FontAwesomeIcon color={'#fbffba'} icon={faBook} className='icon' />
                        {' '}
                        Leer obra
                    </button>
                    <button className='button-purple' onClick={like}>
                        <FontAwesomeIcon color={'#fbffba'} icon={faHeart} className='icon' />
                    </button>
                    <button className='button-purple position-relative'>
                        <FacebookShareButton
                            url={process.env.REACT_APP_WEBSITE + location.pathname + '?id=' + id}
                            quote={`Hola amigos, les quiero compartir ${type == 'CRITICA' ? 'la crítica' : type == 'DISENO' ? 'el diseño' : 'el trabajo'} que me hicieron en Temple Luna. Tú también puedes pedir uno(a) en su página oficial :)`}
                            hashtag="#templeluna"
                            style={{ width: '100%', height: '100%' }}>
                            <FontAwesomeIcon color={'#fbffba'} icon={faFacebook} className='icon' />
                            {' '}
                        Comparte
                    </FacebookShareButton>
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
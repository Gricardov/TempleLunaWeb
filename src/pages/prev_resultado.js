import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import LoadingScreen from '../componentes/loading-screen';
import PunctuationModal from '../componentes/modal/punctuation';
import queryString from 'query-string';
import HelmetMetaData from "../componentes/helmet";
import ClipLoader from "react-spinners/ClipLoader";
import Fade from 'react-reveal/Fade';
import { extractLink } from '../helpers/functions';
import { getRequest, likeRequestResult, addAnalitics } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faDownload, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { css } from "@emotion/core";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { FacebookShareButton } from "react-share";
import SpeechBubble from '../componentes/speech-bubble/speech-bubble';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Previsualizacion = ({ location }) => {

    const [isOpenPunctuationModal, setIsOpenPunctuationModal] = useState(false);
    const [punctuationType, setPunctuationType] = useState('LIKE');

    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('Obteniendo tu archivo...');
    const [link, setLink] = useState('');
    const [type, setType] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState(queryString.parse(location.search).t || 'Tu obra');
    const [author, setAuthor] = useState('');
    const [likes, setLikes] = useState(0);
    const [artist, setArtist] = useState({});
    const [addingLove, setAddingLove] = useState(false);

    // From query parameters
    const [isTemplated, setIsTemplated] = useState(false);
    const [isTest, setIsTest] = useState(false);
    const [origin, setOrigin] = useState('OTHER');

    const [numPages, setNumPages] = useState(0);
    const [hasScrolledToOffset, setHasScrolledToOffset] = useState(false);

    const checkScroll = () => {
        const body = document.body;
        const html = document.documentElement;
        const offsetY = window.scrollY; // Scrolled height
        const vpHeight = window.innerHeight; // Viewport height

        const totalHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        if ((totalHeight - (offsetY + vpHeight)) <= 600) {
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

        // Por mejorar
        const isTestMode = queryString.parse(location.search).test;
        if (isTestMode) {
            setIsTest(true);
        }

        const fbclid = queryString.parse(location.search).fbclid;
        if (fbclid) {
            setOrigin('FB');
        }

        if (location && location.state && location.state.data) {
            const { type, resultUrl, title, name, link, likes, id, artist } = location.state.data;
            setLoadingMsg('Obtenido: ' + title);
            setId(id);
            setLink(link);
            setType(type);
            setResultUrl(resultUrl);
            setTitle(title);
            setAuthor(name);
            setLikes(likes);
            setArtist(artist);
        } else {
            const id = queryString.parse(location.search).id;
            const templated = queryString.parse(location.search).templated;
            if (id) {
                getRequest(id, true).then(({ data, error }) => { // El segundo parámetro es para decidir si se solicitan detalles
                    if (!error) {
                        const { type, resultUrl, title, name, link, likes, artist } = data;
                        setLoadingMsg('Obtenido: ' + title);
                        setId(id);
                        setLink(link);
                        setType(type);
                        setResultUrl(resultUrl);
                        setTitle(title);
                        setAuthor(name);
                        setLikes(likes);
                        setArtist(artist);
                        if (templated) {
                            setIsTemplated(true);
                        }
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

    const onDocumentLoadSuccess = ({ numPages = 0 }) => {
        setIsLoading(false);
        setSuccess(true);
        setNumPages(numPages);
    }

    const onDocumentError = () => {
        setIsLoading(false);
        setSuccess(false);
    }

    const like = () => {
        if (!likes) {
            setAddingLove(true);
            likeRequestResult(id, 1).then(({ data, error }) => {
                if (!error) {
                    setAddingLove(false);
                    setLikes(1);
                    setPunctuationType('LIKE');
                    togglePunctuationModal();
                } else {
                    setAddingLove(false);
                    alert('No se pudo agregar el like');
                }
            });
        }
    }

    const onReadButtonClicked = () => {
        window.open(extractLink(link));
        if (!isTest) {
            const analObject = {
                requestId: id,
                templated: isTemplated,
                origin,
                readIntention: true
            };

            addAnalitics(id, analObject).then(() => {
                console.log('Analítica actualizada!');
            });
        } else {
            console.log('Test mode');
        }
    }

    const onFinishedSharedIntention = () => {
        if (!isTest) {
            const analObject = {
                requestId: id,
                templated: isTemplated,
                origin,
                shareIntention: true
            };

            addAnalitics(id, analObject).then(() => {
                console.log('Analítica actualizada!');
            });
        } else {
            console.log('Test mode');
        }
    }

    const togglePunctuationModal = () => {
        setIsOpenPunctuationModal(!isOpenPunctuationModal);
    }

    let shareQuote;
    let speechBubble = 'Compartelo en un grupo y atrae lectores a la obra';

    if (isTemplated) {
        shareQuote = `Hola amigos, les quiero compartir ${type == 'CRITICA' ? 'la crítica' : type == 'DISENO' ? 'el diseño' : 'el trabajo'} que me hicieron en Temple Luna. Los invito a pedir uno(a) en su página oficial :)`;
    } else {
        shareQuote = `Hola amigos, les quiero compartir ${type == 'CRITICA' ? 'esta interesante crítica' : type == 'DISENO' ? 'este gran diseño' : 'este gran trabajo'} que encontré en Temple Luna. Los invito a pedir uno(a) en su página oficial :)`
    }

    const url = process.env.REACT_APP_WEBSITE + window.location.pathname + '?id=' + id;

    return (
        <div>
            {
                isLoading && <LoadingScreen text={loadingMsg} />
            }
            <HelmetMetaData url={url} title={`${type == 'DISENO' ? '[Diseño]' : '[Crítica]'} ${title} - Temple Luna`} image={type == 'DISENO' ? resultUrl : 'https://drive.google.com/uc?id=1b7NnnYFWl4cW746wfDGw5LRdZ_uwCv44'} />
            <Navbar />
            <PunctuationModal
                requestId={id}
                requestType={type}
                punctuationType={punctuationType}
                isOpen={isOpenPunctuationModal}
                close={() => setIsOpenPunctuationModal(false)} />
            <main className='main-body below-navbar'>
                <section className='container-pdf-preview position-relative'>
                    <div>
                        {
                            type == 'CRITICA'
                                ?
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
                                :
                                type == 'DISENO'
                                    ?
                                    <div className='container-xl'>
                                        <h3>Diseño de la obra: {title}</h3>
                                        <p className="m-0"><b>Diseñador:</b> {artist.fName + ' ' + artist.lName}</p>
                                        <p className="m-0"><b>Redes:</b> {artist.networks && artist.networks.join(', ')}</p>
                                        <p className="m-0 mb-2"><b>Correo:</b> {artist.contactEmail}</p>
                                        <img onLoad={onDocumentLoadSuccess} onError={onDocumentError} src={resultUrl} />
                                    </div>
                                    :
                                    null
                        }
                    </div>
                </section>
            </main>
            <div className='bottom-prev-navbar position-relative'>
                <div className='speech-container'>
                    <Fade when={hasScrolledToOffset}>
                        <SpeechBubble text={speechBubble} />
                    </Fade>
                </div>

                <nav className='container-xl'>
                    <button className='button-purple' onClick={onReadButtonClicked}>
                        <FontAwesomeIcon color={'#fbffba'} icon={faBook} className='icon' />
                        {' '}
                        Leer obra
                    </button>
                    {
                        isTemplated
                            ?
                            addingLove
                                ?
                                <button className='button-purple' onClick={like}>
                                    <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                </button>
                                :
                                likes > 0
                                    ?
                                    <button className='button-purple button-liked' onClick={() => { }}>
                                        <FontAwesomeIcon color={'#fbffba'} icon={faHeart} className='icon' />
                                    </button>
                                    :
                                    <button className='button-purple' onClick={like}>
                                        <FontAwesomeIcon color={'#fbffba'} icon={faHeart} className='icon' />
                                    </button>
                            :
                            null
                    }
                    <button className='button-purple position-relative p-0'>
                        <FacebookShareButton
                            onShareWindowClose={onFinishedSharedIntention}
                            url={url.toString().replace(/templated=true/g, "")}
                            quote={shareQuote}
                            className='py-08'
                            hashtag='#templeluna'
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
        </div >
    );
}

export default Previsualizacion;
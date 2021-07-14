import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../componentes/navbar/navbar';
import Footer from '../componentes/footer/footer';
import ClipLoader from "react-spinners/ClipLoader";
import Fade from 'react-reveal/Fade';
import HelmetMetaData from "../componentes/helmet";
import ImgTe from '../img/des-req.png';
import ImgBailando from '../img/dancing.svg';
import base64 from 'base-64';
import utf8 from 'utf8';
import { Link } from 'react-router-dom';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { saveSubscription, updatesubscription } from '../api';

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

//{"id":"ID","name":"nombre","email":"abc@def.com","modify":"true"}

const Suscripcion = ({ match }) => {

    const [subMagazine, setSubMagazine] = useState(true);
    const [subCourses, setSubCourses] = useState(true);
    const [subNovelties, setSubNovelties] = useState(true);
    const [modifyMode, setModifyMode] = useState(false);
    const [fromUrl, setFromUrl] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form

    const updName = (e) => {
        setName(e.target.value);
    }

    const updEmail = (e) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [success]);

    useEffect(() => {
        const stringData = match.params.id;
        if (stringData) {
            try {
                const bytes = base64.decode(stringData);
                const decoded = utf8.decode(bytes);
                const { id, name, email, modify } = JSON.parse(decoded);
                if (id && name && email) {
                    setId(id);
                    setEmail(email);
                    setName(name);
                    setModifyMode(modify);
                    setFromUrl(true);
                } else {
                    throw 'Error de validación';
                }
            }
            catch (error) {
                console.log(error);
                setId('');
                setName('');
                setEmail('');
                setModifyMode(false);
                setFromUrl(false);
            }
        }
    }, [match.params.id]);

    const subscribe = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!checkErrors()) {
            const subscription = {
                courses: subCourses,
                magazine: subMagazine,
                novelties: subNovelties,
                email,
                name
            }
            try {
                if (modifyMode || fromUrl) {
                    await updatesubscription(id, subscription);
                    setLoading(false);
                    setSuccess(true);
                } else {
                    await saveSubscription(subscription);
                    setLoading(false);
                    setSuccess(true);
                }
            } catch (error) {
                setLoading(false);
                setSuccess(false);
                console.log(error);
                alert('Hubo un error. Vuelve a intentarlo.');
            }
        }
    }

    const checkErrors = () => {
        if (!(/^(?!\s*$).{1,50}/.test(email))) {
            alert('Tu correo debe tener de 1 a 50 caracteres');
            return true;
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
            alert('Introduce un correo válido');
            return true;
        }

        if (!(/^(?!\s*$).{1,50}/.test(name))) {
            alert('Tu nombre debe tener de 1 a 50 caracteres');
            return true;
        }
        return false;
    }

    return (
        <div>
            <Navbar />
            <HelmetMetaData title="¡Se viene algo genial! - Temple Luna" description="Estamos dispuestos a ayudarte con aquellas obra que tanto amas. ¡Es gratis!" />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl mt-5'>
                    <div className='subscribe-container position-relative'>
                        <img src={ImgTe} alt='img-fondo' className='img-fondo-subscribe img-fondo-subscribe-left d-none d-md-block' />
                        <img src={ImgBailando} alt='img-fondo' className='img-fondo-subscribe img-fondo-subscribe-right d-none d-md-block' />
                        <form onSubmit={subscribe} className='floating-form'>
                            {
                                success
                                    ?
                                    <div className='form-container text-align-center'>
                                        <Fade bottom>
                                            <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                            <h3 className='mt-1 mb-1'>Listo</h3>
                                        </Fade>
                                        <p className='txt-responsive-form m0-auto'>¡Gracias por ser parte!</p>
                                        <div className='form-buttons-container mt-3'>
                                            <Link to={'inicio'} className='button button-green m0-auto'>
                                                <FontAwesomeIcon icon={faHome} style={{ fontSize: '1.6rem' }} />
                                                {' '}
                                                <span className='d-none d-md-inline'>
                                                    Ir a home
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <h2 className='m-0'>{
                                            modifyMode
                                                ?
                                                'Modificar suscripción'
                                                :
                                                'Se viene algo genial'
                                        }</h2>
                                        <p className='mb-3'>
                                            <b>Hola, {name && fromUrl ? name : 'querido artista'}:</b><br />
                                            {
                                                modifyMode
                                                    ?
                                                    'Usa esta página para modificar tu suscripción a los servicios de Temple Luna.'
                                                    :
                                                    'En poco tiempo lanzaremos nuestra primera revista de escritores, junto a una renovada página y más servicios. ¿Quieres ser el primero en ser notificado?'
                                            }
                                        </p>
                                        {
                                            !fromUrl
                                            &&
                                            <>
                                                <div className='form-group'>
                                                    <label htmlFor="txtNombre">¿Cuál es tu nombre?</label>
                                                    <input minLength="1" maxLength="50" type="text" value={name} onChange={updName} id="txtNombre" placeholder="Ingresa tu nombre" />
                                                </div>
                                                <div className='form-group'>
                                                    <label htmlFor="txtUsuario">¿Cuál es tu correo?</label>
                                                    <input minLength="1" maxLength="50" type="email" value={email} onChange={updEmail} id="txtUsuario" placeholder="Ingresa tu correo" />
                                                </div>
                                            </>
                                        }
                                        <div className='form-group'>
                                            <label htmlFor="txtUsuario">¿Deseas recibir la revista de escritores todos los meses?</label>
                                            <div onClick={() => setSubMagazine(true)} className={`chkTag ${subMagazine ? 'active' : ''}`}>
                                                {
                                                    subMagazine
                                                    &&
                                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                }
                                                {' ¡Claro que sí!'}
                                            </div>
                                            <div onClick={() => setSubMagazine(false)} className={`chkTag ${!subMagazine ? 'active' : ''}`}>
                                                {
                                                    !subMagazine
                                                    &&
                                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                }
                                                {' No ahora'}
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtUsuario">¿Deseas que te avisemos de los nuevos talleres?</label>
                                            <div onClick={() => setSubCourses(true)} className={`chkTag ${subCourses ? 'active' : ''}`}>
                                                {
                                                    subCourses
                                                    &&
                                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                }
                                                {' ¡Claro que sí!'}
                                            </div>
                                            <div onClick={() => setSubCourses(false)} className={`chkTag ${!subCourses ? 'active' : ''}`}>
                                                {
                                                    !subMagazine
                                                    &&
                                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                }
                                                {' No ahora'}
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtUsuario">¿Deseas que te avisemos del lanzamiento de la app y novedades?</label>
                                            <div onClick={() => setSubNovelties(true)} className={`chkTag ${subNovelties ? 'active' : ''}`}>
                                                {
                                                    subNovelties
                                                    &&
                                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                }
                                                {' ¡Claro que sí!'}
                                            </div>
                                            <div onClick={() => setSubNovelties(false)} className={`chkTag ${!subNovelties ? 'active' : ''}`}>
                                                {
                                                    !subMagazine
                                                    &&
                                                    <FontAwesomeIcon color={'#fff'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                }
                                                {' No ahora'}
                                            </div>
                                        </div>
                                        {
                                            loading
                                                ?
                                                <span className='button button-green button-thin text-align-center stretch'>
                                                    Enviando
                                                    {' '}
                                                    <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                                </span>
                                                :
                                                <button onClick={() => { }} className='button button-green button-thin stretch'>
                                                    <span className='d-inline'>
                                                        ¡Listo!
                                                    </span>
                                                    {' '}
                                                    <FontAwesomeIcon icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                </button>
                                        }
                                    </>
                            }
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Suscripcion;
import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import ImgAutor from '../img/laczu.jpg';
import HelmetMetaData from "../componentes/helmet";
import { toName, extractLink } from '../helpers/functions';
import { isNameInvalid, isAgeInvalid, isPhoneInvalid, isEmailInvalid, isLinkInvalid } from '../helpers/validators';
import { saveEvent } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faCheck, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { contactTypes, inscriptionTypes } from '../data/data';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

const steps = ['Inicio', 'Contacto', 'Listo'];
const chkPoints = [{ id: 'SI', name: 'Sí', abrev: 'Sí' }];

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Inscripcion = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [success, setSuccess] = useState(true); // Determina si se envío el form sin errores
    const { canGoBackwards, isLast } = useStepObserver(activeIndex, steps.length);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [messengerType, setMessengerType] = useState(contactTypes[0]);
    const [email, setEmail] = useState('');
    const [inscriptionType, setInscriptionType] = useState(inscriptionTypes[0]);
    const [link, setLink] = useState('');
    const [points, setPoints] = useState([]);

    const history = useHistory();

    const updName = (e) => {
        setName(e.target.value);
    }

    const updAge = (e) => {
        setAge(e.target.value);
    }

    const updPhone = (e) => {
        setPhone(e.target.value);
    }

    const updMessengerType = (val) => {
        setMessengerType(val);
    }

    const updInscriptionType = (val) => {
        setInscriptionType(val);
    }

    const updLink = (e) => {
        setLink(e.target.value);
    }

    const updEmail = (e) => {
        setEmail(e.target.value);
    }

    const selectPoint = (id) => {
        if (includesPoint(id)) {
            setPoints(points.filter(p => p != id));
        } else {
            setPoints([...points, id]);
        }
    }

    const previous = (e) => {
        e.preventDefault();
        navigateTo(activeIndex - 1);
    }

    const next = (e) => {
        e.preventDefault();
        navigateTo(activeIndex + 1);
    }

    const send = async (e) => {
        e.preventDefault();
        if (!checkErrors()) {
            setLoading(true);
            saveChanges();
        }
    }

    const saveChanges = () => {

        const idEvento = history.location.pathname.toString().replace(/\//g, '').replace(/ins_evento/g, '');

        const data = {
            eventId: idEvento,
            eventName: 'Dinámica de lectura en vivo',
            name: toName(name.trim()),
            role: inscriptionType.type,
            age: parseInt(age),
            phone: phone.trim(),
            email: email.trim()
        };

        saveEvent(data).then(() => {
            window.scrollTo(0, 0);
            setLoading(false);
            setSuccess(true);
        });
    }

    const checkErrors = () => {

        let error = (isNameInvalid(name) || isAgeInvalid(age) || isPhoneInvalid(phone) || isEmailInvalid(email));

        // Custom errors
        if (!includesPoint('SI')) {
            error = 'Debes confirmar tu asistencia y cumplimiento';
        }

        // Link        
        error = isLinkInvalid(link, inscriptionType.type != 'AUT');

        if (error) {
            alert(error);
            return true;
        };

        return false;
    }

    const includesPoint = (pointId) => {
        return points.find(p => p == pointId);
    }

    const navigateTo = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setSuccess(false);
    }, [activeIndex]);

    return (
        <div>
            <HelmetMetaData title="Aprende a construir tu novela como un profesional - Temple Luna" description="¿Eres escritor? Perfecciona tus habilidades con este curso en vivo y destaca sobre los demás. Es gratuito." />
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section position-relative z-3'>
                    <h2 className='mb-0'>Gran lectura de obras en vivo</h2>
                    <p className='txt-responsive-form w-60 w-md-75'>Con Laydy Czulewyez</p>
                </section>
                <section className='container-xl mt-3 position-relative'>
                    <img src={ImgAutor} alt='img-fondo' className='img-fondo-formulario' />
                    <div className='floating-form'>
                        {
                            success
                                ?
                                <div className='form-container text-align-center'>
                                    <Fade bottom>
                                        <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                        <h3 className='mt-1 mb-1'>Listo</h3>
                                    </Fade>
                                    <p className='txt-responsive-form m0-auto'>¡No olvides unirte al grupo! Presiona el botón de abajo</p>
                                    <FontAwesomeIcon icon={faAngleDown} size='2x' />

                                    <div className='form-buttons-container mt-3'>
                                        <a href="https://chat.whatsapp.com/DiLJJ3vkzU9I2yapuWlLvz" className='button button-green m0-auto'>
                                            <FontAwesomeIcon icon={faWhatsapp} size='1x' />
                                            {' '}
                                            <span>
                                                Unirme
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                :
                                <>
                                    <Steps
                                        activeIndex={activeIndex}
                                        navigateTo={navigateTo}
                                        steps={steps} />
                                    <div className='form-container'>
                                        <form>
                                            <StepManager currentIndex={activeIndex}>
                                                <div className='step-1'>

                                                    <div className='form-group mb-0'>
                                                        <h2>¡Bienvenido(a) a la dinámica!</h2>
                                                        <p>¿Cansado de tanto cliché allá afuera? Nosotros también.<br /><br />
                                                        Por eso, te invitamos a este espacio <b>en vivo</b> donde haremos <b>lectura y recomendación</b> de obras seleccionadas
                                                            por Laczully, una <b>autora de gran experiencia</b>. Síguela en Wattpad desde <b><a target="_blank" href="https://www.wattpad.com/user/Laczuly0711">aquí</a></b>.<br /><br />
                                                           En esta dinámica, <b>hay dos roles:</b> Puedes participar como <b>audiencia</b> y escuchar la mejor selección de obras, o puedes participar como <b>autor</b> e inscribir tu obra para ser leída.<br /><br />
                                                           Laczully elegirá <b>seis obras para leer</b>, en base a su criterio. Si tu obra es <b>elegida</b> y no te <b>reportas</b> por el grupo, tu obra será <b>reemplazada por otra.</b><br /><br />
                                                            Al final de tu inscripción, te aparecerá un botón para ingresar al <b>grupo de Whatsapp</b>. Inscríbete <b>solamente</b> si vas a asistir a la dinámica.<br /><br />

                                                            <b>*Si te inscribes e incumples, ya no serás tenido en cuenta en otras dinámicas de Temple Luna.</b><br /><br />
                                                        </p>
                                                    </div>

                                                    <div className='form-group'>
                                                        <ul>
                                                            <li><b>Número de obras a leer:</b> 6</li>
                                                            <li><b>Autora:</b> Laydy Czulewyez</li>
                                                            <li><b>Plataforma:</b> Google Meets</li>
                                                            <li><b>Horarios:</b> Viernes 23 abril a las 4pm (Hora Lima - Colombia)</li>
                                                        </ul>
                                                    </div>

                                                    <div className='form-group'>
                                                        <p>Presiona siguiente para continuar.</p>
                                                    </div>

                                                </div>
                                                <div className='step-2'>

                                                    <div className='form-group'>
                                                        <label htmlFor="txtNombres">¿Cómo te llamas?</label>
                                                        <input minLength="1" maxLength="50" type="text" value={name} onChange={updName} id="txtNombres" placeholder="Ingresa tus nombres" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtEdad">¿Qué edad tienes?</label>
                                                        <input type="number" min={10} max={99} value={age} onChange={updAge} id="txtEdad" placeholder="Ingresa tu edad" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtNumero">¿Con qué número entrarás? (con código de país)</label>
                                                        <div className='cbo-text'>
                                                            <DropdownImage
                                                                selectedItem={messengerType}
                                                                list={[contactTypes[0]]}
                                                                select={updMessengerType} />
                                                            <input type="text" value={phone} onChange={updPhone} id="txtNumero" placeholder="Ej: +51 999 999 999" />
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtCorreo">Bríndanos tu correo de contacto</label>
                                                        <input minLength="6" maxLength="100" type="email" value={email} onChange={updEmail} id="txtCorreo" placeholder="Ingresa tu correo" />
                                                    </div>

                                                </div>
                                                <div className='step-3'>

                                                    <div className='form-group'>
                                                        <div className='form-group'>
                                                            <label htmlFor="txtLink">¿Qué rol eliges?</label>
                                                            <DropdownImage
                                                                stretch
                                                                selectedItem={inscriptionType}
                                                                list={inscriptionTypes}
                                                                select={updInscriptionType} />
                                                        </div>
                                                        {
                                                            inscriptionType.type == 'AUT'
                                                            &&
                                                            <div className='form-group'>
                                                                <label htmlFor="txtLink">Link de tu obra</label>
                                                                <input minLength="1" maxLength="500" type="text" value={link} onChange={updLink} id="txtLink" placeholder="Ingresa el link" />
                                                            </div>
                                                        }
                                                        <div className='form-group'>
                                                            <label htmlFor="txtLink">Confirmo mi asistencia y el cumplimiento de las tareas solicitadas.</label>
                                                            {
                                                                chkPoints.map(point => {
                                                                    const included = includesPoint(point.id);
                                                                    return (
                                                                        <div key={point.id} onClick={() => selectPoint(point.id)} className={`chkTag ${included ? 'active' : ''}`}>
                                                                            {
                                                                                included
                                                                                    ?
                                                                                    <FontAwesomeIcon color={'white'} icon={faCheck} style={{ fontSize: '1.6rem' }} />
                                                                                    :
                                                                                    <FontAwesomeIcon color={'#adadad'} icon={faDotCircle} style={{ fontSize: '1.6rem' }} />
                                                                            }
                                                                            {' '}
                                                                            {point.name}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </StepManager>
                                            <div className='form-buttons-container'>
                                                {
                                                    canGoBackwards && !loading
                                                    &&
                                                    <button onClick={previous} className='button button-green'>
                                                        <FontAwesomeIcon icon={faAngleLeft} size='xl' />
                                                        {' '}
                                                        <span className='d-none d-md-inline'>
                                                            Anterior
                                                    </span>
                                                    </button>
                                                }
                                                {
                                                    loading
                                                        ?
                                                        <span className='button button-green justify-self-right'>
                                                            Enviando
                                                            {' '}
                                                            <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                                        </span>
                                                        :
                                                        isLast
                                                            ?
                                                            <button onClick={send} className='button button-green justify-self-right'>
                                                                <span className='d-none d-md-inline'>
                                                                    Enviar
                                                    </span>
                                                                {' '}
                                                                <FontAwesomeIcon icon={faCheck} size='xl' />
                                                            </button>
                                                            :
                                                            <button onClick={next} className='button button-green justify-self-right'>
                                                                <span className='d-none d-md-inline'>
                                                                    Siguiente
                                                    </span>
                                                                {' '}
                                                                <FontAwesomeIcon icon={faAngleRight} size='xl' />
                                                            </button>
                                                }
                                            </div>
                                        </form>
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

export default Inscripcion;
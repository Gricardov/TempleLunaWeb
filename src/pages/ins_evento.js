import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import ImgPlumaTinta from '../img/feather-ink.svg';
import HelmetMetaData from "../componentes/helmet";
import { toName } from '../helpers/functions';
import { saveEvent } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faCheck, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { contactTypes } from '../data/data';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const roleTypes = [{ type: 'AUD', icon: 'fas fa-person', text: 'Audiencia' }, { type: 'AUT', icon: 'fas fa-person', text: 'Autor' }];

const steps = ['Inicio', 'Contacto', 'Listo'];
const chkPoints = [{ id: 'SI', name: 'Sí', abrev: 'Sí' }];

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Solicitud = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [success, setSuccess] = useState(true); // Determina si se envío el form sin errores
    const { canGoBackwards, isLast } = useStepObserver(activeIndex, steps.length);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [messengerType, setMessengerType] = useState(contactTypes[0]);
    const [email, setEmail] = useState('');
    const [points, setPoints] = useState([]);

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
        const data = {
            eventId: 'OBRA-PROFESIONAL-CCADENA-1',
            eventName: 'Construye tu novela como un profesional',
            name: toName(name.trim()),
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

        // Name
        if (!(/^(?!\s*$).{1,50}/.test(name))) {
            alert('Tu nombre debe tener de 1 a 50 caracteres');
            return true;
        }
        else if (!(/^[a-zA-Z\sáéíóúñÑ]*$/.test(name))) {
            alert('Tu nombre no puede tener caracteres especiales');
            return true;
        }

        // Age
        if (!age || age < 10 || age > 99) {
            alert('Introduce una edad válida');
            return true;
        }

        // Phone
        if (!(/(^\s*$)|(^[+]?[0-9 ]{7,20}$)/).test(phone)) {
            alert('Introduce un teléfono válido');
            return true;
        }

        // Email
        if (!(/^(?!\s*$).{6,100}/.test(email))) {
            alert('Tu correo debe tener de 6 a 100 caracteres');
            return true;
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
            alert('Introduce un correo válido');
            return true;
        }

        if (!includesPoint('SI')) {
            alert('Debes confirmar tu asistencia y cumplimiento');
            return true;
        }

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
                    <h2 className='mb-0'>Construye tu novela como un profesional</h2>
                    <p className='txt-responsive-form w-60 w-md-75'>Tu obra nunca volverá a ser "una obra más"</p>
                </section>
                <section className='container-xl mt-5 position-relative'>
                    <img src={ImgPlumaTinta} alt='img-fondo' className='img-fondo-formulario' />
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
                                        <a href="https://chat.whatsapp.com/EAJ12bJqnyW5OwjpkWrRs3" className='button button-green m0-auto'>
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

                                                    <div className='form-group'>
                                                        <h2>¡Hola, escritor!</h2>
                                                        <p>Hemos creado este gran curso <b>en vivo</b> para enseñarte a crear obras de calidad desde <b>la psicología de los personajes</b> y lograr que estas destaquen sobre cualquier otra.<br /><br />
                                                            Al final de tu inscripción, te aparecerá un botón para ingresar al <b>grupo de Whatsapp</b>. Por ahí <b>pasaremos los links de transmisión.</b> Además, podrás interactuar con el instructor y los demás autores.<br /><br />
                                                            Inscríbete <b>solamente</b> si vas a asistir a las dos sesiones. Cada sesión requerirá que hayas leido <b>un texto que te indicaremos</b>. Este servirá para hacer el correspondiente análisis.<br /><br />
                                                            <b>*Si te inscribes e incumples, ya no serás tenido en cuenta en otros talleres de Temple Luna. Tú quieres dominar las letras, así que lee bien el horario y requisitos.</b><br /><br />
                                                            <b>El curso es gratuito.</b></p>
                                                    </div>

                                                    <div className='form-group'>
                                                        <ul>
                                                            <li><b>Número de sesiones:</b> 2</li>
                                                            <li><b>Instructor:</b> Carlos Cadena</li>
                                                            <li><b>Plataforma:</b> Google Meets</li>
                                                            <li><b>Horarios:</b> Domingo 18 y 25 de abril a las 11am (Hora Lima - Colombia)</li>
                                                            <li><b>Requisito sesión 1:</b> Leer "Eróstrato". Accede desde <b><a target="_blank" href="https://www.wattpad.com/1040308420-artilugios-del-placer-antolog%C3%ADa-de-candentes">aquí</a></b>.</li>
                                                            <li><b>Requisito sesión 2:</b> Leer "La reina de unicel". Se pasará en PDF.</li>
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

export default Solicitud;
import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
//import ImgAutor from '../img/erendira.jpg';
import HelmetMetaData from "../componentes/helmet";
import { toName } from '../helpers/functions';
import { isNameInvalid, isAgeInvalid, isPhoneInvalid, isEmailInvalid } from '../helpers/validators';
import { saveEvent } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faCheck, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { contactTypes } from '../data/data';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

const steps = ['Inicio', 'Contacto', 'Listo'];
const chkPoints = [{ id: 'SI', name: 'Sí', abrev: 'Sí' }];

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const mainTitle = 'Gran grupo de lectura: La tertulia';
const hostName = 'Wilfrido Muñiz Ruiz';
const ImgAutor = 'https://firebasestorage.googleapis.com/v0/b/temple-luna.appspot.com/o/perfil%2Fwilfrido3.jpg?alt=media&token=c6938927-c784-49d2-9999-cb878c20dd0d';

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
            eventName: mainTitle,
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

        let error = (isNameInvalid(name) || isAgeInvalid(age) || isPhoneInvalid(phone) || isEmailInvalid(email));

        // Custom errors
        if (!includesPoint('SI')) {
            error = 'Debes confirmar tu asistencia y cumplimiento';
        }

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
            <HelmetMetaData title={mainTitle + " - Temple Luna"} description="¿La plataforma de turno no valora lo que escribes? Puedes tener una joya oculta entre manos por la que muchos pagarían." />
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section position-relative z-3'>
                    <h2 className='mb-0'>{mainTitle}</h2>
                    <p className='txt-responsive-form w-60 w-md-75'>Con {hostName}</p>
                </section>
                <section className='container-xl mt-3 position-relative'>
                    <div style={{ backgroundImage: `url(${ImgAutor})` }} alt='img-fondo' className='img-fondo-formulario' />
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
                                        <a href="https://chat.whatsapp.com/FCU0DzPxGtw8AdoFxVRbJt" className='button button-green m0-auto'>
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
                                                        <h2>¡Bienvenido(a) a bordo!</h2>
                                                        <p>Sabemos que <b> no es fácil</b> encontrar aquel lugar idóneo donde <b>compartir</b> con los demás tu pasión por la <b>lectura</b>. Eso está por acabar. <br /><br />
                                                            Hemos creado esta <b>comunidad de lectores</b>, donde nos reunimos <b>semanalmente</b> y armamos <b>debates</b> sobre <b>obras de interés común</b>. Todos los meses,
                                                            traemos <b>autores invitados</b>, quienes nos hablan de su <b>experiencia</b> y hacen surgir <b>temas</b> muy interesantes. <b>Incluso, tú podrías ser autor.</b><br /><br />
                                                            Ahora, <b>abrimos la invitación</b> al público general para poder <b>enriquecer</b> esta experiencia mucho más. Si te interesa ser parte, lee a continuación:<br /><br />

                                                            <b>1- ¿A quién va dirigido el grupo?</b><br /><br />
                                                            Principalmente, a personas que estén dispuestas a proponer y leer obras cada semana.<br /><br />
                                                            <b>2- ¿Debo cumplir algún requisito?</b><br /><br />
                                                            Sí. Esta comunidad está pensada <b>para interactuar con los demás.</b> Al unirte, aceptas <b>participar y opinar</b> activamente en las reuniones del grupo.<br /><br />
                                                            <b>3- ¿Cómo se lleva a cabo la dinámica?</b><br /><br />
                                                            Cada sábado, el facilitador propondrá obras a debatir en la próxima sesión. Ahí debes participar y hacer tus propias sugerencias. De la misma forma, tendrás la oportunidad
                                                            de leer el material del artista invitado del mes.<br /><br />
                                                            <b>4- ¿Qué temas tratan normalmente?</b><br /><br />
                                                            Los temas son libres y variados, pero suelen incluir la vida del autor, apreciación de la obra y qué idea te despertó.<br /><br />
                                                            <b>5- ¿Qué autores u obras suelen leer?</b><br /><br />
                                                            Últimamente, se han incluido cuentos clásicos de autores como Rulfo, Dostoievski, Gogol, Papini; sin embargo, estamos dispuestos a leer de todo, (hasta fanfics de los Jonas Brothers si así lo quieren).<br /><br />
                                                            <b>6- ¿Qué pasa si un día no puedo asistir?</b><br /><br />
                                                            Siempre vamos a estar para entenderte, solo debes avisar al facilitador, porque eliminamos a las personas que después de un tiempo no presentan actividad.
                                                            Otros motivos que pueden ser motivo de eliminacion son faltas de respeto hacia otros miembros, aunque esto no ha sucedido aún.<br /><br />
                                                            <b>7- ¿Cuáles son los horarios?</b><br /><br />
                                                            Todos los sábados, de 9pm a 11pm (Hora Lima - Colombia - Centro de México).<br /><br />
                                                            <b>8- ¿Quién es el facilitador?</b><br /><br />
                                                            Su nombre es <b>{hostName}</b> y ha tenido una amplia trayectoria como periodista y poeta.<br /><br />
                                                            <b>9- Por dónde se llevarán a cabo las reuniones</b><br /><br />
                                                            Usaremos la plataforma <b>Google Meets</b> para las videoconferencias. Las coordinaciones se harán por un grupo de <b>Whatsapp.</b> Recuerda descargar ambos.<br /><br />
                                                            <b>10- ¡Acepto! ¿Cómo me uno?</b><br /><br />
                                                            Inscríbete en el formulario. <b>Al finalizar</b>, te aparecera un <b>botón</b> para <b>entrar al grupo de Whatsapp</b>. ¡No olvides unirte!<br /><br />
                                                        </p>
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
                                                            <label htmlFor="txtLink">He leído los horarios, reglas y confirmo mi asistencia</label>
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
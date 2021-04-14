import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import ImgLibro from '../img/books.svg';
import HelmetMetaData from "../componentes/helmet";
import { Link } from 'react-router-dom';
import { critiquePoints } from '../data/data';
import { extractLink, toName, toSentence } from '../helpers/functions';
import { saveRequest } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faCheckCircle, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { contactTypes } from '../data/data';

export const roleTypes = [{ type: 'AUD', icon: 'fas fa-person', text: 'Audiencia' }, { type: 'AUT', icon: 'fas fa-person', text: 'Autor' }];

const steps = ['Inicio', 'Contacto', 'Listo'];
const chkPoints = critiquePoints;

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
    const [roleType, setRoleType] = useState(roleTypes[0]);
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [intention, setIntention] = useState('');
    const [points, setPoints] = useState(['INTENCION']);

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

    const updLink = (e) => {
        setLink(e.target.value);
    }

    const updTitle = (e) => {
        setTitle(e.target.value);
    }

    const updAbout = (e) => {
        setAbout(e.target.value);
    }

    const updIntention = (e) => {
        setIntention(e.target.value);
    }

    const updRoleType = (val) => {
        setRoleType(val);
    }

    const selectPoint = (id) => {
        if (includesPoint(id)) {
            if (id != 'INTENCION') {
                setPoints(points.filter(p => p != id));
            }
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
            name: toName(name.trim()),
            age: parseInt(age),
            phone: phone.trim(),
            messengerType: messengerType.type,
            email: email.trim(),
            title: toSentence(title.trim()),
            link: extractLink(link.trim()),
            about: about.trim(),
            intention: intention.trim(),
            points,
            type: 'CRITICA',
            status: 'DISPONIBLE',
            active: 1
        };

        saveRequest(data).then(() => {
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

        if (!(/^(?!\s*$).{6,100}/.test(email))) {
            alert('Tu correo debe tener de 6 a 100 caracteres');
            return true;
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
            alert('Introduce un correo válido');
            return true;
        }

        // Link
        if (!(/^(?!\s*$).{1,500}/.test(link))) {
            alert('Tu link debe tener de 1 a 500 caracteres');
            return true;
        } else if (!extractLink(link.trim())) {
            alert('Parece que ese link no es válido. Revísalo bien');
            return true;
        }

        // Title
        if (!(/^(?!\s*$).{1,100}/.test(title))) {
            alert('Tu título debe tener de 1 a 100 caracteres');
            return true;
        }

        // About
        if (!(/^(?!\s*$).{1,1000}/.test(about))) {
            alert('El resumen de tu historia debe contener de 1 a 1000 caracteres');
            return true;
        }

        // Intention
        if (!(/^(?!\s*$).{1,1000}/.test(intention))) {
            alert('Lo que quieres transmitir debe tener de 1 a 1000 caracteres');
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
                    <p className='txt-responsive-form w-60 w-md-75'>Inscríbete a este gran curso en vivo y destaca tus obras sobre las demás</p>
                </section>
                <section className='container-xl mt-5 position-relative'>
                    <img src={ImgLibro} alt='img-fondo' className='img-fondo-formulario' />
                    <div className='floating-form'>
                        {
                            success
                                ?
                                <div className='form-container text-align-center'>
                                    <Fade bottom>
                                        <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                        <h3 className='mt-1 mb-1'>Listo</h3>
                                    </Fade>
                                    <p className='txt-responsive-form m0-auto'>En unos días te contactaremos</p>
                                    <div className='form-buttons-container mt-3'>
                                        <Link to={'inicio'} className='button button-green m0-auto'>
                                            <FontAwesomeIcon icon={faHome} size='xl' />
                                            {' '}
                                            <span className='d-none d-md-inline'>
                                                Regresar
                                            </span>
                                        </Link>
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
                                                        <h2>Hola, escritor!</h2>
                                                        <p>Hemos creado este gran curso <b>en vivo</b> para enseñarte a crear obras de calidad y lograr que estas destaquen sobre cualquier otra.<br /><br/>                                                            
                                                            Al final de tu inscripción, te daremos acceso al <b>grupo de Whatsapp</b> donde se encuentra el instructor y el resto de inscritos. Ahí es donde <b>pasaremos los links de transmisión</b> para las sesiones.<br /><br />
                                                            Inscríbete <b>solamente</b> si vas a asistir a las dos sesiones. Cada sesión requerirá que hayas leido <b>un texto que te indicaremos</b>. Este servirá para hacer el correspondiente análisis.<br /><br/>
                                                            <b>*Si te inscribes e incumples, ya no serás tenido en cuenta en otros talleres de Temple Luna. Lee bien el horario y requisitos.</b><br /><br />
                                                            <b>El curso es gratuito.</b></p>
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">¿Qué rol elijes?</label>
                                                        <DropdownImage
                                                            stretch
                                                            selectedItem={roleType}
                                                            list={roleTypes}
                                                            select={updRoleType} />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor="txtTitulo">Título de tu obra</label>
                                                        <input minLength="1" maxLength="100" type="text" value={title} onChange={updTitle} id="txtTitulo" placeholder="Ejemplo: La gran infidelidad" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">Link de tu obra</label>
                                                        <input minLength="1" maxLength="500" type="text" value={link} onChange={updLink} id="txtLink" placeholder="Ingresa el link" />
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
                                                        <label htmlFor="txtNumero">Bríndanos un número para consultas (con código de país)</label>
                                                        <div className='cbo-text'>
                                                            <DropdownImage
                                                                selectedItem={messengerType}
                                                                list={contactTypes}
                                                                select={updMessengerType} />
                                                            <input type="text" value={phone} onChange={updPhone} id="txtNumero" placeholder="Ej: +51 999 999 999" />
                                                        </div>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtCorreo">Bríndanos un correo para enviarte el trabajo</label>
                                                        <input minLength="6" maxLength="100" type="email" value={email} onChange={updEmail} id="txtCorreo" placeholder="Ingresa tu correo" />
                                                    </div>


                                                </div>
                                                <div className='step-3'>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtAcerca">En general ¿De qué trata tu obra?</label>
                                                        <textarea minLength="1" maxLength="1000" rows="4" value={about} onChange={updAbout} id="txtAcerca" placeholder="Ejemplo: Mi obra trata sobre las ocurrencias vividas con mi primer amor y el dolor causado por su posterior traición..."></textarea>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtIntencion">¿Qué intención deseas transmitir?</label>
                                                        <textarea minLength="1" maxLength="1000" rows="4" value={intention} onChange={updIntention} id="txtIntencion" placeholder="Ejemplo: Deseo transmitir miedo e incertidumbre, por medio de una historia ambientada en una pandemia mundial..."></textarea>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">¿Qué puntos tocamos en la crítica?</label>
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
                                                                                <FontAwesomeIcon color={'#adadad'} icon={faPlus} style={{ fontSize: '1.6rem' }} />
                                                                        }
                                                                        {' '}
                                                                        {point.name}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="chkPortafolio">Si tu obra es muy larga, el crítico acordará contigo hasta donde llegará. El artista podrá usar la crítica en su propio portafolio.</label>
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
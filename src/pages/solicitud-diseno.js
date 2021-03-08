import React, { useRef, useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ImgBailando from '../img/dancing.svg';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import HelmetMetaData from "../componentes/helmet";
import { Link } from 'react-router-dom';
import { uploadImage, saveRequest } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { designTypes, contactTypes } from '../data/data';

const steps = ['Contacto', 'Tipo', 'Trasfondo'];
const maxFileSize = 5242880;

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Solicitud = () => {

    const refBoceto = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [success, setSuccess] = useState(true); // Determina si se envío el form sin errores
    const { canGoBackwards, isLast } = useStepObserver(activeIndex, steps.length);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [messengerType, setMessengerType] = useState('WSP');
    const [email, setEmail] = useState('');
    const [designType, setDesignType] = useState('POR');
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [intention, setIntention] = useState('');
    const [imgSample, setImgSample] = useState(null);

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

    const updDesignType = (val) => {
        setDesignType(val);
    }

    const updLink = (e) => {
        setLink(e.target.value);
    }

    const updTitle = (e) => {
        setTitle(e.target.value);
    }

    const updAuthor = (e) => {
        setAuthor(e.target.value);
    }

    const updIntention = (e) => {
        setIntention(e.target.value);
    }

    const startSelectSample = (e) => {
        e.preventDefault();
        refBoceto.current.click();
    }

    const selectSample = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            if (file.size <= maxFileSize) {
                setImgSample(file);
            } else {
                alert('La imagen debe ser menor a 5MB')
            }
        }
    }

    const deleteSample = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgSample(null);
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
            if (imgSample) {
                uploadImage('solicitud-diseno', imgSample)
                    .then(url => {
                        saveChanges(url);
                    })
                    .catch(error => {
                        setLoading(false);
                        setSuccess(false);
                        alert('Error al subir la imagen. Reintente');
                        console.log(error);
                    })
            } else {
                saveChanges('');
            }
        }
    }

    const saveChanges = (urlImg) => {
        const data = {
            name: name.trim(),
            age: parseInt(age),
            phone: phone.trim(),
            messengerType,
            email: email.trim(),
            designType,
            link: link.trim(),
            title: title.trim(),
            author: author.trim(),
            intention: intention.trim(),
            urlImg: urlImg.trim(),
            type: 'DISENO',
            status: 'DISPONIBLE'
        };

        saveRequest({ ...data, active: 1 }).then(() => {
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

        // Link (optional)
        if (link) {
            if (!(/^(?!\s*$).{1,500}/.test(link))) {
                alert('Tu link debe tener de 1 a 500 caracteres');
                return true;
            }
        }

        // Title
        if (!(/^(?!\s*$).{1,100}/.test(title))) {
            alert('Tu título debe tener de 1 a 100 caracteres');
            return true;
        }

        // Author
        if (!(/^(?!\s*$).{1,100}/.test(author))) {
            alert('Tu pseudónimo debe tener de 1 a 100 caracteres');
            return true;
        }

        // Intention
        if (!(/^(?!\s*$).{1,1000}/.test(intention))) {
            alert('Lo que quieres transmitir debe tener de 1 a 1000 caracteres');
            return true;
        }

        return false;
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
            <Navbar />
            <HelmetMetaData title="¡Pide tu diseño en Temple Luna!" description="Estamos dispuestos a ayudarte con aquellas obra que tanto amas. ¡Es gratis!"/>
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section'>
                    <h2 className='mb-0'>Pide un diseño</h2>
                    <p className='txt-responsive-form'>Y uno de nuestros artistas te contactará a la brevedad</p>
                </section>
                <section className='container-xl mt-5 position-relative'>
                    <img src={ImgBailando} alt='img-fondo' className='img-fondo-formulario' />

                    <div className='floating-form'>
                        {
                            success
                                ?
                                <div className='form-container text-align-center'>
                                    <Fade bottom>
                                        <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                        <h3 className='mt-1 mb-1'>Listo</h3>
                                    </Fade>
                                    <p className='txt-responsive-form m0-auto'>En menos de 3 días te contactaremos</p>
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
                                                        <label htmlFor="txtNombres">¿Cómo te llamas?</label>
                                                        <input minLength="1" maxLength="50" type="text" value={name} onChange={updName} id="txtNombres" placeholder="Ingresa tus nombres" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtEdad">¿Qué edad tienes?</label>
                                                        <input type="number" min={10} max={99} value={age} onChange={updAge} id="txtEdad" placeholder="Ingresa tu edad" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtNumero">Bríndanos un número si hay consultas</label>
                                                        <div className='cbo-text'>
                                                            <DropdownImage
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
                                                <div className='step-2'>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">Tipo de diseño</label>
                                                        <DropdownImage
                                                            stretch
                                                            list={designTypes}
                                                            select={updDesignType} />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">Link de tu obra (Opcional)</label>
                                                        <input minLength="1" maxLength="500" type="text" value={link} onChange={updLink} id="txtLink" placeholder="Ingresa el link" />
                                                    </div>
                                                </div>
                                                <div className='step-3'>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtTitulo">Título o frase principal</label>
                                                        <input minLength="1" maxLength="100" type="text" value={title} onChange={updTitle} id="txtTitulo" placeholder="Ejemplo: El amor todo lo puede" />

                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtPseudonimo">¿Cuál es tu pseudónimo?</label>
                                                        <input minLength="1" maxLength="100" type="text" value={author} onChange={updAuthor} id="txtPseudonimo" placeholder="Ejemplo: Atenas" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtIntencion">¿Qué deseas transmitir con tu diseño?</label>
                                                        <textarea minLength="1" maxLength="1000" rows="4" value={intention} onChange={updIntention} id="txtIntencion" placeholder="Ejemplo: Quiero transmitir la idea de un mundo inestable e idealizado por una típica adolescente..."></textarea>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="flBoceto">¿Tienes algún boceto en imagen? (Opcional)</label>
                                                        {
                                                            imgSample
                                                                ?
                                                                <button onClick={startSelectSample} className={`d-flex justify-content-between align-items-center button button-light-purple button-thin stretch ${imgSample ? 'd-flex' : ''}`}>
                                                                    <span className='clamp clamp-1'>
                                                                        {imgSample.name}
                                                                    </span>
                                                                    <span onClick={deleteSample} className='fa fa-times' style={{ color: 'white' }}></span>
                                                                </button>
                                                                :
                                                                <button onClick={startSelectSample} className={`button button-light-purple button-thin stretch ${imgSample ? 'd-flex' : ''}`}>
                                                                    <span>
                                                                        Subir imagen
                                                                    </span>
                                                                </button>
                                                        }
                                                        <input type="file" onChange={selectSample} accept="image/*" ref={refBoceto} className='d-none' id="flBoceto" />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor="chkPortafolio">El artista podrá usar el diseño final en su propio portafolio.</label>
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
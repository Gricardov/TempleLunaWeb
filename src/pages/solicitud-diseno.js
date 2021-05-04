import React, { useRef, useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ImgTematica from '../img/des-req.png';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import HelmetMetaData from "../componentes/helmet";
import { Link } from 'react-router-dom';
import { extractLink, toName, toSentence } from '../helpers/functions';
import { isNameInvalid, isAgeInvalid, isPhoneInvalid, isEmailInvalid, isLinkInvalid, isTitleInvalid, isAuthorInvalid, isIntentionInvalid } from '../helpers/validators';
import { uploadImage, saveRequest } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import { designTypes, contactTypes } from '../data/data';

const steps = ['¡Hola!', 'Contacto', 'Tipo', 'Trasfondo'];
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
    const [messengerType, setMessengerType] = useState(contactTypes[0]);
    const [email, setEmail] = useState('');
    const [designType, setDesignType] = useState(designTypes[1]);
    const [link, setLink] = useState('');
    const [days, setDays] = useState(1);
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

    const updDays = (e) => {
        setDays(e.target.value);
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
                alert('La imagen debe ser menor a 5MB');
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
                    });
            } else {
                saveChanges('');
            }
        }
    }

    const saveChanges = (urlImg) => {
        const data = {
            name: toName(name.trim()),
            age: parseInt(age),
            phone: phone.trim(),
            messengerType: messengerType.type,
            email: email.trim(),
            designType: designType.type,
            link: extractLink(link.trim()),
            title: toSentence(title.trim()),
            daysLeft: parseInt(days),
            author: author.trim(),
            intention: intention.trim(),
            urlImg: urlImg.trim(),
            type: 'DISENO',
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

        let error = (isNameInvalid(name)
            || isAgeInvalid(age)
            || isPhoneInvalid(phone)
            || isEmailInvalid(email)
            || isLinkInvalid(link)
            || isTitleInvalid(title)
            || isAuthorInvalid(author)
            || isIntentionInvalid(intention));

        // Custom errors
        if (designType.type == 'CR') {
            if (isNaN(days) || days < 0 || days > 10) {
                error = 'Introduce días de lanzamiento válidos';
            }
        }

        if (error) {
            alert(error);
            return true;
        };

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
            <HelmetMetaData title="Diseños - Temple Luna" description="Estamos dispuestos a ayudarte con aquellas obra que tanto amas. ¡Es gratis!" />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section position-relative z-3'>
                    <h2 className='mb-0'>Pide un diseño</h2>
                    <p className='txt-responsive-form'>Y te lo enviaremos a tu correo</p>
                </section>
                <section className='container-xl mt-2 position-relative'>
                    <img src={ImgTematica} alt='img-fondo' className='img-fondo-formulario' />

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
                                                <div className='step-0'>
                                                    <div className='form-group mb-0'>
                                                        <p><b>Gracias</b> por elegir a <b>Temple Luna</b>. ¡Estamos seguros de que te va a encantar!<br /><br />
                                                        Antes de continuar, te pedimos que leas algunas <b>preguntas frecuentes:</b><br /><br />

                                                            <b>1- ¿Qué solicitamos?</b><br /><br />
                                                            Solicitamos tus datos de contacto para poder <b>(1)</b> enviarte el trabajo final y <b>(2)</b> contactarte si es que necesitamos
                                                            más información sobre tu pedido.<br /><br />

                                                            <b>2- ¿Qué obtendré?</b><br /><br />
                                                            Obtendrás una <b>imagen en alta calidad</b> con el resultado de tu pedido. Ese archivo será <b>enviado a tu correo</b>. Contendrá,
                                                            además, un <b>link</b> que podrás usar para compartirlo. Puedes ver un ejemplo
                                                            <b> <a target='_blank' href='https://templeluna.app/prev_resultado?id=qsTf8adrnZTEYercSfWY&t=Cuando%20el%20destino%20es%20imprevisible%20cualquier%20camino%20es%20v%C3%A1lido&test=true'>aquí</a></b>.<br /><br />

                                                            <b>3- ¿Hay condiciones?</b><br /><br />
                                                            Tu escrito debe estar <b>completo</b> y no debe incluir algún <b>costo monetario</b> para poder leerlo <b>nosotros</b>. Caso contrario, el pedido será <b>anulado</b>.<br />
                                                            Asimismo, <b>por razones de seguridad, </b> evita envíar escritos inéditos o que aún no pienses publicar.<br />
                                                            Finalmente, el artista podrá usar el pedido para promocionar en su <b>propio portafolio</b>.<br /><br />

                                                            <b>4- ¿Cuál es el costo?</b><br /><br />
                                                            Por el momento, este servicio es <b>gratuito</b>. Cuando no lo sea, <b>lo dejaremos claro</b>.<br /><br />

                                                            <b>5- ¿Quienes atienden los pedidos?</b><br /><br />
                                                            El equipo está conformado por <b>voluntarios</b>, los cuales han tenido que demostrar <b>experiencia en diseños</b>.<br /><br />

                                                            <b>6- ¿Cómo puedo agradecer?</b><br /><br />
                                                            Cuando <b>recibas</b> tu pedido, tendrás disponible el botón de <b>Compartir</b>. Comparte nuestro trabajo para que <b>más personas</b> conozcan la iniciativa.<br /><br />

                                                            <b>7- ¿Cómo puedo ser voluntario?</b><br /><br />
                                                            Escríbenos por el <b> <a target='_blank' href='https://www.facebook.com/groups/templeluna/'>grupo oficial</a></b> y podemos coordinar una <b>entrevista con el creador</b>.
                                                        </p>
                                                    </div>
                                                    <div className='form-group'>
                                                        <p>Presiona siguiente para continuar.</p>
                                                    </div>
                                                </div>
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
                                                <div className='step-2'>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">Tipo de diseño</label>
                                                        <DropdownImage
                                                            stretch
                                                            selectedItem={designType}
                                                            list={designTypes}
                                                            select={updDesignType} />
                                                    </div>
                                                    {
                                                        designType.type == 'CR'
                                                        &&
                                                        <div className='form-group'>
                                                            <label htmlFor="txtDaysLeft">¿En cuántos días lanzarás tu obra?</label>
                                                            <input min="0" max="10" type="number" value={days} onChange={updDays} id="txtDaysLeft" placeholder="Máximo 10" />
                                                        </div>
                                                    }
                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">Link de tu obra</label>
                                                        <input minLength="1" maxLength="500" type="text" value={link} onChange={updLink} id="txtLink" placeholder="Ingresa el link" />
                                                    </div>
                                                </div>
                                                <div className='step-3'>
                                                    <div className='form-group'>
                                                        <label htmlFor="txtTitulo">Resume tu historia a una frase</label>
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
                                                        <label htmlFor="flBoceto">¿Tienes algún boceto en mente? Súbelo</label>
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
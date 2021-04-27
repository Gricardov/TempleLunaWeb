import React, { useRef, useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdown-image';
import ClipLoader from "react-spinners/ClipLoader";
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';
import Fade from 'react-reveal/Fade';
import ImgFondo from '../img/ccadena.jpg';
import HelmetMetaData from "../componentes/helmet";
import { toName } from '../helpers/functions';
import { isNameInvalid, isAgeInvalid, isPhoneInvalid, isEmailInvalid } from '../helpers/validators';
import { uploadImage, saveEvent } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck, faCheckCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { contactTypes } from '../data/data';
import { useHistory } from 'react-router-dom';

const steps = ['Inicio', 'Contacto', 'Listo'];
const chkPoints = [{ id: 'SI', name: 'Sí', abrev: 'Sí' }];
const maxFileSize = 5242880;

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
    const [points, setPoints] = useState([]);
    const [imgScn, setImgScn] = useState(null);

    const history = useHistory();
    const refScn = useRef(null);

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

    const startSelectScn = (e) => {
        e.preventDefault();
        refScn.current.click();
    }

    const selectScn = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            if (file.size <= maxFileSize) {
                setImgScn(file);
            } else {
                alert('La imagen debe ser menor a 5MB');
            }
        }
    }

    const deleteScn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setImgScn(null);
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
            if (imgScn) {
                uploadImage('inscripcion', imgScn)
                    .then(url => {
                        saveChanges(url);
                    })
                    .catch(error => {
                        setLoading(false);
                        setSuccess(false);
                        alert('Error al subir la imagen. Reintente');
                        console.log(error);
                    });
            }
        }
    }

    const saveChanges = (urlImgInv) => {

        const idEvento = history.location.pathname.toString().replace(/\//g, '').replace(/ins_evento/g, '');

        const data = {
            eventId: idEvento,
            eventName: 'Gran curso de guión, texto y novela',
            name: toName(name.trim()),
            age: parseInt(age),
            urlImgInv: urlImgInv.trim(),
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

        if (!imgScn) {
            error = 'Debes subir la imagen de la transacción';
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
            <HelmetMetaData title="Gran curso de guión, texto y novela - Temple Luna" description="Aprende a destacar tus obras como nunca antes" />
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section position-relative z-3'>
                    <h2 className='mb-0'>Gran curso de guión, texto y novela</h2>
                    <p className='txt-responsive-form w-60 w-md-75'>Aprende a crear obras de gran calidad</p>
                </section>
                <section className='container-xl mt-3 position-relative'>
                    <img src={ImgFondo} alt='img-fondo' className='img-fondo-formulario' />
                    <div className='floating-form'>
                        {
                            success
                                ?
                                <div className='form-container text-align-center'>
                                    <Fade bottom>
                                        <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                        <h3 className='mt-1 mb-1'>Listo</h3>
                                    </Fade>
                                    <p className='txt-responsive-form m0-auto'>Te contactaremos para unirte al grupo del curso</p>
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
                                                        <h2>Empecemos por una realidad:</h2>
                                                        <p>Tú <b>jamás revelarías</b> tus íntimos secretos ni tus contraseñas, ¿Cierto? <b>Porque no quieres que alguien los vea.</b><br /><br />
                                                            <b>Sin embargo</b>, ¿Te has dado cuenta de que cuando tienes un momento de <b>inspiración</b>, escribes algo, lo pintas o lo manifiestas en algún tipo de <b>arte</b>?<br /><br />
                                                            <b>Ahí está la diferencia.</b> Todo arte lleva implícito el deseo de ser visto por los otros. Si no fuera así, <b>lo esconderías</b>.<br /><br />
                                                            <b>¿Por qué negarlo? ¡Tú también quieres ser leído(a)!</b> Pero ¿Quién decide sí una obra triunfa? <b>Exacto. Es el público</b>.<br /><br />
                                                            <b>Por esa razón, creamos este curso</b>, aquí dejarás las excusas y crearás obras de calidad que les gusten a los demás, sin dejar tu esencia.
                                                            Puedes ver la enseñanza del profesor <b><a target="_blank" href="https://www.youtube.com/channel/UCrHV9JlQKBNWLUs5wm8dYCA">en nuestro canal</a>.</b>
                                                        </p>
                                                    </div>

                                                    <div className='form-group'>
                                                        <ul>
                                                            <li><b>Número de sesiones:</b> 6</li>
                                                            <li><b>Instructor:</b> Carlos Cadena </li>
                                                            <li><b>Plataforma:</b> Google Meets</li>
                                                            <li><b>Horarios:</b> Mayo: 9, 16, 23 y 30; Junio: 6 y 13. De 11am a 1pm (Hora Lima - Colombia)</li>
                                                            <li><b>Temario:</b> <b><a target="_blank" href="https://drive.google.com/file/d/1KjkDV_54swrMFseRpm7xkQtmowAx9Kr2/view?usp=sharing">Ver aquí</a></b></li>
                                                            <li><b>Inversión:</b> 30 dólares</li>
                                                            <li><b>Método:</b> Paypal</li>
                                                            <li><b>Facilidades:</b> 15 dólares antes de iniciar y el resto, después de la sesión del 23</li>
                                                            <li><b>Fecha máxima de pago:</b> 5 de mayo</li>
                                                            <li><b>Condición:</b> 10 inscritos como mínimo</li>
                                                            <li><b>Obras llevadas al teatro:</b> <b><a target="_blank" href="https://www.facebook.com/LosDemoniosDetrasDeLaPared/">Ver aquí</a></b>.</li>
                                                            <li><b>Obra "Eróstrato":</b> <b><a target="_blank" href="https://www.wattpad.com/1040308420-artilugios-del-placer-antolog%C3%ADa-de-candentes">Leer aquí</a></b></li>
                                                            <li><b>Obra "La reina de Unicel":</b> <b><a target="_blank" href="https://drive.google.com/file/d/1ocv-43xvgYUXhF2OL9Z5bsZhaStTnigT/view?usp=sharing">Leer aquí</a></b></li>
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
                                                        <label htmlFor="flScn">Realiza el pago <b><a target="_blank" href="https://paypal.me/gricardov">aquí</a></b> y sube la captura</label>
                                                        {
                                                            imgScn
                                                                ?
                                                                <button onClick={startSelectScn} className={`d-flex justify-content-between align-items-center button button-light-purple button-thin stretch ${imgScn ? 'd-flex' : ''}`}>
                                                                    <span className='clamp clamp-1'>
                                                                        {imgScn.name}
                                                                    </span>
                                                                    <span onClick={deleteScn} className='fa fa-times' style={{ color: 'white' }}></span>
                                                                </button>
                                                                :
                                                                <button onClick={startSelectScn} className={`button button-light-purple button-thin stretch ${imgScn ? 'd-flex' : ''}`}>
                                                                    <span>
                                                                        Subir captura
                                                                    </span>
                                                                </button>
                                                        }
                                                        <input type="file" onChange={selectScn} accept="image/*" ref={refScn} className='d-none' id="flScn" />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor="txtLink">He leído los horarios, plataformas, requisitos y confirmo mi asistencia.</label>
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

export default Inscripcion;
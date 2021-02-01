import React, { useRef, useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdownImage';
import ImgLeyendo from '../img/sitting-reading.svg';
import { subirImagen } from '../api';
import { useStepObserver } from '../hooks/useStepObserver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';

const steps = ['Contacto', 'Tipo', 'Trasfondo'];
const maxFileSize = 5242880;

const Inicio = () => {

    const refBoceto = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);
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
        const archivo = e.target.files[0];
        if (archivo) {
            if (archivo.size <= maxFileSize) {
                setImgSample(archivo);
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

    const send = (e) => {
        e.preventDefault();
        if (!checkErrors()) {
            alert('Enviando')
        }
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
        else if (!(/^[a-zA-Z\sáéíóúñÑ]*$/.test(title))) {
            alert('Tu título no puede tener caracteres especiales');
            return true;
        }

        // Author
        if (!(/^(?!\s*$).{1,100}/.test(author))) {
            alert('Tu pseudónimo debe tener de 1 a 100 caracteres');
            return true;
        }
        else if (!(/^[a-zA-Z\sáéíóúñÑ]*$/.test(author))) {
            alert('Tu pseudónimo no puede tener caracteres especiales');
            return true;
        }

        // Intention
        if (!(/^(?!\s*$).{1,1000}/.test(intention))) {
            alert('Lo que quieres transmitir debe tener de 1 a 100 caracteres');
            return true;
        }

        return false;
    }

    const navigateTo = (index) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [activeIndex])

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section'>
                    <h2 className='mb-0'>Pide un diseño</h2>
                    <p className='txt-responsive-form'>Y uno de nuestros artistas te contactará a la brevedad</p>
                </section>
                <section className='container-xl mt-5 position-relative'>
                    <img src={ImgLeyendo} alt='img-fondo' className='img-fondo-formulario' />
                    <div className='floating-form'>
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
                                                    list={[{ type: 'WSP', icon: 'fab fa-whatsapp' }, { type: 'TLG', icon: 'fab fa-telegram' }]}
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
                                                list={[{ type: 'POR', icon: 'fas fa-book', text: 'Portada' }, { type: 'BAN', icon: 'far fa-image', text: 'Banner' }]}
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
                                            <input minLength="1" maxLength="100" type="text" value={author} onChange={updAuthor} id="txtPseudonimo" placeholder="Ejemplo: Alyah" />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtIntencion">¿Qué quieres transmitir con tu diseño?</label>
                                            <textarea minLength="1" maxLength="1000" rows="4" value={intention} onChange={updIntention} id="txtIntencion" placeholder="Ingresa tu intención"></textarea>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="flBoceto">¿Tiene algún boceto en imagen? (Opcional)</label>
                                            {
                                                imgSample
                                                    ?
                                                    <button onClick={startSelectSample} className={`d-flex justify-content-between button button-light-purple button-thin stretch ${imgSample ? 'd-flex' : ''}`}>
                                                        <span className='clamp clamp-1'>
                                                            {imgSample.name}
                                                        </span>
                                                        <span onClick={deleteSample} className='fa fa-times' style={{ color: 'white' }}></span>
                                                    </button>
                                                    :
                                                    <button onClick={startSelectSample} className={`button button-light-purple button-thin stretch ${imgSample ? 'd-flex' : ''}`}>
                                                        <span className='clamp clamp-1'>
                                                            Subir imagen
                                                        </span>
                                                    </button>
                                            }
                                            <input type="file" onChange={selectSample} accept="image/*" ref={refBoceto} className='d-none' id="flBoceto" />
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </StepManager>
                                <div className='form-buttons-container'>
                                    {
                                        canGoBackwards
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
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Inicio;
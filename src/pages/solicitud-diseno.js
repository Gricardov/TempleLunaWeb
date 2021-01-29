import React, { useState } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import DropdownImage from '../componentes/dropdownImage';
import ImgLeyendo from '../img/sitting-reading.svg';
import { useStepObserver } from '../hooks/useStepObserver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Steps from '../componentes/forms/forms-steps';
import StepManager from '../componentes/forms/step-manager/step-manager';

const steps = ['Contacto', 'Obra', 'Contenido'];

const Inicio = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const { canGoBackwards, canGoForward } = useStepObserver(activeIndex, steps.length);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [messengerType, setMessengerType] = useState('WSP');
    const [email, setEmail] = useState('');

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

    const previous = (e) => {
        e.preventDefault();
        setActiveIndex(activeIndex - 1);
    }

    const next = (e) => {
        e.preventDefault();
        setActiveIndex(activeIndex + 1);
    }

    const navigateTo = (index) => {
        setActiveIndex(index);
    }

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
                                            <input type="text" value={name} onChange={updName} id="txtNombres" placeholder="Ingresa tus nombres" />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtEdad">¿Qué edad tienes?</label>
                                            <input type="number" min={10} max={99} value={age} onChange={updAge} id="txtEdad" placeholder="Ingresa tu edad" />
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtNumero">Bríndanos un número si tenemos consultas</label>
                                            <div className='cbo-text'>
                                                <DropdownImage
                                                    list={[{ type: 'WSP', icon: 'fab fa-whatsapp' }, { type: 'TLG', icon: 'fab fa-telegram' }]}
                                                    select={updMessengerType} />
                                                <input type="text" value={phone} onChange={updPhone} id="txtNumero" placeholder="Ingresa tu número" />
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor="txtCorreo">Bríndanos un correo para enviarte el trabajo</label>
                                            <input type="email" value={email} onChange={updEmail} id="txtCorreo" placeholder="Ingresa tu correo" />
                                        </div>
                                    </div>
                                    <div className='step-2'>
                                        <div className='form-group'>
                                            <label htmlFor="txtNombres">¿Cómo te llamas?</label>
                                            <input type="text" value={name} onChange={updName} id="txtNombres" placeholder="Ingresa tus nombres" />
                                        </div>
                                    </div>
                                    <div>
                                        Paso 3
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
                                        canGoForward
                                        &&
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
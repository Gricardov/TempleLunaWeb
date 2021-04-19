import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import ClipLoader from "react-spinners/ClipLoader";
import Fade from 'react-reveal/Fade';
import { css } from "@emotion/core";
import { setRequestDone } from '../api';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane, faCheckCircle, faHome, faEye } from '@fortawesome/free-solid-svg-icons';

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Preparation = ({ location }) => {

    const { id, title, about, link, type, points } = location.state.data;

    const [success, setSuccess] = useState(false);
    const [urlResult, setUrlResult] = useState('');
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [intention, setIntention] = useState('');
    const [hook, setHook] = useState('');
    const [ortography, setOrtography] = useState('');
    const [improvement, setImprovement] = useState('');

    const history = useHistory();

    const intentionRequested = points.includes('INTENCION');
    const hookRequested = points.includes('ENGANCHE');
    const ortographyRequested = points.includes('ORTOGRAFIA');


    const updIntention = (e) => {
        setIntention(e.target.value);
    }

    const updHook = (e) => {
        setHook(e.target.value);
    }

    const updOrtography = (e) => {
        setOrtography(e.target.value);
    }

    const updImprovement = (e) => {
        setImprovement(e.target.value);
    }

    const goBackwards = () => {
        history.push('/admin');
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
            requestId: id,
            title: title.trim(),
            type: type.trim(),
            intention: intention.trim(),
            hook: hook.trim(),
            ortography: ortography.trim(),
            improvement: improvement.trim(),
        };

        setRequestDone(data).then(result => {
            window.scrollTo(0, 0);
            setLoading(false);
            if (!result.error) {
                setUrlResult(result.url);
                setSuccess(true);
            } else {
                alert(result.error);
                setSuccess(false);
            }
        });
    }

    const checkErrors = () => {

        // Name
        if (intentionRequested) {
            if (!(/^(?!\s*$).{1,5000}/.test(intention))) {
                alert('La intención de la obra debe tener de 1 a 5000 caracteres');
                return true;
            }
        }

        // Hooks
        if (hookRequested) {
            if (!(/^(?!\s*$).{1,5000}/.test(hook))) {
                alert('En enganche de la obra debe tener de 1 a 5000 caracteres');
                return true;
            }
        }

        // Ortography
        if (ortographyRequested) {
            if (!(/^(?!\s*$).{1,5000}/.test(ortography))) {
                alert('La ortografía de la obra debe tener de 1 a 5000 caracteres');
                return true;
            }
        }

        // Improvement (optional)
        if (improvement) {
            if (!(/^(?!\s*$).{1,5000}/.test(improvement))) {
                alert('El consejo para el autor debe tener de 1 a 5000 caracteres');
                return true;
            }
        }

        return false;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setSuccess(false);
    }, []);

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section prep-req-container'>
                    <div className='flex-align-center mb-2'>
                        <FontAwesomeIcon onClick={goBackwards} className='mr-1' icon={faArrowLeft} size='lg' />
                        <h4 className='request-prep-title m-0 clamp clamp-2'>Crítica: {title}</h4>
                    </div>
                    {
                        success
                            ?
                            <div className='form-container text-align-center'>
                                <Fade bottom>
                                    <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                    <h3 className='mt-1 mb-1'>¡Crítica enviada!</h3>
                                </Fade>
                                <p className='txt-responsive-form m0-auto'>Tu experiencia ha aumentado :)</p>
                                <div className='button-container mt-3'>
                                    <button onClick={() => window.open(urlResult, '_blank')} className='button button-light-purple button-option-request ml-auto'>
                                        <FontAwesomeIcon icon={faEye} size='1x' />
                                        {' '}
                                                Ver resultado
                                        </button>
                                    <button onClick={goBackwards} className='button button-blue button-option-request mr-auto'>
                                        <FontAwesomeIcon icon={faHome} size='1x' />
                                        {' '}
                                                Regresar
                                        </button>
                                </div>
                            </div>
                            :
                            <>
                                <div className=''>
                                    <p>{about}</p>
                                    <h4>Link de la obra</h4>
                                    {
                                        link
                                            ?
                                            <a className='clamp clamp-1' target='_blank' href={link}>{link}</a>
                                            :
                                            <p>No existe link</p>
                                    }
                                    {
                                        intentionRequested
                                        &&
                                        <div className='form-group'>
                                            <h4>¿Se logró transmitir la idea?</h4>
                                            <textarea minLength="1" maxLength="5000" rows="4" value={intention} onChange={updIntention} id="txtIntencion" placeholder="Ejemplo: Siento que la idea se transmite correctamente, porque genera en el lector una sensación de..."></textarea>
                                        </div>
                                    }
                                    {
                                        hookRequested
                                        &&
                                        <div className='form-group'>
                                            <h4>¿Qué tal fue el enganche de la obra?</h4>
                                            <textarea minLength="1" maxLength="5000" rows="4" value={hook} onChange={updHook} id="txtEnganche" placeholder="Ejemplo: Considero que tiene un enganche bueno, pero no es suficiente. Debería enganchar mucho desde un inicio..."></textarea>
                                        </div>
                                    }
                                    {
                                        ortographyRequested
                                        &&
                                        <div className='form-group'>
                                            <h4>¿Qué tal fue la ortografía?</h4>
                                            <textarea minLength="1" maxLength="5000" rows="4" value={ortography} onChange={updOrtography} id="txtOrtografia" placeholder="Ejemplo: La ortografía fue excelente. Haces un correcto uso de las comas, los puntos y las tildes..."></textarea>
                                        </div>
                                    }
                                    <div className='form-group'>
                                        <h4>¿Algún consejo para que el autor pueda mejorar? (Opcional)</h4>
                                        <textarea minLength="1" maxLength="5000" rows="4" value={improvement} onChange={updImprovement} id="txtOrtografia" placeholder="Ejemplo: La ortografía fue excelente. Haces un correcto uso de las comas, los puntos y las tildes..."></textarea>
                                    </div>
                                </div>
                                <div className='form-buttons-container mt-3'>
                                    {
                                        loading
                                            ?
                                            <span className='button button-green justify-self-right'>
                                                Enviando
                                {' '}
                                                <ClipLoader color={'#fff'} loading={true} css={overrideSpinnerInline} size={22} />
                                            </span>
                                            :
                                            <button onClick={send} className='button button-green justify-self-right'>
                                                <FontAwesomeIcon icon={faPaperPlane} size='1x' />
                                                {' '}
                                                <span className='d-none d-md-inline'>
                                                    Enviar
                                                </span>
                                            </button>
                                    }
                                </div>
                            </>
                    }
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Preparation;
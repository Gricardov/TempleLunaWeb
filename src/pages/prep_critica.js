import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';
import { css } from "@emotion/core";
import { getGeneratedId, saveRequest } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const Preparacion = ({ location }) => {

    const { title, about, link, email } = location.state.data;

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [intention, setIntention] = useState('');
    const [hook, setHook] = useState('');
    const [ortography, setOrtography] = useState('');

    const history = useHistory();

    const updIntention = (e) => {
        setIntention(e.target.value);
    }

    const updHook = (e) => {
        setHook(e.target.value);
    }

    const updOrtography = (e) => {
        setOrtography(e.target.value);
    }

    const goBackwards = () => {
        history.push('/admin');
    }

    const send = async (e) => {
        e.preventDefault();
        if (!checkErrors()) {
            setLoading(true);
            const generatedId = await getGeneratedId('solicitudes');
            saveChanges(generatedId);
        }
    }

    const saveChanges = (generatedId) => {
        /*const data = {
            name: name.trim(),
            age: parseInt(age),
            phone: phone.trim(),
            messengerType,
            email: email.trim(),
            title: title.trim(),
            link: link.trim(),
            about: about.trim(),
            intention: intention.trim(),
            points,
            type: 'CRITICA',
            status: 'DISPONIBLE'
        };

        saveRequest(generatedId, { ...data, active: 1 }).then(() => {
            window.scrollTo(0, 0);
            setLoading(false);
            setSuccess(true);
        });*/
    }

    const checkErrors = () => {

        // Name
        if (!(/^(?!\s*$).{1,1000}/.test(intention))) {
            alert('La intención de la obra debe tener de 1 a 1000 caracteres');
            return true;
        }

        // Hooks
        if (!(/^(?!\s*$).{1,1000}/.test(hook))) {
            alert('En enganche de la obra debe tener de 1 a 1000 caracteres');
            return true;
        }

        // Ortography
        if (!(/^(?!\s*$).{1,1000}/.test(ortography))) {
            alert('La ortografía de la obra debe tener de 1 a 1000 caracteres');
            return true;
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
                    <div className=''>
                        <p>{about}</p>
                        <h4>Link de la obra</h4>
                        {
                            link
                                ?
                                <a target='_blank' href={link}>{link}</a>
                                :
                                <p>No existe link</p>
                        }
                        <div className='form-group'>
                            <h4>¿Se logró transmitir la idea?</h4>
                            <textarea minLength="1" maxLength="1000" rows="4" value={intention} onChange={updIntention} id="txtIntencion" placeholder="Ejemplo: Siento que la idea se transmite correctamente, porque genera en el lector una sensación de..."></textarea>
                        </div>
                        <div className='form-group'>
                            <h4>¿Qué tal fue el enganche de la obra?</h4>
                            <textarea minLength="1" maxLength="1000" rows="4" value={hook} onChange={updHook} id="txtEnganche" placeholder="Ejemplo: Considero que tiene un enganche bueno, pero no es suficiente. Debería enganchar mucho desde un inicio..."></textarea>
                        </div>
                        <div className='form-group'>
                            <h4>¿Qué tal fue la ortografía?</h4>
                            <textarea minLength="1" maxLength="1000" rows="4" value={ortography} onChange={updOrtography} id="txtOrtografia" placeholder="Ejemplo: La ortografía fue excelente. Haces un correcto uso de las comas, los puntos y las tildes..."></textarea>
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
                                    <FontAwesomeIcon icon={faPaperPlane} size='xl' />
                                    {' '}
                                    <span className='d-none d-md-inline'>
                                        Enviar
                            </span>
                                </button>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Preparacion;
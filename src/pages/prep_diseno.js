import React, { useRef, useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import ClipLoader from "react-spinners/ClipLoader";
import Fade from 'react-reveal/Fade';
import { useHistory } from 'react-router-dom';
import { css } from "@emotion/core";
import { uploadImage, setRequestDone } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane, faCheckCircle, faHome, faEye } from '@fortawesome/free-solid-svg-icons';

const overrideSpinnerInline = css`
  display: inline-block;
  vertical-align: middle;
`;

const maxFileSize = 5242880;

const Preparation = ({ location }) => {

    const { title, id, type, link } = location.state.data;

    const refDesign = useRef(null);

    const [success, setSuccess] = useState(false);
    const [urlResult, setUrlResult] = useState('');
    const [loading, setLoading] = useState(false); // Determina si se está enviando el form
    const [comment, setComment] = useState('');
    const [design, setDesign] = useState(null);

    const history = useHistory();

    const updComment = (e) => {
        setComment(e.target.value);
    }

    const goBackwards = () => {
        history.push('/admin');
    }

    const startSelectDesign = (e) => {
        e.preventDefault();
        refDesign.current.click();
    }

    const selectDesign = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            if (file.size <= maxFileSize) {
                setDesign(file);
            } else {
                alert('La imagen debe ser menor a 5MB')
            }
        }
    }

    const deleteDesign = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDesign(null);
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
            type: type.trim(),
            comment: comment.trim()
        };

        uploadImage('solicitud-diseno', design)
            .then(url => {
                setRequestDone({ ...data, urlResult: url }).then(result => {
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
            })
            .catch(error => {
                setLoading(false);
                setSuccess(false);
                alert('Error al subir la imagen. Reintente');
                console.log(error);
            })
    }

    const checkErrors = () => {

        // Comment
        if (comment) {
            if (!(/^(?!\s*$).{1,1000}/.test(comment))) {
                alert('Tu comentario debe debe tener de 1 a 1000 caracteres');
                return true;
            }
        }

        // File
        if (!design) {
            alert('Debes subir tu diseño final');
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
                        <h4 className='request-prep-title m-0 clamp clamp-2'>Diseño: {title}</h4>
                    </div>
                    {
                        success
                            ?
                            <div className='form-container text-align-center'>
                                <Fade bottom>
                                    <FontAwesomeIcon color={'#3DE58D'} icon={faCheckCircle} style={{ fontSize: '8rem' }} />
                                    <h3 className='mt-1 mb-1'>¡Diseño enviado!</h3>
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
                                    <h4>Link de la obra</h4>
                                    {
                                        link
                                            ?
                                            <a className='clamp clamp-1' target='_blank' href={link}>{link}</a>
                                            :
                                            <p>No existe link</p>
                                    }
                                    <div className='form-group'>
                                        <h4>Diseño terminado</h4>
                                        {
                                            design
                                                ?
                                                <button onClick={startSelectDesign} className={`d-flex justify-content-between align-items-center button button-light-purple button-thin stretch ${design ? 'd-flex' : ''}`}>
                                                    <span className='clamp clamp-1'>
                                                        {design.name}
                                                    </span>
                                                    <span onClick={deleteDesign} className='fa fa-times' style={{ color: 'white' }}></span>
                                                </button>
                                                :
                                                <button onClick={startSelectDesign} className={`button button-light-purple button-thin stretch ${design ? 'd-flex' : ''}`}>
                                                    <span>
                                                        Subir diseño
                                        </span>
                                                </button>
                                        }
                                        <input type="file" onChange={selectDesign} accept="image/*" ref={refDesign} className='d-none' id="flDiseno" />
                                    </div>
                                    <div className='form-group'>
                                        <h4>¿Algún comentario o recomendación? (Opcional)</h4>
                                        <textarea minLength="1" maxLength="1000" rows="4" value={comment} onChange={updComment} placeholder="Ejemplo: Considero que tiene un enganche bueno, pero no es suficiente. Debería enganchar mucho desde un inicio..."></textarea>
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
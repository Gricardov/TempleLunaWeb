import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import Footer from '../componentes/footer/footer';
import ImgColumpio from '../img/swinging.svg';
import { useHistory } from "react-router-dom";
import { login } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { setProfileStorage } from '../helpers/userStorage';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const updEmail = (e) => {
        setEmail(e.target.value);
    }

    const updPassword = (e) => {
        setPassword(e.target.value);
    }

    const loginUser = (e) => {
        e.preventDefault();
        if (!checkErrors()) {
            login(email, password)
                .then(({ user, profile, error }) => {
                    if (user) {
                        setProfileStorage(profile);
                        history.push('/admin');
                    } else {
                        alert(error);
                    }
                })
        }
    }

    const checkErrors = () => {
        if (!(/^(?!\s*$).{1,50}/.test(email))) {
            alert('Tu correo debe tener de 1 a 50 caracteres');
            return true;
        }
        else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)) {
            alert('Introduce un correo válido');
            return true;
        }

        if (!(/^(?!\s*$).{1,50}/.test(password))) {
            alert('Tu contraseña debe tener de 1 a 50 caracteres');
            return true;
        }

        return false;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl mt-5'>
                    <div className='login-container position-relative'>
                        <img src={ImgColumpio} alt='img-fondo' className='img-fondo-login d-none d-md-block' />
                        <form onSubmit={loginUser} className='floating-form'>
                            <h2 className='m-0'>Ingresa a Temple Luna</h2>
                            <p className='mb-3'>Si quieres pertenecer a nosotros, escríbenos por el grupo</p>
                            <div className='form-group'>
                                <label htmlFor="txtUsuario">Correo</label>
                                <input minLength="1" maxLength="50" type="email" value={email} onChange={updEmail} id="txtUsuario" placeholder="Ingresa tu correo" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="txtContrasena">Contraseña</label>
                                <input minLength="1" maxLength="50" type="password" value={password} onChange={updPassword} id="txtContrasena" placeholder="****************" />
                            </div>
                            <button onClick={loginUser} className='button button-green stretch'>
                                <span className='d-inline'>
                                    Entrar
                                    </span>
                                {' '}
                                <FontAwesomeIcon icon={faSignInAlt} size='xl' />
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
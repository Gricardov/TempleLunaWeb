import React, { useRef, useState, useContext, useEffect } from 'react';
import Avatar from '../avatar';
import Logo from '../../img/logo.png';
import Sanguchito from '../../img/sanguchito.svg';
import { useOutsideListener } from '../../hooks/useOutsideListener';
import { useHistory } from "react-router-dom";
import { logout } from '../../api';
import { Link } from "react-router-dom";
import { DrawerContext } from '../../context/DrawerContext';
import { AuthContext } from '../../context/AuthContext';
import { getProfileStorage } from '../../helpers/userStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = ({ startTransparent, defaultColor }) => {

    const { open, close } = useContext(DrawerContext);
    const { logged } = useContext(AuthContext);

    const [openOptions, setOpenOptions] = useState(false);
    let history = useHistory();

    const outsideListenerRef = useRef(null); // Escucha cuando se hace click fuera de
    const arrowTogglerRef = useRef(null);

    const { outsideListener$ } = useOutsideListener(outsideListenerRef);
    const [scrolled, setScrolled] = useState(false);
    const [width, setWidth] = useState(0);

    const handleScroll = () => {
        const offset = window.scrollY
        if (offset > 20) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    const logoutUser = (e) => {
        e.preventDefault();
        logout()
            .then(res => {
                if (res) {
                    navigateTo('/login');
                }
            })
    }

    const navigateTo = (route) => {
        history.push(route);
        setOpenOptions(false);
        close();
    }

    const toggleOptionsContainer = () => {
        setOpenOptions(!openOptions);
    }

    const updWith = () => {
        setWidth(window.innerWidth);
    }

    const { fName, lName, qFollowName, imgUrl } = getProfileStorage() || { fName: '', lName: '' };

    useEffect(() => {
        outsideListener$.subscribe(event => {
            if (arrowTogglerRef.current && !arrowTogglerRef.current.contains(event.target)) {
                setOpenOptions(false);
            }
        })
    }, [outsideListener$, arrowTogglerRef]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolled]);

    useEffect(() => {
        if (width === 0) {
            setWidth(window.innerWidth);
        }

        if (width < 768) {
            setOpenOptions(false);
        }

        window.addEventListener('resize', updWith);
        return () => window.removeEventListener('resize', updWith);
    }, [width]);

    let navClasses = 'main-navbar';
    let customStyles = {};

    if (!startTransparent || scrolled) {
        navClasses += ' navbar-default';
        scrolled && (navClasses += ' navbar-shadow');
        customStyles = defaultColor ? { background: defaultColor } : {};
    }

    if (logged) {
        navClasses += ' logged';
    }

    let optionsClasses = 'container-submenu-navbar';
    if (openOptions) {
        optionsClasses += ' open';
    } else {
        optionsClasses += ' close';
    }

    return (
        <nav className={navClasses} style={customStyles}>
            <div className='container-xl container-navbar position-relative'>
                <Link to='/' className='logo-header'>
                    <img alt='logo' src={Logo} />
                </Link>
                <div className='navbar-nav'>
                    {
                        logged
                            ?
                            <>
                                <Link onClick={() => history.push('/perfil/' + qFollowName)} className='btn-nav clamp clamp-1'>
                                    {fName} {lName}
                                </Link>
                                <Avatar img={imgUrl} clases='img-profile-navbar img-avatar-container' />
                                <span ref={arrowTogglerRef} onClick={toggleOptionsContainer} className='btn-nav nav-arrow m-0 pl-1 pr-1'>
                                    <FontAwesomeIcon icon={faAngleDown} size='1x' />
                                </span>
                            </>
                            :
                            <>
                                <Link to='/sol_critica' className='btn-nav'>
                                    Críticas
                                </Link>
                                <Link to='/sol_correccion' className='btn-nav'>
                                    Correcciones
                                </Link>
                                <Link to='/sol_diseno' className='btn-nav'>
                                    Diseños
                                </Link>
                                <Link to='/login' className='btn-nav'>
                                    Login
                                </Link>
                            </>
                    }
                </div>
                <img alt='sanguchito' onClick={open} src={Sanguchito} className='img-sanguchito' />
            </div>
            <div ref={outsideListenerRef} className={optionsClasses}>
                <ul>
                    <li onClick={() => navigateTo('/admin')}>
                        Pedidos
                    </li>
                    <li onClick={() => navigateTo('/perfil/' + qFollowName)}>
                        Mi perfil
                    </li>
                    <li onClick={logoutUser}>
                        Salir
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Navbar;

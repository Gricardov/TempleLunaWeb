import React, { useRef, useState, useContext, useEffect } from 'react'
import Avatar from '../avatar'
import { useOutsideListener } from '../../hooks/useOutsideListener';
import { useHistory } from "react-router-dom"
import { logout } from '../../api'
import { Link } from "react-router-dom"
import { DrawerContext } from '../../context/DrawerContext'
import { AuthContext } from '../../context/AuthContext'
import { getProfileStorage } from '../../helpers/userStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../img/logo.png'
import Sanguchito from '../../img/sanguchito.svg'
import './navbar.css'

const Navbar = ({ startTransparent }) => {

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
                    close();
                    history.push('/login');
                }
            })
    }

    const toggleOptionsContainer = () => {
        setOpenOptions(!openOptions);
    }

    const updWith = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        outsideListener$.subscribe(event => {
            if (arrowTogglerRef.current && !arrowTogglerRef.current.contains(event.target)) {
                setOpenOptions(false);
            }
        })
    }, [outsideListener$, arrowTogglerRef])

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
    if (!startTransparent || scrolled) {
        navClasses += ' navbar-scrolled';
    }

    let optionsClasses = 'container-submenu-navbar';
    if (openOptions) {
        optionsClasses += ' open';
    } else {
        optionsClasses += ' close';
    }

    let fName, lName, urlImg;
    const profile = getProfileStorage();
    if (profile) {
        fName = profile.fName;
        lName = profile.lName;
        urlImg = profile.urlImg;
    }

    return (
        <nav className={navClasses}>
            <div className='container-xl container-navbar position-relative'>
                <Link to='/' className='logo-header'>
                    <img alt='logo' src={Logo} />
                </Link>
                <div className='navbar-nav'>
                    {
                        logged
                            ?
                            <>
                                <span className='btn-nav clamp clamp-1'>
                                    Te queremos, {fName}
                                </span>
                                <Avatar clases='img-profile-navbar' />
                                <span ref={arrowTogglerRef} onClick={toggleOptionsContainer} className='btn-nav m-0 pl-1 pr-1'>
                                    <FontAwesomeIcon icon={faAngleDown} size='1x' />
                                </span>
                            </>
                            :
                            <>
                                <Link to='/sol_critica' className='btn-nav'>
                                    Críticas
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
                    <li onClick={logoutUser}>
                        Salir
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;

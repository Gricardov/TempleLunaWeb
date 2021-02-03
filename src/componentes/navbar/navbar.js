import React, { useContext, useEffect } from 'react'
import Logo from '../../img/logo.png'
import Sanguchito from '../../img/sanguchito.svg'
import { useHistory } from "react-router-dom"
import { logout } from '../../api'
import { Link } from "react-router-dom"
import { DrawerContext } from '../../context/DrawerContext'
import { AuthContext } from '../../context/AuthContext'
import './navbar.css'

const Navbar = ({ startTransparent }) => {

    const { open, close } = useContext(DrawerContext);
    const { logged } = useContext(AuthContext);
    let history = useHistory();

    const [scrolled, setScrolled] = React.useState(false);

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

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrolled])

    let clasesNav = 'main-navbar';
    if (!startTransparent || scrolled) {
        clasesNav += ' navbar-scrolled';
    }

    return (
        <nav className={clasesNav}>
            <div className='container-xl container-navbar'>
                <Link to='/' className='logo-header'>
                    <img alt='logo' src={Logo} />
                </Link>
                <img alt='sanguchito' onClick={open} src={Sanguchito} className='img-sanguchito' />
                <div className='navbar-nav'>
                    {
                        logged
                            ?
                            <a onClick={logoutUser} className='btn-nav'>
                                Salir
                            </a>
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
            </div>
        </nav>
    )
}

export default Navbar;

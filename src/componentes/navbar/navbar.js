import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import { DrawerContext } from '../../context/DrawerContext'
import Logo from '../../img/logo.png'
import Sanguchito from '../../img/sanguchito.svg'
import './navbar.css'

const Navbar = ({ startTransparent }) => {

    const { abrir } = useContext(DrawerContext);

    const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        const offset = window.scrollY
        if (offset > 20) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
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
                <img alt='sanguchito' onClick={abrir} src={Sanguchito} className='img-sanguchito' />
                <div className='navbar-nav'>
                    <Link to='/sol_critica' className='btn-nav'>
                        Críticas
                    </Link>
                    <Link to='/sol_diseno' className='btn-nav'>
                        Diseños
                    </Link>
                    <Link to='/sol_diseno' className='btn-nav'>
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

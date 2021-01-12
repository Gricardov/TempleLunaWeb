import React, { useEffect } from 'react'
import Logo from '../../img/logo.png';
import './navbar.css'

const Navbar = () => {

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
    if (scrolled) {
        clasesNav += ' navbar-scrolled';
    }

    return (
        <nav className={clasesNav}>
            <div className='container-xl'>
                <img alt='logo' src={Logo} className='logo-header' />
            </div>
        </nav>
    )
}

export default Navbar;

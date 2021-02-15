import React, { useEffect, useContext } from 'react'
import { DrawerContext } from '../../context/DrawerContext'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { logout } from '../../api'
import './drawer.css'

const Drawer = () => {

    const { logged } = useContext(AuthContext);
    const { isOpen, close } = useContext(DrawerContext);

    let history = useHistory();

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
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    let styles = '';
    if (isOpen) {
        styles = 'open';
    } else {
        styles = 'close';
    }

    return (
        <>
            <div className={'overlay ' + styles} onClick={close}>
            </div>
            <div className={'drawer ' + styles}>
                {
                    logged
                        ?
                        <a onClick={logoutUser} className='btn-drawer'>
                            Salir
                        </a>
                        :
                        <>
                            <Link to='/sol_critica' onClick={close} className='btn-drawer'>
                                Pide tu crítica
                            </Link>
                            <Link to='/sol_diseno' onClick={close} className='btn-drawer'>
                                Pide tu diseño
                            </Link>
                            <Link to='/login' onClick={close} className='btn-drawer'>
                                Login de creativos
                            </Link>
                        </>
                }
            </div>
        </>
    )
}

export default Drawer;
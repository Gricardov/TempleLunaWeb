import React, { useEffect, useContext } from 'react'
import { DrawerContext } from '../../context/DrawerContext'
import { Link } from "react-router-dom"
import './drawer.css'

const Drawer = () => {

    const { abierto, cerrar } = useContext(DrawerContext);

    useEffect(() => {
        if (abierto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [abierto])

    let estilos = '';
    if (abierto) {
        estilos = 'abierto';
    } else {
        estilos = 'cerrado';
    }

    return (
        <>
            <div className={'drawer-overlay ' + estilos} onClick={cerrar}>
            </div>
            <div className={'drawer ' + estilos} >
                <Link to='/sol_critica' onClick={cerrar} className='btn-drawer'>
                    Pide tu crítica
                </Link>
                <Link to='/sol_diseno' onClick={cerrar} className='btn-drawer'>
                    Pide tu diseño
                </Link>
                <Link to='/login' onClick={cerrar} className='btn-drawer'>
                    Login de creativos
                </Link>

            </div>
        </>
    )
}

export default Drawer;
import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/navbar';
import Pestanas from '../componentes/pestanas';
import Footer from '../componentes/footer/footer';

const Admin = () => {

    const [indPestanaActiva, estIndPestanaActiva] = useState(0);

    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section'>
                    <h2 className='mb-0'>¿Cuál tomamos hoy?</h2>
                </section>
                <section className='container-xl section'>
                    <Pestanas cargando={false} indice={indPestanaActiva} seleccionar={estIndPestanaActiva} data={['Últimos', 'Tomados']}>

                    </Pestanas>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Admin;
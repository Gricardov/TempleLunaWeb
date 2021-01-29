import React from 'react'
import Carrousel from '../componentes/carruselHistorias/carrousel';
import Tag from '../componentes/tag';
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar'
import Fade from 'react-reveal/Fade';
import { Panorama } from '../componentes/panoramaInicio/panorama';
import Img1 from '../img/img-seccion-1.PNG';
import Img2 from '../img/img-seccion-2.PNG';
import Img3 from '../img/img-seccion-3.PNG';
import ImgLentes from '../img/lentes.svg';
import ImgPincel from '../img/pincel.svg';

const Inicio = () => {
    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar'>
                <section className='container-xl section'>
                    <h2 className='mb-0'>Pide una crítica</h2>
                    <p>Y uno de nuestros críticos te contactará a la brevedad</p>
                </section>
                <section className='container-xl mt-5'>
                    <div className='floating-form'>
                        ¿Cómo te llamas?
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

export default Inicio;
import React from 'react'
import Carrousel from '../componentes/stories-carrousel/carrousel';
import Tag from '../componentes/tag';
import Footer from '../componentes/footer/footer';
import Fade from 'react-reveal/Fade';
import { Panorama } from '../componentes/home-panorama/panorama';
import { Link } from "react-router-dom"
import Img1 from '../img/img-seccion-1.PNG';
import Img2 from '../img/img-seccion-2.PNG';
import Img3 from '../img/img-seccion-3.PNG';
import ImgLentes from '../img/lentes.svg';
import ImgPincel from '../img/pincel.svg';

const Inicio = () => {
    return (
        <div>
            <Panorama />
            <main className='main-body' id='critique-block'>

                <Fade bottom>
                    <section className='container-xl section section-body'>                        
                        <div className='main-section'>
                            <div className='img-container img-container-lentes'>
                                <img src={ImgLentes} className='img-lentes' alt='img-lentes' />
                            </div>
                            <h3>Críticas</h3>
                            <p>Todos los críticos de historias ahora están en un mismo lugar.
                                Solicita una crítica <Link to='/sol_critica'>aquí.</Link> ¡Es gratis!</p>
                        </div>
                        <div className='main-section'>
                            <div className='img-container'>
                                <img src={ImgPincel} className='img-pincel' alt='img-pincel' />
                            </div>
                            <h3>Diseños</h3>
                            <p>Portadas, banners para posts y ahora ¡Cuentas regresivas!
                                Pide tu diseño <Link to='/sol_diseno'>aquí.</Link></p>
                        </div>
                    </section>
                </Fade>

                <Fade bottom>
                    <section className='container-xl section section-body'>
                        <h2 className='text-align-center title-sub-section'>¿Cuál es nuestra propuesta?</h2>
                    </section>
                    <section className='container-xl section section-body'>
                        <div className='text-section'>
                            <h3>Críticas y diseños en un mismo lugar</h3>
                            <p>¿Estás escribiendo una historia? Reunimos a todos los artistas que aman diseñar y hacer
                                críticas constructivas para que tu obra destaque rápidamente entre los lectores.</p>
                        </div>
                        <div className='img-section'>
                            <img src={Img3} className='img-colaboration' alt='img-colaboracion' />
                        </div>
                    </section>
                </Fade>

                <Fade bottom>
                    <section className='container-xl section section-body'>
                        <div className='text-section'>
                            <h3>Disfrutarás encontrando los mejores relatos</h3>
                            <p>Encontrar una historia será tan divertido como hacer un swipe con el dedo. Adios a los clichés.
                            Te mostraremos lo que te gusta.
                            </p>
                            <Tag />
                        </div>
                        <div className='img-section order-1'>
                            <img src={Img2} className='img-colaboration' alt='img-colaboracion' />
                        </div>
                    </section>
                </Fade>

                <Fade bottom>
                    <section className='container-xl section section-body'>
                        <div className='text-section'>
                            <h3>Difusión al instante</h3>
                            <p>Olvida las típicas páginas de lectura online. Promociona tus obras con un video, un meme o un estado.
                                El límite será tu imaginación.</p>
                            <Tag />
                        </div>
                        <div className='img-section'>
                            <img src={Img1} className='img-colaboration' alt='img-colaboracion' />
                        </div>
                    </section>
                </Fade>

                <Fade bottom>
                    <section className='container-xl section mb-5'>
                        <h3 className='text-align-center title-sub-section'>¡Seremos millones compartiendo las mejores historias!</h3>
                        <Carrousel />
                    </section>
                </Fade>

            </main>
            <Footer />
        </div>
    );
}

export default Inicio;
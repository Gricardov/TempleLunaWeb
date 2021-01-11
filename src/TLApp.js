import Carrousel from "./componentes/carruselHistorias/carrousel";
import Footer from "./componentes/footer/footer";
import { Panorama } from "./componentes/panoramaInicio/panorama";
import Img1 from './img/img-seccion-1.PNG';
import Img2 from './img/img-seccion-2.PNG';
import Img3 from './img/img-seccion-3.PNG';

function App() {
  return (
    <div>
      <Panorama />
      <main className='main-body'>
        <section className='container-xl section section-body'>
          <div className='text-section'>
            <h2>Escribe y sé leído al instante</h2>
            <p>Crea un meme, una frase o un estado creativo para promocionar tu obra. Los lectores podrán verlo en tiempo real.</p>
          </div>
          <div className='img-section'>
            <img src={Img1} className='img-colaboration' alt='img-colaboracion' />
          </div>
        </section>
        <section className='container-xl section section-body'>
          <div className='text-section'>
            <h2>Disfruta encontrando los mejores relatos</h2>
            <p>Haz swipe con el dedo y descubre los relatos más interesantes que la comunidad ha preparado para ti.</p>
          </div>
          <div className='img-section order-1'>
            <img src={Img2} className='img-colaboration' alt='img-colaboracion' />
          </div>
        </section>
        <section className='container-xl section section-body'>
          <div className='text-section'>
            <h2>La ortografía como prioridad</h2>
            <p>Las obras mejor promocionadas son las que tienen mejor ortografía. Siempre.</p>
          </div>
          <div className='img-section'>
            <img src={Img3} className='img-colaboration' alt='img-colaboracion' />
          </div>
        </section>
        <section className='container-xl section mb-5'>
          <h3 className='text-align-center title-sub-section'>¡Seremos millones compartiendo las mejores historias!</h3>
          <Carrousel />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

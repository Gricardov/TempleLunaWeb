import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import StoryCard from '../../componentes/story_card';
import ImgPortada1 from '../../img/portada1.jpg'
import ImgPortada2 from '../../img/portada2.jpg'
import ImgPortada3 from '../../img/portada3.jpg'
import ImgPortada4 from '../../img/portada4.jpg'
import ImgPortada5 from '../../img/portada5.jpg'
import ImgPortada6 from '../../img/portada6.jpg'
import ImgPortada7 from '../../img/portada7.jpg'
import ImgPortada8 from '../../img/portada8.jpg'
import ImgPortada9 from '../../img/portada9.jpg'
import ImgPortada10 from '../../img/portada10.jpg'
import ImgPortada11 from '../../img/portada11.jpg'

import './carrousel.css'

const Carrousel = () => {

    // Referencia al contenedor del carrusel
    const refCarrusel = useRef();

    const [pressed, setPressed] = useState(false);

    // Para el manejo del carrusel
    const [startX, setStartX] = useState(0);
    const [scrolledLeft, setScrolledLeft] = useState(0);

    const pressMouse = (ev) => {

        const startX = ev.pageX || ev.touches[0].pageX;

        setStartX(startX);
        setScrolledLeft(refCarrusel.current.scrollLeft);
        setPressed(true);
    }

    const releaseMouse = () => {
        setPressed(false)
    }

    const drag = (ev) => {
        const currentX = ev.pageX || ev.touches[0].pageX;

        const walk = (currentX - startX) * 3;
        refCarrusel.current.scrollLeft = scrolledLeft - walk;
    }

    const moveMouse = (ev) => {
        if (pressed) {
            drag(ev);
        }
    }

    const scrollLeft = () => {
        refCarrusel.current.scrollLeft = scrolledLeft - 155;
        setScrolledLeft(refCarrusel.current.scrollLeft);

    }

    const scrollRight = () => {
        refCarrusel.current.scrollLeft = scrolledLeft + 155;
        setScrolledLeft(refCarrusel.current.scrollLeft);

    }

    return (
        <div className='books-carrousel-container'>
            <div
                ref={refCarrusel}
                onTouchMove={drag}
                onTouchStart={pressMouse}
                onMouseDown={pressMouse}
                onMouseUp={releaseMouse}
                onMouseLeave={releaseMouse}
                onMouseMove={moveMouse}
                className='books-carrousel'>
                <StoryCard img={ImgPortada1} titulo='Ventanas grises, ventanas verdes' vistas={4} />
                <StoryCard img={ImgPortada2} titulo='Lord Ferry' vistas={5} />
                <StoryCard img={ImgPortada3} titulo='Si te enamoras de mí' vistas={18} />
                <StoryCard img={ImgPortada4} titulo='Sedúceme la mente' vistas={20} />
                <StoryCard img={ImgPortada5} titulo='Las matemáticas y la señorita Olivera' vistas={4} />
                <StoryCard img={ImgPortada6} titulo='Cartas a un amor perdido' vistas={4} />
                <StoryCard img={ImgPortada7} titulo='¿Dónde se fue Araceli?' vistas={4} />
                <StoryCard img={ImgPortada8} titulo='Todas las mentes' vistas={4} />
                <StoryCard img={ImgPortada9} titulo='¿Y dónde está el perro?' vistas={4} />
                <StoryCard img={ImgPortada10} titulo='El pez' vistas={4} />
                <StoryCard img={ImgPortada11} titulo='Historias en cuarentena' vistas={4} />
            </div>
            <div onClick={scrollLeft} className='carrousel-arrow carrousel-arrow-left'>
                <FontAwesomeIcon icon={faAngleLeft} size='lg' color='#55544F' />
            </div>
            <div onClick={scrollRight} className='carrousel-arrow carrousel-arrow-right'>
                <FontAwesomeIcon icon={faAngleRight} size='lg' color='#55544F' />
            </div>
        </div>
    )
}

export default Carrousel;
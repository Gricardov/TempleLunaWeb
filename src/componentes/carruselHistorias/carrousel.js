import React, { useRef, useState } from 'react'
import StoryCard from '../../componentes/story_card';
import './carrousel.css'

const Carrousel = () => {

    // Referencia al contenedor del carrusel
    const refCarrusel = useRef();

    const [pressed, setPressed] = useState(false);

    // Para el manejo del carrusel
    const [startX, setStartX] = useState(0);
    const [scrolledLeft, setScrolledLeft] = useState(0);

    const pressMouse = (ev) => {
        console.log(ev)
        setStartX(ev.pageX);
        setScrolledLeft(refCarrusel.current.scrollLeft);
        setPressed(true);
    }

    const releaseMouse = () => {
        setPressed(false)
    }

    const drag = (ev) => {
        const walk = (ev.pageX - startX) * 3;
        refCarrusel.current.scrollLeft = scrolledLeft - walk;
    }

    const moveMouse = (ev) => {
        if (pressed) {
            drag(ev);
        }
    }

    return (
        <div
            ref={refCarrusel}
            onTouchMove={drag}
            onTouchStart={pressMouse}
            onMouseDown={pressMouse}
            onMouseUp={releaseMouse}
            onMouseLeave={releaseMouse}
            onMouseMove={moveMouse}
            className='books-carrousel'>
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='El mundo de Alyah' vistas={5} />
            <StoryCard titulo='¿Y dónde está el perro?' vistas={18} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
            <StoryCard titulo='Corazón de melón' vistas={4} />
        </div>
    )
}

export default Carrousel;
import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { carrouselData } from '../../data/data';
import './panorama.css'

export const Panorama = () => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (index < carrouselData.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [index])

    const slide = carrouselData[index];

    return (
        <div className='panorama'>
            <Navbar startTransparent={true} />
            <TransitionGroup className='panorama-slide-container'>

                <CSSTransition
                    classNames="panorama-slide"
                    timeout={{ enter: 1000, exit: 1000 }}
                    key={index}>

                    <div className={`slide ${slide.orientation}`} style={{ background: slide.bg }}>
                        <div className='slide-content'>
                            <div className='container-controls-header'>
                                <Fade left>
                                    <h1>{slide.text}</h1>
                                </Fade>
                                <Fade left>
                                    <a target='_blank' rel="noreferrer" href={slide.href} className='button button-green'>
                                        {slide.buttonText}
                                        {' '}
                                        <FontAwesomeIcon icon={faAngleRight} size='lg' />
                                    </a>
                                </Fade>
                            </div>
                            <div className='img-container'>
                                <img src={slide.img} className='img-colaboration' alt='img-colaboracion' />
                            </div>
                        </div>
                    </div>
                </CSSTransition>


            </TransitionGroup>
        </div>
    )
}

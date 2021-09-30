import React, { useState, useEffect } from 'react'
import Navbar from '../navbar'
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useHistory } from 'react-router-dom';
import { carrouselData } from '../../data/data';
import './panorama.css'

let interval;

export const Panorama = () => {
    const [index, setIndex] = useState(0);
    const [autoScroll, setAutoScroll] = useState(true);

    const history = useHistory();

    useEffect(() => {
        if (autoScroll) {
            interval = setInterval(() => {
                if (index < carrouselData.length - 1) {
                    setIndex(index + 1);
                } else {
                    setIndex(0);
                }
            }, 5000)
            return () => {
                clearInterval(interval)
            }
        } else {
            return () => {
                clearInterval(interval)
            }
        }
    }, [index]);

    const showSlide = (selectedIndex) => {
        setAutoScroll(false);
        setIndex(selectedIndex);
    }

    const goTo = ({ href, scrollTo, pushTo }) => {
        if (href) {
            window.open(href);
        } else if (pushTo) {
            history.push(pushTo);
        } else if (scrollTo) {
            const element = document.getElementById(scrollTo);
            element.scrollIntoView();
        }
    }

    const slide = carrouselData[index];

    return (
        <div className='panorama'>
            <Navbar startTransparent={true} />
            <TransitionGroup className='panorama-slide-container'>
                <CSSTransition
                    classNames={`panorama-slide-reverse`}
                    timeout={{ enter: 1000, exit: 1000 }}
                    key={index}>

                    <div className={`slide ${slide.orientation}`} style={{ background: slide.bg }}>
                        <div className='slide-content'>
                            <div className='container-controls-header'>
                                <Fade left>
                                    <h1>{slide.text}</h1>
                                </Fade>
                                <Fade left>
                                    {
                                        slide.buttonText &&
                                        <a target='_blank' rel="noreferrer" onClick={() => goTo(slide)} style={slide.buttonStyles} className='button button-green'>
                                            {slide.buttonText}
                                            {' '}
                                            <FontAwesomeIcon icon={faAngleRight} size='lg' />
                                        </a>
                                    }
                                </Fade>
                            </div>
                            <div className='img-container' style={slide.style}>
                                <img src={slide.img} className='img-colaboration' alt='img-colaboracion' />
                            </div>
                        </div>
                    </div>
                </CSSTransition>

            </TransitionGroup>
            <div className='dots-panorama'>
                {
                    carrouselData.map((_, i) => <div key={i + 1} onClick={() => showSlide(i)} className={`dot ${i == index ? 'selected' : ''}`} />)
                }
            </div>
        </div>
    )
}

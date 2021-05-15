import React, { useRef, useState, useEffect } from 'react';
import ImgVacio from "../../img/reading-sitting.svg";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useOutsideListener } from '../../hooks/useOutsideListener';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './tabs.css';

const Tabs = ({ tabs, requestMoreData, hasMore, loader, activeIndex, select, initialLoading, theme, children }) => {

    // Tema
    const style = {
        background: (theme && theme.main) || '',
        color: (theme && theme.contrast) || ''
    };

    const arrowTogglerRef = useRef(null);
    const [minVisibleTabs, setMinVisibleTabs] = useState(2);
    const [openOptions, setOpenOptions] = useState(false);
    const [width, setWidth] = useState(0);

    const outsideListenerRef = useRef(null); // Escucha cuando se hace click fuera de
    const { outsideListener$ } = useOutsideListener(outsideListenerRef);

    const childrenArray = React.Children.toArray(children);

    const switchTab = (e, index) => {
        e && e.preventDefault();
        setOpenOptions(false);
        select(index);
    }

    const toggleOptionsContainer = () => {
        setOpenOptions(!openOptions);
    }

    const updWith = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        outsideListener$.subscribe(event => {
            if (arrowTogglerRef.current && !arrowTogglerRef.current.contains(event.target)) {
                setOpenOptions(false);
            }
        })
    }, [outsideListener$, arrowTogglerRef]);

    useEffect(() => {
        if (width === 0) {
            setWidth(window.innerWidth);
        }

        // Reinicio la pestaña seleccionada
        switchTab(null, 0);

        // Establezco el nuevo número visible
        if (width > 991) {
            setMinVisibleTabs(tabs.slice(0, 4).length);
        } else if (width > 300) {
            setMinVisibleTabs(tabs.slice(0, 3).length);
        } else {
            setMinVisibleTabs(tabs.slice(0, 2).length);
        }

        window.addEventListener('resize', updWith);
        return () => window.removeEventListener('resize', updWith);
    }, [minVisibleTabs, width]);

    let optionsClasses = 'container-submenu';
    if (openOptions) {
        optionsClasses += ' open';
    } else {
        optionsClasses += ' close';
    }

    let anchoPestana;
    let desplazamiento;

    // Recalculo los tamaños
    if (activeIndex < minVisibleTabs) {
        anchoPestana = (100 / minVisibleTabs) + '%';
        desplazamiento = (100 / minVisibleTabs) * activeIndex + '%';
    } else {
        anchoPestana = arrowTogglerRef.current.offsetWidth;
        desplazamiento = (100 / minVisibleTabs) * (minVisibleTabs) + '%';
    }

    const childrenNum = childrenArray[0].props.children.length;

    return (
        <div className='main-tabs-container'>
            <div className='tabs-container' style={{ background: style.background }}>
                <div className="material-tabs">
                    {
                        tabs.slice(0, minVisibleTabs).map((pestana, index) => <a key={index} onClick={(e) => switchTab(e, index)} className={index == activeIndex && 'active'} style={style}>{pestana}</a>)
                    }
                    <span className="tab-bar" style={{ width: anchoPestana, left: desplazamiento, background: style.color }}></span>
                    <span className="guide-line" style={{ background: style.background && 'transparent' }} />
                </div>
                {
                    (tabs.length > minVisibleTabs) &&
                    <>
                        <span ref={arrowTogglerRef} onClick={toggleOptionsContainer} className='btn-switch' style={{ color: style.color }}>
                            <FontAwesomeIcon icon={faAngleDown} size='1x' />
                        </span>
                        <div ref={outsideListenerRef} className={optionsClasses}>
                            <ul>
                                {
                                    tabs.slice(minVisibleTabs, tabs.length).map((e, i) => (
                                        <li key={i} className={minVisibleTabs + i == activeIndex && 'active'} onClick={(e) => switchTab(e, minVisibleTabs + i)}>
                                            {e}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                }
            </div>
            {

                initialLoading
                    ?
                    loader
                    :
                    childrenNum > 0
                        ?
                        <InfiniteScroll
                            className="tab-content"
                            scrollThreshold={0.7}
                            dataLength={childrenNum}
                            next={requestMoreData}
                            hasMore={hasMore}
                            loader={loader}>
                            {
                                childrenArray
                            }
                        </InfiniteScroll>
                        :
                        <div>
                            <img src={ImgVacio} className="img-vacio" alt="img-vacio" />
                            <h2 className="text-align-center m-0 text-empty">Oops! aún nada por aquí</h2>
                        </div>
            }
        </div >
    )
}

export default Tabs;

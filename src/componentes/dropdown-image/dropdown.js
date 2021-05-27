import React, { useRef, useState, useEffect } from 'react';
import { useOutsideListener } from '../../hooks/useOutsideListener';
import './dropdown.css';

const tamanoIcono = 15;

const Dropdown = ({ list, select, stretch, selectedItem }) => {

    const [open, setOpen] = useState(false);
    const outsideListenerRef = useRef(null); // Escucha cuando se hace click fuera de
    const { outsideListener$ } = useOutsideListener(outsideListenerRef);

    useEffect(() => {
        outsideListener$.subscribe(() => {
            setOpen(false);
        })
    }, [outsideListener$]);

    const toggleDropdown = (e) => {
        e.preventDefault();
        setOpen(!open);
    }

    const selectItem = (e, item) => {
        e.preventDefault();
        setOpen(false);
        select(item);
    }

    const tag = (text) => (
        text &&
        <span className='dropdown-list-tag'>
            {text}
        </span>
    )

    return (
        <div
            ref={outsideListenerRef}
            className='container-select-image'>
            <button className={`select-image position-relative ${stretch ? 'stretch' : ''}`} onClick={toggleDropdown}>
                <span className={selectedItem.icon} style={{ marginRight: '1rem', fontSize: tamanoIcono + 'px' }}></span>
                {
                    stretch
                    &&
                    <span className='mr-1 position-relative'>
                        {selectedItem.name}
                        {tag(selectedItem.tag)}
                    </span>
                }
                <span className='fa fa-caret-down'></span>
            </button>
            {
                open
                &&
                <div className={`selectable-list ${stretch ? 'stretch' : ''}`}>
                    {
                        list.map((item, index) => item.displayInDropdown != false && (
                            <div key={index} onClick={(e) => selectItem(e, item)} className='selectable-list-item'>
                                <span className={item.icon} style={{ fontSize: tamanoIcono + 'px' }}></span>
                                {
                                    stretch
                                    &&
                                    <span className='ml-1 position-relative'>
                                        {item.name}
                                        {tag(item.tag)}
                                    </span>
                                }
                            </div>
                        ))
                    }
                </div>

            }

        </div>
    )
}

export default Dropdown;
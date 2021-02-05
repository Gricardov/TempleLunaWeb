import React, { useRef, useState, useEffect } from 'react';
import { useOutsideListener } from '../../hooks/useOutsideListener';
import './dropdown.css';

const tamanoIcono = 20;
const color = '#756F86';

const Dropdown = ({ list, select, stretch }) => {

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(list[0]);
    const outsideListenerRef = useRef(null); // Escucha cuando se hace click fuera de
    const { outsideListener$ } = useOutsideListener(outsideListenerRef);

    useEffect(() => {
        outsideListener$.subscribe(() => {
            setOpen(false);
        })
    }, [outsideListener$])

    const toggleDropdown = (e) => {
        e.preventDefault();
        setOpen(!open);
    }

    const selectItem = (e, item) => {
        e.preventDefault();
        setOpen(false);
        setSelectedItem(item);
        select(item.type);
    }

    return (
        <div
            ref={outsideListenerRef}
            className='container-select-image'>
            <button className={`select-image ${stretch ? 'stretch' : ''}`} onClick={toggleDropdown}>
                <span className={selectedItem.icon} style={{ color, marginRight: '1rem', fontSize: tamanoIcono + 'px' }}></span>
                {
                    selectedItem.text
                    &&
                    <span className='mr-1' style={{ color }}>{selectedItem.text}</span>
                }
                <span className='fa fa-caret-down' style={{ color }}></span>
            </button>
            {
                open
                &&
                <div className={`selectable-list ${stretch ? 'stretch' : ''}`}>
                    {
                        list.map(item => (
                            <div onClick={(e) => selectItem(e, item)} className='selectable-list-item'>
                                <span className={item.icon} style={{ color, fontSize: tamanoIcono + 'px' }}></span>
                                {
                                    item.text
                                    &&
                                    <span className='ml-1' style={{ color }}>{item.text}</span>
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
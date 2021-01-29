import React, { useRef, useState, useEffect } from 'react';
import { useOutsideListener } from '../../hooks/useOutsideListener';
import './dropdown.css';

const tamanoIcono = 20;
const color = '#756F86';

const Dropdown = ({ list, select }) => {

    const [open, setOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(list[0].icon || '');
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
        setSelectedIcon(item.icon);
        select(item.type);
    }

    return (
        <div
            ref={outsideListenerRef}
            className='container-select-image'>
            <button className='select-image' onClick={toggleDropdown}>
                <span className={selectedIcon} style={{ color, marginRight: '10px', fontSize: tamanoIcono + 'px' }}></span>
                <span className='fa fa-caret-down' style={{ color }}></span>
            </button>
            {
                open
                &&
                <div className={'selectable-list'}>
                    {
                        list.map(item => (
                            <div onClick={(e) => selectItem(e, item)} className='selectable-list-item'>
                                <span className={item.icon} style={{ color, fontSize: tamanoIcono + 'px' }}></span>
                            </div>
                        ))
                    }
                </div>

            }

        </div>
    )
}

export default Dropdown;
import React from 'react';
import './tooltip.css';

const Tooltip = ({ children, isOpen }) => {

    return (
        <div className={`tooltip ${!isOpen && 'close'}`}>
            {
                children
            }
        </div>
    )
}

export default Tooltip;

import React from 'react'
import './form-steps.css'

const Steps = ({ activeIndex, navigateTo, steps }) => {

    const chunksPercentage = 100 / (steps.length + 1);
    const totalWidth = chunksPercentage * (steps.length - 1);

    return (
        <div className='form-steps'>
            <div className='line' style={{ left: chunksPercentage + '%', width: totalWidth + '%' }}></div>
            {
                steps.map((step, index) => (
                    <div className='step-container'>
                        <div onClick={() => navigateTo(index)} className={`form-step ${index == activeIndex ? 'active' : ''}`}>{index + 1}</div>
                        <div className='step-text'>{step}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default Steps;
import React from 'react'
import './speech-bubble.css'

const SpeechBubble = ({ text }) => {
    return (
        <div className='speech-bubble'>
            {text}
        </div>
    )
}

export default SpeechBubble;
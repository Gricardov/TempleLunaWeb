import React from 'react'

const StepManager = ({ children, currentIndex }) => {
    const childrenArray = React.Children.map(children, child => child);
    return childrenArray[currentIndex];
}
export default StepManager;

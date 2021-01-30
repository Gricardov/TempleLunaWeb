import { useState, useEffect } from "react";

export const useStepObserver = (currentIndex, numberOfSteps) => {

    const [canGoBackwards, setCanGoBackwards] = useState(false);
    const [isLast, setIsLast] = useState(false);

    useEffect(() => {

        if (currentIndex > 0) {
            setCanGoBackwards(true);
        } else {
            setCanGoBackwards(false);
        }

        if (currentIndex < numberOfSteps - 1) {
            setIsLast(false);
        } else {
            setIsLast(true);
        }

    }, [currentIndex, numberOfSteps]);

    return {
        canGoBackwards,
        isLast
    }

}

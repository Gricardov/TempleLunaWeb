import { useState, useEffect } from "react";

export const useStepObserver = (currentIndex, numberOfSteps) => {

    const [canGoBackwards, setCanGoBackwards] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    useEffect(() => {

        if (currentIndex > 0) {
            setCanGoBackwards(true);
        } else {
            setCanGoBackwards(false);
        }

        if (currentIndex < numberOfSteps - 1) {
            setCanGoForward(true);
        } else {
            setCanGoForward(false);
        }

    }, [currentIndex, numberOfSteps]);

    return {
        canGoBackwards,
        canGoForward
    }

}

import React, { useRef, useEffect } from "react";
import { Subject } from 'rxjs';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideListener = (ref) => {

    const outsideListener = useRef(new Subject());

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                outsideListener.current.next();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return {
        outsideListener$: outsideListener.current
    }

}

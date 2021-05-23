import { useState, useEffect } from 'react';

export const useScrollOffset = (bottomOffset = 600, topOffset = 60) => { // Indica si la página se ha deslizado hasta cierto límite

    const [hasScrolledToBottomOffset, setHasScrolledToBottomOffset] = useState(false);
    const [hasScrolledToTopOffset, setHasScrolledToTopOffset] = useState(false);

    const checkScroll = () => {
        const body = document.body;
        const html = document.documentElement;
        const offsetY = window.scrollY; // Scrolled height
        const vpHeight = window.innerHeight; // Viewport height

        const totalHeight = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);

        if (offsetY >= topOffset) {
            setHasScrolledToTopOffset(true);
        } else {
            setHasScrolledToTopOffset(false);
        }

        if ((totalHeight - (offsetY + vpHeight)) <= bottomOffset) {
            setHasScrolledToBottomOffset(true);
        } else {
            setHasScrolledToBottomOffset(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [topOffset, bottomOffset]);


    return { hasScrolledToTopOffset, hasScrolledToBottomOffset };
}
import { useState, useEffect } from 'react';

const useScreenSize = () => {

    const [windowSize, setWindowSize] = useState<{ width: any, height: any }>();

    useEffect(() => {
        const onScreenChange = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", onScreenChange);

        onScreenChange();

        return () => window.removeEventListener("resize", onScreenChange);
    }, []);

    return windowSize;

};

export default useScreenSize;
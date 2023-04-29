import { useState, useEffect, useRef } from "react"

export const useInView = (options) => {
    const elementRef = useRef();
    const [isVisiable, setIsVisiable] = useState(false);

    const callback = (entries) => {
        const [entry] = entries;
        setIsVisiable(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);
        elementRef.current && observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
        }
    }, [elementRef, options]);

    return { elementRef, isVisiable };
}
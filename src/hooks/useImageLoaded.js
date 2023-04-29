import { useState, useEffect } from "react";
import { useInView } from "./useInView";

export const useImageLoaded = (lazy) => {
    const { elementRef, isVisiable } = useInView({ rootMargin: "0px 0px 100px 0px" });
    const [isLoaded, setIsLoaded] = useState(!lazy);

    useEffect(() => {
        if (isLoaded || !isVisiable) return;
        
        setIsLoaded(true);
    }, [isVisiable]);

    return { elementRef, isLoaded };
}


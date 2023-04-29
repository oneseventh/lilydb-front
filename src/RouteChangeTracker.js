import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";


const RouteChangeTracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (process.env.REACT_APP_SERVICE_TYPE !== "development") {
            ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
            ReactGA.set({ page: location.pathname });
        }
        setInitialized(true);
    }, []);
            // 페이지 뷰

    useEffect(() => {
        if (initialized) {
            ReactGA.set({ page: location.pathname });
            // 페이지 뷰
            if (location.pathname.includes("/article/")) {
                ReactGA.event({
                    category: "articleView",
                    action: "View Article",
                    label: document.title,
                });    
            } else if (location.pathname.includes("/author/")) {
                ReactGA.event({
                    category: "authorView",
                    action: "View Author",
                    label: document.title,
                });    
            } else if (location.pathname.includes("/collection/")) {
                ReactGA.event({
                    category: "collectionView",
                    action: "View Collection",
                    label: document.title,
                });    
            }
            ReactGA.send({
                hitType: "pageview",
                page: location.pathname,
                path: location.pathname,
                location: location.pathname,
                title: document.title,
            });
        }
    }, [location, initialized]);   
}

export default RouteChangeTracker;
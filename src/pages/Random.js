import React, { useCallback, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function Random() {

    const [random, setRandom] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRandom = useCallback( async () => {
        await fetch(process.env.REACT_APP_SERVER + "/api/v2/article/random")
            .then((response) => response.json())
            .then((data) => {   
                setRandom(data.data);
            })
    }, []);

    useEffect(() => {
        fetchRandom();
        setLoading(false);
    }, [fetchRandom]);

    if (loading) return <p>Loading...</p>;
    return (
        <>
            {random && <Navigate to={`/article/${random}`} />}
        </>
    )
}

export default Random;
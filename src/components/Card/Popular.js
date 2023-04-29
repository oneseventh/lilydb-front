import React from "react";
import { useTranslation } from "react-i18next";

import Error from "../Error";

import { useEffect, useState } from "react";
import CardList from "../CardList";
import { Title } from "./styles/Title";


function Popular() {
    const { t } = useTranslation();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchOsusume = async () => {
        await fetch(process.env.REACT_APP_SERVER + '/api/v2/article/popular')
            .then((response) => response.json())
            .then((data) => { 
                setData(<CardList title={t('title.popular')} articleIds={data.data.map((item) => item.article_id)} like={data.data.map((item) => item.like)} />)
            })
            .catch((error) => {
                setError(error);
            });
    }

    useEffect(() => {
        fetchOsusume();
    }, []);

    if (error) return (<>
        <Title title={t('title.popluar')} />
        <Error error={error} />
    </>);
    return <>{data}</>;
}

export default Popular;
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { CardWrapper } from "../../components/Card/styles/CardWrapper";
import CardList from "../CardList";
import { Cookies, getCookie } from "../../hooks/cookie";

import Error from "../Error";
import { Title } from "./styles/Title";


function RecentSearch() {
    const { t } = useTranslation();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const recentSearchArticle = getCookie(Cookies.RECENT_SEARCH_ARTICLE);

    
    useEffect(() => {
        if (recentSearchArticle == null || recentSearchArticle.length === 0) {
            setData(null);
            return;
        }
        
        try {
            setData(<CardList title={t("title.recentsearch")} articleIds={recentSearchArticle} />)
        } catch (error) {
            setError(error);
        }
    }, []);


    if (error) return (
        <>
            <Title>{t("title.recentsearch")}</Title>
            <CardWrapper>
                <Error error={error} />
            </CardWrapper>
        </>
    );
    return (
        <>
            {data}
        </>
    );
}

export default RecentSearch;
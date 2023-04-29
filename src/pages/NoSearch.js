import React from "react";

import styled from "styled-components";
import Osusume from "../components/Card/Osusume";
import RecentSearch from "../components/Card/RecentSearch";
import Tags from "../view/Tags";
import HorizontalRule from "components/globals/HorizontalRule";
import { useTranslation } from "react-i18next";
import MetaTag from "SEOMeta";
import { Cookies, getCookie } from "hooks/cookie";

const Wrapper = styled.div`
    width: calc(100%-1.5em);
    height: 100%;
`;

function NoSearch() {

    const { t } = useTranslation();
    
    return (
        <>
            <MetaTag title={t("meta.title.noSearch")} />
            <Wrapper>
                { getCookie(Cookies.RECENT_SEARCH_ARTICLE).length === 0 ? <Osusume parameter='' title={t("title.random")}/> : <RecentSearch /> }
                <HorizontalRule />
                <Tags />
            </Wrapper>
        </>
    );
}

export default NoSearch;
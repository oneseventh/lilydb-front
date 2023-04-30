import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Osusume from "components/Card/Osusume";
import Popular from "components/Card/Popular";
import Seen from "components/Card/Seen";
import CardList from "components/CardList";
import HorizontalRule from "components/globals/HorizontalRule";
import { Title } from "components/globals/Title";
import { Cookies, getCookie } from "hooks/cookie";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Main(props) {
    const seenArticles = getCookie(Cookies.RECENT_SEEN_ARTICLE);

    const { t } = useTranslation();

    const memorizedOsusume = useMemo(() => {
        return <Osusume parameter='' title={t("title.random")} />
    }, []);

    return (
        <>
            {memorizedOsusume}
            { 
                getCookie(Cookies.RECENT_SEEN_ARTICLE).length !== 0 && <><Osusume parameter={
                    "&" + getCookie(Cookies.RECENT_SEEN_ARTICLE).map((item) => {
                        return "id=" + item;
                    }).join("&")
                } title={t("title.recommend")} /></>
            }
            
            <br />
            <HorizontalRule />
            <br />
            <Title>작품을 찾고 계신가요? 검색해보세요!</Title>
            <SearchBox to="/search">
                <SearchIcon>
                    <FontAwesomeIcon icon={faSearch} />
                </SearchIcon>
                <SearchInput placeholder={t("search.placeholder")} disabled={true} />
            </SearchBox>
            <br />
            <Title>좋아하는 작품이 있으신가요? 나만의 컬렉션 만들기</Title>
            <Link to="/collection/create" style={{
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'left',
                padding: '1em',
                background: "radial-gradient(circle at 3% 7.4%, rgb(0, 144, 243) 0%, rgb(0, 86, 240) 90%)",
                width: '12em',
                height: '10em',
                borderRadius: '1em',
                boxShadow: '0 0 1em 0.5em rgba(0, 0, 0, 0.1)',
                marginTop: '1em',
            }}>
                <div style={{
                    fontSize: '2.5em',
                }}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <Title small>컬렉션 만들기</Title>
                <span style={{
                    fontSize: '0.8em',
                    color: '#f1f1f1',
                }}>컬렉션은 좋아하는 작품을 담거나, 공유하고 싶은 작품을 담아서 남에게 공유할 수 있습니다! </span>
            </Link>
            <br />
            <HorizontalRule />
            <br />
            { seenArticles.length !== 0 && <Seen />}
            <Popular />
        </>
    )
}

const SearchBox = styled(Link)`
    text-decoration: none;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    height: 3em;
    border-radius: 5em;
    font-size: 1.1em;
    padding: 0 2em;
    margin: 1em 0;
    outline: none;
    background-color: var(--bg);
    border: solid 0.15em var(--border);
    color: var(--text);

    box-sizing: border-box;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 0;
    font-size: 1em;
    outline: none;
    color: var(--text);
`;

const SearchIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 0.5em;
`;

export default React.memo(Main);

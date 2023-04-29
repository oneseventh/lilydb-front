import React, { useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import { Link, useParams, Navigate } from "react-router-dom";

import { Title } from "components/Card/styles/Title";

import Error from "../../components/Error";
import CardList from "../../components/CardList";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";

function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
    return array;
}

function Tag() {
    const { tag } = useParams();
    const [ data, setData ] = React.useState(null);

    const { t } = useTranslation();

    const [ error, setError ] = React.useState(null);

    const isDesktopOrMobile = useMediaQuery({ query: '(max-width: 1000px)' });

    useEffect(() => {
        const fetchTag = async () => {
            await fetch(`${process.env.REACT_APP_SERVER}/api/v2/search/tag?tag=${tag}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("서버로부터 응답을 받지 못했습니다.");
                    }
                })
                .then((data) => {
                    const color = data.data.tags[0].color;
                    setData(
                        <>
                            <Title><TagText color={color}><FontAwesomeIcon icon={faTag} />{t("root.lang") !== "ko" ? t(`tags.${data.data.tags[0].tag_name}`) : data.data.tags[0].tag_name}</TagText> {t("title.includeTag")}</Title>
                            <CardList articleIds={shuffle(data.data.articles)} inline={true} mobile={isDesktopOrMobile}/>
                        </>
                    );
                })
                .catch((err) => {
                    setError(err);
                });
        };

        fetchTag();
    }, [tag, isDesktopOrMobile, t]);

    if (error) return (
        <>
            <Navigate to="/error" />
        </>);

    return (
        <Wrapper>
            <SearchBox to="/search">
                <SearchIcon>
                    <FontAwesomeIcon icon={faSearch} />
                </SearchIcon>
                <SearchInput placeholder={t("search.placeholder")} disabled={true} />
            </SearchBox>
            {data}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: calc(100% - 3em);
    height: 100%;
    margin: 1.5em;
`;

const SearchBox = styled(Link)`
    text-decoration: none;

    display: flex;
    flex-direction: row;
    item-align: center;
    justify-content: flex-start;

    width: 40em;
    height: 3em;
    border-radius: 5em;
    font-size: 1em;
    padding: 0 2em;
    margin-bottom: 2em;
    outline: none;
    background-color: var(--bg);
    border: solid 0.15em var(--border);
    font-family: 'fontawesome';
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
    flex-dirction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 0.5em;
`;

const TagText = styled.span`
    font-size: 75%;
    border-radius: 0.5em;
    font-weight: 600;
    padding: 0.3em;
    margin-right: 0.1em;

    ${props => {
        switch (props.color) {
            case "gray":
                return "background-color: var(--gray)";
            case "red":
                return "background-color: var(--red)";
            case "yellow":
                return "background-color: var(--yellow); color: #111";
            case "blue":
                return "background-color: var(--blue)";
            case "pink":
                return "background-color: var(--pink)";
            case "green":
                return "background-color: var(--green)";
            case "purple":
                return "background-color: var(--purple)";
            case "orange":
                return "background-color: var(--orange)";
            default:
                return "background-color: #000";
        }
    }};

    &>svg {
        margin-right: 0.3em;
    }
`;

export default Tag;
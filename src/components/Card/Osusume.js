import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import Error from "../Error";

import { useEffect, useState } from "react";
import CardList from "../CardList";

import CardLoading from "components/recycle/CardLoading";
import { Title } from "components/globals/Title";


function Osusume({ parameter, title, children }) {
    const { t } = useTranslation();
  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const [single, setSingle] = useState(false);
  
    const [singleArticleIds, setSingleArticleIds] = useState([]);
    const [normalArticleIds, setNormalArticleIds] = useState([]);

    const handleCategory = () => {
        setSingle(!single);
    };
  
    const fetchArticles = async (parameter) => {
        try {
            if (!parameter) {
                parameter = '';
            }
            
            const singleResponse = await fetch(
                process.env.REACT_APP_SERVER + '/api/v2/article/recommend?single=true' + parameter
            );
            const singleData = await singleResponse.json();
            setSingleArticleIds(singleData.data);
    
            const normalResponse = await fetch(
                process.env.REACT_APP_SERVER + '/api/v2/article/recommend?single=false' + parameter
            );
            const normalData = await normalResponse.json();
            setNormalArticleIds(normalData.data);
    
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
  
    useEffect(() => {
        fetchArticles(parameter);
    }, []);

    if (error)
        return (
            <>
                <Title title={t('title.recommend')} medium />
                <Error error={error} />
            </>
        );
    if (loading)
        return (
            <CardList />
        );
    return (
        <>
            <CardList title={title ? title : null} articleIds={single ? singleArticleIds : normalArticleIds} advertisement={true} osusume={true}>
                {children && <Children>
                    {children}
                </Children>}
                <Category active={!single && 'active'} onClick={handleCategory}>
                    {t("card.button.general")}
                </Category>
                <Category active={single && 'active'} onClick={handleCategory}>
                    {t("card.button.single")}
                </Category>
            </CardList>
        </>
    );
}
  
const Children = styled.div`
    display: flex;
    flex-direction: column;
`;

const Category = styled.button`
    display: inline-block;
    color: var(--text);
    text-decoration: none;
    padding: 0.4em;
    min-width: 5em;
    border: 0.15em solid var(--border);
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    border-radius: 1em;
    margin: 0.5em 0.5em 0.5em 0;
    font-size: 0.8em;
    @media (max-width: 768px) {
        font-size: 0.7em;
    }
    background-color: var(--bg);
    ${(props) => {
        if (props.active) {
            return `color: white; background-color: var(--primary); border: 0.15em solid var(--primary);`;
        }
    }}
`;

export default Osusume;
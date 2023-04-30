import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import CardList from "../../../components/CardList";
import TagCard from "../../../components/recycle/TagCard";
import { Title } from "../../../components/Card/styles/Title";
import { useTranslation } from "react-i18next";
import Error from "components/Error";
import HorizontalRule from "components/globals/HorizontalRule";


function Footer({ author }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [single, setSingle] = useState(false);

    const { t } = useTranslation();

    const [singleArticleIds, setSingleArticleIds] = useState([]);
    const [normalArticleIds, setNormalArticleIds] = useState([]);

    const [tags, setTags] = useState(null);

    const handleCategory = () => {
        setSingle(!single);
    };

    const fetchTags = useCallback(async () => {
        await fetch(process.env.REACT_APP_SERVER + '/api/v2/author/tags?author=' + author.name)
            .then((response) => response.json())
            .then((data) => {
                setTags(
                    data.data.map((tag) => {
                        return <TagCard color={tag.color} name={tag.tag_name} />
                    })
                );
            })
            .catch((error) => {
                setError(error);
            });
    }, [author])

    const fetchOtherArticles = useCallback(async () => {
        try {
            const singleResponse = await fetch(
                `${process.env.REACT_APP_SERVER}/api/v2/search/authors?author=${author.name}&single=true`
            );
            const singleData = await singleResponse.json();
            setSingleArticleIds(singleData.data);
    
            const normalResponse = await fetch(
                `${process.env.REACT_APP_SERVER}/api/v2/search/authors?author=${author.name}&single=false`
            );
            const normalData = await normalResponse.json();
            setNormalArticleIds(normalData.data);

            if (!normalData.data) {
                setSingle(true);
            }
        } catch (error) {
            setError(error);
        }
    }, [author]);

    const OtherArticle = () => {
        return <>
            <CardList title={
                t("title.other", { name: t("root.lang") === "ja" ? author.original_name ? author.original_name.split(",")[0] : author.name : author.name })
            } articles={single ? singleArticleIds : normalArticleIds}>
                <Category active={!single && 'active'} onClick={handleCategory}>
                    {t("card.button.general")}
                </Category>
                <Category active={single && 'active'} onClick={handleCategory}>
                    {t("card.button.single")}
                </Category>
            </CardList>
        </>
    }

    useEffect(() => {
        fetchTags();
        fetchOtherArticles();
        setLoading(false);
    }, [fetchTags, fetchOtherArticles]);

    if (error) return <Error error={error} />;
    if (loading) return <>Loading...</>;
    return (
        <DetailWrapper>
            <Title>
                {t("title.relatedTags")}
            </Title>
            <TagWrapper>
                {tags}
            </TagWrapper>
            <HorizontalRule />
            <OtherArticle />
        </DetailWrapper>
    );
}

const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 1em 0;
`;

const DetailWrapper = styled.div`
    width: calc(100% - 3em);
    margin: 1.5em;
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
    margin: 0 0.5em 0.5em 0;
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

export default Footer;
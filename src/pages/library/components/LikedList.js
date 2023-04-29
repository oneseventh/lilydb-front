import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Like, getLiked } from "../../../hooks/cookie";

import Error from "../../../components/Error";
import CardList from "../../../components/CardList";
import AuthorCard from "components/recycle/AuthorCard";
import CollectionCard from "components/recycle/CollectionCard";

import { Title } from "components/Card/styles/Title";
import styled from "styled-components";



function LikedList({ type }) {
    const { t } = useTranslation();
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    const likedList = getLiked(type);

    useEffect(() => {
        if (likedList.length === 0) {
            return;
        }
        
        try {
            setData(type === Like.ARTICLE ? (
                        <CardList title={t("title.likedArticle")} articleIds={likedList} />
                    ) : type === Like.AUTHOR ? 
                        <>
                            <Title>{t("title.likedAuthor")}</Title>
                            <CardWrapper>
                                <AuthorCard authorIds={likedList} />
                            </CardWrapper>
                        </>
                    : type === Like.COLLECTION ? (
                        <>
                            <Title>{t("title.likedCollection")}</Title>
                            <CardWrapper>
                                <CollectionCard collectionIds={likedList} />
                            </CardWrapper>
                        </>
                    )
                    : null
            )
        } catch (error) {
            setError(error);
        }
    }, []);

    if (error) return <Error error={error} />;

    return (
        <>
            {data}
        </>
    );
}

const CardWrapper = styled.div`
    width: 100%;
    margin: 0.5em 0;
`;

export default LikedList;

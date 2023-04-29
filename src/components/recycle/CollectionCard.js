import React, { useState, useEffect, useCallback, useMemo } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import Loading from "view/Loading";
import Error from "components/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import getImage, { IMAGE } from "utils/getImage";

const CardWrapper = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;

    white-space: nowrap;

    overflow-x: auto;
    overflow-y: hidden;

    &:hover {
        &::-webkit-scrollbar {
            height: 0.5em;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--bg);
        }
    }

    &::-webkit-scrollbar {
        height: 0;
        border-radius: 0.8em;
        background-color: var(--background);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.8em;
        background-color: #e2e2e2;
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const ImageWrapper = styled.div`
    display: flex;
    width: 8em;
    height: 8em;

    @media (max-width: 768px) {
        width: 6em;
        height: 6em;
    }
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex: 1;
`;

const Image = styled.div`
    display: relative;
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
    background-size: cover;
    background-position: center;
`;

const Thumbnail = ({ renderedImages }) => {
    return (
      <Container>
        {renderedImages.length === 0 && (
          <ImageWrapper>
            <Image />
          </ImageWrapper>
        )}
        {renderedImages.length === 1 && (
          <ImageWrapper>
            <Image style={{ backgroundImage: `url(${renderedImages[0]})` }} />
          </ImageWrapper>
        )}
        {renderedImages.length === 2 && (
          <ImageWrapper>
            <Image style={{ backgroundImage: `url(${renderedImages[0]})`, borderRadius: "0.5em 0 0 0.5em" }} />
            <Image style={{ backgroundImage: `url(${renderedImages[1]})`, borderRadius: "0 0.5em 0.5em 0" }} />
          </ImageWrapper>
        )}
        {renderedImages.length >= 3 && (
          <ImageWrapper>
            <Image style={{ backgroundImage: `url(${renderedImages[0]})`, borderRadius: "0.5em 0 0 0.5em" }} />
            <Image style={{ backgroundImage: `url(${renderedImages[1]})`, borderRadius: "0 0 0 0" }} />
            <Image style={{ backgroundImage: `url(${renderedImages[2]})`, borderRadius: "0 0.5em 0.5em 0" }} />
          </ImageWrapper>
        )}
      </Container>
    );
  };
  

function CollectionCard({ collection = null, collectionIds = null }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchCollections = useCallback(async () => {
        if (!collectionIds && !collection) {
            setData(null);
            setLoading(false);
            return;
        }

        if (collection) {
            setData(collection);
            setLoading(false);
            return;
        }

        const parameter = collectionIds.map((item) => {
            return "id=" + item;
        }).join("&");   

        if (!parameter) {
            setData(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/v2/collection/list?${parameter}`);
            const data = await response.json();
            setData(data.data);
        } catch (error) {
            setError(error);
        }
    }, [collection, collectionIds]);

    useEffect(() => {
        fetchCollections();
        setLoading(false);
    }, [fetchCollections]);


    if (!data) {
        return null;
    }
        
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;


    return (
        <CardWrapper>
            {data.map(({ id, name, description, author, image, count }) => {
                const cardImages = image ? image.map((item) => {
                    return getImage(IMAGE.THUMBNAIL, item, 160)
                }) : [];
                const renderedImages = cardImages.slice(0, Math.min(3, cardImages.length));

                return (
                    <Card key={id} to={`/collection/${id}`} title={description ? description : t("article.description.default")}>
                        <Thumbnail renderedImages={renderedImages} />
                        <Title>{name}</Title>
                        <Info>
                            <FontAwesomeIcon icon={faUser} />{author}
                            {" ・ " + t("collection.info.article", {count: count})}
                        </Info>
                    </Card>
                );
            })}
        </CardWrapper>
    )
}

const Title = styled.span`
    width: 100%;
    font-size: 1.2em;
    @media (max-width: 768px) {
        font-size: 1em;
    }
    margin-top: 0.5em;
    font-weight: 500;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Info = styled.span`
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    @media (max-width: 768px) {
        font-size: 0.7em;
    }
    color: var(--link);
    margin-top: 0.25em;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &>svg {
        margin-right: 0.25em;
    }
`;

const Card = styled(Link)`
    text-decoration: none;
    color: var(--text);
    display: flex;
    flex-direction: column;
    width: 8em;
    height: 12em;
    @media (max-width: 768px) {
        width: 7em;
        height: 9em;
    }
    border-radius: 1em;
    margin-right: 1em;
    padding: 1.5em;
    background-color: var(--bg);
    box-shadow: 0 0 0.5em var(--shadow);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background-color: var(--border);
    }
`;

export default CollectionCard;
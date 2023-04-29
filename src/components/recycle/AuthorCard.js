import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { t } from "i18next";

import Error from "components/Error";
import Loading from "view/Loading";
import getImage, { IMAGE } from "utils/getImage";
import useAuthorList from "hooks/useAuthorList";

function AuthorCard({ author = null, authorIds = null }) {
    const {authors, isError} = useAuthorList(authorIds);

    const getAuthorList = useCallback((authors) => {
        if (authors === null) {
            return null;
        }
        let authorCard = authors.map(({ original_name, name, author_id }) => {
            return (
                <Card key={author_id} to={`/author/${name}`}>
                    <Profile image={getImage(IMAGE.PROFILE, author_id, 160)} title="profile" />
                    <NameWrapper>
                        <AuthorName>
                        {
                            t("root.lang") === 'ja' ? 
                                original_name ? 
                                    original_name.split(',')[0]
                                    : 
                                    name
                                :
                                name
                        }
                        </AuthorName>
                    </NameWrapper>
                    <NameWrapper>
                        <span>
                            {
                                original_name &&
                                t("root.lang") === 'ja' ? <ruby>{name}</ruby> : 
                                    original_name !== null && (
                                        <>
                                            { original_name.includes(',') ? (
                                                <ruby>
                                                {original_name.split(',')[0]}
                                                <rt>{original_name.split(',')[1]}</rt>
                                                </ruby>
                                            ) : (
                                                <ruby>{original_name}</ruby>
                                            )}
                                        </>
                                    )
                            }
                        </span>
                    </NameWrapper>
                </Card>
            )
        })

        return authorCard;
    }, [author, authors]);

    const authorList = React.useMemo(() => getAuthorList(author ? author : authors), [author, authors]);

    if (!authors && isError) return <Error error={isError} />;

    return (
        <CardWrapper>
            {authorList}
        </CardWrapper>
    );
}

const NameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    &>span>ruby {
        color: var(--gray);
    }
`;

const CardWrapper = styled.div`
    width: 100%;
    height: 14em;

    @media (max-width: 768px) {
        height: 12em;
    }
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

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    min-width: 10em;
    align-items: center;
    justify-content: center;
    height: 95%;
    margin-right: 1em;
    padding: 1em;
    background-color: var(--bg);
    border-radius: 1em;
    text-decoration: none;
    box-sizing: border-box;
    color: var(--text);

    @media (max-width: 768px) {
        min-width: 8em;
    }

    &:hover {
        background-color: var(--border);
    }
`;

const Profile = styled.div`
    display: inline-block;
    width: 5em;
    height: 5em;
    @media (max-width: 768px) {
        width: 4em;
        height: 4em;
    }
    border-radius: 50%;
    margin-bottom: 0.5em;

    background-color: var(--dark-gray);
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-repeat: no-repeat;

    object-fit: cover;
`;

const AuthorName = styled.span`
    display: inline-block;
    font-size: 1.25em;
    @media (max-width: 768px) {
        font-size: 1em;
    }
    overflow: hidden;
    padding-bottom: 0.2em;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const OriginalName = styled.span`
    display: inline-block;
    font-size: 0.8em;
    padding-bottom: 0.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export default AuthorCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { t } from "i18next";
import getImage, { IMAGE } from "utils/getImage";

const Badge = styled.span`
    font-size: 0.75em;
    background-color: ${props => {
        if (props.success) return "var(--success)";
        if (props.danger) return "var(--danger)";
        else return "#000";
    }};
    color: #fff;
    padding: 0.2em 0.5em;
    margin-right: 0.25em;
    border-radius: 0.5em;
`;

const Wrapper = styled(Link)`
    display: flex;
    width: 30em;
    height: 14.5em;
    padding: 0.5em;
    margin-right: 1em;
    background-color: var(--bg);
    // border: solid 0.15em var(--border);
    border-radius: 1em;
    box-sizing: border-box;
    
    flex-direction: row;
    color: var(--text);

    text-decoration: none;
    white-space: nowrap;
    

    &:hover {
        background-color: var(--border);
    }
`;

const BadgeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1em 0 0.5em;
    justify-content: center;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0.5em 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArticleImage = styled.div`
    width: 9em;
    height: 13.5em;
    background-image: url(${props => props.image});
    background-size: cover;
    object-fit: cover;
    border-radius: 1em;
`;

const ArticleTitle = styled.h3`
    font-size: 1.75em;
    font-weight: 700;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArticleOriginalTitle = styled.span`
    font-size: 0.8em;
    color: var(--gray);
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Author = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0.5em;
`;

const ArticleAuthor = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
`;

const AuthorImage = styled.div`
    width: 1.5em;
    height: 1.5em;
    background-image: url(${props => props.image});
    background-color: var(--dark-gray);
    background-size: cover;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 0.25em;
`;

const AuthorName = styled.span`
    font-size: 1em;
`;

function TopSearch(props) {
    return (
        <Wrapper to={`/article/${props.id}`} title={`클릭시 ${props.title}작품으로 이동합니다.`}>
            <ImageWrapper>
                <ArticleImage image={getImage(IMAGE.THUMBNAIL, props.id, 228)} alt="thumbnail" />
            </ImageWrapper>
            <ContentWrapper>
                <BadgeWrapper>
                    {props.warning && <Badge danger>{t("card.badge.warning")}</Badge>}
                    {!props.release && <Badge success>{t("card.badge.release.notRelease")}</Badge>}
                    <Badge>{t(`card.badge.content.${props.type}`)}</Badge>
                </BadgeWrapper>
                <TitleWrapper>
                    <ArticleTitle>{t("root.lang") === "ja" ? props.original ? props.original : props.title : props.title}</ArticleTitle>
                    { props.original &&
                                        t("root.lang") === "ja" ? (
                                            <ArticleOriginalTitle>{props.title}</ArticleOriginalTitle>
                                        ) : (
                                            <ArticleOriginalTitle>{props.original}</ArticleOriginalTitle>
                                        )}
                </TitleWrapper>
                <ArticleAuthor>
                    {
                        props.author.length !== 0 ? props.author.map((item, index) => {
                            return (
                                <Author key={index}>
                                    <AuthorImage image={getImage(IMAGE.PROFILE, item.author_id, 64)} title={item.name} />
                                    <AuthorName>
                                        { t("root.lang") === 'ja' ? item.original_name ? item.original_name.split(',')[0] : item.name : item.name }
                                    </AuthorName>
                                </Author>
                            )
                        }) : (
                            <Author key={"unknown"}>
                                <AuthorName>
                                    { t("card.author.unknown") }
                                </AuthorName>
                            </Author>
                        )
                    }
                </ArticleAuthor>
            </ContentWrapper>
        </Wrapper>
    )
}

export default TopSearch;

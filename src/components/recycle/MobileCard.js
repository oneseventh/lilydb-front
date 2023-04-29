import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


import styled from "styled-components";

import { t } from "i18next";
import getImage, { IMAGE } from "utils/getImage";
import { useImageLoaded } from "hooks/useImageLoaded";

const CardWrapper = styled.div`
    width: 100%
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); 
    border: 1px solid var(--border);
    background-color: var(--bg);
    margin: 0.25em 0;
    border-radius: 0.75em;

    & > a {
        text-decoration: none;
        color: #000;
        margin: 0.2em;
        display: flex;
        flex-direction: row;
        padding: 0.5em;
    }
`;

const BadgeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 0.5em;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
`;

const Title = styled.span`
    font-size: 1.2em;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &>svg {
        font-size: 0.8em;
    }
`;

const Badge = styled.span`
    font-size: 0.75em;
    background-color: ${props => {
        if (props.success) return "var(--success)";
        if (props.danger) return "var(--danger)";
        else return "#000";
    }};
    color: #fff;
    padding: 0.2em 0.5em;
    margin-top: 0.2em;
    border-radius: 0.5em;
`;

const ImageBox = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-image: url(${props => props.src});
    background-size: cover;
    ${props => {
        if (props.center) {
            return "background-position: center;"
        }
    }}
    object-fit: cover;
    background-repeat: no-repeat;
    border-radius: 0.5em;
    margin-right: 0.5em;

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const AuthorContainer = styled.div` 
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0.3em;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 0.3em;

    &>span {
        font-size: 0.8em;
        color: var(--text);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const ProfileImage = styled.div`
    width: 16px;
    border-radius: 50%;
    margin-right: 0.2em;
    background-image: url(${props => props.image});
    background-size: cover;
    object-fit: cover;
`

const Warning = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-left: auto;
`;

function MobileCard({ id, type, title, author, tags, release, warning, fromSearch, center, image, like, inline, override = null}) {
    const { pathname } = useLocation();

    const { elementRef, isLoaded } = useImageLoaded(true);

    return (
        <CardWrapper ref={elementRef}>
            <Link
                to={`/article/${id}`}
                state={{
                search: pathname === "/search" ? true : false,
                }}
                onClick={(e) => {
                    override && override(e, id);
                }}
            >
                <BadgeWrapper>
                    {!release && <Badge success>{t("card.badge.release.notRelease")}</Badge>}
                    <Badge>{t(`card.badge.content.${type}`).slice(0,2)}</Badge>
                </BadgeWrapper>
                <ImageBox width="48" height="48" src={isLoaded ? getImage(IMAGE.THUMBNAIL, id, 96) : null} alt={title} center={center} />
                <InfoWrapper>
                    <Title>{title}</Title>
                    <AuthorContainer>
                        {
                            author.map((item) => (
                                <Profile key={item.author_id}>
                                    <ProfileImage width="16" height="16" image={isLoaded ? getImage(IMAGE.PROFILE, item.author_id, 64) : null} title={item.name} />
                                    <span>
                                        { t("root.lang") === 'ja' ? item.original_name ? item.original_name.split(',')[0] : item.name : item.name }
                                    </span>
                                </Profile>
                            ))
                        }
                    </AuthorContainer>
                </InfoWrapper>
                <Warning>
                    {warning && <Badge danger>{t("card.badge.warning")}</Badge>}
                </Warning>
            </Link>
        </CardWrapper>
    );
}

export default React.memo(MobileCard);
import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { t } from "i18next";
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
    color: ${props => {
        if (props.warning) return "#111";
        else return "#fff";
    }};
    background-color: ${props => {
        if (props.success) return "var(--success)";
        if (props.danger) return "var(--danger)";
        if (props.warning) return "var(--warning)";
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

function MobileAdCard({ id, override = null}) {

    const { elementRef, isLoaded } = useImageLoaded(true);

    return (
        <CardWrapper>
            <Link onClick={(e) => {
                    override && override(e, id);
                }}
            >
                <BadgeWrapper>
                    <Badge>{t(`card.badge.ad`).slice(0,2)}</Badge>
                </BadgeWrapper>
                <ImageBox width="48" height="48" />
                <InfoWrapper>
                    <Title>광고 카드</Title>
                    <AuthorContainer>
                        <span>광고 카드</span>
                    </AuthorContainer>
                </InfoWrapper>
            </Link>
        </CardWrapper>
    );
}

export default React.memo(MobileAdCard);
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";

import { t } from "i18next";
import { useImageLoaded } from "hooks/useImageLoaded";

const CardWrapper = styled.div`
    min-width: 18em;
    max-width: 18em;

    @media (max-width: 768px) {
        min-width: 13.5em;
        max-width: 13.5em;
    }
    
    height: ${props => {
        if (props.inline) {
            return `14em`
        }
        return `95%`
    }};

    
    ${props => {
        if (props.inline) {
            return `@media (min-width: 768px) { 
                min-width: 16em;
                flex-basis: 16em;
                max-width: 18em;
                flex-grow: 1
            }`
        }
    }};

    flex-direction: column;
    display: inline-block;
    margin: 0.5em 0.75em 0 0;
    
    & > a {
        text-decoration: none;
        color: #000;
    }
`;

const CardImage = styled.div`
    width: 100%;
    height: 70%;
    border-radius: 0.5em;
    display: flex;
    position: relative;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.05);
    background-image: url(${props => props.background});
    background-color: var(--bg);
    background-size: cover;
    ${props => {
        if (props.center) {
            return "background-position: center;"
        }
    }}
    background-repeat: no-repeat;
`;

const CardTitle = styled.p`
    font-size: 1.2em;
    @media (max-width: 768px) {
        font-size: 1em;
    }
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0.2em 0;

    &>svg {
        font-size: 0.5em;
        color: var(--link);
    }

    color: var(--text);
`;


const BadgeWrapper = styled.div`
    position: absolute;
    ${props => {
        if (props.top) {
            return "top: 0.35em;"
        }
        if (props.bottom) {
            return "bottom: 0.5em;"
        }
    }}
    ${props => {
        if (props.left) {
            return "left: 0.5em;"
        }
        if (props.right) {
            return "right: 0.15em;"
        }
    }}

    @media (max-width: 768px) {
        ${props => {
            if (props.top) {
                return "top: 0.15em;"
            }
            if (props.bottom) {
                return "bottom: 0.35em;"
            }
        }}
        ${props => {
            if (props.left) {
                return "left: 0.35em;"
            }
            if (props.right) {
                return "right: 0.15em;"
            }
        }}
    }
`;

const Badge = styled.span`
    font-size: 0.75em;
    @media (max-width: 768px) {
        font-size: 0.6em;
    }
    color: ${props => {
        if (props.warning) return "#111";
        return "#fff";
    }};
    background-color: ${props => {
        if (props.success) return "var(--success)";
        if (props.danger) return "var(--danger)";
        if (props.like) return "var(--pink)";
        if (props.warning) return "var(--warning)";
        else return "#000";
    }};
    padding: 0.2em 0.5em;
    border-radius: 0.5em;
    margin-right: 0.35em;
`;

const CardInfo = styled.div`
    display: flex;

    flex-direction: row;
    align-items: left;
    justify-content: left;


    &>span {
        font-size: 0.8em;
    }

    color: var(--text);

    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    white-space: nowrap;
`;

const Profile = styled.div`
    display: flex;

    height: 16px;
    margin-right: 0.3em;
    &>div {
        width: 16px;
        border-radius: 50%;
        margin-right: 0.2em;
    }
    &>span {
        font-size: 0.8em;
    }
`;

const Info = styled.div`
    width: 100%;
    flex-direction: column;
    display: inline-block;
`;

const ProfileWrapper = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${props => props.color};

    text-align: center;
    color: white;
`;

function getColor(char) {
    let colorMap = JSON.parse(localStorage.getItem('colorMap')) || {};
    if (colorMap[char]) {
      return colorMap[char];
    }
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 70%, 70%)`;
    colorMap[char] = color;
    localStorage.setItem('colorMap', JSON.stringify(colorMap));
    return color;
}

function AdCard({ id, inline, override = null }) {

    const { elementRef, isLoaded } = useImageLoaded(true);

    return (
        <CardWrapper inline={inline}>
            <Link onClick={(e) => {
                override && override(e, id);
            }}>
                <CardImage ref={elementRef}>
                    <BadgeWrapper bottom left>
                        <Badge warning>Dummy</Badge>
                    </BadgeWrapper>
                </CardImage>
                <Info>
                    <CardTitle>Dummy Card</CardTitle>
                    <CardInfo>
                        <Profile>
                            <ProfileWrapper color={getColor('D')} />
                            <span> Development</span>
                        </Profile>
                    </CardInfo>
                </Info>
            </Link>
        </CardWrapper>
    );
}

export default React.memo(AdCard);
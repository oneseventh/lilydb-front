import React from "react";
import { Link } from "react-router-dom";

import { t } from "i18next";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

const Card = styled(Link)`
    min-width: 8em;
    max-width: 9.5em;
    flex-basis: 8em;
    flex-grow: 1;
    text-decoration: none;

    @media (max-width: 480px) {
        min-width: 45%;
        margin: 0.5em;
    }

    height: 100%;
    display: inline-block;
    margin-right: 1em;
    margin-bottom: 1em;
    border-radius: 0.5em;
    text-align: center;

    background-color: ${props => {
        switch (props.color) {
            case "gray":
                return "var(--gray)";
            case "red":
                return "var(--red)";
            case "yellow":
                return "var(--yellow);";
            case "blue":
                return "var(--blue)";
            case "pink":
                return "var(--pink)";
            case "green":
                return "var(--green)";
            case "purple":
                return "var(--purple)";
            case "orange":
                return "var(--orange)";
            default:
                return "#000";
        }
    }};

    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    & > a {
        text-decoration: none;
    }

    & > a > p {
        color: ${props => {
            if (props.color === "yellow" || props.color === "orange") return "#111"
            else return "#fff"
        }};
    }
`;

const CardTitle = styled.p`
    font-size: 1.25em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0.2em 0;
    padding: 0.5em;
    color: #fff;

    &>svg {
        margin-right: 0.3em;
    }
`;

function TagCard({ name, color }) {
    return (
        <Card key={name} to={`/tags/${name}`} color={color}>
            <CardTitle><FontAwesomeIcon icon={faTag} />{t("root.lang") === 'ko' ? name : t(`tags.${name}`)}</CardTitle>
        </Card>
    );
}

export default TagCard;

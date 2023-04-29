import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const DetailButton = styled.button`
    display: inline-block;
    background: none;
    border: none;
    color: #999;
    font-size: 0.8rem;
    cursor: pointer;
`;

export const fadeInOut = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;

export const InfoWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;

    @media (max-width: 1000px) {
        flex-direction: column;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        ${props => {
            if (props.image) return `background-image: url(${props.image})`;
            if (!props.image) return `background-color: var(--gray);`;
        }};
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.2;
        filter: blur(1em);
        z-index: -1;
    } 
`;

export const ImageContainer = styled.div`
    text-align: center;
    padding: 3em 0 3em 3em;
    align-items: center;
    justify-content: center;
    display: flex;
`;


export const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${props => props.mobile && `margin-top: 1em;`};
    
`;

export const TitleItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.75em 0em;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    &>h1 {
        margin: 0;
    }
    &>svg {
        opacity: 0.5;
        margin-left: 0.5em;
        cursor: pointer;
        color: #aaa;
    }

    @media (max-width: 1000px) {
        &>h1>svg {
            opacity: 0.5;
            font-size: 0.5em;
            margin-left: 0.5em;
            cursor: pointer;
            color: #aaa;
        }
    }
`;

export const OriginalTitle = styled.span`
    font-size: 0.8em;
    color: var(--link);
`;

export const DetailContainer = styled.div`
    width: 50%;
    padding: 3em;
    vertical-align: middle;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ImageBox = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    position: relative;
    align-items: center;
    text-align: center;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.12), 0 0.5em 1em rgba(0,0,0,0.24);
    background-color: var(--bg);
    background-image: url(${props => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;
    color: var(--text);
    border-radius: 1em;
    margin: 1em;
`;

export const BadgeWrapper = styled.div`
    width: 100%;
`;

export const LoadingBadge = styled.span`
    display: inline-block;
    width: 4em;
    height: 1em;
    opacity: 0.75;
    background-color: #1c1c1c;
    padding: 0.2em 0.5em;
    border-radius: 0.5em;
    animation: ${fadeInOut} 1s ease-in-out infinite;
`;

export const Title = styled.h1`
    font-size: 2em;
    @media (max-width: 768px) {
        font-size: 1.65em;
    }
    font-weight: 700;
    margin-bottom: 0.5em;
    color: var(--text);
`;

export const MobileTitle = styled(Title)`
    width: 90%;
`;

export const LoadingTitle = styled.h1`
    width: 8em;
    height: 2em;
    font-weight: 700;
    margin-bottom: 0.5em;
    background-color: #1c1c1c;
    border-radius: 0.5em;
    
    animation: ${fadeInOut} 1s ease-in-out infinite;
`;

export const Description = styled.span`
    white-space: pre-wrap;
    font-size: 1em;
    @media (max-width: 768px) {
        font-size: 0.85em;
    }
    opacity: 0.75;
    color: var(--text);
`;

export const LoadingDescription = styled.span`
    display: inline-block;
    width: 30em;
    height: 10em;
    background-color: #1c1c1c;
    animation: ${fadeInOut} 1s ease-in-out infinite;
    border-radius: 1em;
    
    margin-bottom: 0.5em;
`;

export const PCDescription = styled(Description)`
    width: 100%;
    line-height: 1.5em;
    margin-bottom: 0.15em;
`;

export const MobileDescription = styled(Description)`
    width: 90%;
    line-height: 1.5em;
`;

export const MobileContent = styled.div`
    width: calc(100%-6em);
    display: flex;
    flex-direction: column;
    margin: 1.5em 0 1.5em 1.5em;
`;

export const TagWrapper = styled.div`
    display: block;
    flex-wrap: wrap;
    margin: 0.3em 0 0.3em 0;
`;

export const TagLink = styled(Link)`
    text-decoration: none;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0.5em 0;
`;

export const ViewButton = styled.button`
    background-color: var(--primary);
    color: var(--white);
    border: none;
    border-radius: 1em;
    cursor: pointer;
    width: 12em;
    @media (max-width: 1000px) {
        width: 100%;
    }
    height: 3.5em;

    font-size: 1em;
`;

export const LoadingImageBox = styled.span`
    display: inline-block;
    min-width: 300px;
    height: 440px;
    background-color: #1c1c1c;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.12), 0 0.5em 1em rgba(0,0,0,0.24);
    border-radius: 1em;
    margin: 2em;
    animation: ${fadeInOut} 1s ease-in-out infinite;
`;
    
export const MobileWrapper = styled.div`
    display: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

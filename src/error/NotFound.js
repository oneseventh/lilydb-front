import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faHeart, faHome, faList, faSearch, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

function NotFound() {
    let navigate = useNavigate();

    return (
        <ErrorWrapper>
            <ErrorTitle>404</ErrorTitle>
            <ErrorDetail>Not Found</ErrorDetail>
            <ErrorContent>길을 잘못 드신거 같네요. 아래의 아이콘을 클릭하시면 올바른 길로 보내드리겠습니다!</ErrorContent>
            <Navigation>
                <Link><FontAwesomeIcon icon={faBackward} onClick={() => navigate(-1)} /></Link>
                <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
                <Link to="/search"><FontAwesomeIcon icon={faSearch} /></Link>
                <Link to="/info"><FontAwesomeIcon icon={faList} /></Link>
                <Link to="/random"><FontAwesomeIcon icon={faShuffle} /></Link>
                <Link to="/liked"><FontAwesomeIcon icon={faHeart} /></Link>
            </Navigation>
        </ErrorWrapper>
    );
}

const ErrorWrapper = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    color: var(--text);
    background-color: var(--bg);
`;

const ErrorTitle = styled.h1`
    font-size: 8em;
    font-weight: 700;
    margin: 0;
`;

const ErrorDetail = styled.h2`
    font-size: 4em;
    font-weight: 500;
    color: var(--gtext);
    margin: 0;
`;

const ErrorContent = styled.p`
    font-size: 1.5em;
    font-weight: 400;
    color: var(--text);
`;

const Navigation = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;


    &>a {
        text-decoration: none;
        color: var(--link);
        margin: 0 1em;
        font-size: 2em;
    }
`;

export default NotFound;
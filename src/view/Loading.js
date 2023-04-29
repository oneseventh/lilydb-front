import React from "react";

import styled, { keyframes } from "styled-components";

function Loading() {

    return (
        <LoadingWrapper>
        </LoadingWrapper>
    )
}

const fadeInOut = keyframes`
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


const LoadingWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--bg);
    border-radius: 1em;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    animation: ${fadeInOut} 1s ease-in-out infinite;
    text-align: center;
`;

export default Loading;
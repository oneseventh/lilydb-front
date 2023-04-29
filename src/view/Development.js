import React from "react";

import styled from "styled-components";

function Development() {

    return (
        <ErrorWrapper>
            <ErrorMsgWrapper>
                <ErrorLogo>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
                    </svg>
                </ErrorLogo>
                <ErrorTitle>준비중인 기능입니다!</ErrorTitle>
                <ErrorContent>죄송합니다. 빠른 시일 내에 찾아뵙겠습니다!</ErrorContent>
            </ErrorMsgWrapper>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div`
    margin-top: 1em;
    width: 100%;
    height: 100%;
    padding: 1em 0;
    background-color: var(--bg);
    border-radius: 0.5em;
    text-align: center;
`;

const ErrorMsgWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const ErrorLogo = styled.div`
    width: 6em;
    height: 6em;
    margin: 1em;
    svg {
        width: 100%;
        height: 100%;
        fill: var(--text);
    }
`;

const ErrorTitle = styled.h2`
    font-size: 2em;
    margin: 0;
    color: var(--text);
`;

const ErrorContent = styled.p`
    font-size: 0.9em;
    color: var(--text);
`;

export default Development;
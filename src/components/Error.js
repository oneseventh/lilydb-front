import React from "react";

import styled from "styled-components";

function Error(props) {

    return (
        <ErrorWrapper>
            <ErrorMsgWrapper> 
                <ErrorTitle>에러!</ErrorTitle>
                <ErrorMessage>오류가 발생했습니다. 오류 ID를 포함하여 문의해주세요.</ErrorMessage>
                <ErrorMessage>오류 ID: {props.error.message}</ErrorMessage>
            </ErrorMsgWrapper>
        </ErrorWrapper>
    )
}

const ErrorWrapper = styled.div`
    position: relative;
    width: calc(100% - 3em);
    min-height: 20vh;
    background-color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.8em;
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

const ErrorTitle = styled.h2`
    font-size: 2.5em;
    margin: 0;
    color: var(--text);
`;

const ErrorMessage = styled.p`
    font-size: 90%;
    margin: 0;
    color: var(--link);
`;

export default Error;
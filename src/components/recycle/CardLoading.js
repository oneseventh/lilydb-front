import React from 'react';
import styled, { keyframes } from 'styled-components';

import Loading from 'view/Loading';

import { CardWrapper } from 'components/Card/styles/CardWrapper';

function CardLoading(title) {
    return (
        <Wrapper>
            { title.title !== null && <LoadingTitle />}
            <CardWrapper>
                <Loading />
            </CardWrapper>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: calc(100% - 1.5em);
    margin-bottom: 1em;
`;

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

const LoadingTitle = styled.span`
    display: inline-block;
    width: 12em;
    height: 3em;
    color: transparent;
    background-color: var(--bg);
    border-radius: 1em;
    animation: ${fadeInOut} 1s ease-in-out infinite;
`;

export default CardLoading;
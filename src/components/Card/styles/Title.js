import styled from "styled-components";

export const Title = styled.h2`
    font-size: 1.75em;
    @media (max-width: 768px) {
        font-size: 1.5em;
    }
    font-weight: 600;
    margin: 0.25em 0;

    color: var(--text);

    &>svg {
        margin-right: 0.25em;
    }
`;
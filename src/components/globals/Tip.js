import styled from "styled-components";

export default styled.span`
    color: var(--link);
    font-size: 0.8em;
    margin: 0.15em 0;

    &>svg {
        margin-right: 0.25em;
    }

    &>a {
        color: var(--link);
        text-decoration: none;
    }
`
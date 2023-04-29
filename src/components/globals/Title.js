import styled from "styled-components";

export const Title = styled.h2`
    font-weight: 600;
    margin: 0.25em 0;

    color: var(--text);

    &>svg {
        margin-right: 0.25em;
    }

    font-size: ${(props) => {
        if (props.big) {
            return "2em";
        }
        if (props.medium) {
            return "1.75em";
        }
        if (props.small) {
            return "1.5em";
        }
        return "1.75em";
    }};
    
    @media (max-width: 768px) {
        font-size: ${(props) => {
            if (props.big) {
                return "1.75em";
            }
            if (props.medium) {
                return "1.5em";
            }
            if (props.small) {
                return "1.25em";
            }
            return "1.5em";
        }};
    }
`;
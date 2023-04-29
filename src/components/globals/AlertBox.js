import styled from "styled-components";

export default styled.span`
    display: flex;
    align-items: center;
    padding: 1em;
    width: 100%;
    border-radius: 0.5em;
    white-space: pre-line;
    box-sizing: border-box;
    background-color: ${props => {
        if (props.success) {
            return "var(--success)";
        }
        if (props.danger) {
            return "var(--danger)";
        }
        if (props.warning) {
            return "var(--warning)";
        }
        return "var(--bg)";
    }};

    ${props => {
        if (props.success || props.danger || props.warning) {
            return "filter: brightness(2.5);";
        }
    }};

    border: solid 0.15em ${props => {
        if (props.success) {
            return "var(--success)";
        }
        if (props.danger) {
            return "var(--danger)";
        }
        if (props.warning) {
            return "var(--warning)";
        }
        return "var(--border)";
    }};

    color: var(--text);

    &>a {
        text-decoration: none;
        color: var(--link);
        margin-left: 0.5em;
    }
`;
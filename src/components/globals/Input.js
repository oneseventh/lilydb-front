import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    background-color: var(--bg);
    border: solid 0.15em var(--border);
    outline: 0;
    padding: 0.75em;
    height: 3em;
    margin: 0.3em 0;
    border-radius: 1em;
    box-sizing: border-box;
    color: var(--text);
`

export const TextArea = styled.textarea`
    width: 100%;
    height: fit-content;
    min-height: 10em;
    padding: 1em;
    background-color: var(--bg);
    color: var(--text);
    border: solid 0.15em var(--border);
    border-radius: 1em;
    box-sizing: border-box;
    resize: none;

    & {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    &:active, &:focus {
        outline: none;
    }
`
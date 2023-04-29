import styled from "styled-components";

export default styled.span`
    display: inline-block;
    font-size: 1em;
    min-height: 1.25em;
    opacity: 0.75;
    color: ${props => {
        if (props.color === "yellow") return "#111";
        else return "#fff";
    }};
    
    background-color: ${props => {
        switch (props.color) {
            case "gray":
                return "var(--gray)";
            case "red":
                return "var(--red)";
            case "yellow":
                return "var(--yellow);";
            case "blue":
                return "var(--blue)";
            case "pink":
                return "var(--pink)";
            case "green":
                return "var(--green)";
            case "purple":
                return "var(--purple)";
            case "orange":
                return "var(--orange)";
            case "primary":
                return "var(--primary)";
            case "success":
                return "var(--success)";
            default:
                return "#000";
        }
    }};
    
    padding: 0.2em 0.5em;
    border-radius: 0.5em;
    margin-right: 0.5em;
    margin-top: 0.1em;
    @media (max-width: 768px) {
        font-size: 0.8em;
        margin-right: 0.3em;
    }
    &>svg {
        margin-right: 0.3em;
        font-size: 0.8em;
    }
`;

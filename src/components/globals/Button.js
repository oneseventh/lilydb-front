import styled from "styled-components";

export default styled.button`
    min-width: ${props => {
        if (props.big) {
            return "8em";
        }
        if (props.small) {
            return "3em";
        }
        if (props.full) {
            return "100%";
        }
        return "5em";
    }};
    height: ${props => {
        if (props.big) {
            return `calc(8em/2.5)`
        }
        if (props.small) {
            return `calc(3em/2.5)`
        }
        return "auto"
    }};



    margin: ${props => props.margin};
    background-color: ${props => 
        {
            if (props.primary) {
                return "var(--primary)";
            }
            if (props.danger) {
                return "var(--danger)";
            }
            if (props.success) {
                return "var(--success)";
            }
            if (props.warning) {
                return "var(--warning); color: var(--black)";
            }
            return "var(--gray)";
        }
    };
    color: white;
    border: solid 0.15em ${props => 
        {
            if (props.primary) {
                return "var(--primary)";
            }
            if (props.danger) {
                return "var(--danger)";
            }
            if (props.success) {
                return "var(--success)";
            }
            if (props.warning) {
                return "var(--warning)";
            }
            return "var(--gray)";
        }
    };
    border-radius: 1em;
    padding: 0.5em 1em;
    font-size: 1em;
    cursor: pointer;
    box-sizing: border-box;
    
    &:hover {
        filter: brightness(0.95);
    }

    &:disabled {
        filter: brightness(0.5);
        cursor: not-allowed;
    }
`
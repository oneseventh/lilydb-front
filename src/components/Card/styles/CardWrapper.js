import styled from "styled-components";

export const InlineCardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    flex-wrap: wrap;

    width: 100%;
    height: fit-content;

    overflow-x: auto;
    overflow-y: hidden;


    &:hover {
        &::-webkit-scrollbar {
            height: 0.5em;
            background-color: var(--white);
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--gray);
        }
    }
    
    &::-webkit-scrollbar {
        height: 0;
        border-radius: 0.8em;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.8em;
    }
`;


export const MobileCardWrapper = styled.div`
    width: calc(100%-1.5em);
    height: 100%;
    display: flex;
    flex-direction: column;
    height: fit-content;
`;


export const CardWrapper = styled.div`
    width: 100%;
    height: 14em;

    @media (max-width: 768px) {
        height: 11em;
    }
    
    flex-direction: row;
    white-space: nowrap;
    
    overflow-x: auto;
    overflow-y: hidden;

    ${props => {
        if (props.inline) {
            return "display: flex; overflow-y: auto;"
        }
    }}


    &:hover {
        &::-webkit-scrollbar {
            height: 0.5em;
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--bg);
        }
    }
    
    &::-webkit-scrollbar {
        height: 0;
        border-radius: 0.8em;
        background-color: var(--background);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 0.8em;
        background-color: #e2e2e2;
    }
`;
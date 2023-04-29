import styled from "styled-components";

function Advertisement() {
    return (
        <Ad>
            <span>Empty</span>
        </Ad>
    )
}

const Ad = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 5.5em;
    background-color: var(--bg);

    &>span {
        position: absolute;
        font-size: 1em;
        font-weight: bold;
    }
`;

export default Advertisement;
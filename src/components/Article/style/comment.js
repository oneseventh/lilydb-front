import styled from "styled-components";

export const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin: 1em 0;
    box-sizing: border-box;
`;

export const ProfileWrapper = styled.div`
    width: 2.5em;
    height: 2.5em;

    @media (max-width: 768px) {
        width: 2.25em;
        height: 2.25em;
    }

    border-radius: 50%;
    background-color: ${props => props.color};
    background-image: url(${props => props.image});

    background-size: cover;
    object-fit: cover;

    &>span {
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
        display: flex;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-left: 0.5em;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.15em;
`;

export const Author = styled.span`
    color: var(--text);
    font-size: 0.9em;
    @media (max-width: 768px) {
        font-size: 0.8em;
    }
`;

export const CreatedDate = styled.span`
    color: var(--link);
    font-size: 0.9em;
    @media (max-width: 768px) {
        font-size: 0.8em;
    }
    margin-left: 0.25em;
`;

export const Edit = styled.span`
    color: var(--link);
    font-size: 0.65em;
    @media (max-width: 768px) {
        font-size: 0.6em;
    }
    margin-left: 1em;
    cursor: pointer;

    &:hover {
        color: var(--white);
    }
`;

export const Delete = styled.span`
    color: var(--link);
    font-size: 0.65em;
    @media (max-width: 768px) {
        font-size: 0.6em;
    }
    margin-left: 1em;
    cursor: pointer;

    &:hover {
        color: var(--danger);
    }
`;



export const ContentBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.25em;
    padding: 0.15em;
`;

export const Content = styled.span`
    color: var(--text);
    @media (max-width: 768px) {
        font-size: 0.95em;
    }
`;



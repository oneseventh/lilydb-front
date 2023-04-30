import { faAngleDown, faAngleUp, faComment, faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function Toolbar() {
    const location = useLocation();

    const moveToTop = (e) => {
        e.preventDefault();
        document.body.scrollTo({ behavior: 'smooth', top: 0 });
    };

    const moveToBottom = (e) => {
        e.preventDefault();
        document.body.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
    };

    const moveToComments = (e) => {
        e.preventDefault();
        let data = (e.target).hash;
        const matched = document.querySelector(data);

        matched.scrollIntoView({behavior: "smooth"});
    };

    return (
        <ButtonWrapper>
            <Button to="#" onClick={moveToTop} title={"Move to Top"}><FontAwesomeIcon icon={faAngleUp} /></Button>
            <Button to="#" onClick={moveToBottom} title={"Move to Bottom"}><FontAwesomeIcon icon={faAngleDown} /></Button>
            { location.pathname.includes("/article/") && <Button to="#comments" onClick={moveToBottom} title={"Move to Comments"}><FontAwesomeIcon icon={faCommentAlt} /></Button> }
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: fixed;
    bottom: 2em;
    right: 2em;
    z-index: 2;
`;

const Button = styled(Link)`
    text-decoration: none;
    background-color: var(--bg);
    color: var(--text);
    border: solid 1px var(--border);
    box-shadow: 0 1px 4px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.05);
    border-radius: 50%;
    margin: 0 0.25em;
    padding: 0.75em;
    width: 1.75em;
    height: 1.75em;
    transition: all 0.2s ease-in-out;

    display: flex;
    align-items: center;
    justify-content: center;

    &>svg {
        width: 1.25em;
        height: 1.25em;
    }
`;

export default Toolbar;
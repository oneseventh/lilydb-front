import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faThumbsUp, faThumbsDown, faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { Like, addArticle, checkLiked, removeArticle } from "../../hooks/cookie";
import { ErrorModal } from "../Modal";
import { useTranslation } from "react-i18next";
import Error from "components/Error";


function Vote({ data, type }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);

    const { t } = useTranslation();

    const [vote, setVote] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const id = type === Like.ARTICLE ? data.article_id : type === Like.AUTHOR ? data.author_id : type === Like.COLLECTION ? data.collection_id : null;
    const voteType = type === Like.ARTICLE ? "article" : type === Like.AUTHOR ? "author" : type === Like.COLLECTION ? "collection" : null;

    const [like, setLike] = useState(checkLiked(type, id));

    function onClickLike() {
        if (like) {
            removeArticle(type, id);
        } else {
            addArticle(type, id);
        }
        setLike(!like);
    }


    const fetchVote = useCallback(async () => {
        const handleVoteUp = async () => {
            setDisabled(true);
            await fetch(`${process.env.REACT_APP_SERVER}/api/v2/vote/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "like",
                    id: id,
                    type: voteType
                }),
            }).then((response) => response.json())
                .then((result) => {
                if (result.success === true) {
                    fetchVote();
                } else {
                    setAlert(t(result.detail))
                }
                setDisabled(false);
            });
        }
    
        const handleVoteDown = async () => {
            setDisabled(true);
            await fetch(`${process.env.REACT_APP_SERVER}/api/v2/vote/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "dislike",
                    id: id,
                    type: voteType
                }),
            }).then((response) => response.json())
                .then((result) => {
                if (result.success === true) {
                    fetchVote();
                } else {
                    setAlert(t(result.detail))
                }
                setDisabled(false);
            });
        }
    
        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/vote/?id=${id}&type=${voteType}`)
            .then((response) => response.json())
            .then((result) => {
    
                const voteUp = async () => {
                    await handleVoteUp();
                };
    
                const voteDown = async () => {
                    await handleVoteDown();
                };
    
                setVote(
                    <>
                        <Button onClick={() => {
                            voteUp();
                            }} disabled={disabled} aria-label={`추천: ${result.like_count}`} voteup>
                            <FontAwesomeIcon icon={faThumbsUp} /> {result.like_count}
                        </Button>
                        <Button onClick={() => {
                            voteDown(); 
                            }}  disabled={disabled} aria-label={`비추: ${result.dislike_count}`}votedown>
                            <FontAwesomeIcon icon={faThumbsDown} /> {result.dislike_count}
                        </Button>
                    </>
                );
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id, disabled]);
    
    useEffect(() => {
        const fetchData = async () => {
            await fetchVote();
        };
        fetchData();
    }, [fetchVote]);

    if (loading) return  <LoadingVoteWrapper />;
    if (error) return <Error error={error} />;

    return (
        <VoteWrapper>
            {
                alert && <ErrorModal onClose={() => setAlert(null)}>{alert}</ErrorModal>
            }
            {
                like ?
                <Button onClick={onClickLike} disabled={disabled} aria-label="작품에 좋아요 표시" like={true}><FontAwesomeIcon icon={faHeartCircleMinus} /></Button> 
                :
                <Button onClick={onClickLike} disabled={disabled} aria-label="작품에 싫어요 표시" like={false}><FontAwesomeIcon icon={faHeartCirclePlus} /></Button>
            }
            {vote}
        </VoteWrapper>
    );
}

const LoadingVoteWrapper = styled.span`
    position: relative;
    width: 100%;
    min-height: 3em;
    height: 100%;
    background-color: var(--bg);
    border-radius: 1em;
`;

const VoteWrapper = styled.div`
    width: 100%;
    display: inline-flex;
    margin: 0;
    align-items: left;
`;

const Button = styled.button`
    min-width: 5em;
    min-height: 3em;
    height: 100%;
    padding: 0.5em 1em;
    margin-right: 1em;

    font-size: 1em;
    border: solid 0.15em ${props => {
        if (props.voteup) return "var(--pink)";
        if (props.votedown) return "var(--blue)";
        if (props.like) return "var(--text)";
        if (!props.like) return "var(--text)";
        return "var(--gray)";
    }};;
    @media (max-width: 768px) {
        min-width: 4em;
        font-size: 0.9em;
    }

    @media (max-width: 480px) {
        min-width: 25%;
        font-size: 0.75em;
        border: solid 0.2em ${props => {
            if (props.voteup) return "var(--pink)";
            if (props.votedown) return "var(--blue)";
            if (props.like) return "var(--text)";
            if (!props.like) return "var(--text)";
            return "var(--gray)";
        }};;
    }
    font-weight: 600;
    border-radius: 1em;
    
    color: ${props => {
        if (props.voteup) return "var(--pink)";
        if (props.votedown) return "var(--blue)";
        if (!props.like) return "var(--text)";
        if (props.like) return "var(--reverse-text)"
        return "var(--gray)";
    }};;
    background-color: ${props => {
        if (props.like) return "var(--text)";
        return "transparent"
    }};;

    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }

    &:hover {
        background-color: ${props => {
            if (props.voteup) return "var(--pink)";
            if (props.votedown) return "var(--blue)";
            if (!props.like) return "var(--text)";
            if (props.like) return "transparent";
            return "var(--gray)";
        }};;
        color: ${props => {
            if (!props.like) return "var(--reverse-text)";
            return "var(--text)"
        }};;

    };
`;

export default Vote;
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { t } from "i18next";

import { CommentDeleteModal, CommentWriteModal } from "../Modal";

import styled from "styled-components";
import { CommentBox, ProfileWrapper, ContentWrapper, InfoBox, Author, CreatedDate, ContentBox, Content, Edit, Delete, AdminProfile } from "./style/comment";
import Tip from "components/globals/Tip";
import { useMediaQuery } from "react-responsive";
import getImage, { IMAGE } from "utils/getImage";


function getTimeDiffString(date) {
    const now = Date.now();
    const created = new Date(date).getTime();
    const diff = now - created;
    const timeUnits = [
        { unit: "year", duration: 365 * 24 * 60 * 60 * 1000 },
        { unit: "month", duration: 30 * 24 * 60 * 60 * 1000 },
        { unit: "week", duration: 7 * 24 * 60 * 60 * 1000 },
        { unit: "day", duration: 24 * 60 * 60 * 1000 },
        { unit: "hour", duration: 60 * 60 * 1000 },
        { unit: "minute", duration: 60 * 1000 },
    ];

    for (let i = 0; i < timeUnits.length; i++) {
        const { unit, duration } = timeUnits[i];
        if (diff >= duration) {
            const time = Math.floor(diff / duration);
            return time === 1 ? t(`time.${unit}`) : t(`time.${unit}s`, { time });
        }
    }

    return t("time.just");
}

function Comment({ articleId }) {
    const { t } = useTranslation();

    const [commentJson, setCommentJson] = useState(null);
    const [comments, setData] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const [deleteId, setDeleteId] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    function getColor(char) {
        let colorMap = JSON.parse(localStorage.getItem('colorMap')) || {};
        if (colorMap[char]) {
          return colorMap[char];
        }
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 70%, 70%)`;
        colorMap[char] = color;
        localStorage.setItem('colorMap', JSON.stringify(colorMap));
        return color;
    }

    const fetchComment = useCallback((articleId) => {
        fetch(`${process.env.REACT_APP_SERVER}/api/v2/comment/${articleId}`)
            .then((response) => response.json())
            .then((data) => {
                setCommentJson(data.message.comments);
                
                setData(data.message.comments.map((item, index) => {
                    return (
                        <CommentBox key={item.id + index}>
                            {
                                console.log(getImage(IMAGE.PROFILE, "fallback", 96))
                            }
                            <ProfileWrapper color={getColor(item.author[0])} image={item.author[0] == '*' ? getImage(IMAGE.PROFILE, "fallback", 96) : null}>
                                <span>{item.author[0]}</span>
                            </ProfileWrapper>
                            <ContentWrapper>
                                <InfoBox>
                                    <Author>{item.author}</Author>
                                    <CreatedDate title={item.created_at}>・ {getTimeDiffString(item.created_at)}</CreatedDate>
                                    <Edit><FontAwesomeIcon icon={faPencil} /></Edit>
                                    <Delete onClick={() => {
                                        setDeleteId([item.id, item.comment_id]);
                                        setIsOpen(true);
                                    }}><FontAwesomeIcon icon={faTrash} /></Delete>
                                </InfoBox>
                                <ContentBox>
                                    <Content>{item.content}</Content>
                                </ContentBox>
                            </ContentWrapper>
                        </CommentBox>
                    )
                }));
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [t]);

    const writeComment = async (event) => {
        setDisabled(true);
        event.preventDefault();

        const formData = new FormData(event.target);

        const password = formData.get('password');
        const content = formData.get('content');
        const author = formData.get('author');

        if (password.length < 4) {
            alert(t("comment.passwordtooshort"));
            setDisabled(false);
            return;
        }

        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/comment/write`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                article_id: articleId,
                password: password,
                content: content,
                author: author,
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.success === true) {
                    alert(t("comment.write.success"));
                    fetchComment(articleId);
                } else {
                    alert(t("comment.write.fail"));
                }
            });
        setDisabled(false);
    }

    useEffect(() => {
        fetchComment(articleId);
    }, [articleId, fetchComment]);

    if (loading) return <p>로딩중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;
    return (
        <Wrapper>
            {isOpen && 
                    <CommentDeleteModal onClose={() => setIsOpen(false)}
                        onSuccess={() => {
                            alert(t("comment.delete.success"));
                            fetchComment(articleId);
                        }} 
                        onFail={() => {
                            alert(t("comment.delete.fail"));
                        }}
                        article_id={articleId} comment_id={deleteId[1]} author={commentJson[deleteId[0]].author} content={commentJson[deleteId[0]].content}
                    />
            }
            
            {
                isMobile ? (
                    <>
                        { commentModal && <CommentWriteModal articleId={articleId} onClose={(success = false) => {
                            setCommentModal(false)
                            if (success) {
                                fetchComment(articleId);
                            }
                        }}></CommentWriteModal> }
                        <MobileCommentInput onClick={(e) => {
                            e.preventDefault();
                            setCommentModal(true);
                        }}>{t("comment.input")}</MobileCommentInput>
                    </>
                ) : (
                    <InputWrapper onSubmit={writeComment}>
                        <CommentWrapper>
                            <CommentAboutWrapper>
                                <CommentInfoWrapper>
                                    <AuthorInput className="author" type="text" name="author" placeholder={t("comment.author")} required/>
                                    <PasswordInput type="password" name="password" placeholder={t("comment.password")} required/>
                                </CommentInfoWrapper>
                                <CommentInput name="content" placeholder={t("comment.placeholder", {article: "「" + document.title + "」"})} required />
                            </CommentAboutWrapper>
                            <CommentButton type="submit" disabled={disabled}>{t("comment.button.submit")}</CommentButton>
                        </CommentWrapper>
                    </InputWrapper>
                )
            }
            {comments ? (
                <>
                    <Tip><FontAwesomeIcon icon={faInfoCircle} />{t("comment.warning.timezone")}</Tip>
                    {comments}
                </>
            ) : <NoComment>{t("comment.nashi")}</NoComment>}
        </Wrapper>
    );
}

const MobileCommentInput = styled.span`
    width: 100%;
    height: 3.5em;
    font-size: 0.9em;
    background: var(--bg);
    border: 0.15em solid var(--border);
    border-radius: 1em;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--text);
    pointer: cursor;
    margin-bottom: 0.25em;
`;

const NoComment = styled.div`
    width: 100%;
    height: 12em;
    display: flex;
    border: 0.15em solid var(--border);
    border-radius: 1em;
    margin: 0.5em 0;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: var(--text);
    background: var(--bg);
`;


const Wrapper = styled.div`
    width: 100%;
`;

const InputWrapper = styled.form`
    width: 100%;
    display: flex;
    justify-content: space-between;
    &>textarea, &>button {
        font-size: 1em;
    }
`;

const CommentInput = styled.textarea`
    width: 100%;
    height: 4em;
    resize: none;
    padding: 1em;
    font-size: 1em;
    background-color: var(--bg);
    color: var(--text);
    border: none;
    border-radius: 0 1em 1em 1em;
    box-sizing: border-box;

    & {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    &:active, &:focus {
        outline: none;
    }
`;

const CommentButton = styled.button`
    width: 15%;
    height: 100%;
    font-size: 1em;
    background-color: var(--primary);
    color: #fff;
    border: none;
    border-radius: 1em;
    cursor: pointer;
`;

const CommentTitleWrapper = styled.div`
    width: 100%;
    display: flex;
`;

const CommentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const CommentInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;

    &>input {
        font-size: 0.8em;
    }
`;

const CommentAboutWrapper = styled.div`
    width: 83%;
`;

const Input = styled.input`
    width: 30%;
    min-width: 16em;
    height: 2.5em;
    padding: 1em;
    border: none;
    box-sizing: border-box;
    background-color: var(--bg);
    color: var(--text);
    font-size: 1em;
    
    & {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    &:active, &:focus {
        outline: none;
    }

    &::placeholder {
        color: var(--link);
    }
`;

const AuthorInput = styled(Input)`
    border-radius: 1em 0 0 0;
`;

const PasswordInput = styled(Input)`
    border-radius: 0 1em 0 0;
`;

const CommentTitle = styled.span`
    display: inline-block;
    white-space: nowrap;
    padding: 0.5em;
    font-weight: 600;

    &>.date {
        font-size: 0.8em;
        color: #aaa;
    }
`;

const CommentContent = styled.p`
    padding: 0.5em;
    margin: 0;
`;

const ToolBox = styled.div`
    width: 100%;
    font-size: 0.9em;
    font-weight: 600;
    padding: 0.5em;
    float: right;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    &>a {
        color: transparent;
        text-decoration: none;
        margin-left: 0.5em;
    }

    &:hover {
        &>a {
            color: red;
            text-decoration: none;
            margin-left: 0.5em;
        }
    }
`;

export default Comment;

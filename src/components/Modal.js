import React, { useCallback, useState } from "react";
import styled from "styled-components";

import lang from "../lang/lang";
import { useTranslation } from "react-i18next";
import { resetCookie, setAdult } from "../hooks/cookie";
import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "ThemeProvider";
import { faEdit, faGear, faInfo, faInfoCircle, faKey, faList, faMoon, faPlusSquare, faShuffle, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardList from "./CardList";
import { Title } from "./Card/styles/Title";
import Tip from "./globals/Tip";
import Button from "./globals/Button";
import { Input, TextArea } from "./globals/Input";
import HorizontalRule from "./globals/HorizontalRule";
import { useMediaQuery } from "react-responsive";


export function useScrollLock() {
    let scrollPosition = 0;

    const lockScroll = useCallback(() => {
        scrollPosition = window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    }, []);

    const unlockScroll = useCallback(() => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
    }, [])

    return [lockScroll, unlockScroll];
}

export const SettingModal = ({ onClose }) => {
    const { t } = useTranslation();
    const [cache, setCache] = useState(false);

    const [lockScroll, unlockScroll] = useScrollLock();

    const mobile = useMediaQuery({query: "(max-width: 768px)"})

    lockScroll();

    const handleClose = () => {
        unlockScroll();
        onClose(false);
    }

    const handleCache = () => {
        resetCookie();
        unlockScroll();
        onClose(true);
    }

    const handleCacheClose = () => {
        unlockScroll();
        setCache(false);
    }


    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle>{cache ? <><span role="img" aria-label="cleaning">🧹</span> {t("setting.cookie.process.title")}</> : <><span role="img" aria-label="settings">⚙️</span> {t("setting.title")}</>}</ModalTitle>
                    {
                        cache ? <strong>{t("setting.cookie.process.content")}</strong> : (
                            <>
                                <HorizontalRule />
                                <OptionWrapper>
                                    <OptionItem>
                                        <Title>{t("setting.section.cookie.title")}</Title>
                                        <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.cookie.content")}</Tip>
                                        <Button margin="0.25em 0" onClick={() => setCache(true)} danger>{t("setting.section.cookie.button")}</Button>
                                    </OptionItem>
                                </OptionWrapper>
                                <HorizontalRule />
                                {
                                    mobile ? (
                                        <OptionWrapper>
                                            <OptionItem>
                                                <Title>{t("setting.section.language.korean.title")}</Title>
                                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.language.korean.content")}</Tip>
                                                <Button margin="0.25em 0" disabled={t("root.lang") === 'ko'} onClick={() => {
                                                    lang.changeLanguage('ko');
                                                    window.location.reload();
                                                }} primary>{t("setting.section.language.korean.button")}</Button>
                                                <Title>{t("setting.section.language.japaness.title")}</Title>
                                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.language.japaness.content")}</Tip>
                                                <Button margin="0.25em 0" disabled={t("root.lang") === 'ja'} onClick={() => {
                                                    lang.changeLanguage('ja');
                                                    window.location.reload();
                                                }} primary>{t("setting.section.language.japaness.button")}</Button>
                                                <Title>{t("setting.section.language.english.title")}</Title>
                                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.language.english.content")}</Tip>
                                                <Button margin="0.25em 0" disabled={t("root.lang") === 'en'} onClick={() => {
                                                    lang.changeLanguage('en');
                                                    window.location.reload();
                                                }} primary>{t("setting.section.language.english.button")}</Button>
                                            </OptionItem>
                                        </OptionWrapper>
                                    ) : (
                                        <OptionWrapper>
                                            <OptionItem>
                                                <Title>{t("setting.section.language.korean.title")}</Title>
                                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.language.korean.content")}</Tip>
                                                <Button margin="0.25em 0" disabled={t("root.lang") === 'ko'} onClick={() => {
                                                    lang.changeLanguage('ko');
                                                    window.location.reload();
                                                }} primary>{t("setting.section.language.korean.button")}</Button>
                                            </OptionItem>
                                            <OptionItem>
                                                <Title>{t("setting.section.language.japaness.title")}</Title>
                                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.language.japaness.content")}</Tip>
                                                <Button margin="0.25em 0" disabled={t("root.lang") === 'ja'} onClick={() => {
                                                    lang.changeLanguage('ja');
                                                    window.location.reload();
                                                }} primary>{t("setting.section.language.japaness.button")}</Button>
                                            </OptionItem>
                                            <OptionItem>
                                                <Title>{t("setting.section.language.english.title")}</Title>
                                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("setting.section.language.english.content")}</Tip>
                                                <Button margin="0.25em 0" disabled={t("root.lang") === 'en'} onClick={() => {
                                                    lang.changeLanguage('en');
                                                    window.location.reload();
                                                }} primary>{t("setting.section.language.english.button")}</Button>
                                            </OptionItem>
                                        </OptionWrapper>
                                    )
                                }
                            </>
                        )
                    }
                </ModalContent>
                <ModalFooter>
                    {
                        cache ? (
                            <>
                                <ModalButton onClick={handleCache} danger>{t("setting.cookie.process.process")}</ModalButton>
                                <ModalButton onClick={handleCacheClose}>{t("setting.cookie.process.close")}</ModalButton>
                            </>
                        ) : <ModalButton onClick={handleClose} primary>{t("modal.button.close")}</ModalButton>
                    }
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    );
};

export const AdultModal = ({ onClose }) => {
    let navigate = useNavigate();

    const { t } = useTranslation();
    const [lockScroll, unlockScroll] = useScrollLock();

    lockScroll();

    const handleYes = () => {
        unlockScroll();
        onClose();
        setAdult(true);
    }
    
    const handleClose = () => {
        unlockScroll();
        navigate(-1);
    }
    
    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle><span role="img" aria-label="handsUp">✋</span> {t("modal.adult.title")}</ModalTitle> 
                    <p>{t("modal.adult.content")}</p> 
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleClose} danger>{t("modal.adult.button.no")}</ModalButton>
                    <ModalButton onClick={handleYes} success>{t("modal.adult.button.yes")}</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    );
}

export const ViewModal = ({ onClose, children }) => {

    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    }

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    { children }
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleClose} primary>{t("modal.button.close")}</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    );
}

const SearchInput = styled.input`
    width: 100%;
    height: 3em;
    border: 0;
    border-radius: 5em;
    font-size: 1em;
    padding: 0 2em;
    margin-bottom: 1.2em;
    outline: none;
    background-color: var(--bg);
    border: solid 0.15em var(--border);
    box-sizing: border-box;
    font-family: 'fontawesome';
    color: var(--text);
`;

export const AddArticleCollection = ({ onClose, collection }) => {
    const [search, setSearch] = React.useState(null);
    const [lockScroll, unlockScroll] = useScrollLock();
    const { t } = useTranslation();

    const [modified, setModified] = React.useState(collection.articles.map((article) => article.article_id));

    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);

    lockScroll();

    const handleOk = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/collection/edit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                collection_id: collection.id,
                article_id: modified,
                password: password,
            }),
        });
        unlockScroll();
        onClose(true);
    }

    const handleClose = () => {
        unlockScroll();
        onClose(false);
    }

    const handleSearch = async (e) => {
        if (!e.target.value || e.target.value.length < 2) {
            setSearch(null);
            return;
        }
        
        const query = await fetch(`${process.env.REACT_APP_SERVER}/api/v2/search/article?keyword=${e.target.value}`);
        const data = await query.json();
        setSearch(<>
            {data.data.length > 5 && <span><FontAwesomeIcon icon={faInfoCircle} /> {t("collection.modal.section.search.tooMany", {articleLength: data.data.length})}</span>}
            {data.data.length === 0 ? <p>{t("collection.modal.section.search.noResult")}</p> : <CardList articles={data.data.slice(0, 5)} override={handleAdd} mobile />}            
        </>);
    }

    const handleRemove = (e, id) => {
        e.preventDefault();

        setModified((prevModified) => prevModified.filter((article_id) => article_id !== id));
        
    }

    const handleAdd = (e, id) => {
        e.preventDefault();
        // 중복 검사
        if (modified.includes(id)) {
            alert(t("collection.modal.error.alreadyExist"));
            return;
        }
        setModified([...modified, id]);
        setSearch(null);
      };

    const handlePassword = async (e) => {
        e.preventDefault();
        setDisabled(true);
        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/collection/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: collection.id,
                password: e.target.password.value,
            }),
        })
        .then((res) => {
            if (res.status === 200) {
                setDisabled(false);
                return res.json();
            } else {
                alert("Password didn't match");
                setDisabled(false);
                return;
            }
        }).then((data) => {
            if (data.message.auth) {
                setPassword(e.target.password.value)
                return;
            }
        });
    }

    const prevData = (<CardList articleIds={modified} override={handleRemove} mobile />);

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle><FontAwesomeIcon icon={faPlusSquare} /> {t("collection.modal.title", {name: collection.name})}</ModalTitle>
                    { password && <SearchInput type="text" placeholder={t("collection.modal.section.article.placeholder")} onChange={handleSearch} />}
                    {
                        !password ? (
                            <>
                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("collection.modal.section.password.info")}</Tip>
                                <PasswordForm onSubmit={handlePassword}>
                                    <Input type="password" name="password" placeholder={t("collection.modal.section.password.placeholder")} />
                                    <Button margin="0 0 0 0.5em" disabled={disabled} primary>{t("collection.modal.section.password.submit")}</Button>
                                </PasswordForm>
                            </>
                        ) : search ? (
                            <>
                                <Title>{t("collection.modal.section.search.title")}</Title>
                                {search}
                            </>
                        ) : (
                            <>
                                <Title>{t("collection.modal.section.article.title")}</Title>
                                <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("collection.modal.section.article.info")}</Tip>
                                {prevData}
                            </>
                        )
                    }
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleClose} danger>{t("modal.button.no")}</ModalButton>
                    { password && <ModalButton onClick={handleOk} primary>{t("modal.button.apply")}</ModalButton>}
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    )
}

const SubmitButton = styled.button`
    border: 0;
    outline: 0;
    padding: 0.75em;
    width: 100%;
    height: 3em;
    margin: 1em 0;
    font-size: 1em;
    border-radius: 1em;
    box-sizing: border-box;
    background-color: var(--primary);
    color: var(--white);
    cursor: pointer;
    transition: 0.2s;
    &:hover {
        filter: brightness(0.8);
        color: var(--white);
    }
`;

export const EditCollection = ({ onClose, collection }) => {
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);

    const { t } = useTranslation();

    const handleClose = () => {
        onClose(false);
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        setDisabled(true);
        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/collection/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: collection.id,
                password: e.target.password.value,
            }),
        })
        .then((res) => {
            if (res.status === 200) {
                setDisabled(false);
                return res.json();
            } else {
                alert("Password didn't match");
                setDisabled(false);
                return;
            }
        }).then((data) => {
            if (data.message.auth) {
                setPassword(e.target.password.value)
                return;
            }
        });
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/collection/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: collection.id,
                name: e.target[0].value,
                description: e.target[1].value,
                password: password,
            })
        }).then((res) => {
            if (res.status === 200) {
                setDisabled(false);
                return res.json();
            } else {
                alert("오류");
                setDisabled(false);
            }
        }).then((data) => {
            alert("수정되었습니다.");
            window.location.reload();
        }).catch((err) => {
            alert("오류");
            setDisabled(false);
        });
    }

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle><FontAwesomeIcon icon={faEdit} /> {collection.name} 수정</ModalTitle>
                    { !password ? (
                        <>
                            <Tip><FontAwesomeIcon icon={faInfoCircle} /> {t("collection.modal.section.password.info")}</Tip>
                            <PasswordForm onSubmit={handlePassword}>
                                <Input type="password" name="password" placeholder="비밀번호" />
                                <Button margin="0 0 0 0.5em" disabled={disabled} primary>제출</Button>
                            </PasswordForm>
                        </>
                    ) : (
                        <form onSubmit={handleEdit}>
                            <Tip>수정할 컬렉션의 이름</Tip>
                            <Input type="text" placeholder="컬렉션의 이름" defaultValue={collection.name} />
                            <Tip>수정할 컬렉션의 설명</Tip>
                            <TextArea placeholder="컬렉션의 설명" defaultValue={collection.description} />
                            <SubmitButton disabled={disabled} primary>제출</SubmitButton>
                        </form>
                    )}
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleClose} danger>{t("modal.button.no")}</ModalButton>
                    { password && <ModalButton onClick={() => onClose(password)} primary>{t("modal.button.apply")}</ModalButton>}
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    )
}


export const ErrorModal = ({ onClose, children }) => {
    let navigate = useNavigate();

    const { t } = useTranslation();

    const handleOk = () => {
        onClose();
    }

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle><span role="img" aria-label="siren">🚨</span> {t("modal.error.title")}</ModalTitle>
                    {children}
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleOk} danger>확인</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    );
}

export const WarningModal = ({ onClose }) => {
    let navigate = useNavigate();

    const handleOk = () => {
        onClose();
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle><span role="img" aria-label="handsUp">💀</span> 주의!</ModalTitle>
                    <p>본 작품은 개인에 따라 호불호가 갈릴 수 있는 내용을 담고 있습니다.</p>
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleOk} danger>계속</ModalButton>
                    <ModalButton onClick={handleBack}>뒤로 가기</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    );
}

export const FooterMoreModal = ({ onClose }) => {

    const [themeMode, toggleTheme] = useTheme();
    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    }

    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle>{t("nav.more")}</ModalTitle>
                    <MoreItem onClick={toggleTheme}>
                        {themeMode === 'dark' ? 
                            <><FontAwesomeIcon icon={faSun} />{t("nav.light")}</>
                            :
                            <><FontAwesomeIcon icon={faMoon} />{t("nav.dark")}</>
                        }
                    </MoreItem>
                    <MoreItem to="/random" onClick={handleClose}>
                        <FontAwesomeIcon icon={faShuffle} /> {t("nav.random")}
                    </MoreItem>
                    <MoreItem to="/collection/create" onClick={handleClose}>
                        <FontAwesomeIcon icon={faPlusSquare} /> {t("nav.collection")}
                    </MoreItem>
                    <MoreItem onClick={() => {
                        onClose(true);
                    }}>
                        <FontAwesomeIcon icon={faGear} /> {t("nav.setting")}
                    </MoreItem>
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleClose} danger>{t("modal.button.no")}</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    )

}



export const CommentWriteModal = ({ onClose, articleId }) => {

    const { t } = useTranslation();

    const [disabled, setDisabled] = React.useState(false);
    
    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();

        const formData = new FormData(event.target);

        const password = formData.get('password');
        const content = formData.get('content');
        const author = formData.get('nickname');

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
                    onClose(true);
                } else {
                    alert(t("comment.write.fail"));
                }
            });
        setDisabled(false);
    }

    const handleClose = () => {
        onClose();
    }


    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle>댓글 작성</ModalTitle>
                    <form onSubmit={handleSubmit}>
                        <Content><FontAwesomeIcon icon={faUser} /> {t("comment.author")}</Content>
                        <Input type="text" name="nickname" placeholder={t("comment.author")} />
                        <Content><FontAwesomeIcon icon={faKey} /> {t("comment.password")}</Content>
                        <Input type="password" name="password" placeholder={t("comment.password")} />
                        <Content><FontAwesomeIcon icon={faList} /> 내용</Content>
                        <TextArea name="content" placeholder={t("comment.placeholder", {article: "「" + document.title + "」"})} />
                        <Button margin="0.5em 0" disabled={disabled} full primary>{t("comment.button.submit")}</Button>
                    </form>
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={handleClose} danger>{t("modal.button.no")}</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    )
}

export const CommentDeleteModal = ({ onSuccess, onFail, onClose, article_id, comment_id, author, content }) => {

    const handleSuccess = () => {
        onClose();
        onSuccess();
    }

    const handleFail = () => {
        onClose();
        onFail();
    }

    const handleClose = () => {
        onClose();
    }

    const processDelete = async () => {
        const password = document.getElementById("password").value;
        await fetch(`${process.env.REACT_APP_SERVER}/api/v2/comment/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                article_id: article_id,
                comment_id: comment_id,
                password: password,
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.success === true) {
                    handleSuccess();
                } else {
                    handleFail();
                }
            }
        );   
    }
    
    return (
        <ModalOverlay>
            <ModalWrapper>
                <ModalContent>
                    <ModalTitle><span role="img" aria-label="siren">🚨</span> 정말 댓글을 삭제하시겠습니까?</ModalTitle>
                    <p>삭제된 댓글은 복구할 수 없습니다.</p>
                    <CommentWrapper>
                        <CommentAuthor>{author}</CommentAuthor>
                        <CommentContent>{content}</CommentContent>
                    </CommentWrapper>
                    <p>정말 삭제를 진행하실려면 비밀번호를 입력해 주세요.</p>
                    <InputWrapper>
                        <Input type="password" id="password" placeholder="비밀번호를 입력해 주세요." required />
                    </InputWrapper>
                </ModalContent>
                <ModalFooter>
                    <ModalButton onClick={processDelete} danger>삭제</ModalButton>
                    <ModalButton onClick={handleClose} primary>취소</ModalButton>
                </ModalFooter>
            </ModalWrapper>
        </ModalOverlay>
    );
}

const PasswordForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
`;

const ModalOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;

    overflow-y: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    
    z-index: 999;
`;

const Content = styled.span`
    color: var(--text);
    font-size: 0.9em;
`

const ModalWrapper = styled.div`
    width: 600px;

    @media (max-width: 768px) {
        width: 90%;
    }

    height: fit-content;
    overflow-y: auto;
    border-radius: 0.8em;
    background-color: var(--navbar);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const OptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const OptionItem = styled.div`
    display: flex;
    width: 100%;
    min-height: 10em;
    justify-content: center;
    flex-direction: column;
    padding: 1em;
    margin: 0.5em;
    font-size: 1em;
    color: var(--text);
    border: solid 0.15em var(--border);
    background-color: var(--bg);
    border-radius: 1em;
    text-decoration: none;
`;


const ModalTitle = styled.h2`
    font-size: 1.5em;
    color: var(--text);
`;

const ModalContent = styled.div`
    padding: 1.5em 1.5em 0.5em 1.5em;
    color: var(--text);
`;

const MoreItem = styled(Link)`
    display: flex;
    flex-direction: row;
    padding: 1em 1em;
    margin-bottom: 0.5em;
    font-size: 1em;
    color: var(--text);
    border: solid 0.15em var(--border);
    background-color: var(--bg);
    border-radius: 1em;
    text-decoration: none;
    cursor: pointer;

    &>svg {
        margin-right: 0.5em;
    }
`;


const ModalFooter = styled.div`
    padding: 0.5em;
    text-align: right;
`;

const ModalButton = styled.button`
    padding: 0.5em 1em;
    font-weight: 600;
    font-size: 1em;
    border-radius: 0.5em;
    border: solid 0.15em ${props => {
        if (props.success) return "var(--success)";
        if (props.danger) return "var(--danger)";
        if (props.primary) return "var(--primary)";
        return "var(--gray)";
    }};;
    color: ${props => {
        if (props.success) return "var(--success)";
        if (props.danger) return "var(--danger)";
        if (props.primary) return "var(--primary)";
        return "var(--gray)";
    }};;
    margin: 0.5em;
    background-color: transparent;

    &:hover {
        cursor: pointer;
        background-color: ${props => {
            if (props.success) return "var(--success)";
            if (props.danger) return "var(--danger)";
            if (props.primary) return "var(--primary)";
            return "var(--gray)";
        }};;
        color: #fff;

    };
`;

const CommentWrapper = styled.div`
    margin: 1em 0;
    padding: 1em;
    border-radius: 0.5em;
    color: var(--text);
    border: solid 0.15em var(--border);
    background-color: var(--bg);
`;

const InputWrapper = styled.div`
    margin: 1em 0;
`;

const CommentAuthor = styled.div`
    font-weight: 600;
    font-size: 1.2em;
    color: var(--text);
`;

const CommentContent = styled.div`
    margin-top: 0.5em;
    font-size: 1em;
`;

const CommentPassword = styled.input`
    width: 100%;
    padding: 1em;
    border-radius: 0.5em;
    border: solid 0.15em var(--border);
    box-sizing : border-box;
    background-color: var(--bg);
    
    &::placeholder {
        color: var(--text);
    }

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: text;
    }

    &::placeholder {
        color: var(--text);
    }
    color: var(--text);
`;
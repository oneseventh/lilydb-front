import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";

import Loading from "view/Loading";
import Error from "components/Error";
import { Title } from "components/Card/styles/Title";
import CardList from "components/CardList";
import AuthorCard from "components/recycle/AuthorCard";
import HorizontalRule from "components/globals/HorizontalRule";
import Osusume from "components/Card/Osusume";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


const AddArticle = React.lazy(() => import("components/Modal").then(mod => ({ default: mod.AddArticleCollection })));
const EditModal = React.lazy(() => import("components/Modal").then(mod => ({ default: mod.EditCollection })));
const ErrorModal = React.lazy(() => import("components/Modal").then(mod => ({ default: mod.ErrorModal })));

function Footer({ collection }) {

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <Loading />;
    if (error) return <Wrapper><Error error={error} /></Wrapper>;

    return (
        <>
            <Suspense fallback={<Loading />}>
                { addModal && <AddArticle collection={collection} onClose={(render = false) => {
                    setAddModal(false);
                    if (render) {
                        window.location.reload();
                    }
                }} /> }

                { editModal && <EditModal collection={collection} onClose={(render = false) => {
                    setEditModal(false);
                    if (render) {
                        window.location.reload();
                    }
                }} /> }

                { errorModal && <ErrorModal onClose={() => {
                    setErrorModal(false);
                }}>
                    {t("collection.error.notSupport")}
                </ErrorModal> }
            </Suspense>
            <Wrapper>
                <AnchorWrapper>
                    <Anchor onClick={() => setAddModal(true)}>
                        <FontAwesomeIcon icon={faAdd} /> {t("collection.anchor.add")}
                    </Anchor>
                    <Anchor onClick={() => setEditModal(true)}>
                        <FontAwesomeIcon icon={faEdit} /> {t("collection.anchor.edit")}
                    </Anchor>
                    <Anchor onClick={() => setErrorModal(true)}>
                        <FontAwesomeIcon icon={faTrash} /> {t("collection.anchor.delete")}
                    </Anchor>
                </AnchorWrapper>
                <br />
                <Title>{t("collection.title.registered")}</Title>
                <CardList articles={collection.articles} />
                {
                    collection.articles.length > 0 && (
                        <>
                            <Title>{t("collection.title.author")}</Title>
                            <AuthorCard author={collection.authors} />
                        </>
                    )
                }
                <HorizontalRule />
                <Osusume parameter={
                    "&" + collection.articles.map((item) => {
                        return "id=" + item.article_id;
                    }).join("&")
                } title={t("collection.title.recommend")}>
                    <span style={{color: "var(--link)", fontSize: "0.75em"}}><FontAwesomeIcon icon={faInfoCircle} /> {t("collection.section.recommend.info")}</span>
                </Osusume>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: calc(100% - 3em);
    margin: 1.5em;
`;

const Anchor = styled.span`
    color: var(--link);
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9em;

    margin-right: 0.75em;
    &>svg {
        margin-right: 0.25em;
    }
`;

const AnchorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 1em 0;
`;

export default Footer;
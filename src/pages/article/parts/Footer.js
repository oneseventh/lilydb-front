import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faFlag } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import CardList from "../../../components/CardList";

import Loading from "view/Loading";
import Error from "components/Error";
import Osusume from "components/Card/Osusume";
import HorizontalRule from "components/globals/HorizontalRule";
import { Title } from "components/globals/Title";
import Advertisement from "components/Advertisement";

function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
    return array;
}


function Footer({ id, series, anthology, author }) {

    const { t } = useTranslation();

    const [anthologys, setAnthology] = useState(null);
    const [seriess, setSeries] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [single, setSingle] = useState(false);

    const [singleArticleIds, setSingleArticleIds] = useState([]);
    const [normalArticleIds, setNormalArticleIds] = useState([]);

    const [comments, setComments] = useState(null);

    const Comment = React.lazy(() => import('../../../components/Article/Comments'));

    const handleCategory = () => {
        setSingle(!single);
    };

    useEffect(() => {
        const fetchOtherArticles = async (author) => {
            const authorNames = author.map(item => `author=${item.name}`).join('&');
            
            if (!authorNames) {
                return { singleArticleIds: [], normalArticleIds: [] };
            }
            
            try {
                const [singleResponse, normalResponse] = await Promise.all([
                    fetch(`${process.env.REACT_APP_SERVER}/api/v2/search/authors?${authorNames}&single=true`),
                    fetch(`${process.env.REACT_APP_SERVER}/api/v2/search/authors?${authorNames}`)
                ]);

                const [singleData, normalData] = await Promise.all([singleResponse.json(), normalResponse.json()]);
            
                const anthologyList = anthology?.anthologys?.map(item => item.article_id) ?? [];

                const seriesList = series?.series?.map(item => item.article_id) ?? [];

                const singleArticleIdsFiltered = singleData.data.filter(item =>
                    item.article_id !== parseInt(id) && !anthologyList.includes(item.article_id) && !seriesList.includes(item.article_id)
                );

                const normalArticleIdsFiltered = normalData.data.filter(item => item.article_id !== parseInt(id));

                return { singleArticleIds: singleArticleIdsFiltered, normalArticleIds: normalArticleIdsFiltered };
            } catch (error) {
                setError(error);
                return { singleArticleIds: [], normalArticleIds: [] };
            }
        };
          

        const fetchAnthology = async (anthology) => {
            if (anthology == null) {
                return null;
            } 

            setAnthology(
                <CardList title={t("title.included")} articles={anthology.anthologys} />
            );
        }

        const fetchSeries = async (series) => {
            if (series == null) {
                return null;
            }

            setSeries(
                <CardList title={t("article.series.title", {"series": series.series_name})} articles={series.series} />
            );
        }

        const fetchData = async () => {
            if (anthology != null) {
                fetchAnthology(anthology);
            }
            if (series != null) {
                fetchSeries(series);
            }

            const { singleArticleIds, normalArticleIds } = await fetchOtherArticles(author);

            setSingleArticleIds(shuffle(singleArticleIds));
            setNormalArticleIds(shuffle(normalArticleIds));

            setComments(<Comment articleId={id} />);
            setLoading(false);
        };

        fetchData();
    }, [anthology, series, author, id]);

    const OtherArticle = () => {
        if (singleArticleIds.length === 0 && normalArticleIds.length === 0) {
            return null;
        }

        return (
            <>
                <CardList title={
                    author.length === 1 ? (
                        t("title.other", { name: t("root.lang") === "ja" ? author[0].original_name ? author[0].original_name.split(",")[0] : author[0].name : author[0].name })
                    ) : (
                        t("title.other", { name: t("author.multi") })
                    )
                } articles={single ? singleArticleIds : normalArticleIds}>
                    <Category active={!single && 'active'} onClick={handleCategory}>
                        {t("card.button.general")}
                    </Category>
                    <Category active={single && 'active'} onClick={handleCategory}>
                        {t("card.button.single")}
                    </Category>
                </CardList>
            </>
        );
    };

    if (error) return <DetailWrapper><Error error={error} /></DetailWrapper>;
    if (loading) return <Loading />;

    return (
        <DetailWrapper>
            <Section>
                <AnchorWrapper>
                    <Anchor href="https://forms.gle/A8fVR9ecvU7eWKYd7">
                        <FontAwesomeIcon icon={faFlag} /> {t("article.anchor.report")}
                    </Anchor>
                    {/* <Anchor href="#info" onClick={anchorClick}>
                        <FontAwesomeIcon icon={faAngleDown} /> {t("article.anchor.about")}
                    </Anchor> */}
                    <Anchor href="#comments" onClick={anchorClick}>
                        <FontAwesomeIcon icon={faAngleDown} /> {t("article.anchor.comment")}
                    </Anchor>
                </AnchorWrapper>
            </Section>
            <Section>
                <Advertisement />
            </Section>
            <OtherArticle />
            {
                anthology !== null && <Section>{anthologys}</Section>
            }
            {
                seriess !== null && <Section>{seriess}</Section>
            }
            {
                anthology !== null || seriess !== null && (
                    <Section>
                        <Advertisement />
                    </Section>
                )
            }
            <Section>
                <Title id="comments" medium>{t("comment.title")}</Title>
                {comments}
            </Section>
            <HorizontalRule />
            <Section>
                <Osusume parameter={"&id=" + id} title={t("title.recommend")}/>
            </Section>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    width: calc(100% - 3em);
    margin: 1.5em;
`;

const Section = styled.div`
    margin: 1.5em 0;
`;

const Anchor = styled.a`
    color: var(--link);
    text-decoration: none;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 0.85em;
    }

    margin-right: 0.5em;

    &>svg {
        margin-right: 0.5em;
    }
`;

const AnchorWrapper = styled.div`
    width: 100%;
    margin: 1.5em 0;
`;

const Category = styled.button`
    display: inline-block;
    color: var(--text);
    text-decoration: none;
    padding: 0.4em;
    min-width: 5em;
    border: 0.15em solid var(--border);
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    border-radius: 1em;
    margin: 0 0.5em 0.5em 0;
    font-size: 0.8em;
    @media (max-width: 768px) {
        font-size: 0.7em;
    }
    background-color: var(--bg);
    ${(props) => {
        if (props.active) {
            return `color: white; background-color: var(--primary); border: 0.15em solid var(--primary);`;
        }
    }})
`;

const anchorClick = (e) => {
    e.preventDefault();
    let data = (e.target).hash;
    const matched = document.querySelector(data);

    matched.scrollIntoView({behavior: "smooth"});
};

export default Footer;
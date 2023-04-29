import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";

import NoSearch from "../NoSearch";
import { Title } from "components/Card/styles/Title";
import TopSearch from "components/Search/TopSearch";
import CardList from "components/CardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faInfoCircle, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import TagCard from "components/recycle/TagCard";
import AuthorCard from "components/recycle/AuthorCard";
import HorizontalRule from "components/globals/HorizontalRule";
import CollectionCard from "components/recycle/CollectionCard";
import Error from "components/Error";
import MetaTag from "SEOMeta";
import Tip from "components/globals/Tip";

function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
    return array;
}

function Search() {
    const [search, setSearch] = useState(null);
    const [articleSearch, setArticleSearch] = useState(null);
    const [tagSearch, setTagSearch] = useState(null);
    const [authorSearch, setAuthorSearch] = useState(null);
    const [collectionSearch, setCollectionSearch] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const isDesktopOrMobile = !useMediaQuery({query: '(max-width:1000px)'});

    const [noSearch] = useState(<NoSearch />);

    const [metaTag, setMetaTag] = useState(null);
    const [articles, setArticles] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [collections, setCollections] = useState(null);
    const [tags, setTags] = useState(null);

    const [fold, setFold] = useState(false);

    const { t } = useTranslation();

    let searchTimer = null;

    const handleFoldClick = useCallback(() => {
        setFold(!fold);
    }, [fold]);

    const handleSearch = async (e) => {

        const keyword = e.target.value;

        if (keyword.length < 2) {
            setSearch(null);
            setArticleSearch(null);
            setAuthorSearch(null);
            setCollectionSearch(null);
            setTagSearch(null);
            return;
        }
    
        clearTimeout(searchTimer);
        searchTimer = setTimeout(async () => {
            try {
                const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    
                const response = await fetch(`${process.env.REACT_APP_SERVER}/api/v2/search/?keyword=${keyword.replace(reg, '')}`);
                const data = await response.json();
            
                if (data.message.article_count === 0 && data.message.author_count === 0 && data.message.collection_count === 0) {
                    setSearch(null);
                    setArticleSearch(null);
                    setAuthorSearch(null);
                    setCollectionSearch(null);
                    setTagSearch(null);
                } else {
                    setMetaTag(<MetaTag title={t("meta.title.search", {keyword: keyword})} />);
                    if (data.message.article_count !== 0) {
                        setArticles(shuffle(data.data.articles));
                        if (data.message.tag_count > 0) {
                            setTags(data.data.include_tags);
                        }
                        
                        setFold(false);
                    } else {
                        setArticles(null);
                        setTags(null);
                    }
            
                    if (data.message.author_count !== 0) {
                        setAuthors(shuffle(data.data.authors));
                    } else {
                        setAuthors(null);
                    }
            
                    if (data.message.collection_count !== 0) {
                        setCollections(shuffle(data.data.collections));
                    } else {
                        setCollections(null);
                    }
                }
            } catch (error) {
                setError(error);
            }
        }, 250);
    };      

    useEffect(() => {
        const renderArticleResult = () => {
            if (!articles) {
                return;
            }

            const articleLength = articles.length;
            const isTopArticleVisible = isDesktopOrMobile && !fold;

            const topArticleProps = {
                id: articles[0].article_id,
                title: articles[0].title,
                original: articles[0].original_title,
                author: articles[0].author,
                warning: articles[0].warning,
                release: articles[0].is_release,
                type: articles[0].content_type,
                image: articles[0].image,
            }
            
            const cardList = 
                isDesktopOrMobile ?
                    articleLength > 1 ?
                        !fold ? (
                            <CardList articles={articles.slice(1)} />
                        ) : (
                            <div><CardList articles={articles} inline={true}/></div>
                        )
                    : null
                :
                    !fold ? (
                        <CardList articles={articles.slice(0, 5)} mobile={true}/>
                    ) : (
                        <div><CardList articles={articles} mobile={true}/></div>
                    )

            setArticleSearch(
                <>
                    <Title>{t("search.title.articles")}</Title>
                    {
                        articleLength > 5 && <Tip><FontAwesomeIcon icon={faInfoCircle} />{t("search.tooMany", {"articleLength": articleLength})}</Tip>
                    }
                    <ArticleResultWrapper>
                        {isTopArticleVisible && (
                            <div>
                                <TopSearch {...topArticleProps} />
                            </div>
                        )}

                        <ArticleWrapper mobile={isDesktopOrMobile ? fold ? true : false : true}>
                            <Fold onClick={handleFoldClick}>
                                {articleLength > 1 ? (
                                fold ? (
                                    <><FontAwesomeIcon icon={faAngleUp} /> {t("card.button.fold.close")}</>
                                ) : (
                                    <><FontAwesomeIcon icon={faAngleDown} /> {t("card.button.fold.open")}</>
                                )
                                ) : null}
                            </Fold>
                            {cardList}
                        </ArticleWrapper>
                    </ArticleResultWrapper>
                </>
            )

            setSearch([]);
        };


        const renderIncludeTagResult = () => {
            if (!tags) {
                return;
            }
            
            setTagSearch(
                <ResultWrapper>
                    <Title>{t("search.title.tags")}</Title>
                    <CardWrapper>
                        {
                            tags.map((tag, index) => {
                                return <TagCard key={index} name={tag.tag_name} color={tag.color} />
                            })
                        }
                    </CardWrapper>
                </ResultWrapper>
            )

            setSearch([]);
        };

        const renderAuthorResult = () => {
            if (!authors) {
                return;
            }

            setAuthorSearch(
                <ResultWrapper>
                    <Title>{t("search.title.authors")}</Title>
                    <CardWrapper>
                        <AuthorCard author={authors} />
                    </CardWrapper>
                </ResultWrapper>
            )

            setSearch([]);
        };

        const renderCollectionResult = () => {
            if (!collections) {
                return;
            }

            setCollectionSearch(
                <ResultWrapper>
                    <Title>{t("search.title.collections")}</Title>
                    <CardWrapper>
                        <CollectionCard collection={collections} />
                    </CardWrapper>
                </ResultWrapper>
            )

            setSearch([]);
        };

        renderArticleResult();
        renderIncludeTagResult();
        renderAuthorResult();
        renderCollectionResult();
        setLoading(false);
    }, [articles, tags, authors, collections, fold, isDesktopOrMobile, handleFoldClick, t]);

    useEffect(() => {
        setSearch(null);
    }, []);

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            {metaTag}
            <Wrapper>
                <SearchBox>
                    <SearchIcon>
                    <FontAwesomeIcon icon={faSearch} />
                    </SearchIcon>
                    <SearchInput type="text" placeholder={t("search.placeholder")} onChange={handleSearch} />
                </SearchBox>
                <SearchWrapper>
                    {loading ? <span style={{color: "var(--text)"}}>Fetching</span> : (
                        search ? (
                            <>
                                <Title>{t("search.title.result", {count: articles ? articles.length : 0 + authors ? authors.length : 0 + collections ? collections.length : 0})}</Title>
                                <Tip>
                                    <span>원하시는 작품이 없으신가요? </span>
                                    <a href="https://forms.gle/A8fVR9ecvU7eWKYd7">
                                        <FontAwesomeIcon icon={faPlus}/> 추가 요청하기
                                    </a>
                                </Tip>
                                {articleSearch && <>
                                    <HorizontalRule />
                                    {articleSearch}
                                </>}
                                {tagSearch && <>
                                    <HorizontalRule />
                                    {tagSearch}
                                </>}
                                {authorSearch && <>
                                    <HorizontalRule />
                                    {authorSearch}
                                </>}
                                {collectionSearch && <>
                                    <HorizontalRule />
                                    {collectionSearch}
                                </>}
                            </>
                        ) : noSearch
                    )}
                </SearchWrapper>
            </Wrapper>
        </>
    );
}

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 0.5em;
`;

const SearchBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    overflow: hidden;

    width: 45em;

    @media (max-width: 768px) {
        min-width: 0;
        width: 100%;
    }

    height: 3em;
    border-radius: 5em;
    font-size: 1em;
    padding: 0 2em;
    margin-bottom: 2em;
    outline: none;
    background-color: var(--bg);
    border: solid 0.15em var(--border);
    font-family: 'fontawesome';
    color: var(--text);

    box-sizing: border-box;
`;

const SearchIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 0.5em;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 0;
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;

    outline: none;
    color: var(--text);
`;

const ArticleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    ${props => !props.mobile && `width: calc(100% - 30em - 1em);`}
    justify-content: center;
`;

const SearchWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const Fold = styled.span`
    font-size: 0.75em;
    color: var(--gtext);
    cursor: pointer;
`;

const Wrapper = styled.div`
    width: calc(100% - 3em);
    height: 100%;
    margin: 1.5em;
    overflow: hidden;
`;

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0;
`;

const ArticleResultWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    margin: 1.5em 0;
`;

export default Search;
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import { CardWrapper, MobileCardWrapper, InlineCardWrapper } from "./Card/styles/CardWrapper";
import Card from "./recycle/Card";
import Error from "./Error";
import MobileCard from "./recycle/MobileCard";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { Title } from "./globals/Title";
import useArticleList from "hooks/useArticleList";
import MobileAdCard from "./recycle/MobileAdCard";
import AdCard from "./recycle/AdCard";

function insertValueEveryNthIndex(arr, n, value) {
    const result = [];
  
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
    
        if (i % n === 0 && i >= n) {
            result.push(<React.Fragment key={`ad-${i}`}>{value}</React.Fragment>);
        }
    }
  
    return result;
}

function CardList({ title, articleIds, articles, like, children, image, inline, mobile, override, advertisement, osusume }) {

    const {article, isError} = useArticleList(articleIds)

    const { t } = useTranslation();

    const getNoArticleComponent = useCallback(() => {
        if (osusume) {
            return null;
        }
        return <NoArticle>{t("card.warning.noArticle")}</NoArticle>;
    }, []);

    const getCardList = useCallback((article) => {
        if (!article || article.length === 0) {
            return getNoArticleComponent();
        }
        
        let cards = article.map((item, index) => {
            const cardProps = {
                key: item.article_id,
                id: item.article_id,
                type: item.content_type,
                title: t("root.lang") === 'ja' ? 
                    item.original_title ? 
                        item.original_title 
                        : 
                        <><FontAwesomeIcon icon={faWarning} title={t("card.warning.noTranslate")} /> {item.title}</> 
                    : t("root.lang") === 'en' ? 
                        <><FontAwesomeIcon icon={faWarning} title={t("card.warning.noTranslate")} /> {item.title}</> 
                        : 
                        item.title,
                author: item.author,
                tags: item.tags,
                release: item.is_release === undefined ? true : item.is_release,
                warning: item.warning,
                like: like && like[index],
                fromSearch: true,
                center: item.center,
                image: image || item.image ? item.image ? item.image : image : null,
                inline: inline ? true : false,
            }

            if (override) {
                return mobile ? <MobileCard {...cardProps} override={override} /> : <Card {...cardProps} override={override} />
            }
            return mobile ? <MobileCard {...cardProps} /> : <Card {...cardProps} />
        })
        
        if (advertisement) {
            const adInterval = 8; // 광고를 삽입할 간격
            return insertValueEveryNthIndex(cards, adInterval, mobile ? <MobileAdCard /> : <AdCard />);
          }

        return cards;
    }, [getNoArticleComponent, like, image, inline, mobile])

    const cardList = useMemo(() => getCardList(articles ? articles : article), [article, articles, like, image, inline, mobile]);

    if (!articles && isError) {
        return (
            <Wrapper>
                {title && <Title midium>{title}</Title>}
                <CardWrapper>
                    <Error error={isError} />
                </CardWrapper>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {
                cardList ? (
                    <>
                        {title && <Title medium>{title}</Title>}
                        {children}
                        {mobile ?
                            <MobileCardWrapper>
                                {cardList}
                            </MobileCardWrapper>
                            :
                            inline ?
                            <InlineCardWrapper>
                                {cardList}
                            </InlineCardWrapper>
                            :
                            <CardWrapper>
                                {cardList}
                            </CardWrapper>
                        }
                    </>
                ) : null
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
`;

const NoArticle = styled.div`
    width: 100%;
    height: calc(100% - 0.15em);
    display: flex;
    padding: 3em 0;
    margin-top: 0.15em;
    justify-content: center;
    background-color: var(--bg);
    color: var(--text);
    border: 0.1em solid var(--border);
    box-sizing: border-box;
    border-radius: 0.75em;
    align-items: center;
    font-size: 1.5em;
    font-weight: 600;
`;

export default React.memo(CardList);
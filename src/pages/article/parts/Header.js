import React, { Suspense, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faCopy, faTag, faUserAlt } from "@fortawesome/free-solid-svg-icons";

import { t } from "i18next";
import MetaTag from "SEOMeta";

import { Cookies, Like, addArticle } from "../../../hooks/cookie";

import Footer from "./Footer";
import Badge from "components/globals/Badge";
import Button from "components/globals/Button";
import Loading from "view/Loading";

import * as Article from "../style"
import { WarningModal } from "components/Modal";
import getImage, { IMAGE } from "utils/getImage";

const Tags = ({ tags }) => {
    const tag = tags.map((item, index) => {
        return (
            <React.Fragment key={index}>
                {item.tag_name === "분류 안됨" ? (
                    <Badge
                        id={item.id}
                        color={item.color}
                        title={t("root.lang") === "ko" ? item.tag_name : t(`tags.${item.tag_name}`)}
                    >
                        <FontAwesomeIcon icon={faTag} />
                        {t("root.lang") === "ko" ? item.tag_name : t(`tags.${item.tag_name}`)}
                    </Badge>
                ) : (
                    <Article.TagLink
                        to={"/tags/" + item.tag_name}
                        title={`클릭 시 ${
                            t("root.lang") === "ko" ? item.tag_name : t(`tags.${item.tag_name}`)
                        } 태그가 포함된 작품을 조회합니다.`}
                        key={item.id}
                    >
                        <Badge id={item.id} color={item.color}>
                            <FontAwesomeIcon icon={faTag} />
                            {t("root.lang") === "ko" ? item.tag_name : t(`tags.${item.tag_name}`)}
                        </Badge>
                    </Article.TagLink>
                )}
            </React.Fragment>
        );
    });

    return <Article.TagWrapper key="tags">{tag}</Article.TagWrapper>;
};
  
const Author = ({ authors, mobile }) => {
    if (authors.length === 0) {
        return <Article.TagWrapper key="author"><Badge>
        <FontAwesomeIcon icon={faUserAlt} />
        {t("card.author.unknown")}
        </Badge></Article.TagWrapper>;
    }
    const author = authors.map((author, index) => (
        <Article.TagLink
            key={author.name + index}
            to={"/author/" + author.name}
            title={`클릭 시 ${author.name} 작가의 페이지로 이동합니다.`}
        >
            <Badge>
                <FontAwesomeIcon icon={faUserAlt} />
                {t("root.lang") === "ja"
                    ? author.original_name
                    ? author.original_name.split(",")[0]
                    : author.name
                    : author.name}
            </Badge>
        </Article.TagLink>
    ));

    if (authors.length > 2 && mobile) {
        author.splice(
            2,
            author.length - 2,
            <React.Fragment key="more">
                <Article.DetailButton>
                    <FontAwesomeIcon icon={faArrowDown} /> 더 보기
                </Article.DetailButton>
            </React.Fragment>
        );
    }

    return <Article.TagWrapper key="author">{author}</Article.TagWrapper>;
};
  

function Header({ article, mobile }) {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const [toggleDescription, setToggleDescription] = useState(false);

    const [footer, setFooter] = useState(null);
    
    const [description, setDescription] = useState(null);

    let fromSearch = null;
    const [thumbUrl, setThumbUrl] = useState(0);

    const [warning, setWarningOpen] = React.useState(false);

    const Vote = React.lazy(() => import('../../../components/Article/Vote'));

    useEffect(() => {
        try {
            fromSearch = location.state.search;
        } catch (e) { }

        if (!article) {
            return;
        }

        if (article.warning) {
            setWarningOpen(true);
        }

        setThumbUrl(article.anthology ? article.anthology.parent_article_id : article.article_id);

        setDescription(article.description === null ? t("article.description.default") : article.description);

        addArticle(Cookies.RECENT_SEEN_ARTICLE, article.article_id);

        if (fromSearch) {
            addArticle(Cookies.RECENT_SEARCH_ARTICLE, article.article_id);
        }

        const footerProps = { 
            id: article.article_id, 
            series: article.series, 
            anthology: article.anthology, 
            author: article.author
        };

        setLoading(false);
        setFooter(<Footer {...footerProps} />);
    }, [article]);

    if (loading) {
        if (!mobile) {
            return (
                <Article.InfoWrapper>
                    <Article.ImageContainer>
                        <Article.LoadingImageBox />
                    </Article.ImageContainer>
                    <Article.DetailContainer>
                        <Article.LoadingBadge />
                        <Article.LoadingTitle />
                        <Article.LoadingDescription />
                        <Article.LoadingTitle />
                    </Article.DetailContainer>
                </Article.InfoWrapper>
            )
        }
        return (
            <Loading />
        )
    }      

    const renderTitleItems = (article) => {
        const title = t("root.lang") === "ja" ? article.original_title ? article.original_title : article.title : article.title;
        const originalTitle = article.original_title && t("root.lang") === "ja" ? article.title : article.original_title;
    
        return (
            <Article.TitleItems>
                <Article.TitleWrapper>
                    <Article.Title>{title}</Article.Title>
                    <FontAwesomeIcon
                        icon={faCopy}
                        onClick={() => {
                            navigator.clipboard.writeText(
                                t("root.lang") === "ja"
                                ? article.original_title
                                    ? article.original_title + " (" + article.title + ")"
                                    : article.title
                                : article.original_title
                                ? article.title + " (" + article.original_title + ")"
                                : article.title
                            );
                        }}
                    />
                </Article.TitleWrapper>
                {originalTitle && <Article.OriginalTitle>{originalTitle}</Article.OriginalTitle>}
            </Article.TitleItems>
        );
    };

    const renderBadge = (article) => (
        <Article.BadgeWrapper>
            { article.content_type === "앤솔로지" || article.content_type === "단편" ?
                null
                :
                article.is_release ? (
                    <Badge color="primary">{t("article.badge.release.release")}</Badge> 
                ) : (
                    <Badge color="success">{t("article.badge.release.notRelease")}</Badge>
                )
            }
            <Badge>{t(`card.badge.content.${article.content_type}`)}</Badge>
        </Article.BadgeWrapper>
    )
      
    const renderButton = (article) => (
        <Article.ButtonWrapper>
            <Button disabled={true} margin="0 1em 0 0" big primary>
                {t("article.button.view")}
            </Button>
            <Suspense fallback={<></>}>
                <Vote data={article} type={Like.ARTICLE} />
            </Suspense>
        </Article.ButtonWrapper>
    );

    return (
        <>
            {warning &&
                <WarningModal onClose={() => setWarningOpen(false)} />
            }
            <MetaTag title={t("root.lang") === 'ja' ? article.original_title ? article.original_title : article.title : article.title} description={description} keywords={article.tags.map((item) => item.tag)} image={getImage(IMAGE.THUMBNAIL, thumbUrl, 600)} url={"https://lilydb.app/article/" + article.article_id} />
            { !mobile ? (
                <>
                    <Article.InfoWrapper image={getImage(IMAGE.THUMBNAIL, thumbUrl, 600)}>
                        <Article.ImageContainer>
                            <Article.ImageBox width="300px" height="450px" image={getImage(IMAGE.THUMBNAIL, thumbUrl, 600)} title={article.title} />
                        </Article.ImageContainer>
                        <Article.DetailContainer>
                            {renderBadge(article)}
                            {renderTitleItems(article)}
                            <Article.PCDescription>
                                {description}
                            </Article.PCDescription>
                            <Author authors={article.author} mobile={false} />
                            <Tags tags={article.tags} />
                            {renderButton(article)}
                        </Article.DetailContainer>
                    </Article.InfoWrapper>
                    {footer}
                </>
            ) 
            : 
            (
                <>
                    <Article.MobileWrapper>
                        <Article.InfoWrapper image={getImage(IMAGE.THUMBNAIL, thumbUrl, 500)}>
                            <Article.ImageWrapper mobile>
                                <Article.ImageBox width="250px" height="375px" image={getImage(IMAGE.THUMBNAIL, thumbUrl, 500)} title={article.title} />
                            </Article.ImageWrapper>
                            <Article.MobileContent>
                                {renderBadge(article)}
                                {renderTitleItems(article)}
                                <Article.MobileDescription>
                                    {article.description ? (
                                        <>
                                            {toggleDescription ? (
                                                <>
                                                    {description}
                                                    <Article.DetailButton onClick={() => setToggleDescription(false)}>
                                                        <FontAwesomeIcon icon={faArrowUp} /> 접기
                                                    </Article.DetailButton>
                                                </>
                                            ) : (
                                                <>
                                                    {`${description.substring(0, description.indexOf("\n")-1)} ・・・`}
                                                    <Article.DetailButton onClick={() => setToggleDescription(true)}>
                                                        <FontAwesomeIcon icon={faArrowDown} /> 더 보기
                                                    </Article.DetailButton>
                                                </>
                                            )}
                                        </>
                                    ) : t("article.description.default")}
                                </Article.MobileDescription>
                                <Author authors={article.author} mobile={true} />
                                <Tags tags={article.tags}  />
                                {renderButton(article)}
                            </Article.MobileContent>
                        </Article.InfoWrapper>
                        {footer}
                    </Article.MobileWrapper>
                </>
            )}
        </>
    )
}

export default Header;
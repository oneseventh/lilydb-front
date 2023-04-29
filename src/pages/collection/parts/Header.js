import React, { useState, useEffect, Suspense } from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock, faEdit } from "@fortawesome/free-solid-svg-icons";

import MetaTag from "SEOMeta";
import Vote from "components/Article/Vote";
import { Like } from "hooks/cookie";
import { useTranslation } from "react-i18next";
import Loading from "view/Loading";
import Badge from "components/globals/Badge";
import getImage, { IMAGE } from "utils/getImage";


function Header({ collection, mobile }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [footer, setFooter] = useState(null);

    const { t } = useTranslation();

    const Footer = React.lazy(() => import("./Footer"));

    useEffect(() => {
        if (collection === undefined) {
            document.title = "Not Found";
            setError(new Error("컬렉션 정보를 불러올 수 없습니다."));
            setLoading(false);
            return;
        }
      
        setLoading(false);

        setFooter(<Suspense fallback={<Loading />}><Footer collection={collection} /></Suspense>);
    }, [collection]);
    
    if (loading) {
        if (!mobile) {
            return (
                <InfoWrapper>
                    <PCWrapper>
                        <ProfileContainer>
                            <LoadingImageBox />
                            <DetailWrapper>
                                <LoadingTitle />
                                <LoadingDescription />
                                <LoadingTitle />
                            </DetailWrapper>
                        </ProfileContainer>
                    </PCWrapper>
                </InfoWrapper>
            )
        }
        return (
            <InfoWrapper>
                <MobileWrapper>
                    <MobileImageWrapper>
                        <LoadingImageBox />
                    </MobileImageWrapper>
                    <MobileContent>
                        <LoadingTitle />
                        <LoadingDescription />
                        <LoadingTitle />
                    </MobileContent>
                </MobileWrapper>
            </InfoWrapper>
        )
    }

    if (error) {
        if (!mobile) {
            return (
                <InfoWrapper>
                    <PCWrapper>
                        <ProfileContainer>
                            <LoadingImageBox />
                            <DetailWrapper>
                                <Title>오류가 발생했습니다.</Title>
                                <Description>{error.message}</Description>
                            </DetailWrapper>
                        </ProfileContainer>
                    </PCWrapper>
                </InfoWrapper>
            )
        }
        return (
            <InfoWrapper>
                <MobileWrapper>
                    <MobileImageWrapper>
                        <LoadingImageBox />
                    </MobileImageWrapper>
                    <MobileContent>
                        <Title>오류가 발생했습니다.</Title>
                        <Description>
                            {error.message}
                        </Description>
                    </MobileContent>
                </MobileWrapper>
            </InfoWrapper>
        )
    }

    const renderBadge = () => (
        <BadgeWrapper>
            <Badge color="purple">{t("collection.badge.collection")}</Badge>
        </BadgeWrapper>
    )

    const renderName = (name) => (
        <Title>{name}</Title>
    )

    const renderDescription = (description) => (
        <Description>
            {description ? description : t("article.description.default")}
        </Description>
    )

    const renderInfo = (collection) => (
        <>
            <Date>
                <span><FontAwesomeIcon icon={faClock} /> <strong>{t("collection.info.created")}</strong>  {collection.created_at}</span>
                {collection.updated_at && <span><FontAwesomeIcon icon={faEdit} /> <strong>{t("collection.info.updated")}</strong>  {collection.updated_at}</span>}
            </Date>
            <About>
                <span><FontAwesomeIcon icon={faUser} /> <strong>{collection.author}</strong></span>
                <span>・</span>
                <span><strong>{t("collection.info.view")}</strong> {collection.view_count}</span>
                <span>・</span>
                <span>{t("collection.info.article", {count: collection.articles.length})}</span>
            </About>
        </>
    )

    const renderButton = (collectionId) => (
        <VoteContainer>
            <Vote data={{
                collection_id: collectionId
            }} type={Like.COLLECTION} />
        </VoteContainer>
    )

    return (
        <>
            <MetaTag title={collection.name} description={collection.description} keywords={["백합"]} url={"https://lilydb.app/collection/" + collection.id} />
            <InfoWrapper image={collection.articles.length >= 2 ? getImage(IMAGE.THUMBNAIL, collection.articles[1].article_id, 256) : collection.articles.length === 1 ? getImage(IMAGE.THUMBNAIL, collection.articles[0].article_id, 360) : null}>
                { mobile ? (
                    <MobileWrapper>
                        <ImageBox width="14em" height="14em" image={collection.articles.length !== 0 ? getImage(IMAGE.THUMBNAIL, collection.articles[0].article_id, 360) : null} title="thumbnail" />
                        <MobileContent>
                            {renderBadge()}
                            {renderName(collection.name)}
                            {renderDescription(collection.description)}
                            {renderInfo(collection)}
                            {renderButton(collection.collection_id)}
                        </MobileContent>
                    </MobileWrapper>
                ) : (
                    <PCWrapper>
                        <ProfileContainer>
                            <ImageBox width="20em" height="20em" image={collection.articles.length !== 0 ? getImage(IMAGE.THUMBNAIL, collection.articles[0].article_id, 420) : null} title="thumbnail" />
                            <DetailWrapper>
                                {renderBadge()}
                                {renderName(collection.name)}
                                {renderDescription(collection.description)}
                                {renderInfo(collection)}
                                {renderButton(collection.collection_id)}
                            </DetailWrapper>
                        </ProfileContainer>
                    </PCWrapper>
                )}
            </InfoWrapper>
            {footer}
        </>
    )
}

const fadeInOut = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;


const TitleWrapper = styled.div`    
    display: flex;
    flex-direction: row;
    align-items: center;
    
    &>svg {
        margin-left: 0.5em;
        cursor: pointer;
        color: #aaa;
    }
`;

const Date = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.5em;
    font-size: 0.8em;
    @media (max-width: 768px) {
        font-size: 0.7em;
    }
    color: var(--gray);
    letter-spacing: 0.5px;
    &>span {
        margin-right: 0.5em;
    }
`;


const About = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.5em;
    font-size: 0.9em;
    @media (max-width: 768px) {
        font-size: 0.8em;
    }
    color: var(--gray);
    letter-spacing: 0.5px;
    &>span {
        margin-right: 0.5em;
    }
`;

const LoadingDescription = styled.span`
    display: inline-block;
    width: 30em;
    height: 10em;
    background-color: #1c1c1c;
    animation: ${fadeInOut} 1s ease-in-out infinite;
    border-radius: 1em;
    
    margin-bottom: 0.5em;
`;

const MobileImageWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Button = styled.button`
    width: 5.5em;
    height: 3em;
    padding: 0.5em 1em;
    margin: 0 1em 0 0em;

    font-size: 1em;
    font-weight: 600;
    border-radius: 1em;
    border: solid 0.15em ${props => {
        if (props.voteup) return "var(--pink)";
        if (props.votedown) return "var(--blue)";
        if (props.like) return "var(--white)";
        if (!props.like) return "var(--white)";
        return "var(--gray)";
    }};;
    color: ${props => {
        if (props.voteup) return "var(--pink)";
        if (props.votedown) return "var(--blue)";
        if (!props.like) return "var(--white)";
        if (props.like) return "#000"
        return "var(--gray)";
    }};;
    background-color: ${props => {
        if (props.like) return "var(--white)";
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
            if (!props.like) return "var(--white)";
            if (props.like) return "transparent";
            return "var(--gray)";
        }};;
        color: ${props => {
            if (!props.like) return "#000";
            return "#fff"
        }};;

    };
`;

const VoteContainer = styled.div`
    display: flex;
    width: 30%;

    min-width: 15em;
    margin-top: 1em;
`;

const Title = styled.h1`
    font-size: 2em;
    @media (max-width: 768px) {
        font-size: 1.65em;
    }
    font-weight: 700;
    margin: 0.25em 0;
    color: var(--text);
`;

const Description = styled.span`
    white-space: pre-wrap;
    opacity: 0.75;
    font-size: 1em;
    color: var(--text);
    font-weight: 400;
    margin: 0.25em 0;
`;

const DetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin-left: 3em;
`;

const PCWrapper = styled.div`
    padding: 6em 4em;
`;

const InfoWrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: left;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        ${props => {
            if (props.image) return `background-image: url(${props.image})`;
        }};
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.2;
        filter: blur(1em);
        z-index: -1;
    } 
`;

const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
`;

const ImageBox = styled.div`
    width: ${props => props.width ? props.width : "5em"};
    height: ${props => props.height ? props.height : "5em"};
    align-items: center;
    text-align: center;
    background-image: url(${props => props.image});
    background-color: var(--bg);
    background-size: cover;
    object-fit: cover;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.12), 0 0.5em 1em rgba(0,0,0,0.24);
    border-radius: 1em;
    @media (min-width: 1000px) {
        margin-right: 1em;
    }
`;

const BadgeWrapper = styled.div`
    width: 100%;
`;

const LoadingTitle = styled.h1`
    width: 8em;
    height: 2em;
    font-weight: 700;
    margin-bottom: 0.5em;
    background-color: #1c1c1c;
    border-radius: 0.5em;
    
    animation: ${fadeInOut} 1s ease-in-out infinite;
`;

const MobileContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    margin-top: 2.5em;
`;

const LoadingImageBox = styled.span`
    min-width: 300px;
    height: 300px;
    background-color: #1c1c1c;
    box-shadow: 0 0.5em 1em rgba(0,0,0,0.12), 0 0.5em 1em rgba(0,0,0,0.24);
    border-radius: 1em;
    align-items: center;
    text-align: center;
    animation: ${fadeInOut} 1s ease-in-out infinite;
`;
    
const MobileWrapper = styled.div`
    width: calc(100% - 3em);
    display: flex;
    margin: 1.5em;
    flex-direction: column;
    align-items: center;
`;

export default Header;
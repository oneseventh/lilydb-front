import React, { useState, useEffect, Suspense } from "react";
import Footer from "./Footer";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faHome } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import Badge from "components/globals/Badge";

import { useTranslation } from "react-i18next";
import Vote from "components/Article/Vote";
import { Like } from "hooks/cookie";
import MetaTag from "SEOMeta";
import getImage, { IMAGE } from "utils/getImage";

function Header({ author, homepage, mobile }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [footer, setFooter] = useState(null);

    const { t } = useTranslation();
    
    useEffect(() => {
        if (author === undefined) {
            setError(new Error("작가 정보를 불러올 수 없습니다."));
            setLoading(false);
            return;
        }
        
        setFooter(<Footer key="author-footer" author={author} mobile={mobile} />)
        setLoading(false);
    }, [author, mobile]);
    
    if (loading) {
        if (!mobile) {
            return (
                <InfoWrapper>
                    <PCWrapper>
                        <ProfileContainer>
                            <LoadingImageBox />
                            <DetailWrapper>
                                <BadgeWrapper>
                                    <LoadingBadge />
                                </BadgeWrapper>
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
                        <LoadingBadge />
                        <LoadingTitle />
                        <LoadingDescription />
                        <LoadingTitle />
                    </MobileContent>
                </MobileWrapper>
            </InfoWrapper>
        )
    }

    const ErrorInfo = ({ mobile, message }) => {
        const Wrapper = mobile ? MobileWrapper : InfoWrapper;
        const Title = mobile ? Title : AuthorName;
        const Description = mobile ? MobileDescription : AuthorDescription;
      
        return (
            <Wrapper>
                {mobile ? (
                    <MobileImageWrapper>
                        <LoadingImageBox />
                    </MobileImageWrapper>
                ) : (
                    <PCWrapper>
                        <ProfileContainer>
                        <LoadingImageBox />
                        <DetailWrapper>
                            <AuthorName>오류가 발생했습니다.</AuthorName>
                        </DetailWrapper>
                        </ProfileContainer>
                    </PCWrapper>
                )}
                <MobileContent>
                    <Title>오류가 발생했습니다.</Title>
                    <Description>{message}</Description>
                </MobileContent>
            </Wrapper>
        );
    };
      
      // 사용 예시
    if (error) {
        return <ErrorInfo mobile={mobile} message={error.message} />;
    }

    const authorNameRender = (author) => {
        const isJapanese = t("root.lang") === "ja";
        const name = isJapanese ? (author.original_name ? author.original_name.split(",")[0] : author.name) : author.name;
        const originalName = author.original_name && (isJapanese ? author.name : (
            <>
                {author.original_name.split(",")[0]} 
                {author.original_name.split(",")[1] && ` (${author.original_name.split(",")[1]})`}
            </>
        ));
        
        const handleCopyClick = () => {
            if (originalName) {
                navigator.clipboard.writeText(`${name} (${originalName})`);
            } else {
                navigator.clipboard.writeText(name);
            }
        };
      
        return (
            <TitleWrapper>
                <AuthorName>
                    {name} 
                    {originalName && <FontAwesomeIcon icon={faCopy} onClick={handleCopyClick} />}
                </AuthorName>
                {originalName && <AuthorOriginalName>{originalName}</AuthorOriginalName>}
            </TitleWrapper>
        );
    };

    const renderHomepage = (homepage) => (
        <HomepageWrapper>
            {homepage && (
                <>
                    {homepage.personal !== null && (
                        <Homepage href={homepage.personal} target="_blank" rel="noopener noreferrer">
                            <Badge>
                                <FontAwesomeIcon icon={faHome} /> {t("author.homepage.personal")}
                            </Badge>
                        </Homepage>
                    )}
                
                    {homepage.pixiv !== null && (
                        <Homepage href={homepage.pixiv} target="_blank" rel="noopener noreferrer">
                            <Badge color="blue"> 
                                <svg width="1em" height="1em" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.935 0A4.924 4.924 0 0 0 0 4.935v14.13A4.924 4.924 0 0 0 4.935 24h14.13A4.924 4.924 0 0 0 24 19.065V4.935A4.924 4.924 0 0 0 19.065 0zm7.81 4.547c2.181 0 4.058.676 5.399 1.847a6.118 6.118 0 0 1 2.116 4.66c.005 1.854-.88 3.476-2.257 4.563-1.375 1.092-3.225 1.697-5.258 1.697-2.314 0-4.46-.842-4.46-.842v2.718c.397.116 1.048.365.635.779H5.79c-.41-.41.19-.65.644-.779V7.666c-1.053.81-1.593 1.51-1.868 2.031.32 1.02-.284.969-.284.969l-1.09-1.73s3.868-4.39 9.553-4.39zm-.19.971c-1.423-.003-3.184.473-4.27 1.244v8.646c.988.487 2.484.832 4.26.832h.01c1.596 0 2.98-.593 3.93-1.533.952-.948 1.486-2.183 1.492-3.683-.005-1.54-.504-2.864-1.42-3.86-.918-.992-2.274-1.645-4.002-1.646Z"/>
                                </svg> 
                                {t("author.homepage.pixiv")}
                            </Badge>
                        </Homepage>
                    )}

                    {homepage.twitter !== null && (
                        <Homepage href={homepage.twitter} target="_blank" rel="noopener noreferrer">
                            <Badge color="blue">
                                <FontAwesomeIcon icon={faTwitter} /> {t("author.homepage.twitter")}
                            </Badge>
                        </Homepage>
                    )}

                    {homepage.facebook !== null && (
                        <Homepage href={homepage.facebook} target="_blank" rel="noopener noreferrer">
                            <Badge color="blue">
                                <FontAwesomeIcon icon={faFacebook} /> {t("author.homepage.facebook")}
                            </Badge>
                        </Homepage>
                    )}

                    {homepage.instagram !== null && (
                        <Homepage href={homepage.instagram} target="_blank" rel="noopener noreferrer">
                            <Badge color="red">
                                <FontAwesomeIcon icon={faInstagram} /> {t("author.homepage.instagram")}
                            </Badge>
                        </Homepage>
                    )}
                </>
            )}
        </HomepageWrapper>
    )
    
    const renderDescription = () => (
        <AuthorDescription>{t("article.description.default")}</AuthorDescription>
    )

    const renderButton = () => (
        <ButtonWrapper>
            <Suspense fallback={<div>Loading...</div>}>
                <Vote data={{
                    author_id: author.author_id,
                }} type={Like.AUTHOR}/>
            </Suspense>
        </ButtonWrapper>
    )

    const defaultLayout = ({ author, homepage }) => (
        <>
            <BadgeWrapper>
                <Badge color="blue">{t("author.badge.author")}</Badge>
            </BadgeWrapper>
            {authorNameRender(author)}
            {renderDescription()}
            {homepage && renderHomepage(homepage)}
            {renderButton()}
        </>
    ) 

    const desktopView = (
        <PCWrapper>
            <ProfileContainer>
                <ImageWrapper>
                    <ImageBox width="300px" height="300px" image={getImage(IMAGE.PROFILE, author.author_id, 600)} title="thumbnail" />
                </ImageWrapper>
                <DetailWrapper>
                    {defaultLayout({ author, homepage })}
                </DetailWrapper>
            </ProfileContainer>
        </PCWrapper>
    );
    
    const mobileView = (
        <MobileWrapper>
            <MobileImageWrapper>
                <ImageBox width="250px" height="250px" image={getImage(IMAGE.PROFILE, author.author_id, 500)} title="thumbnail" />
            </MobileImageWrapper>
            <MobileContent>
                {defaultLayout({ author, homepage })}
            </MobileContent>
        </MobileWrapper>
    );
    
    return (
        <>
            <MetaTag title={t("root.lang") === "ja" ? (author.original_name ? author.original_name.split(",")[0] : author.name) : author.name} description={t("article.description.default")} />
            <InfoWrapper image={getImage(IMAGE.PROFILE, author.author_id, mobile ? 500 : 600)}>
                {!mobile && desktopView}
                {mobile && mobileView}
            </InfoWrapper>
            {footer}
        </>
    );
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
    flex-direction: column;

    margin: 0.5em 0;
`;

const Homepage = styled.a`
    text-decoration: none;
`;

const HomepageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5em 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.5em 0;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

const AuthorName = styled.span`
    color: var(--text);
    font-size: 3em;

    @media (max-width: 768px) {
        font-size: 2em;
    }

    &>svg {
        font-size: 40%;
        cursor: pointer;
        color: #aaa;
        margin-left: 0.3em;
    }
    font-weight: 600;
    margin: 0.1em 0;
`;

const AuthorOriginalName = styled.span`
    font-weight: 400;
    color: var(--link);
`;

const AuthorDescription = styled.span`
    white-space: pre-wrap;
    opacity: 0.8;
    font-size: 1em;
    color: var(--text);
    font-weight: 400;
    margin: 0.5em 0;
`;

const DetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
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
            if (!props.image) return `background-color: var(--gray);`;
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
    justify-content: center;
    margin: 0;
`;

const ImageBox = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    align-items: center;
    text-align: center;
    object-fit: cover;
    background-color: var(--bg);
    background-image: url(${props => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;

    margin-right: 3em;
    @media (max-width: 1000px) {
        margin-right: 0;
    }

    box-shadow: 0 0.5em 1em rgba(0,0,0,0.12), 0 0.5em 1em rgba(0,0,0,0.24);
    border-radius: 1em;
`;

const BadgeWrapper = styled.div`
    width: 100%;
`;

const LoadingBadge = styled.span`
    display: inline-block;
    width: 4em;
    height: 1em;
    opacity: 0.75;
    background-color: #1c1c1c;
    padding: 0.2em 0.5em;
    border-radius: 0.5em;
    animation: ${fadeInOut} 1s ease-in-out infinite;
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

const Description = styled.span`
    white-space: pre-wrap;
    font-size: 1em;
    opacity: 0.75;
    margin-bottom: 0.5em;
`;

const MobileDescription = styled(Description)`
    width: 90%;
`;

const MobileContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 3em 0 0 3em;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em 0 2em 0;
`;

export default Header;
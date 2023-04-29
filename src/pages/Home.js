import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";

import { Cookies, getCookie } from "hooks/cookie";
import MetaTag from "SEOMeta";
import CardLoading from "components/recycle/CardLoading";
import AlertBox from "components/globals/AlertBox";
import Advertisement from "components/Advertisement";
import { LogoPC } from "components/Layout/styles/Navbar";
import getImage, { IMAGE } from "utils/getImage";

const Seen = React.lazy(async () => import('../components/Card/Seen'));
const Osusume = React.lazy(async () => import('../components/Card/Osusume'));
const Popular = React.lazy(async () => import('../components/Card/Popular'));

function Home() {
    const isMobile = useMediaQuery({query: '(max-width:1000px)'});
    const smallUI = useMediaQuery({query: '(max-width:400px)'});
    const seenArticles = useMemo(() => getCookie(Cookies.RECENT_SEEN_ARTICLE), []);

    const { t } = useTranslation();

    return (
        <>
            <MetaTag />
            <Navbar >
                <CategoryWrapper>
                    <Profile image={getImage(IMAGE.PROFILE, "fallback", 64)} />
                    <Category>{t("nav.home")}</Category>
                    <Category active>만화 & 소설</Category>
                    <Category>웹툰</Category>
                    <Category>{smallUI ? "애니" : "애니메이션"}</Category>
                </CategoryWrapper>
            </Navbar>
            <Banner>
                <BannerConent>
                    <BannerTitle>{t('root.bannertitle', { servicename: t('root.servicename') })}</BannerTitle>
                    <BannerText>{t('root.bannercontent', { servicename: t('root.servicename') })}</BannerText>
                </BannerConent>
            </Banner>
            <Wrapper>
                { !isMobile && t("root.lang") !== 'ko' && <AlertBox>{t("warning.region")}</AlertBox> }
                <Suspense fallback={<CardLoading />}>
                    <Osusume parameter='' title={t("title.random")} />
                    { 
                        getCookie(Cookies.RECENT_SEEN_ARTICLE).length !== 0 && <><Osusume parameter={
                            "&" + getCookie(Cookies.RECENT_SEEN_ARTICLE).map((item) => {
                                return "id=" + item;
                            }).join("&")
                        } title={t("title.recommend")} /></>
                    }
                    { seenArticles.length !== 0 && <Seen />}
                    <Popular />
                </Suspense>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    display: inline-block;
    width: calc(100% - 3em);
    margin: 1.5em;
    

    @media (max-width: 768px) {
        width: calc(100% - 2em);
        margin: 1em;
    }
`;

const Banner = styled.div`
    position: relative;
    width: 100%;
    height: 22em;

    background-color: #000000;

    ${props => {
        if (props.image) {
            return `background-image: url(${props.image})`;
        }
        return `
            background-color: #2a2a72;
            // background-image: linear-gradient(315deg, #2a2a72 0%, #009ffd 74%);
            // box-shadow: 0 0 256px 0 #111 inset, 0 0 256px 0 #111 inset; 
        `;
    }};

    
    
    @media (max-width: 1000px) {
        height: 18em;
        margin-bottom: 0.25em;
    }

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const Navbar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    height: 2.5em;
    margin: 0;
    background-color: var(--navbar);
    width: 100%;
    padding: 1em 2em;
    @media (max-width: 1000px) {
        padding: 0.5em 1em;
    }
    &>svg {
        fill: white;
    }
    z-index: 999;
`


const BannerConent = styled.div`
    position: absolute;
    left: 2em;
    top: 50%;
    border-radius: 1em;

    @media (max-width: 1000px) {
        left: 1em;
        top: 60%;
    }
    display: flex;
    flex-direction: column;
    color: white;
`;

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const Category = styled.button`
    border: 0;
    border-radius: 1em;
    padding: 0.5em 1.25em;
    margin: 0 0.5em;
    font-size: 0.9em;
    @media (max-width: 768px) {
        font-size: 0.75em;
        margin: 0 0.3em;
    }
    @media (max-width: 1000px) {
        font-size: 0.85em;
    }
    font-weight: 500;
    color: ${props => props.active ? "white" : "var(--text)"};
    background: ${props => props.active ? "radial-gradient(circle at 3% 7.4%, rgb(0, 144, 243) 0%, rgb(0, 86, 240) 90%)" : "transparent"};
    cursor: not-allowed;
`

const Profile = styled.div`
    width: 2.5em;
    height: 2.5em;

    @media (max-width: 1000px) {
        width: 2.25em;
        height: 2.25em;
    }

    @media (max-width: 768px) {
        width: 2em;
        height: 2em;
    }

    margin-right: 0.5em;

    border-radius: 50%;
    background-color: var(--bg);
    background-image: url(${props => props.image});
    background-size: cover;
    object-fit: cover;
`;

const BannerTitle = styled.span`
    width: fit-content;
    display: inline-block;
    font-weight: 700;
    font-size: 3em;

    @media (max-width: 1000px) {
        font-size: 2em;
    }
`;

const BannerText = styled.span`
    width: fit-content;
    display: inline-block;
    font-size: 1.5em;

    @media (max-width: 1000px) {
        font-size: 1em;
    }
`;

export default React.memo(Home);
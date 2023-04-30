import React, { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";

import MetaTag from "SEOMeta";
import getImage, { IMAGE } from "utils/getImage";
import { Link } from "react-router-dom";
import Main from "./parts/Main";
import Manga from "./parts/Manga";
import Animation from "./parts/Animation";
import Webtoon from "./parts/Webtoon";

function Home(props) {
    const isMobile = useMediaQuery({query: '(max-width:768px)'});
    const lowWidth = useMediaQuery({query: '(max-width:400px)'});

    const [category, setCategory] = useState("home");

    const navRef = useRef(null);
    const [backgroundColor, setBackgroundColor] = useState("transparent");

    const { t } = useTranslation();
    const profileImage = useMemo(() => getImage(IMAGE.PROFILE, "fallback", 64), []);

    const changeCategory = useCallback((category) => {
        setCategory(category);
    }, [setCategory]);

    const handleScroll = useCallback(() => {
        const navbar = navRef.current;
        const banner = document.getElementById('banner');
        const scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
        if (!navbar || !banner) return;
    
        const bannerHeight = banner.clientHeight - 80;
    
        if (scrollHeight >= bannerHeight) {
            const padding = isMobile ? '0.8em 1em' : '1em 1.5em';
            if (navbar.style.padding !== padding) navbar.style.padding = padding;
            if (backgroundColor !== 'rgba(var(--home-navbar), 0.85)') setBackgroundColor('rgba(var(--home-navbar), 0.85)');
        } else {
            const padding = isMobile ? '1.4em 1em' : '1.8em 1.5em';
            if (navbar.style.padding !== padding) {
                navbar.style.padding = padding;
            }
            if (backgroundColor !== 'transparent') setBackgroundColor('transparent');
        }
    }, [backgroundColor, isMobile]);

    useLayoutEffect(() => {
        document.body.addEventListener('scroll', handleScroll);
    
        return () => {
            document.body.removeEventListener('scroll', handleScroll);
        };
    }, [backgroundColor, isMobile]);
    
    return (
        <div>
            <MetaTag />
            <Navbar ref={navRef} background={backgroundColor}>
                <CategoryWrapper>
                    <Profile to="/library">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="256" height="256" viewBox="0 0 256 256">
                    <g style={{stroke: "none", strokeWidth: 0, strokeDasharray: "none", strokeLinecap: "butt",
                        strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none", fillRule: "nonzero", opacity: 1}} 
                        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 45 60.71 c -11.479 0 -20.818 -9.339 -20.818 -20.817 c 0 -11.479 9.339 -20.818 20.818 -20.818 c 11.479 0 20.817 9.339 20.817 20.818 C 65.817 51.371 56.479 60.71 45 60.71 z" 
                        style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt",
                         strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "var(--gray)", fillRule: "nonzero", opacity: 1}} 
                        transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        <path d="M 45 90 c -10.613 0 -20.922 -3.773 -29.028 -10.625 c -0.648 -0.548 -0.88 -1.444 -0.579 -2.237 C 20.034 64.919 31.933 56.71 45 56.71 s 24.966 8.209 29.607 20.428 c 0.301 0.793 0.069 1.689 -0.579 2.237 C 65.922 86.227 55.613 90 45 90 z" 
                        style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt",
                        strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "var(--gray)", fillRule: "nonzero", opacity: 1}}  
                        transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                    </svg>
                    </Profile>
                    <Category active={category === "home"} onClick={() => changeCategory("home")}>{t("category.home")}</Category>
                    <Category active={category === "manga"} onClick={() => changeCategory("manga")}>{t("category.manga")}</Category>
                    <Category active={category === "webtoon"} onClick={() => changeCategory("webtoon")}>{t("category.webtoon")}</Category>
                    <Category active={category === "anime"} onClick={() => changeCategory("anime")}>{t("category.anime")}</Category>
                </CategoryWrapper>
            </Navbar>
            <Banner id="banner" image={require("images/image.jpg")}>
                <BannerConent>
                    <BannerTitle>{t('root.bannertitle', { servicename: t('root.servicename') })}</BannerTitle>
                    <BannerText>{t('root.bannercontent', { servicename: t('root.servicename') })}</BannerText>
                </BannerConent>
            </Banner>
            <Wrapper>
                { category === "home" ? <Main /> : null }
                { category === "manga" ? <Manga /> : null }
                { category === "webtoon" ? <Webtoon /> : null }
                { category === "anime" ? <Animation /> : null }
            </Wrapper>
        </div>
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
    }

    background-size: cover;
    background-repeat: no-repeat;
    filter: brightness(0.5);
`;

const Navbar = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    height: fit-content;
    margin: 0;
    top: 0;
    background-color: ${props => props.background};
    backdrop-filter: blur(10px);
    width: 100%;
    transition: background-color 0.15s ease-in-out;
    transition: padding 0.15s ease-in-out;

    @media (max-width: 768px) {
        padding: 1.4em 1em;
    }

    @media (min-width: 768px) {
        padding: 1.8em 1.5em;
    }
    &>div>button {
        color: ${props => {
            if (props.background === 'transparent') return 'white';
            return 'var(--text)';
        }};
    }

    &>svg {
        fill: white;
    }
    z-index: 999;
`


const BannerConent = styled.div`
    position: absolute;
    left: 1.5em;
    top: 60%;
    border-radius: 1em;

    @media (max-width: 1000px) {
        left: 1em;
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
    color: ${props => props.active && "white"} !important;
    background: ${props => props.active ? "radial-gradient(circle at 3% 7.4%, rgb(0, 144, 243) 0%, rgb(0, 86, 240) 90%)" : "transparent"};
    cursor: pointer;
`



const Profile = styled(Link)`
    text-decoration: none;
    color: white;
    width: 2.5em;
    height: 2.5em;

    display: flex;
    justify-content: center;
    align-items: center;


    @media (max-width: 1000px) {
        width: 2.25em;
        height: 2.25em;
    }

    transition: all 0.15s ease-in-out;

    margin-right: 1.5em;

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
        font-size: 2.5em;
    }
`;

const BannerText = styled.span`
    width: fit-content;
    display: inline-block;
    font-size: 1.5em;

    @media (max-width: 1000px) {
        font-size: 1.25em;
    }
`;

export default React.memo(Home);
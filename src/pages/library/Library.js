import React from "react";

import styled from "styled-components";
import LikedList from "./components/LikedList";
import { Like, Cookies, getCookie, getLiked } from "../../hooks/cookie";
import MetaTag from "SEOMeta";
import { t } from "i18next";
import { Title } from "components/globals/Title";
import Tip from "components/globals/Tip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import HorizontalRule from "components/globals/HorizontalRule";
import getImage, { IMAGE } from "utils/getImage";

function Library() {
    const likedArticles = getLiked(Like.ARTICLE);
    const likedAuthors = getLiked(Like.AUTHOR);
    const likedCollections = getLiked(Like.COLLECTION);

    const image1 = likedArticles[0];
    const image2 = likedArticles[1];
    const image3 = likedArticles[2];


    const renderImage = (image) => (
        <div style={{backgroundImage: `url(${getImage(IMAGE.THUMBNAIL, image, 300)})`}} />
    );
      
    return (
        <>
            <MetaTag title={t("meta.title.library")} />
            <Wrapper>
                <Banner>
                    {image1 && renderImage(image1)}
                    {image2 && renderImage(image2)}
                    {image3 && renderImage(image3)}
                </Banner>
                <Title big>{t("library.title.myLibrary")}</Title>
                {
                    likedArticles.length === 0 && likedAuthors.length === 0 && likedCollections.length === 0 ? (
                        <>
                            <Tip><FontAwesomeIcon icon={faInfoCircle} />{t("library.tip.empty")}</Tip>
                        </>
                    ) : (
                        <>
                            <Tip><FontAwesomeIcon icon={faInfoCircle} />{t("library.tip.list")}</Tip>
                            <Section>
                                <LikedList type={Like.ARTICLE} />                 
                            </Section>
                            <Section>
                                <LikedList type={Like.AUTHOR} />
                            </Section>
                            <Section>
                                <LikedList type={Like.COLLECTION} />
                            </Section>
                        </>
                    )
                }
            </Wrapper>
        </>
    );
}

const Section = styled.div`
    width: 100%;
    height: fit-content;

    margin: 1.5em 0;
`;

const Banner = styled.div`
    width: 100%;
    height: 11em;
    display: flex;
    flex-direction: row;
    
    &:has(div:nth-child(1)) {
        @media (min-width: 768px) {
            filter: blur(2.5em);
            margin-bottom: 3.5em;
        }
        @media (max-width: 768px) {
            filter: blur(2em);
            margin-bottom: 2em;
        }
    }
    scale: 1.2;

    

    &>div {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        width: 100%;
        height: 100%;
    }
`;

const Wrapper = styled.div`
    width: calc(100% - 3em);
    height: 100%;
    margin: 0 1.5em;
`;

export default Library;
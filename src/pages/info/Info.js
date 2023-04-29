import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom"


import Osusume from "../../components/Card/Osusume";

import styled, { keyframes } from "styled-components";
import Development from "view/Development";
import { useMediaQuery } from "react-responsive";
import MetaTag from "SEOMeta";

const Wrapper = styled.div`
    width: calc(100% - 3em);
    height: 100%;
    margin: 1.5em;
`;

function getRandomText() {
    const text = ["백끼얏호우~", "대세는 백합", "모두 감사합니다.", "앞으로 노력하는 릴리 DB가 되겠습니다.", "여기엔 뭘 넣을지 고민중이에요. 추천 해주시면 감사하겠습니다!"]

    return text[Math.floor(Math.random() * text.length)];
}

function Info() {
    const [rotate, setRotate] = useState(0);
    const mobile = useMediaQuery({query: '(max-width:768px)'});

    return (
        <>
            <MetaTag />
            {
                mobile && (
                    <Wrapper>
                        <ImageWrapper onClick={() => {
                            setRotate((rotate + 45) % 360);
                        }}>
                            <Egg src={require("images/egg.webp")} rotate={rotate} />
                        </ImageWrapper>
                        {
                            rotate === 315 && (
                                <h2>{getRandomText()}</h2>
                            )
                        }
                    </Wrapper>
                )
            }
        </>
    )
}

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const breatheAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(0.9); }
    100% { transform: scale(1); }
`;

const Egg = styled.img`
    width: 100%;
    height: 100%;

    border-radius: 15%;

    transform: rotate(${props => props.rotate}deg);
    transition: transform 0.25s ease-in-out;

    animation: ${breatheAnimation} 1.5s ease-in-out;
`;



export default Info;
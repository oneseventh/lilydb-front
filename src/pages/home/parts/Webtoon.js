import { Title } from "components/globals/Title";
import React, { Suspense } from "react";
import styled from "styled-components";
import getImage, { IMAGE } from "utils/getImage";

function Webtoon() {
    console.log("Webtoon");
    return (
        <>
            <Title>오늘의 웹툰</Title>
            <CategoryWrapper>
                <Category active>일</Category>
                <Category>월</Category>
                <Category>화</Category>
                <Category>수</Category>
                <Category>목</Category>
                <Category>금</Category>
                <Category>토</Category>
            </CategoryWrapper>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                <div style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "0.5em",
                }}>
                    <img src={getImage(IMAGE.THUMBNAIL, 10, 160)} />
                    <span>유루유리</span>
                </div>
                <div style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "0.5em",
                }}>
                    <img src={getImage(IMAGE.THUMBNAIL, 11, 160)} />
                    <span>동서남북!</span>
                </div>
                <div style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "0.5em",
                    overflow: "hidden",
                }}>
                    <img src={getImage(IMAGE.THUMBNAIL, 12, 160)} />
                    <span>전생했더니 아카리만 슬라임이었던 건</span>
                </div>
            </div>
        </>
    )
}

const CategoryWrapper = styled.div`
    margin: 0.5em 0;
    display: flex;
    flex-direction: row;
`;

const Category = styled.button`
    display: inline-block;
    color: var(--text);
    text-decoration: none;
    padding: 0.4em;
    min-width: 4em;
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
    }}
`;

export default React.memo(Webtoon);

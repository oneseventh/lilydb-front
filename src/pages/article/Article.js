import React, { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";
import Loading from "view/Loading";
import useArticle from "hooks/useArticle";

import * as Article from "./style"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

function ArticleController() {
    const { id } = useParams();
    const {article, isError} = useArticle(id);
    
    const mobile = useMediaQuery({query: '(max-width:1000px)'});
    const Header = React.lazy(() => import("./parts/Header"));

    const errorContent = (error) => (
        <Article.InfoWrapper>
            <Article.ImageContainer>
                <Article.LoadingImageBox />
            </Article.ImageContainer>
            <Article.DetailContainer>
                <Article.Title>오류가 발생했습니다.</Article.Title>
                {mobile ? (
                    <Article.MobileDescription>{error.message}</Article.MobileDescription>
                ) : (
                    <Article.PCDescription>{error.message}</Article.PCDescription>
                )}
            </Article.DetailContainer>
        </Article.InfoWrapper>
    );

    if (isError) {
        return mobile ? (
            <Article.MobileWrapper>{errorContent(isError)}</Article.MobileWrapper>
        ) : (
            errorContent(isError)
        );
    }

    return (
        <Wrapper>
            <Suspense fallback={<Loading />}>
                <Header article={article} mobile={mobile} />
            </Suspense>
        </Wrapper>
    );
}

export default ArticleController;
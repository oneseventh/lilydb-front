import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Header from "./parts/Header";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

function Author(props) {
    const { author } = useParams();
    const [data, setData] = useState(null);
    const isDesktopOrMobile = useMediaQuery({query: '(max-width:1000px)'});

    const memoizedFetchAuthor = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/api/v2/author/?author=${author}`);
            const data = await response.json();
            return data.data.authors[0];
        } catch (error) {
            return undefined;
        }
    }, [author]);

    useEffect(() => {
        memoizedFetchAuthor().then(result => {
            setData(
                <Suspense fallback={<div>wait</div>}>
                    <Header author={result} homepage={result.homepage} mobile={isDesktopOrMobile} />
                </Suspense>
            )
        });
    }, [memoizedFetchAuthor, isDesktopOrMobile]);

    return (
        <Wrapper>
            {data}
        </Wrapper>
    );
}

export default Author;

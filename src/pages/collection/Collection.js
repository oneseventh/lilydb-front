import React, { useState, useEffect, useCallback } from "react";

import useSWR from "swr";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./parts/Header";
import { useMediaQuery } from "react-responsive";
import Loading from "view/Loading";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
};

function useCollection(id) {
    const { data, error } = useSWR(`${process.env.REACT_APP_SERVER}/api/v2/collection/?id=${id}`, fetcher);
    return {
        data: data,
        isError: error
    };
}

function Collection() {
    const { id } = useParams();
    const { data, isError } = useCollection(id);
    const isDesktopOrMobile = useMediaQuery({query: '(max-width:1000px)'});

    if (isError) return <div>failed to load</div>;

    if (!data) return <Loading />;

    return (
        <Wrapper>
            <Header collection={data} mobile={isDesktopOrMobile} />
        </Wrapper>
    );
}

export default Collection;
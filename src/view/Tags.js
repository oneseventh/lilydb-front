import React, { useEffect, useState } from "react";
import TagCard from "../components/recycle/TagCard";
import styled from "styled-components";
import Error from "../components/Error";
import { Title } from "../components/Card/styles/Title";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


function Tags() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + '/api/v2/tags/')
            .then((response) => response.json())
            .then((data) => { 
                setData(
                    Object.keys(data).map((item) => {
                        return (
                            <TagCard key={data[item].tag_id} name={data[item].tag_name} color={data[item].color} />
                        );
                    })
                );
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <>
        <Title><FontAwesomeIcon icon={faTags} />{t("title.tagArticle")}</Title>
        <TagWrapper disabled>
            <Loading />
        </TagWrapper>
    </>;
    if (error) return (
        <>
            <Title><FontAwesomeIcon icon={faTags} />{t("title.tagArticle")}</Title>
            <Error error={error} />
        </>
    );
    if (data == null) return <div>서버로부터 정보를 받아오지 못했습니다. 새로고침</div>;

    return (
        <Wrapper>
            <Title>{t("title.tagArticle")}</Title>
            <TagWrapper>
                {data}
            </TagWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 2em 0;
`;


const TagWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    flex-wrap: wrap;

    margin-top: 1em;

    @media (max-width: 480px) {
        items-align: center;
        justify-content: space-between;
        
    }

    ${(props) => (props.disabled && `pointer-events: none;`)}
`;

export default Tags;
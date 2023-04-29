import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Title } from '../Card/styles/Title';

function CategoryCard() {
    const { t } = useTranslation();

    return (
        <>
            <Title>{t("title.category")}</Title>
            <Container>
                <Card manga>만화</Card>
                <Card anthology>앤솔로지</Card>
                <Card single>단편</Card>
                <Card novel>소설</Card>
                <Card anime>애니메이션</Card>
                <Card webtoon>웹툰</Card>
            </Container>
        </>
    )
}

export default CategoryCard;

const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 0.5em;
    
    display: flex;
    flex-direction: row;
`;

const Card = styled.div`
    width: 6em;
    height: 2em;
    position: relative;
    border-radius: 0.5em;
    margin: 0.5em;
    padding: 0.5em;
    display: flex;
    font-size: 1.2em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #111;
    ${props => {
        if (props.manga) return ("background-color: #FA5EF9;");
        if (props.anthology) return ("background-color: #9951D6;");
        if (props.single) return ("background-color: #7166ED;");
        if (props.novel) return ("background-color: #5181D6;");
        if (props.anime) return ("background-color: #FAB45F;");
        if (props.webtoon) return ("background-color: #D65187;");
    }}
`;
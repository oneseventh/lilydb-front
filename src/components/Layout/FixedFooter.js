import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

function FixedFooter() {

    const { t } = useTranslation();

    return (
        <Wrapper>
            <Footer>
                <FooterText>© 2023 {t("root.servicename")} <Version>({process.env.REACT_APP_SERVICE_VERSION}, {process.env.REACT_APP_SERVICE_TYPE})</Version> | Developed by<FooterLink href="https://lilyuri.art">LiIy</FooterLink></FooterText>
                <FooterText>베타 버전입니다. 언제든지 변동될 수 있습니다.</FooterText>
                <LinkWrapper>
                    <FooterLink href="/term">Terms and Conditions</FooterLink>
                    <FooterText>|</FooterText>
                    <FooterLink href="mailto:support@lilydb.app">Supoort</FooterLink>
                </LinkWrapper>
            </Footer>
        </Wrapper>
    );
}

const Wrapper = styled.footer`
    position: relative;
    min-height: fit-content;
    margin-top: 4em;
    bottom: 0;
    width: 100%;
    text-align: center;
`;

const Footer = styled.div`
    position: absolute;
    width: calc(100%);
    height: auto;
    padding: 1em 0;
    border-top: 0.15em solid var(--border);
    color: var(--text);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const FooterText = styled.span`
    font-size: 0.75em;

    @media (max-width: 768px) {
        font-size: 0.5em;
    }
`;

const Version = styled.span`
    font-size: 80%;
    color: var(--link);
`;

const FooterLink = styled.a`
    font-size: 0.75em;
    @media (max-width: 768px) {
        font-size: 0.5em;
    }
    color: var(--link);
    text-decoration: none;
    margin: 0 0.5em;
`;

export default FixedFooter;
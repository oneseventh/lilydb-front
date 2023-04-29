import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome, faSearch, faList, faStickyNote, faBars, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FooterMoreModal, SettingModal } from "components/Modal";

const Foot = styled.footer`
    position: fixed;
    bottom: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: var(--bg);
    align-items: center;
`;


const FootList = styled.div`
    display: flex;
`;

const FootItem = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: var(--footer-height);
    text-decoration: none;

    ${props => props.active === "yes" && "background-color: var(--border);"}

    &>span, &>svg {
        ${props => props.active === "yes" ? "color: var(--text); font-weight: bold;" : "color: var(--link);"}
    }
`;

const Icon = styled(FontAwesomeIcon)`
    display: inline-block;
    color: #fff;
`;

const IconTitle = styled.span`
    display: inline-block;
    margin-top: 0.25em;
    font-size: 1em;
    
    @media (max-width: 768px) {
        margin-top: 0.15em;
        font-size: 0.85em;
    }
    color: #fff;
`;

function Footer() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [settingOpen, setSettingOpen] = React.useState(false);

    return (
        <>
            {isOpen && <FooterMoreModal onClose={(setting) => {
                setIsOpen(!isOpen);
                if (setting) {
                    setSettingOpen(true);
                }
            }}/>}
            { settingOpen && <SettingModal onClose={(reload) => {
                setSettingOpen(false);
                if (reload) {
                    window.location.reload();
                }
            }} /> }
            <Foot>
                <FootList>
                    <FootItem to="/" {...(
                            pathname === "/" ?
                            { active: 'yes' } :
                            {}
                        )}>
                        <Icon icon={faHome} />
                        <IconTitle>{t('nav.home')}</IconTitle>
                    </FootItem>
                    <FootItem to="/search" {...(
                            pathname === "/search" ?
                            { active: 'yes' } :
                            {}
                        )}>
                        <Icon icon={faSearch} />
                        <IconTitle>{t('nav.search')}</IconTitle>
                    </FootItem>
                    <FootItem to="/articles" {...(
                            pathname === "/articles" || pathname.includes("/article/") ?
                            { active: 'yes' } :
                            {}
                        )}>
                        <Icon icon={faList} />
                        <IconTitle>{t('nav.articles')}</IconTitle>
                    </FootItem>
                    <FootItem to="/library" {...(
                            pathname === "/library" ?
                            { active: 'yes' } :
                            {}
                        )}>
                        <Icon icon={faBookmark} />
                        <IconTitle>{t('nav.library')}</IconTitle>
                    </FootItem>
                    <FootItem onClick={() => setIsOpen(true)}>
                        <Icon icon={faBars} />
                        <IconTitle>{t('nav.more')}</IconTitle>
                    </FootItem>
                </FootList>
            </Foot>
        </>
    );
}

export default Footer;
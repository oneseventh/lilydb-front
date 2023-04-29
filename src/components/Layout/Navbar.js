import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import { Navbar, NavLogo, NavList, NavItem, NavHorizontalRule, LogoPC, LogoMobile, Account, AccountProfile, AccountName } from "./styles/Navbar";
import { Link, useLocation } from "react-router-dom";

import { useTheme } from "ThemeProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faList, faNoteSticky, faShuffle, faMoon, faSun, faBookmark, faPlusSquare, faGear, faFlag, faB } from "@fortawesome/free-solid-svg-icons";
import { SettingModal } from "components/Modal";
import { Cookies, getCookie } from "hooks/cookie";

const NavItems = (props) => (
    <NavItem as="li" active={props.active} onClick={props.click && props.click}>
        <Link to={props.to ? props.to : "#"} aria-label={props.label}>
            <FontAwesomeIcon icon={props.icon} />
            <span>{props.label}</span>
        </Link>
    </NavItem>
)

function Navigation() {
    const { t } = useTranslation();
    const { pathname } = useLocation();

    const screenSize = useMediaQuery({query: '(max-width:1400px)'});
    const [isSmall, setSmall] = React.useState(screenSize);

    const [themeMode, toggleTheme] = useTheme();
    const [setting, openSetting] = React.useState(false);

    useEffect(() => {
        setSmall(screenSize);
    }, [screenSize]);

    return (
        <>
            { setting && <SettingModal onClose={(reload) => {
                openSetting(false);
                if (reload) window.location.reload();
            }} /> }
            <Navbar>
                <NavLogo title={t('root.servicename')}>
                    { isSmall ? LogoMobile() : LogoPC() }
                </NavLogo>
                <NavList as="ul">
                    <NavItems active={pathname === "/"} to="/" label={t('nav.home')} icon={faHome} />
                    <NavItems active={pathname === "/search" || pathname.includes("/tags/") || pathname.includes("/author/")} to="/search" label={t('nav.search')} icon={faSearch} />
                    <NavItems active={pathname === "/articles" || pathname.includes("/article/") || (pathname.includes("/collection/") && !pathname.includes("/create"))} to="/articles" label={t('nav.articles')} icon={faList} />
                    <NavItems active={pathname === "/library"} to="/library" label={t('nav.library')} icon={faBookmark} />
                    <NavItems active={pathname === "/update"} to="/update" label={t('nav.update')} icon={faNoteSticky} />
                    <li>
                        <NavHorizontalRule />
                    </li>
                    <NavItems to="/random" label={t('nav.random')} icon={faShuffle} />
                    <NavItems active={pathname === "/collection/create"} to="/collection/create" label={t('nav.collection')} icon={faPlusSquare} />
                    {themeMode === 'dark' ? 
                        <NavItems label={t("nav.light")}icon={faSun} click={toggleTheme} />
                        :
                        <NavItems label={t("nav.dark")} icon={faMoon} click={toggleTheme} />
                    }
                    <NavItems to="https://forms.gle/A8fVR9ecvU7eWKYd7" label={t('nav.request')} icon={faFlag} />
                    <NavItems icon={faGear} label={t('nav.setting')} click={() => openSetting(true)} />
                    <li>
                        <NavHorizontalRule />
                    </li>
                    <NavItems to="https://forms.gle/RefW4kNghbbiZZtTA" label={t('nav.report')} icon={faB} />
                    <NavItems to="https://forms.gle/NrbgSVw6RmN1j9Cb7" label={t('nav.improve')} icon={faB} />
                </NavList>
            </Navbar>
        </>
    );
}

export default Navigation;
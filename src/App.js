import React, { Suspense, useState, useMemo } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";

import { getAdult } from "./hooks/cookie";

import { ThemeProvider } from "./ThemeProvider";
import Loading from "./view/Loading";

import "./lang/lang";
import Collection from "pages/collection/Collection";

import Footer from "components/Layout/Footer";
import Navbar from "components/Layout/Navbar";
import FixedFooter from "components/Layout/FixedFooter";
import { AdultModal } from "components/Modal";
import GlobalStyle from "styles/globalStyle";
import { t } from "i18next";
import LoadingSpinner from "view/LoadingSpinner";
import RouteChangeTracker from "RouteChangeTracker";
import { hot } from "react-hot-loader/root";
import NotFound from "error/NotFound";


const Wrapper = styled.div`
    width: calc(100% - var(--navbar-width));
    margin-left: var(--navbar-width);
    height: 100%;

    @media (max-width: 1000px) {
        width: 100%;
        height: 100%;
        margin-left: 0;
        margin-bottom: calc(var(--footer-height) + 10em);
    }
`;

const Layout = () => {
    const location = useLocation();
    const mobile = useMediaQuery({query: '(max-width:1000px)'});
    const smallUI = useMediaQuery({query: '(max-width:300px)'});

    return (
        <>
            {
                smallUI ? <h1>당신의 화면 사이즈는 {t("root.servicename")}를 이용하기에 적합하지 않습니다.</h1> : (
                    <>
                        {!mobile && <Navbar />}
                        <Wrapper>
                            <Outlet key={location.pathname}/>
                            <FixedFooter />
                        </Wrapper>
                        {mobile && <Footer />}
                    </>
                )
            }
        </>
    );
}

const App = () => {
    const Home = React.lazy(() => import("./pages/Home"));
    const Info = React.lazy(() => import("./pages/info/Info"));
    const Search = React.lazy(() => import("./pages/search/Search"));
    const Article = React.lazy(() => import("./pages/article/Article"));
    const Tag = React.lazy(() => import("./pages/tags/Tag"));
    const Author = React.lazy(() => import("./pages/author/Author"));
    const Library = React.lazy(() => import("./pages/library/Library"));
    const CollectionCreate = React.lazy(() => import("./pages/collection/create/CollectionCreate"));
    const Random = React.lazy(() => import("./pages/Random"));

    return (
        <BrowserRouter>
            <RouteChangeTracker />
            <ThemeProvider>
                <GlobalStyle />
                    {
                        !getAdult() && <AdultModal onClose={() => {
                            window.location.reload();
                        }} />
                    }
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Suspense fallback={<LoadingSpinner />}><Home /></Suspense>} />
                        <Route path="/articles" element={<Suspense fallback={<LoadingSpinner />}><Info /></Suspense>} />
                        <Route path="/search" element={<Suspense fallback={<LoadingSpinner />}><Search /></Suspense>} />
                        <Route path="/article/:id" element={<Suspense fallback={<LoadingSpinner />}><Article /></Suspense>} />
                        <Route path="/tags/:tag" element={<Suspense fallback={<LoadingSpinner />}><Tag /></Suspense>} />
                        <Route path="/author/:author" element={<Suspense fallback={<LoadingSpinner />}><Author /></Suspense>} />
                        <Route path="/library" element={<Suspense fallback={<LoadingSpinner />}><Library /></Suspense>} />
                        <Route path="/random" element={<Suspense fallback={<LoadingSpinner />}><Random /></Suspense>} />
                        <Route path="/collection/:id" element={<Suspense fallback={<LoadingSpinner />}><Collection /></Suspense>} />
                        <Route path="/collection/create" element={<Suspense fallback={<LoadingSpinner />}><CollectionCreate /></Suspense>} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default process.env.NODE_ENV === "development" ? hot(App) : App;
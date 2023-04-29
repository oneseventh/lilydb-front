import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import CardList from "../CardList";
import { Cookies, getCookie } from "../../hooks/cookie";

function Seen() {
    const { t } = useTranslation();
    const [data, setData] = useState(null);
    const recentSeenArticle = getCookie(Cookies.RECENT_SEEN_ARTICLE);

    useEffect(() => {
        if (recentSeenArticle == null || recentSeenArticle.length === 0) {
            setData(null);
            return;
        }

        setData(<CardList title={t('title.recentseen')} articleIds={recentSeenArticle} />);
    }, []);

    return (
        <>
            {data}
        </>
    );
}

export default Seen;
import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({ title, description, keywords, image, url }) => {
    return (
        <Helmet>
            <title>{title ? title : "LilyDB: Reborn"}</title>

            <meta name="description" content={description ? description : "백합 정보가 모두 여기에!"} />
            <meta name="keywords" content={keywords ? keywords.join(", ") : "백합,만화,소설,애니"} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title ? title : "LilyDB: Reborn"} />
            <meta property="og:site_name" content={title ? title : "LilyDB: Reborn"} />
            <meta property="og:description" content={description ? description : "백합 정보가 모두 여기에!"} />
            <meta property="og:image" content={image && image} />
            <meta property="og:url" content={url ? url : "https://lilydb.app"} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? title : "LilyDB: Reborn"} />
            <meta name="twitter:description" content={description ? description : "백합 정보가 모두 여기에!"} />
            <meta name="twitter:image" content={image && image} />

            <link rel="canonical" href={url ? url : "https://lilydb.app"} />
        </Helmet>
    )
}

export default MetaTag;
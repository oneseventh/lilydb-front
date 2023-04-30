import Popular from "components/Card/Popular";
import CardList from "components/CardList";
import React, { Suspense } from "react";

function Manga(props) {
    console.log("Manga");
    return (
        <>
            <Popular />
            <CardList articleIds={[1]} title={"정발 예정작"} />
        </>
    )
}

export default React.memo(Manga);

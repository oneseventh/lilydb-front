import React, { Suspense } from "react";

function Animation() {
    console.log("Animation");
    return (
        <h1>애니</h1>
    )
}

export default React.memo(Animation);

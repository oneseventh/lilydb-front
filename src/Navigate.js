import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Navigate = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Navigate;
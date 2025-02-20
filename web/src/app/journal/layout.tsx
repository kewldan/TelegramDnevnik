import React from "react";
import Navbar from "@/components/navbar";
import TopBar from "@/components/topbar";

export default function AuthedLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <TopBar/>
            {children}
            <Navbar/>
        </>
    )
}
import React from "react";
import Navbar from "@/components/navbar";
import TopBar from "@/components/topbar";
import Loader from "@/components/loader";

export default function AuthedLayout({children}: { children: React.ReactNode }) {
    return (
        <Loader>
            <TopBar/>
            {children}
            <Navbar/>
        </Loader>
    )
}
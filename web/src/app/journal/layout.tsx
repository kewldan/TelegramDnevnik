import React from "react";
import Navbar from "@/components/navbar";

export default function AuthedLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Navbar/>
        </>
    )
}
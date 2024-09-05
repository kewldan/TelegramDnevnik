import Image from "next/image";
import React from "react";

export default function SpbLogo() {
    return (
        <div className="flex items-center justify-center">
            <Image src="/logo.svg" alt="Logo" width={128} height={64} className="w-16"/>
            <div className="text-xl font-serif">
                <p>Петербургское</p>
                <p>Образование</p>
            </div>
        </div>
    )
}
'use client';

import {ReactNode, useEffect, useState} from "react";
import {Loader2} from "lucide-react";

export default function Loader({children}: { children: ReactNode }) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted)
        return (
            <main className="h-screen w-full flex justify-center items-center">
                <Loader2 className="animate-spin w-16 h-16"/>
            </main>
        )

    return children;
}
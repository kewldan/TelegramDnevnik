'use client';

import {ReactNode, useEffect, useState} from "react";
import {Loader2} from "lucide-react";
import {useMiniApp, useSwipeBehavior} from "@telegram-apps/sdk-react";

export default function Loader({children}: { children: ReactNode }) {
    const behavior = useSwipeBehavior(true);
    const app = useMiniApp(true);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!app)
            return;

        app.ready();
    }, [app]);

    useEffect(() => {
        if (!behavior)
            return;

        if (behavior.supports('disableVerticalSwipe'))
            behavior.disableVerticalSwipe();
    }, [behavior]);

    if (!mounted)
        return (
            <main className="h-screen w-full flex justify-center items-center">
                <Loader2 className="animate-spin w-16 h-16"/>
            </main>
        )

    return children;
}
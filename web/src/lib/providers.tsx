'use client';

import {backButton, init, initData, miniApp, swipeBehavior, themeParams, viewport} from "@telegram-apps/sdk-react";
import {ReactNode} from "react";
import Loader from "@/components/loader";
import {useClientOnce} from "@/hooks/useClientOnce";
import {useDidMount} from "@/hooks/useDidMount";

export default function Providers({children}: { children: ReactNode; }) {
    const loaded = useDidMount();

    useClientOnce(() => {
        init();
        (async () => {
            if (backButton.isSupported())
                backButton.mount();

            if (swipeBehavior.isSupported())
                swipeBehavior.mount();

            await miniApp.mount();
            await themeParams.mount();
            initData.restore();
            await viewport.mount();
            viewport.bindCssVars();
        })();
    });

    if (!loaded)
        return (
            <Loader/>
        )

    return children;
}
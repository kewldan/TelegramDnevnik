'use client';

import {useTheme} from "next-themes";
import {useEffect} from "react";
import {miniApp, swipeBehavior, themeParams, useSignal} from "@telegram-apps/sdk-react";

export default function ThemeDaemon() {
    const {setTheme, theme} = useTheme();
    const miniAppMounted = useSignal(miniApp.isMounted);
    const swipeMounted = useSignal(swipeBehavior.isMounted);

    useEffect(() => {
        if (swipeBehavior.disableVertical.isAvailable()) {
            swipeBehavior.disableVertical();
        }
    }, [swipeMounted]);

    useEffect(() => {
        setTheme(themeParams.isDark() ? 'dark' : 'light');
    }, [setTheme]);

    useEffect(() => {
        if (!miniAppMounted)
            return;

        if (theme == 'dark') {
            miniApp.setHeaderColor('#0a0a0a')
            miniApp.setBottomBarColor('#0a0a0a');
            miniApp.setBackgroundColor('#0a0a0a');
        } else if (theme == 'light') {
            miniApp.setHeaderColor('#ffffff')
            miniApp.setBottomBarColor('#ffffff');
            miniApp.setBackgroundColor('#ffffff');
        }
    }, [miniAppMounted, theme]);

    return <></>;
}
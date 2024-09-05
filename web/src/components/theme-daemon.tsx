'use client';

import {useTheme} from "next-themes";
import {useEffect} from "react";
import {useMiniApp, useThemeParams} from "@telegram-apps/sdk-react";

export default function ThemeDaemon() {
    const {setTheme, theme} = useTheme();
    const app = useMiniApp(true);
    const tgTheme = useThemeParams(true);

    useEffect(() => {
        if (!tgTheme)
            return;

        setTheme(tgTheme.isDark ? 'dark' : 'light');
    }, [setTheme, tgTheme]);

    useEffect(() => {
        if (!app)
            return;

        if (theme == 'dark') {
            app.setHeaderColor('#0a0a0a')
        } else if (theme == 'light') {
            app.setHeaderColor('#ffffff')
        }
    }, [app, theme]);

    return <></>;
}
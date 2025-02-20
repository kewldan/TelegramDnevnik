import "./globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React from "react";
import Providers from "@/lib/providers";
import {ThemeProvider} from "@/components/ui/theme-provider";
import ThemeDaemon from "@/components/theme-daemon";
import {Toaster} from "@/components/ui/sonner";
import {cn} from "@/lib/utils";

export const metadata: Metadata = {
    title: "Электронный дневник",
    description: "Created by kewldan",
};

const font = Inter({
    subsets: ['latin', 'cyrillic']
})

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(font.className, 'antialiased overflow-x-clip')}
        >
        <Providers>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <ThemeDaemon/>
                <Toaster/>
            </ThemeProvider>
        </Providers>
        </body>
        </html>
    );
}

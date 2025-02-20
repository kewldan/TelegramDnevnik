'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import {miniApp} from "@telegram-apps/sdk-react";
import Animation from "@/components/animation";
import SettingsAnimation from '#/animations/_DUCK13_LIKE_OUT.json';

export default function SettingsPage() {
    return (
        <main className="px-2 min-h-visual flex flex-col">
            <div className="flex justify-center items-center h-full grow">
                <Animation animationData={SettingsAnimation} className="w-64 h-64"/>
            </div>
            <div>
                <Button variant="destructive" size="lg" className="w-full" onClick={() => {
                    localStorage.clear();
                    miniApp.close();
                }}>
                    Выйти из аккаунта
                </Button>
                <div className="text-muted-foreground text-sm text-center">
                    <p>
                        Built with NextJS&FastAPI by <a href="https://kewldan.ru"
                                                        target="_blank"
                                                        className="text-primary underline underline-offset-2">kewldan</a>
                    </p>
                    <p>
                        Сделано как ИП за 10 класс в №530 школе.
                    </p>
                </div>
            </div>
        </main>
    )
}
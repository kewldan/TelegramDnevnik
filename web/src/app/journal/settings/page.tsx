'use client';

import {Button} from "@/components/ui/button";
import React from "react";
import {useCloudStorage, useMiniApp} from "@telegram-apps/sdk-react";

export default function SettingsPage() {
    const cloudStorage = useCloudStorage(true);
    const app = useMiniApp(true);

    return (
        <main className="px-2 min-h-visual flex flex-col justify-end">
            <div>
                <Button variant="destructive" size="lg" className="w-full" onClick={() => {
                    localStorage.clear();

                    if (cloudStorage) {
                        cloudStorage.delete('token').then();
                    }
                    if (app) {
                        app.close();
                    }
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
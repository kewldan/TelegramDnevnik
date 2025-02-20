'use client';

import React from "react";
import ChildSelector from "@/components/child-selector";
import {Settings, Share2} from "lucide-react";
import {Button} from "@/components/ui/button";
import ACSDrawer from "@/components/acs-drawer";
import BalanceDrawer from "@/components/balance-drawer";
import Link from "next/link";
import {shareURL} from "@telegram-apps/sdk-react";

export default function TopBar() {
    return (
        <div className="sticky top-0 h-12 px-2 flex items-center justify-between w-full bg-background">
            <ChildSelector/>
            <div>
                <Button size="icon" variant="ghost" onClick={() => {
                    shareURL('https://t.me/ednevnik_spb_bot', '👋 Ей! Посмотри, я нашел крутейший дневник с кучей фишек и крутых функций! 😎')
                }}>
                    <Share2/>
                </Button>
                <ACSDrawer/>
                <BalanceDrawer/>
                {/*<Button size="icon" variant="ghost">*/}
                {/*    <Bell/>*/}
                {/*</Button>*/}
                <Button size="icon" variant="ghost" asChild>
                    <Link href="/journal/settings">
                        <Settings/>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
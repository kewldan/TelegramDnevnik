'use client';

import React from "react";
import ChildSelector from "@/components/child-selector";
import {RefreshCcw, Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import ACSDrawer from "@/components/acs-drawer";
import BalanceDrawer from "@/components/balance-drawer";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function TopBar() {
    const router = useRouter();

    return (
        <div className="sticky top-0 h-12 px-2 flex justify-between w-full bg-background">
            <ChildSelector/>
            <div>
                <Button size="icon" variant="ghost" onClick={() => {
                    router.refresh();
                }}>
                    <RefreshCcw/>
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
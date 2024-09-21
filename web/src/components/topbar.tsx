import React from "react";
import ChildSelector from "@/components/child-selector";
import {Bell, RefreshCcw, Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import ACSDrawer from "@/components/acs-drawer";
import BalanceDrawer from "@/components/balance-drawer";

export default function TopBar() {
    return (
        <div className="sticky top-0 h-12 px-2 flex justify-between w-full bg-background">
            <ChildSelector/>
            <div>
                <Button size="icon" variant="ghost">
                    <RefreshCcw/>
                </Button>
                <ACSDrawer/>
                <BalanceDrawer/>
                <Button size="icon" variant="ghost">
                    <Bell/>
                </Button>
                <Button size="icon" variant="ghost">
                    <Settings/>
                </Button>
            </div>
        </div>
    )
}
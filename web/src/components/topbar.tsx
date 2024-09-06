'use client';

import React from "react";
import ChildSelector from "@/components/child-selector";
import {RefreshCcw, Settings} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function TopBar() {
    return (
        <div className="sticky top-0 h-12 px-2 flex justify-between w-full bg-background">
            <ChildSelector/>
            <div>
                <Button size="icon" variant="ghost">
                    <RefreshCcw/>
                </Button>
                <Button size="icon" variant="ghost">
                    <Settings/>
                </Button>
            </div>
        </div>
    )
}
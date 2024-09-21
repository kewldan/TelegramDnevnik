'use client';

import {useSelector} from "react-redux";
import {RootState} from "@/store";
import React, {useEffect, useState} from "react";
import {FinanceItem, getFinance} from "@/lib/api";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Coins} from "lucide-react";
import {formatCurrency} from "@/lib/utils";
import {useHapticFeedback} from "@telegram-apps/sdk-react";

export default function BalanceDrawer() {
    const token = useSelector((root: RootState) => root.auth.token);
    const child = useSelector((root: RootState) => root.child.selected);
    const hapticFeedback = useHapticFeedback(true);

    const [items, setItems] = useState<FinanceItem[]>([]);

    useEffect(() => {
        if (!child || !token)
            return;

        getFinance(token, child.uid).then(setItems);
    }, [child, token]);

    useEffect(() => {
        if (!hapticFeedback)
            return;

        hapticFeedback.impactOccurred('medium');
    }, [hapticFeedback]);

    return (
        <Drawer snapPoints={[1]} fadeFromIndex={0}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Coins/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Финансы</DrawerTitle>
                    <DrawerDescription>{items[0]?.customer}</DrawerDescription>
                </DrawerHeader>
                <div className="p-2 flex flex-col gap-1">
                    {
                        items.map(item => (
                            <div key={item.id}
                                 className="flex gap-2 justify-between items-center border p-2 rounded-md">
                                <span>{item.name}</span>
                                <span>{formatCurrency(item.balance)}</span>
                            </div>
                        ))
                    }
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
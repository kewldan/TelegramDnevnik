'use client';

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
import {Wallet} from "lucide-react";
import {formatCurrency} from "@/lib/utils";
import {useLoginStore} from "@/features/auth";
import {useChildStore} from "@/features/child";

export default function BalanceDrawer() {
    const authStore = useLoginStore();
    const childStore = useChildStore();

    const [items, setItems] = useState<FinanceItem[]>([]);

    useEffect(() => {
        if (!authStore.token || !childStore.child)
            return;

        getFinance(authStore.token, childStore.child.uid).then(setItems).catch(() => {
        });
    }, [authStore.token, childStore.child]);

    return (
        <Drawer snapPoints={[1]} fadeFromIndex={0}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Wallet/>
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
'use client';

import React, {useEffect, useState} from "react";
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
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {ACSItem, getACS} from "@/lib/api";
import {Shield} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useHapticFeedback} from "@telegram-apps/sdk-react";

export default function ACSDrawer() {
    const token = useSelector((root: RootState) => root.auth.token);
    const child = useSelector((root: RootState) => root.child.selected);
    const hapticFeedback = useHapticFeedback(true);

    const [items, setItems] = useState<ACSItem[]>([]);

    useEffect(() => {
        if (!child || !token)
            return;

        getACS(token, child.education_id).then(setItems);
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
                    <Shield/>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Учет посещаемости</DrawerTitle>
                    <DrawerDescription>{child?.surname} {child?.first_name}</DrawerDescription>
                </DrawerHeader>
                <ScrollArea className="max-h-72">
                    <div className="p-2 flex flex-col gap-1">
                        {
                            items.map(item => (
                                <div key={item.id}
                                     className="flex gap-2 justify-between items-center border p-2 rounded-md">
                                    <span>{item.date}</span>
                                    <span>{item.dir === 'i' ? 'Вход' : 'Выход'}</span>
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
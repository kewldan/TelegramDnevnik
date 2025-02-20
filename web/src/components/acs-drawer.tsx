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
import {ACSItem, getACS} from "@/lib/api";
import {Shield} from "lucide-react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useLoginStore} from "@/features/auth";
import {useChildStore} from "@/features/child";

export default function ACSDrawer() {
    const authStore = useLoginStore();
    const childStore = useChildStore();

    const [items, setItems] = useState<ACSItem[]>([]);

    useEffect(() => {
        if (!authStore.token || !childStore.child)
            return;

        getACS(authStore.token, childStore.child.education_id).then(setItems).catch(() => {
        });
    }, [authStore.token, childStore.child]);

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
                    <DrawerDescription>{childStore.child?.surname} {childStore.child?.first_name}</DrawerDescription>
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
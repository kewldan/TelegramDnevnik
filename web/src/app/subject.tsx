'use client';

import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Subject} from "@/lib/api";
import Mark, {MarkValue} from "@/components/mark";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {ChevronDown} from "lucide-react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function SubjectCard({subject}: { subject: Subject }) {
    const avg = subject.marks.reduce((sum, mark) => sum + mark.value, 0) / subject.marks.reduce((sum, mark) => sum + 1, 0);
    const period = useSelector((root: RootState) => root.period.period);

    return (
        <Drawer fadeFromIndex={0} snapPoints={[1]}>
            <DrawerTrigger className="border rounded-lg p-2 flex justify-between">
                <div className="flex flex-col items-start w-full pr-4">
                    <p className="text-lg font-medium">{subject.name}</p>
                    <div className="flex gap-0.5">
                        {
                            subject.marks.map(mark => (
                                <Mark key={mark.id} value={mark.value as MarkValue}
                                      className="text-lg"/>
                            ))
                        }
                    </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                    <Badge variant="secondary">
                                                    <span className={cn('text-purple-500',
                                                        avg >= 1.5 && 'text-red-500',
                                                        avg >= 2.5 && 'text-yellow-600',
                                                        avg >= 3.5 && 'text-green-400',
                                                        avg >= 4.5 && 'text-green-600')}>
                                                        {avg.toFixed(2)}
                                                    </span>
                    </Badge>
                    <ChevronDown className="text-muted-foreground"/>
                </div>
            </DrawerTrigger>
            <DrawerContent className="min-h-screen">
                <DrawerHeader>
                    <DrawerTitle>{subject.name}</DrawerTitle>
                    <DrawerDescription>за {period?.name}</DrawerDescription>
                </DrawerHeader>
                <ScrollArea className="max-h-72">
                    <div className="p-2">
                        {
                            subject.marks.map(mark => (
                                <div key={mark.id.toString()} className="flex gap-2 text-lg">
                                    <span>{mark.date}</span>
                                    <Mark value={mark.value as MarkValue}/>
                                    <span>{mark.why}</span>
                                    <span>{mark.comment}</span>
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}
'use client';

import React from "react";
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
import {Subject} from "@/lib/api";
import Mark, {MarkValue} from "@/components/mark";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {ChevronDown} from "lucide-react";

export default function SubjectCard({subject}: { subject: Subject }) {
    const avg = subject.marks.reduce((sum, mark) => sum + mark.value, 0) / subject.marks.reduce((sum, mark) => sum + 1, 0);

    return (
        <Drawer>
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
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
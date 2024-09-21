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
import {Subject} from "@/lib/api";
import Mark, {MarkValue} from "@/components/mark";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";

const weights: Record<string, number> = {
    "Работа на уроке": 1,
    "Домашнее задание": 1,
    "Самостоятельная работа": 1.2,
    "Практическая работа": 1.3,
    "Лабораторная работа": 1.3,
    "Проверочная работа": 1.3,
    "Словарный диктант": 1.4,
    "Контрольная работа": 1.5,
    "Административная контрольная работа": 1.5,
    "Срезовая работа": 1.3,
    "Контрольная практическая работа": 1.5,
    "Классное сочинение": 1.5,
    "Домашнее сочинение": 1.4,
    "Аудирование": 1.4,
    "Контрольный диктант": 1.5,
    "Зачет": 1.5,
    "Изложение": 1.4,
    "Дистанционный урок": 1,
    "Электронное обучение": 1,
    "Тест": 1,
    "Ведение тетради": 1,
    "Чтение наизусть": 1,
    "Сочинение": 1,
    "Пр.": 1,
    "Викторина": 1,
    "Работа над ошибками": 1,
    "Контроль УУД": 1,
}

export default function SubjectCard({subject}: { subject: Subject }) {
    const avg = subject.marks.reduce((sum, mark) => sum + mark.value * (weights[mark.why] || 1), 0) / subject.marks.reduce((sum, mark) => sum + (weights[mark.why] || 1), 0);
    const period = useSelector((root: RootState) => root.period.period);

    return (
        <Drawer fadeFromIndex={0} snapPoints={[1]}>
            <DrawerTrigger className="border rounded-lg p-2 flex justify-between">
                <div className="flex flex-col items-start w-full pr-4">
                    <p className="text-lg font-medium text-left">{subject.name}</p>
                    <div className="flex gap-0.5">
                        {
                            subject.marks.map(mark => (
                                <Mark key={mark.id} value={mark.value as MarkValue}
                                      className="text-lg"/>
                            ))
                        }
                    </div>
                </div>
                <Badge variant="secondary">
                                                    <span className={cn('text-purple-500',
                                                        avg >= 1.5 && 'text-red-500',
                                                        avg >= 2.5 && 'text-yellow-600',
                                                        avg >= 3.5 && 'text-green-400',
                                                        avg >= 4.5 && 'text-green-600')}>
                                                        {avg.toFixed(2)}
                                                    </span>
                </Badge>
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
                                    <span className="w-24">{mark.date}</span>
                                    <Mark value={mark.value as MarkValue} className="w-3"/>
                                    <span>{mark.why}</span>
                                    <span>{mark.comment}</span>
                                </div>
                            ))
                        }
                    </div>
                </ScrollArea>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">
                            Закрыть
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
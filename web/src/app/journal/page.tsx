'use client';

import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import React, {ReactNode} from "react";
import Mark, {MarkValue} from "@/components/mark";
import {
    Atom,
    Book,
    Calculator,
    DollarSign,
    Globe,
    Microscope,
    Music,
    Palette,
    Pen,
    PersonStanding,
    Ruler,
    Shield,
    Sparkles,
    TriangleAlert
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

type MarkType =
    'Проверочная работа'
    | 'Домашнее задание'
    | 'Работа на уроке'
    | 'Самостоятельная работа'
    | 'Контрольная работа'
    | 'Проект'
    | 'Выступление';

type Mark = {
    value: MarkValue;
    day: `${number}.${number}.${number}`
    type: MarkType;
}

type Subject = {
    key: string;
    name: string;
    marks: Mark[];
    icon?: ReactNode;
    target?: MarkValue;
}

const coefficients: Record<MarkType, number> = {
    'Проверочная работа': 1.2,
    'Домашнее задание': 1.0,
    'Работа на уроке': 1.1,
    'Самостоятельная работа': 1.1,
    'Контрольная работа': 1.3,
    'Проект': 1.3,
    'Выступление': 1.3,
};

const subjects: Subject[] = [
    {
        key: 'algebra', name: 'Алгебра', icon: <Calculator/>,
        marks: [
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 3, day: '06.09.2024', type: 'Домашнее задание'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 4, day: '04.09.2024', type: 'Самостоятельная работа'},
            {value: 5, day: '02.09.2024', type: 'Контрольная работа'},
        ],
    },
    {
        key: 'geometry', name: 'Геометрия', icon: <Ruler/>, marks: [
            {value: 4, day: '06.09.2024', type: 'Работа на уроке'},
            {value: 5, day: '05.09.2024', type: 'Контрольная работа'},
            {value: 2, day: '04.09.2024', type: 'Проверочная работа'},
            {value: 3, day: '02.09.2024', type: 'Домашнее задание'},
        ],
        target: 5
    },
    {
        key: 'russian', name: 'Русский язык', icon: <Pen/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Контрольная работа'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ],
        target: 5
    },
    {
        key: 'literature', name: 'Литература', icon: <Book/>, marks: [
            {value: 4, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 5, day: '05.09.2024', type: 'Самостоятельная работа'},
            {value: 3, day: '04.09.2024', type: 'Работа на уроке'},
        ]
    },
    {
        key: 'history', name: 'История', icon: <Globe/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Контрольная работа'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'biology', name: 'Биология', icon: <Microscope/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 4, day: '05.09.2024', type: 'Самостоятельная работа'},
            {value: 3, day: '04.09.2024', type: 'Работа на уроке'},
        ]
    },
    {
        key: 'chemistry', name: 'Химия', icon: <Sparkles/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Контрольная работа'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 2, day: '04.09.2024', type: 'Проверочная работа'},
        ]
    },
    {
        key: 'physics', name: 'Физика', icon: <Atom/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Контрольная работа'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'foreign_language', name: 'Иностранный язык', icon: <Globe/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Контрольная работа'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 2, day: '04.09.2024', type: 'Проверочная работа'},
        ]
    },
    {
        key: 'physical_education', name: 'Физическая культура', icon: <PersonStanding/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'art', name: 'Искусство', icon: <Palette/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Проект'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'music', name: 'Музыка', icon: <Music/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Выступление'},
            {value: 2, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'social_studies', name: 'Обществознание', icon: <Globe/>, marks: [
            {value: 2, day: '06.09.2024', type: 'Контрольная работа'},
            {value: 1, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'safety', name: 'ОБЖ', icon: <Shield/>, marks: [
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 5, day: '06.09.2024', type: 'Проверочная работа'},
            {value: 4, day: '05.09.2024', type: 'Работа на уроке'},
            {value: 3, day: '04.09.2024', type: 'Домашнее задание'},
        ]
    },
    {
        key: 'economics', name: 'Экономика', icon: <DollarSign/>, marks: [
            {value: 1, day: '06.09.2024', type: 'Контрольная работа'},
        ],
        target: 5
    }
]

export default function Home() {
    const token = useSelector((root: RootState) => root.auth.token);
    const selected = useSelector((root: RootState) => root.child.selected);

    return (
        <main className="px-2">
            <Tabs defaultValue="1" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="1">1 чет.</TabsTrigger>
                    <TabsTrigger value="2">2 чет.</TabsTrigger>
                    <TabsTrigger value="3">3 чет.</TabsTrigger>
                    <TabsTrigger value="4">4 чет.</TabsTrigger>
                    <TabsTrigger value="year">Год</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="flex flex-col gap-2">
                {
                    subjects.map(item => {
                        const avg = item.marks.reduce((sum, mark) => sum + mark.value * coefficients[mark.type], 0) / item.marks.reduce((sum, mark) => sum + coefficients[mark.type], 0);

                        return (
                            <Accordion key={item.key} type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex justify-between w-full pr-4">
                                            <div className="flex">
                                                <div className="flex gap-2">
                                                    {item.icon}
                                                    <span className="text-xl">{item.name}</span>
                                                    <TooltipProvider>
                                                        {
                                                            avg <= 2.5 && (
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                    <span className="text-red-500">
                                                                        <TriangleAlert/>
                                                                    </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Низкий балл</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            )
                                                        }
                                                        {
                                                            item.marks.length < 3 && (
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                    <span className="text-red-500">
                                                                        <TriangleAlert/>
                                                                    </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Не аттестация</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            )
                                                        }
                                                        {
                                                            item.target && Math.floor(avg + .5) < item.target && (
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                    <span className="text-yellow-600">
                                                                        <TriangleAlert/>
                                                                    </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Цель ({item.target}) не выполнена</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            )
                                                        }
                                                    </TooltipProvider>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="text-xl gap-1 flex font-bold">
                                                    {
                                                        item.marks.length > 5 ? (
                                                            <>
                                                                <span
                                                                    className="font-light text-muted-foreground">...</span>
                                                                {item.marks.slice(-4).map((mark, i) => (
                                                                    <Mark value={mark.value}
                                                                          key={`${mark.value}-${i}`}/>
                                                                ))}
                                                            </>
                                                        ) : (
                                                            item.marks.map((mark, i) => (
                                                                <Mark value={mark.value} key={`${mark.value}-${i}`}/>
                                                            ))
                                                        )
                                                    }
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
                                            </div>
                                        </div>

                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {
                                            item.target && (
                                                <div className="flex justify-between">
                                                    <p>Цель обучения: <Mark value={5}/></p>
                                                    <p>До цели: <span
                                                        className="text-[12px] text-muted-foreground">{6}x</span><Mark
                                                        value={5}/></p>
                                                    <span>До аттестации: {46} уроков</span>
                                                </div>
                                            )
                                        }
                                        <table className="table-fixed">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                item.marks.map((mark, i) => (
                                                    <tr key={`${mark.value}-${i}`} className="gap-2">
                                                        <td>{mark.day}</td>
                                                        <td className="font-bold text-xl px-4"><Mark
                                                            value={mark.value}/>
                                                        </td>
                                                        <td>{mark.type}</td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )
                    })
                }
            </div>
        </main>
    );
}

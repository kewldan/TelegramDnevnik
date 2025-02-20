'use client';

import React, {useEffect, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {getSubjects, Subject} from "@/lib/api";
import SubjectCard from "@/components/subject";
import {useLoginStore} from "@/features/auth";
import {usePeriodStore} from "@/features/period";
import {useChildStore} from "@/features/child";

export default function Home() {
    const authStore = useLoginStore();
    const periodStore = usePeriodStore();
    const childStore = useChildStore();
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        if (!authStore.token || !periodStore.period || !childStore.child)
            return;

        getSubjects(authStore.token, childStore.child.education_id, periodStore.period.from, periodStore.period.to).then(setSubjects);
    }, [authStore.token, childStore.child, periodStore.period]);

    useEffect(() => {
        if (periodStore.period || !childStore.child)
            return;

        periodStore.setPeriod(childStore.child.periods[0])
    }, [childStore.child, periodStore])

    return (
        <main className="px-2 min-h-visual">
            {
                childStore.child && periodStore.period && (
                    <Tabs onValueChange={v => {
                        const period = childStore.child?.periods.find(item => item.id.toString() === v);

                        if (period)
                            periodStore.setPeriod(period)
                    }} value={periodStore.period.id.toString()} className="w-full">
                        <TabsList className="w-full">
                            {
                                childStore.child?.periods.map(item => (
                                    <TabsTrigger value={item.id.toString()} key={item.id}>{item.name}</TabsTrigger>
                                ))
                            }
                        </TabsList>
                    </Tabs>
                )
            }

            <div className="flex flex-col gap-2 mt-4">
                {
                    subjects.map(item => (
                        <SubjectCard subject={item} key={item.id.toString()}/>
                    ))
                }
            </div>
        </main>
    );
}

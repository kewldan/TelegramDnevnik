'use client';

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import React, {useEffect, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Child, getSubjects, Subject} from "@/lib/api";
import SubjectCard from "@/components/subject";
import {setSelectedPeriod} from "@/features/periodSlice";

export default function Home() {
    const token = useSelector((root: RootState) => root.auth.token);
    const period = useSelector((root: RootState) => root.period.period);
    const selected = useSelector((root: RootState) => root.child.selected) as Child | null;
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selected || !token || !period)
            return;

        getSubjects(token, selected.education_id, period.from, period.to).then(setSubjects);
    }, [period, selected, token]);

    useEffect(() => {
        if (!selected || period !== null)
            return;

        dispatch(setSelectedPeriod(selected.periods[0]));
    }, [dispatch, period, selected])

    return (
        <main className="px-2">
            {
                selected && period && (
                    <Tabs onValueChange={v => {
                        const period = selected.periods.find(item => item.id.toString() === v);

                        if (period)
                            dispatch(setSelectedPeriod(period));
                    }} value={period.id.toString()} className="w-full">
                        <TabsList className="w-full">
                            {
                                selected?.periods.map(item => (
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

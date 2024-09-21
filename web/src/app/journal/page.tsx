'use client';

import {useSelector} from "react-redux";
import {RootState} from "@/store";
import React, {useEffect, useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Child, getSubjects, Subject} from "@/lib/api";
import SubjectCard from "@/app/subject";

export default function Home() {
    const token = useSelector((root: RootState) => root.auth.token);
    const selected = useSelector((root: RootState) => root.child.selected) as Child | null;
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        if (!selected)
            return;

        getSubjects(token, selected.education_id).then(setSubjects);
    }, [selected, token]);

    return (
        <main className="px-2">
            {
                selected && (
                    <Tabs defaultValue={selected.periods[0].id.toString()} className="w-full">
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

'use client';

import {getTeachers, Teacher} from "@/lib/api";
import {useEffect, useState} from "react";
import {useLoginStore} from "@/features/auth";
import {useChildStore} from "@/features/child";

export default function JobPage() {
    const authStore = useLoginStore();
    const childStore = useChildStore();
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        if (!authStore.token || !childStore.child)
            return;

        getTeachers(authStore.token, childStore.child.education_id).then(setTeachers);
    }, [authStore.token, childStore.child]);

    return (
        <main className="min-h-visual px-2">
            <div className="flex flex-col gap-2">
                {
                    teachers.map(teacher => (
                        <div key={teacher.id.toString()} className="p-2 border rounded-lg">
                            <p className="font-medium">
                                {teacher.name}
                            </p>
                            <p className="font-light text-sm">
                                {teacher.position}
                            </p>
                            <ol className="font-light text-sm text-muted-foreground list-decimal ml-4">
                                {teacher.subjects.map(subject => (
                                    <li key={subject.id.toString()}>
                                        {subject.name}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}
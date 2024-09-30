'use client';

import {Child, getTeachers, Teacher} from "@/lib/api";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useEffect, useState} from "react";

export default function JobPage() {
    const token = useSelector((root: RootState) => root.auth.token);
    const selected = useSelector((root: RootState) => root.child.selected) as Child | null;
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        if (!selected || !token)
            return;

        getTeachers(token, selected.education_id).then(setTeachers);
    }, [selected, token]);

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
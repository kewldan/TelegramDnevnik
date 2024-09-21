'use client';

import {getSchedule} from "@/lib/api";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export default function JobPage() {
    const token = useSelector((root: RootState) => root.auth.token);
    const child = useSelector((root: RootState) => root.child.selected);

    useEffect(() => {
        if (!child || !token)
            return;

        getSchedule(token, child.education_id).then(console.log);
    }, [child, token]);

    return (
        <main className="p-2">
            Расписание
        </main>
    )
}
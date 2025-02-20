'use client';

import {getSchedule} from "@/lib/api";
import {useEffect} from "react";
import {useLoginStore} from "@/features/auth";
import {useChildStore} from "@/features/child";

export default function JobPage() {
    const authStore = useLoginStore();
    const childStore = useChildStore();

    useEffect(() => {
        if (!childStore.child || !authStore.token)
            return;

        getSchedule(authStore.token, childStore.child.education_id).then(console.log);
    }, [authStore.token, childStore.child]);

    return (
        <main className="p-2 min-h-visual">
            Пу-пу-пу
        </main>
    )
}
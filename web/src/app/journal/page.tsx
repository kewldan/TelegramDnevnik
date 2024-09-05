'use client';

import {useEffect, useState} from "react";
import {useCloudStorage} from "@telegram-apps/sdk-react";
import {toast} from "sonner";
import {Child, getChildren} from "@/lib/api";
import {useRouter} from "next/navigation";

export default function Home() {
    const cloud = useCloudStorage(true);
    const [children, setChildren] = useState<Child[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!cloud)
            return;

        toast.promise(async () => {
            const token = await cloud.get('token');

            if (!token || token.length === 0)
                router.replace('/');

            setChildren(await getChildren(token));
        }, {
            error: err => `Ошибка. ${err}`
        })
    }, [cloud, router]);
    return (
        <main className="p-2 break-words">
            <div>
                {
                    children?.map(item => (
                        <div key={item.uid}>
                            {item.surname} {item.first_name} {item.middle_name} ({item.education_name})
                            [{item.group_name}]
                        </div>
                    ))
                }
            </div>
        </main>
    );
}

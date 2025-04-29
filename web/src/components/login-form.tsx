'use client';

import SpbLogo from "@/components/spb-logo";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {toast} from "sonner";
import {getToken} from "@/lib/api";
import {useRouter} from "next/navigation";
import {useLoginStore} from "@/features/auth";

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const authStore = useLoginStore();

    const router = useRouter();

    return (
        <div className="flex flex-col gap-1 items-center w-full max-w-sm">
            <SpbLogo/>
            <div className="w-full">
                <Label>Почта</Label>
                <Input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="w-full">
                <Label>Пароль</Label>
                <Input type="password" autoComplete="current-password" value={password}
                       onChange={e => setPassword(e.target.value)}/>
            </div>
            <Button className="w-full" type="submit" onClick={() => {
                toast.promise(async () => {
                    const token = await getToken(email, password);

                    authStore.login(token);
                    router.push('/journal');
                }, {
                    success: 'Аккаунт добавлен',
                    error: err => `Ошибка. ${err.message}`
                })
            }}>
                Войти
            </Button>
        </div>
    )
}
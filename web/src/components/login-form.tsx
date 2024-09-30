'use client';

import SpbLogo from "@/components/spb-logo";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useCloudStorage} from "@telegram-apps/sdk-react";
import {toast} from "sonner";
import {getToken} from "@/lib/api";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setToken} from "@/features/authSlice";

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const cloud = useCloudStorage(true);

    const router = useRouter();
    const dispatch = useDispatch();

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
                if (!cloud)
                    return;

                toast.promise(async () => {
                    const token = await getToken(email, password);

                    await cloud.set('token', token);

                    dispatch(setToken(token));

                    router.push('/journal');
                }, {
                    success: 'Аккаунт добавлен',
                    error: err => `Ошибка. ${err}`
                })
            }}>
                Войти
            </Button>
        </div>
    )
}
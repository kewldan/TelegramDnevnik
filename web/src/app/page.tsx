'use client';

import Animation from "@/components/animation";
import GreetingAnimation from '#/animations/_DUCK16_HEY_OUT.json';
import CoolAnimation from '#/animations/_DUCK5_DEAL_OUT.json';
import PrivacyAnimation from '#/animations/_005_PRIVATE_OUT.json';
import LoginAnimation from '#/animations/_DUCK23_HEARTS_OUT.json';
import React, {ReactNode, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import LoginForm from "@/components/login-form";
import {useRouter} from "next/navigation";
import {useLoginStore} from "@/features/auth";

type Slide = {
    animation: Record<string, unknown>;
    title: ReactNode;
    description: ReactNode;
    button: string;
}

const slides: Slide[] = [
    {
        animation: GreetingAnimation,
        title: `Привет!`,
        description: (
            <>
                <p>Это <span className="font-bold text-green-500">новый клиент</span> для ЭД Санкт-Петербурга. Созданный
                    в качестве
                    альтернативы официальному приложению</p>
            </>

        ),
        button: 'Привет!'
    },
    {
        animation: CoolAnimation,
        title: `Почему не \<название приложения\>?`,
        description: (
            <ul className="list-disc pl-4">
                <li><span className="font-bold">Синхронизация</span> аккаунтов в Вашем Телеграмм аккаунте</li>
                <li><span className="font-bold">Красота и удобство</span>, интерфейс разработан дизайнером</li>
                <li><span className="font-bold">Скорость</span>, уведомления приходят как можно быстрее</li>
            </ul>
        ),
        button: 'Круто!'
    },
    {
        animation: PrivacyAnimation,
        title: (
            <p>ВЫ ЖЕ <span className="text-red-500">СКАММЕРЫ</span>, УКРАДЕТЕ ПАРОЛЬ МАМЫЫЫ!!</p>
        ),
        description: (
            <p className="font-medium">
                Нам, конечно же, очень интересно следить за вашими оценками, но дело в том, что <span
                className="underline">мы не храним ваши логины
                или пароли</span>. Все хранится у вас на устройстве
            </p>
        ),
        button: 'ДАВАЙТЕ МНЕ УЖЕ ВОЙТИ!'
    },
    {
        animation: LoginAnimation,
        title: (
            <p>Придержи коней, ковбой</p>
        ),
        description: (
            <p className="font-medium">
                Для начала, тебе нужно войти в аккаунт с данными от официального сайта
            </p>
        ),
        button: ''
    }
]

export default function GreetingPage() {
    const [slide, setSlide] = useState<number>(0);
    const router = useRouter();

    const auth = useLoginStore();

    useEffect(() => {
        if (auth.token) {
            router.replace('/journal');
        }
    }, [router, auth.token]);

    const currentSlide = slides[slide % slides.length];

    return (
        <main className="min-h-screen flex flex-col items-center justify-between gap-4 p-4">
            <Animation animationData={currentSlide.animation} className="w-64 h-64"/>
            <div className="flex gap-4 flex-col">
                <h1 className="text-4xl font-bold">{currentSlide.title}</h1>
                <span>
                    {currentSlide.description}
                </span>
            </div>
            {
                slide === 3 && (
                    <LoginForm/>
                )
            }
            {(slide + 1) !== slides.length && (
                <Button size="lg" className="w-full" onClick={() => {
                    setSlide(v => v + 1);
                }}>
                    {currentSlide.button}
                </Button>
            )}
        </main>
    )
}
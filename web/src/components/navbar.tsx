'use client';

import React from "react";
import {BookOpenText, BriefcaseBusiness, Users} from "lucide-react";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Link from "next/link";

const pages = [
    {name: 'Оценки', href: '/journal', icon: <BookOpenText size={24}/>},
    {name: 'Учителя', href: '/journal/job', icon: <Users size={24}/>},
    {name: 'Расписание', href: '/journal/schedule', icon: <BriefcaseBusiness size={24}/>},
]

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav
            className="sticky bottom-0 w-screen p-1 pt-2 flex justify-around bg-background border-t border-border mt-3">
            {pages.map(item => (
                <Link key={item.href} href={item.href}
                      className={cn('flex flex-col items-center justify-center text-xs gap-0.5 text-muted-foreground w-full', pathname === item.href && 'text-primary')}>
                    {item.icon}
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}
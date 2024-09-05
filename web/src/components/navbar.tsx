import React from "react";
import {BookOpenText, BriefcaseBusiness, NotebookText} from "lucide-react";

const pages = [
    {name: 'Оценки', href: '/', icon: <BookOpenText size={28}/>},
    {name: 'Задания', href: '/job', icon: <NotebookText size={28}/>},
    {name: 'Расписание', href: '/timetable', icon: <BriefcaseBusiness size={28}/>},
]

export default function Navbar() {
    return (
        <nav className="fixed bottom-0 w-full p-1 flex justify-around">
            {pages.map(item => (
                <div key={item.href} className="flex flex-col items-center justify-center text-sm">
                    {item.icon}
                    {item.name}
                </div>
            ))}
        </nav>
    )
}
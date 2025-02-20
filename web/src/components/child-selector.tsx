'use client';

import React, {useEffect, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Child, getChildren} from "@/lib/api";
import {ChevronDown} from "lucide-react";
import {useRouter} from "next/navigation";
import {useLoginStore} from "@/features/auth";
import {useChildStore} from "@/features/child";
import {hapticFeedback} from "@telegram-apps/sdk-react";

export default function ChildSelector() {
    const router = useRouter();
    const auth = useLoginStore();
    const child = useChildStore();
    const [children, setChildren] = useState<Child[]>([]);

    useEffect(() => {
        if (!child.child && children.length > 0) {
            child.setChild(children[0]);
        }
    }, [child, children]);

    useEffect(() => {
        if (!auth.token) {
            router.replace('/');
            return;
        }

        getChildren(auth.token).then(setChildren);
    }, [auth.token, router]);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex gap-1 items-center">
                        {
                            child.child ? (
                                (
                                    <span>{child.child.surname} {child.child.first_name[0]}.</span>
                                )
                            ) : (
                                <span>нет детей</span>
                            )
                        }
                        <ChevronDown/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                        children.map(item => (
                            <DropdownMenuItem key={item.uid} onClick={() => {
                                hapticFeedback.impactOccurred('heavy');
                                child.setChild(item)
                            }}>{item.surname} {item.first_name} [{item.group_name}]</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
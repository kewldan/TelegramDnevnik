'use client';

import React, {useEffect, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Child, getChildren} from "@/lib/api";
import {ChevronDown} from "lucide-react";
import {useRouter} from "next/navigation";
import {useLoginStore} from "@/features/auth";
import {useChildStore} from "@/features/child";
import {hapticFeedback} from "@telegram-apps/sdk-react";
import {usePeriodStore} from "@/features/period";

export default function ChildSelector() {
    const router = useRouter();
    const authStore = useLoginStore();
    const childStore = useChildStore();
    const periodStore = usePeriodStore();
    const [children, setChildren] = useState<Child[]>([]);

    useEffect(() => {
        if (!childStore.child && children.length > 0) {
            childStore.setChild(children[0]);
        }
    }, [childStore, children]);

    useEffect(() => {
        if (!authStore.token) {
            router.replace('/');
            return;
        }

        getChildren(authStore.token).then(setChildren);
    }, [authStore.token, router]);

    return (
        <div>
            {
                children.length > 0 ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex gap-1 items-center">
                                {
                                    childStore.child && (
                                        <span>{childStore.child.surname} {childStore.child.first_name[0]}.</span>
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
                                        childStore.setChild(item)
                                        periodStore.setPeriod(item.periods[0]);
                                    }}>{item.surname} {item.first_name} [{item.group_name}]</DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <p>Нет детей</p>
                )
            }
        </div>
    )
}
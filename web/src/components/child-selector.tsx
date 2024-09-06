'use client';

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {redirect} from "next/navigation";
import {Child, getChildren} from "@/lib/api";
import {setSelectedChild} from "@/features/childSlice";
import {ChevronDown} from "lucide-react";

export default function ChildSelector() {
    const selected = useSelector((state: RootState) => state.child.selected);
    const token = useSelector((state: RootState) => state.auth.token);
    const [children, setChildren] = useState<Child[]>([]);
    const dispatch = useDispatch();

    if (!token)
        redirect('/');

    useEffect(() => {
        getChildren(token).then(children => {
            setChildren(children);

            if (!selected)
                dispatch(setSelectedChild(children[0]));
        });
    }, [dispatch, selected, token]);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex gap-1 items-center">
                        {
                            selected ? (
                                (
                                    <span>{selected.surname} {selected.first_name[0]}.</span>
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
                                dispatch(setSelectedChild(item));
                            }}>{item.surname} {item.first_name} [{item.group_name}]</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
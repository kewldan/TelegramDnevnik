'use client';

import {Child} from "@/lib/api";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface ChildState {
    child: Child | null;
    setChild: (child: Child | null) => void;
}

export const useChildStore = create<ChildState>()(
    persist(
        (set) => ({
            child: null,
            setChild: child => set(state => ({...state, child}))
        }),
        {
            name: 'child-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
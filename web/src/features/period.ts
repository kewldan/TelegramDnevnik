'use client';

import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {Period} from "@/lib/api";

interface PeriodState {
    period: Period | null;
    setPeriod: (child: Period | null) => void;
}

export const usePeriodStore = create<PeriodState>()(
    persist(
        (set) => ({
            period: null,
            setPeriod: period => set(state => ({...state, period}))
        }),
        {
            name: 'period-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
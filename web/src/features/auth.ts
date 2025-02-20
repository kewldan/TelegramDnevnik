'use client';

import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface LoginState {
    token: string | null;
    login: (token: string) => void;
    logOut: () => void;
}

export const useLoginStore = create<LoginState>()(
    persist(
        (set) => ({
            token: null,
            login: token => set(state => ({...state, token})),
            logOut: () => set(state => ({...state, token: null})),
        }),
        {
            name: 'login-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
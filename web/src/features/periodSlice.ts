import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Period} from "@/lib/api";

export interface PeriodState {
    period: Period | null;
}

const initialState: PeriodState = {
    period: null
};

const periodSlice = createSlice({
    name: 'period',
    initialState,
    reducers: {
        setSelectedPeriod(state: PeriodState, action: PayloadAction<Period>) {
            state.period = action.payload;
        },
    },
});

export const {setSelectedPeriod} = periodSlice.actions;
export const periodReducer = periodSlice.reducer;
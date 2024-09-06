import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Child} from "@/lib/api";

interface ChildState {
    selected: Child | null;
}

const initialState: ChildState = {
    selected: null,
};

const childSlice = createSlice({
    name: 'child',
    initialState,
    reducers: {
        setSelectedChild(state, action: PayloadAction<Child>) {
            state.selected = action.payload;
        },
    },
});

export const {setSelectedChild} = childSlice.actions;
export default childSlice.reducer;
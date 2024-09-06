// features/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Определяем типы состояния
interface AuthState {
    token: string | null;
}

// Начальное состояние
const initialState: AuthState = {
    token: null,
};

// Создаем slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
    },
});

// Экспортируем actions и reducer
export const {setToken} = authSlice.actions;
export default authSlice.reducer;
import {configureStore} from '@reduxjs/toolkit';
import {childReducer, ChildState} from './features/childSlice';
import {authReducer, AuthState} from './features/authSlice';
import {periodReducer, PeriodState} from './features/periodSlice';
import {loadState, saveState} from "@/lib/localStorage";

const store = configureStore<{
    auth: AuthState;
    child: ChildState;
    period: PeriodState;
}>({
    reducer: {
        auth: authReducer,
        child: childReducer,
        period: periodReducer
    },
    preloadedState: loadState()
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
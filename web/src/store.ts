import {configureStore} from '@reduxjs/toolkit';
import childReducer from './features/childSlice';
import authReducer from './features/authSlice';
import {loadState, saveState} from "@/lib/localStorage";

const store = configureStore({
    reducer: {
        auth: authReducer,
        child: childReducer,
    } as any,
    preloadedState: loadState()
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
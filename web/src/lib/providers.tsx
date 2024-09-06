'use client';

import {SDKProvider} from "@telegram-apps/sdk-react";
import React, {ReactNode} from "react";
import store from "@/store";
import {Provider} from "react-redux";

export default function Providers({children}: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <SDKProvider acceptCustomStyles debug>
                {children}
            </SDKProvider>
        </Provider>
    )
}
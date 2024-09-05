'use client';

import {SDKProvider} from "@telegram-apps/sdk-react";
import React, {ReactNode} from "react";

export default function Providers({children}: { children: ReactNode }) {
    return (
        <SDKProvider acceptCustomStyles debug>
            {children}
        </SDKProvider>
    )
}
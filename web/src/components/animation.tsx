'use client';

import React from "react";
import dynamic from "next/dynamic";
import {cn} from "@/lib/utils";

const Lottie = dynamic(() => import('react-lottie-player'), {ssr: false});

export default function Animation({className, animationData}: { className?: string; animationData: any }) {
    return (
        <div className={cn(className)}>
            <Lottie loop play animationData={animationData}/>
        </div>
    )
}
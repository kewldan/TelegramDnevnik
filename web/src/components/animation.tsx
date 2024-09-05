'use client';

import type {LottieProps} from "react-lottie-player";
import React from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('react-lottie-player'), {ssr: false});

export default function Animation(params: LottieProps) {
    return <Lottie loop play {...params}/>
}
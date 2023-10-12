import React from "react";

export interface Bubble {
    type: "user" | "gpt",
    text: string,
    content?: React.ReactNode
}

export interface CommonQuestion {
    logo: string,
    question: string
}

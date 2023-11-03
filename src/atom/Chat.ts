import React from "react";

export interface Bubble {
    type: "user" | "gpt",
    text: string,
    metadata?: string;
    original?: string;
    content?: React.ReactNode
    fromGrid?: boolean;  // 버튼 눌러서 나온 채팅여부
}

export interface CommonQuestion {
    logo: string,
    question: string
}

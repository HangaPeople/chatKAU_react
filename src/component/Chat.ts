import React from "react";

export interface Bubble {
    type: "user" | "gpt",
    text: string,
    metadata?: {
        row: number;
        source: string;
    };
    original?: string;
    content?: React.ReactNode
    fromGrid?: boolean;  // 버튼 눌러서 나온 채팅여부
}

export interface CommonQuestion {
    logo: string,
    question: string
}

export interface DetailModalContent {
    content: string;
    hyperLink: string;
}

export interface DetailModalProps {
    isOpen: boolean;
    close: any;
    content: string;
    hyperLink: string;
}

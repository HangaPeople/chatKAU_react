import React from "react";

export interface Bubble {
    type: "user" | "gpt",
    text: string,
    original?: string;
    content?: React.ReactNode
    fromGrid?: boolean;  // 버튼 눌러서 나온 채팅여부
}

export interface CommonQuestion {
    logo: string,
    question: string
}

export const commonQuestions : CommonQuestion[] = [
    {
        "logo": "질문1",
        "question": "오늘 학식 메뉴 뭐야?"
    }
]
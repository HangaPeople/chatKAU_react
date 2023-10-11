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

export const commonQuestions : CommonQuestion[] = [
    {
        "logo": "질문1",
        "question": "오늘 학식 메뉴 뭐야?"
    }
]
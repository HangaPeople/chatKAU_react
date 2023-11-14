export interface Student {
    studentNumber: number;
    name: string;
    major: string;
    majorScore: number; // 전공학점
    generalScore: number; // 교양학점
    totalScore: number; // 총학점
}

export interface StudentInfoRequest {
    studentNumber: string;
    password: string;
}
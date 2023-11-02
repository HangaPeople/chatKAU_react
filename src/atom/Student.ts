export interface Student {
    year: number;
    name: string;
    major: string;
    majorScore: number;
    generalScore: number;
}

export interface StudentInfoRequest {
    studentNumber: string;
    password: string;
}
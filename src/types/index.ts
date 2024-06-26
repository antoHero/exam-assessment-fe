export interface Option {
    id: string;
    content: string;
    isAnswer: boolean | string | number | undefined;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface Question {
    id: string;
    question: string;
    type: "single" | "multiple";
    marks: number;
    options: Option[],
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface Assessment {
    id: string;
	title: string;
	instructions: string;
    date: string;
    duration: string;
    expected_score: number;
	questions: Question[];
	createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface Profile {
    id: string;
	user_id: string;
	phone: string;
    dob: string;
    state: string;
    gender: string;
	type: string;
	createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface User {
    name: string;
	email: string;
	username: string;
    profile: Profile;
	createdAt: string;
    updatedAt: string;
}

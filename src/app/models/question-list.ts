export interface QuestionList {
    response_code: number;
    results: Results[]
}
export interface Results {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: Array<string>,
    selectedAnswer: string;
    indexAnswer: number;
}

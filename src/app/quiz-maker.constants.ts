import { DifficultyLevel } from "./models/category";

export class QuizMakerConstants {
    public static DIFFICULTI_LEVEL: DifficultyLevel[] = [{ name: 'Select difficulty', difficultyName: '' }, { name: 'Easy', difficultyName: 'easy' }, { name: 'Medium', difficultyName: 'medium' }, { name: 'Hard', difficultyName: 'hard' }]
    public static AMOUNT: number = 5;
    public static TYPE: string = 'multiple';
    public static YELLOW_COLOR:string = 'yellow';
    public static RED_COLOR: string = 'red';
    public static GREEN_COLOR:string = 'green';
    public static MARK_RANGE = [0,1,2,3,4,5];

}
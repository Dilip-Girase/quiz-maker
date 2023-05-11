import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, MainCategory, DifficultyLevel } from 'src/app/models/category';
import { QuestionList, Results } from 'src/app/models/question-list';
import { QuizMakerConstants } from 'src/app/quiz-maker.constants';
import { QuizMakerService } from 'src/app/services/quiz-maker.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent {
  difficultyLevels: DifficultyLevel[] = QuizMakerConstants.DIFFICULTI_LEVEL;
  amount: number = QuizMakerConstants.AMOUNT;
  type: string = QuizMakerConstants.TYPE;
  subscription: Subscription = new Subscription();
  categoryList: MainCategory<Category[]>;
  createQuizForm: FormGroup = new FormGroup({
    category: new FormControl('Select category'),
    difficultyLevel: new FormControl('')
  });
  questionList: QuestionList;
  constructor(private quizMakerService: QuizMakerService) { }

  ngOnInit(): void {
    //getting category list.
    this.subscription = this.quizMakerService.getQuizCategory().subscribe((res: MainCategory<Category[]>) => {
      this.categoryList = res;
    });

  }

  //getting question list.
  getQuestionList(): void {
    let category: number = this.createQuizForm.get('category')?.value;
    let difficultyLevel: string = this.createQuizForm.get('difficultyLevel')?.value;

    //if category and difficulty level not selected then questionlist api will not call.
    if (category > 0  && difficultyLevel !== '') {
      this.subscription = this.quizMakerService.getQuestionList(this.amount, category, difficultyLevel, this.type).subscribe((res: QuestionList) => {
        this.questionList = res;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

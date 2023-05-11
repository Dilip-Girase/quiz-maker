import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Results } from 'src/app/models/question-list';
import { QuizMakerConstants } from 'src/app/quiz-maker.constants';
import { QuizMakerService } from 'src/app/services/quiz-maker.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  subscription: Subscription = new Subscription();
  showResults: Results[];
  answerCount: number = 0;
  tottalQuestion: number = QuizMakerConstants.AMOUNT;
  color: string = '';
  constructor(private quizMakerService: QuizMakerService, private route: Router) { }

  ngOnInit(): void {
    this.subscription = this.quizMakerService.quizResultSubscribe$.subscribe((data: Results[]) => {
      this.showResults = data;
    });

    for (let obj of this.showResults) {
      if (obj.correct_answer === obj.selectedAnswer) {
        this.answerCount++;
      }
    }
    //show color band basis on correct answer.
    if (this.answerCount >= QuizMakerConstants.MARK_RANGE[0] && this.answerCount <= QuizMakerConstants.MARK_RANGE[1]) {
      this.color = QuizMakerConstants.RED_COLOR;
    } else if (this.answerCount >= QuizMakerConstants.MARK_RANGE[2] && this.answerCount <= QuizMakerConstants.MARK_RANGE[3]) {
      this.color = QuizMakerConstants.YELLOW_COLOR
    } else if (this.answerCount >= QuizMakerConstants.MARK_RANGE[4] && this.answerCount <= QuizMakerConstants.MARK_RANGE[5]) {
      this.color = QuizMakerConstants.GREEN_COLOR;
    }
  }
  //navigate to create quiz.
  navigateToCreate(): void {
    this.route.navigate(['/', 'createquiz'])
  }

  //unsubscribe when component leave.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

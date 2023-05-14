import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Results } from 'src/app/models/question-list';
import { QuizMakerService } from 'src/app/services/quiz-maker.service';
import { decode } from 'html-entities';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() results: Results[] = [];
  showHideSubmitBtn: boolean = false;
  constructor(private route: Router, private quizMakerService: QuizMakerService) { }
  ngOnInit(): void { }
  //get new question list on every click on create buttton. 
  ngOnChanges(): void {
    this.showHideSubmitBtn = false;
    for (let option of this.results) {
      option.question = decode(option.question);
      option.selectedAnswer = '';
      let insertItemIndex = Math.floor(Math.random() * 4);
      option.incorrect_answers.splice(insertItemIndex, 0, option.correct_answer);
      for (const [index, value] of option.incorrect_answers.entries()) {
        option.incorrect_answers[index] = decode(value);
      }
    }
  }
  chooseAnswer(index: number, selectedAnswer: string, answerIndex: number): void {
    //set selected answer
    if (this.results[index].indexAnswer !== answerIndex) {
      this.results[index].indexAnswer = answerIndex;
      this.results[index].selectedAnswer = selectedAnswer;
    } else {
      this.results[index].indexAnswer = -1;
      this.results[index].selectedAnswer = '';
    }

    // enabled disabled submit button basis on all answer selected.
    let result = this.results.filter(ele => ele.selectedAnswer && ele.selectedAnswer !== '');
    if (result.length === 5) {
      this.showHideSubmitBtn = true;
    } else {
      this.showHideSubmitBtn = false;
    }
  }

  //submit and navigate to result component.
  submitResult(): void {
    this.quizMakerService.saveQuizAnswer(this.results);
    this.route.navigate(['/', 'questionList']);
  }

}

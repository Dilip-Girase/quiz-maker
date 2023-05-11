import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Results } from 'src/app/models/question-list';
import { QuizMakerService } from 'src/app/services/quiz-maker.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() results: Results[];
  showHideSubmitBtn: boolean = false;
  constructor(private route: Router, private quizMakerService: QuizMakerService) { }
  ngOnInit(): void { }
  //get new question list on every click on create buttton. 
  ngOnChanges() {
    this.showHideSubmitBtn = false;
    for (let option of this.results) {
      option.selectedAnswer = '';
      option.incorrect_answers.push(option.correct_answer);
    }
  }
  chooseAnswer(index: number, selectedAnswer: string, answerIndex: number): void {
    //set slected answer
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

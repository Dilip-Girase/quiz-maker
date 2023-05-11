import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizLoaderService {

  isLoaderLoading = new Subject<boolean>();

  constructor() {
  }

  quizLoaderShow() {
    this.isLoaderLoading.next(true);
  }

  quizLoaderHide() {
    this.isLoaderLoading.next(false);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizLoaderService {

  isLoaderLoading = new Subject<boolean>();

  constructor() {
  }

  quizLoaderShow(): void {
    this.isLoaderLoading.next(true);
  }

  quizLoaderHide(): void {
    this.isLoaderLoading.next(false);
  }
}

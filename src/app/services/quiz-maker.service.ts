import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, MainCategory } from '../models/category';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { QuestionList, Results } from '../models/question-list';
@Injectable({
  providedIn: 'root'
})
export class QuizMakerService {
  baseURL: string = 'https://opentdb.com/';
  private quizResult = new BehaviorSubject<Results[]>([] as Results[]);
  public quizResultSubscribe$ = this.quizResult.asObservable();
  constructor(private http: HttpClient) { }

  getQuizCategory(): Observable<MainCategory<Category[]>> {
    const url: string = `${this.baseURL}api_category.php`;
    return this.http.get<MainCategory<Category[]>>(url);
  }

  getQuestionList(amount: number, category: number, difficulty: string, type: string): Observable<QuestionList> {
    const url: string = `${this.baseURL}api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    return this.http.get<QuestionList>(url);
  }

  saveQuizAnswer(data: Results[]) {
    this.quizResult.next(data);
  }
}

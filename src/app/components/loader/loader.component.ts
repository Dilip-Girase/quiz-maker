import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { QuizLoaderService } from 'src/app/services/quiz-loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoaderLoading: Subject<boolean> = this.loaderService.isLoaderLoading;

  constructor(private loaderService: QuizLoaderService) {
  }
}

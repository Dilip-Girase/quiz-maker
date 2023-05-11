import { TestBed } from '@angular/core/testing';

import { QuizLoaderService } from './quiz-loader.service';

describe('QuizLoaderService', () => {
  let service: QuizLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

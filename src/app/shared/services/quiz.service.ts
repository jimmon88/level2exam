import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Category, CategoryWrapper } from '../models/category';
import { Question, QuestionWrapper } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  submittedAnsWithQns!: Question[];

  constructor(private http: HttpClient) {}

  // Fetch available categories from the Open Trivia Database API
  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryWrapper>('https://opentdb.com/api_category.php')
      .pipe(map((res) => res.trivia_categories));
  }

  // Fetch questions from the Open Trivia Database API
  getQuizQuestions(
    amount: number,
    category: number,
    difficulty: string
  ): Observable<Question[]> {
    return this.http
      .get<QuestionWrapper>(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      )
      .pipe(map((res) => res.results));
  }
}

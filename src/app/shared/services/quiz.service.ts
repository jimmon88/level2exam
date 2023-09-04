import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Category, CategoryApiResponse } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  // Fetch available categories from the Open Trivia Database API
  getCategories(): Observable<Category[]> {
    return this.http
      .get<CategoryApiResponse>('https://opentdb.com/api_category.php')
      .pipe(map(res => res.trivia_categories));
  }

  // Fetch questions from the Open Trivia Database API
  getQuizQuestions(
    amount: number,
    category: number,
    difficulty: string
  ): Observable<any> {
    // const params = new URLSearchParams({
    //   amount: amount.toString(),
    //   category: category.toString(),
    //   difficulty: difficulty,
    //   type: 'multiple',
    // });

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // });

    return this.http.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
  }
}

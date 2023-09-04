import { Component } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';
import { Category } from '../shared/models/category';
import { Question } from '../shared/models/question';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
})
export class TriviaComponent {
  categories$!: Observable<Category[]> ;
  selectedCategory!: number;
  selectedDifficulty: string = 'easy';
  questions: Question[] = [];
  isQuizStarted: boolean= false;
  selectedAnswers: number[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    // Fetch categories from the API
    // this.quizService.getCategories().subscribe((categories: Category[]) => {
    //   this.categories = categories;
    // });
    this.categories$= this.quizService.getCategories();
  }

  // Create a new quiz based on selected category and difficulty
  createQuiz() {
    this.quizService
      .getQuizQuestions(5, this.selectedCategory, this.selectedDifficulty)
      .subscribe((data) => {
        this.questions = data?.results.map((question: Question) => {
          // Changing answer orders
          const answers = this.changeAnswerOrder([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return {
            question: question.question,
            correct_answer: question.correct_answer,
            shuffled_answers: answers,
          };
        });
        this.isQuizStarted = true;
      });
  }

  // Changing answer orders
  changeAnswerOrder(answers: string[]) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

    // Method for handling answer selection for question
    onAnswerSelect(questionIndex: number, answerIndex: number) {
      this.selectedAnswers[questionIndex] = answerIndex;
    }
  
  
}

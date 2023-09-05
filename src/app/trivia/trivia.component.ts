import { Component } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';
import { Category } from '../shared/models/category';
import { Question } from '../shared/models/question';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss'],
})
export class TriviaComponent {
  categories$!: Observable<Category[]>;
  selectedCategory!: number;
  selectedDifficulty: string = 'easy';
  questions: Question[] = [];
  isQuizStarted: boolean = false;
  selectedAnswers: number[] = [];
  isQuizCompleted: boolean = false;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.categories$ = this.quizService.getCategories();
    this.isQuizStarted = false;
  }

  // Create a new quiz based on selected category and difficulty
  createQuiz() {
    this.questions = [];
    this.isQuizCompleted = false;
    this.quizService
      .getQuizQuestions(this.selectedCategory, this.selectedDifficulty, 5)
      .subscribe((data) => {
        this.questions = data?.map((question: Question) => {
          // Changing answer orders
          const shuffledAnswers = this.changeAnswerOrder([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return {
            ...question,
            shuffled_answers: shuffledAnswers,
            correct_answer_index: shuffledAnswers.findIndex(
              (ans) => ans === question.correct_answer
            ),
          };
        });
        this.isQuizStarted = true;
      });
  }

  // Changing answer orders based on Fisher-Yates Sorting Algorithm
  changeAnswerOrder(answers: string[]) {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  // Method for handling answer selection for question
  onAnswerSelect(questionIndex: number, answerIndex: number) {
    this.questions[questionIndex].selected_answer_index = answerIndex;

    this.questions[questionIndex].isCorrect =
      this.questions[questionIndex].shuffled_answers.indexOf(
        this.questions[questionIndex].correct_answer
      ) === answerIndex;
    //Checking whether all the answer is selected or not
    this.isQuizCompleted = this.questions.every(
      (qn) => qn.selected_answer_index !== undefined
    );
  }

  // Method to handle submit event of quiz
  submitQuiz() {
    this.quizService.submittedAnsWithQns = this.questions;
    this.router.navigate(['/trivia-results']);
  }
}

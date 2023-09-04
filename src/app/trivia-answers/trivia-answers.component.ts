import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';
import { Router } from '@angular/router';
import { Question } from '../shared/models/question';

@Component({
  selector: 'app-trivia-answers',
  templateUrl: './trivia-answers.component.html',
  styleUrls: ['./trivia-answers.component.scss'],
})
export class TriviaAnswersComponent implements OnInit {
  submittedAnsWithQns!: Question[];
  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    // fetching quiz results from the QuizService
    this.submittedAnsWithQns = this.quizService.submittedAnsWithQns;
    if (!this.submittedAnsWithQns) {
      this.router.navigate(['/trivia']);
    }
    this.submittedAnsWithQns.map((question) => {
      question.shuffled_answers_button_color = question.shuffled_answers.map(
        (ans, index) => {
          return index === question.correct_answer_index
            ? 'green'
            : index === question.selected_answer_index
            ? 'red'
            : 'normal';
        }
      );
    });
    console.log(this.submittedAnsWithQns);
  }
}

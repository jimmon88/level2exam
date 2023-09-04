import { NgModule } from "@angular/core";

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  correct_answer_index:number;
  incorrect_answers: string[];
  shuffled_answers: string[];
  selected_answer_index: number;
  isCorrect: boolean;
  shuffled_answers_button_color:string[];
}

export interface QuestionWrapper {
  response_code: number;
  results: Question[];
}

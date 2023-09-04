import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaComponent } from './trivia/trivia.component';
import { TriviaAnswersComponent } from './trivia-answers/trivia-answers.component';

const routes: Routes = [
  { path: 'trivia', component: TriviaComponent },
  { path: 'trivia-results', component: TriviaAnswersComponent },
  { path: '', redirectTo: '/trivia', pathMatch: 'full' }, // Default route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaComponent } from './trivia/trivia.component';
import { TriviaAnswersComponent } from './trivia-answers/trivia-answers.component';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TriviaComponent, TriviaAnswersComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

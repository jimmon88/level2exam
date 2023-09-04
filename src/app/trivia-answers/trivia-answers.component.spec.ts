import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaAnswersComponent } from './trivia-answers.component';

describe('TriviaAnswersComponent', () => {
  let component: TriviaAnswersComponent;
  let fixture: ComponentFixture<TriviaAnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaAnswersComponent]
    });
    fixture = TestBed.createComponent(TriviaAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

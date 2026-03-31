import {Component, signal, inject, ChangeDetectionStrategy} from '@angular/core';
import { form, FormField, required } from "@angular/forms/signals";
import { boardOptions } from "./enums/boards";
import { RouterOutlet } from '@angular/router';
import { BoardService } from "./board-service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField, ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('k-tech-assesment');
  boardOption = signal({ difficulty: '' });
  private boardService = inject(BoardService);
  options = boardOptions;
  getBoardForm = form(this.boardOption, fieldPath => {
    required(fieldPath, {message: 'Board option is required'});
  });
  onSubmit() {
    this.boardService.getBoard(this.getBoardForm.difficulty().value()).subscribe({
      next: (response) => {
        console.log('Board received:', response);
      },
      error: (error) => {
        console.error('Error fetching board:', error);
      }
    });
  }
}

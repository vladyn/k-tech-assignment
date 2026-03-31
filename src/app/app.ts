import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, required } from "@angular/forms/signals";
import { boardOptions, Boards } from "./enums/boards";
import { RouterOutlet } from '@angular/router';
import { BoardService } from "./board-service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BoardRow } from "./board-row/board-row";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField, ReactiveFormsModule, FormsModule, BoardRow],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('k-tech-assesment');
  boardOption = signal({ difficulty: '' });
  private boardService = inject(BoardService);

  options = boardOptions;
  boardRow = signal<Boards>({ board: [[]] });
  getBoardForm = form(this.boardOption, fieldPath => {
    required(fieldPath, { message: 'Board option is required' });
  });
  setBoardForm = form(this.boardRow);

  onSubmit() {
    this.boardService.getBoard(this.getBoardForm.difficulty().value()).subscribe({
      next: (response) => {
        console.log('Board received:', response);
        this.boardRow.set(response);
        console.log(this.boardRow());
      },
      error: (error) => {
        console.error('Error fetching board:', error);
        // TODO: bring it to the UI
      }
    });
  }

  gradeBoard() {
    this.boardService.gradeBoard(this.boardRow()).subscribe({
      next: (response) => {
        console.log('Grade board:', response);
      },
      error: (error) => {
        console.error('Grade board:', error);
      }
    })
  }

  validateBoard() {
    this.boardService.validateBoard(this.boardRow()).subscribe({
      next: (response) => {
        console.log('Validate board:', response);

      },
      error: (error) => {
        console.error('Error fetching board:', error);
      }
    })
  }

  solveBoard() {
    this.boardService.solveBoard(this.boardRow()).subscribe({
      next: (response) => {
        console.log('Solve board:', response);
        this.boardRow.set({ board: response.solution });
      }
    })
  }
}

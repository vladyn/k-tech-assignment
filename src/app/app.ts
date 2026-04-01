import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, required } from "@angular/forms/signals";
import { boardOptions, Boards } from "./enums/boards";
import { RouterOutlet } from '@angular/router';
import { BoardService } from "./board-service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BoardRow } from "./board-row/board-row";
import { AppStore } from "./app-store";

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
  readonly store = inject(AppStore);

  options = boardOptions;
  getBoardForm = form(this.boardOption, fieldPath => {
    required(fieldPath, { message: 'Board option is required' });
  });

  onSubmit() {
    this.store.setLoading(true);
    this.boardService.getBoard(this.getBoardForm.difficulty().value()).subscribe({
      next: (response) => {
        this.store.setGameStatus('initial');
        this.store.setInitial(response);
        this.store.updateBoard(response);
      },
      error: (error) => {
        this.store.setGameStatus('pending');
        console.error('Error fetching board:', error);
      },
      complete: () => {
        this.store.setLoading(false);
        this.store.setGameStatus('playing');
      }
    });
  }

  gradeBoard() {
    this.store.setLoading(true);
    this.boardService.gradeBoard(this.store.board()).subscribe({
      next: (response) => {
        console.log('Grade board:', response);
      },
      error: (error) => {
        console.error('Grade board:', error);
      },
      complete: () => {
        this.store.setLoading(false);
      }
    });
  }

  validateBoard() {
    this.store.setLoading(true);
    this.boardService.validateBoard(this.store.board()).subscribe({
      next: (response) => {
        this.store.setGameStatus('finished');

      },
      error: (error) => {
        this.store.setGameStatus('pending');
        console.error('Error fetching board:', error);
      },
      complete: () => {
        this.store.setLoading(false);
      }
    });
  }

  solveBoard() {
    this.store.setLoading(true);
    this.boardService.solveBoard(this.store.board()).subscribe({
      next: (response) => {
        this.store.setGameStatus('finished');
        this.store.updateBoard({ board: response.solution });
      },
      error: (error) => {
        this.store.setGameStatus('pending');
        console.error('Error fetching board:', error);
      },
      complete: () => {
        this.store.setLoading(false);
      }
    });
  }

  clearBoard() {
    this.store.updateBoard(this.store.initialBoard());
    this.store.setGameStatus('playing');
  }
}

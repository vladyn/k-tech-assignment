export type SudokuGrid = number[][];

export type BoardDifficulty = 'easy' | 'medium' | 'hard' | 'random';

export const boardOptions = new Set<BoardDifficulty>(['easy', 'medium', 'hard', 'random']);

export type BoardStatus = 'solved' | 'unsolved';

export interface Boards {
  board: SudokuGrid;
}

export interface SolvedBoard {
  difficulty: BoardDifficulty;
  solution: SudokuGrid;
  status: BoardStatus;
}


export type SudokuGrid = number[][];

export type BoardDifficulty = 'easy' | 'medium' | 'hard' | 'random';

export const boardOptions = new Set<BoardDifficulty>(['easy', 'medium', 'hard', 'random']);

export type BoardStatus = 'solved' | 'unsolved' | 'broken' | 'unsolvable';

export type GameStatus = 'finished' | 'playing' | 'pending' | 'initial';

export interface Boards {
  board: SudokuGrid;
}

export interface SolvedBoard {
  difficulty: BoardDifficulty;
  solution: SudokuGrid;
  status: BoardStatus;
}


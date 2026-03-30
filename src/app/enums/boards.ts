export type SudokuGrid = number[][];

export type BoardDifficulty = 'easy' | 'medium' | 'hard';

export type BoardStatus = 'solved' | 'unsolved';

export interface Boards {
  board: SudokuGrid;
}

export interface SolvedBoard {
  difficulty: BoardDifficulty;
  solution: SudokuGrid;
  status: BoardStatus;
}

export default Boards;

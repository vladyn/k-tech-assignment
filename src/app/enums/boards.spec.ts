import type * as boards from './boards';
import {BoardStatus} from "./boards";

describe('Boards', () => {
  it('should allow typed board shapes', () => {
    const board: boards.Boards = {
      board: [[0, 1, 2]],
    };

    expect(board.board.length).toBeGreaterThan(0);
    const boardStatus: BoardStatus = 'solved';
    expect(boardStatus).toBe(boardStatus);
  });
});

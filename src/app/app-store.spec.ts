import { TestBed } from "@angular/core/testing";

import { AppStore } from "./app-store";
import { Boards } from "./enums/boards";

describe("AppStore", () => {
  let service: InstanceType<typeof AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStore);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should update one cell in the board", () => {
    const board: Boards = {
      board: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    };

    service.updateBoard(board);
    service.updateCell(9, 1, 2);

    expect(service.board().board[1][2]).toBe(9);
    expect(service.board().board[0]).toEqual([1, 2, 3]);
  });

  it("should set and unset loading status", () => {
    service.setLoading(true);
    expect(service.isLoading()).toBe(true);

    service.setLoading(false);
    expect(service.isLoading()).toBe(false);
  });

  it("should set and unset game status", () => {
    // status started, playing, validated, solved
    service.setGameStatus('playing');
    expect(service.gameStatus()).toBe('playing');
  });

  it("should set an Error", () => {
    service.setError(new Error("Test error"));
    expect(service.error().message).toBe("Test error");
  })
});

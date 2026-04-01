import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { App } from './app';
import { BoardService } from './board-service';
import { Boards } from './enums/boards';

describe('App', () => {
  const boardResponse: Boards = {
    board: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
  };

  const solvedResponse = {
    status: 'solved' as const,
    solution: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  };

  const boardServiceMock = {
    getBoard: vi.fn(() => of(boardResponse)),
    gradeBoard: vi.fn(() => of({ difficulty: 'easy' })),
    validateBoard: vi.fn(() => of({ status: 'solved' })),
    solveBoard: vi.fn(() => of(solvedResponse)),
  };

  beforeEach(async () => {
    boardServiceMock.getBoard.mockClear();
    boardServiceMock.gradeBoard.mockClear();
    boardServiceMock.validateBoard.mockClear();
    boardServiceMock.solveBoard.mockClear();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: BoardService, useValue: boardServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render board container', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div#board')).toBeTruthy();
  });

  it('should call onSubmit and update board state', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;

    component.boardOption.set({ difficulty: 'easy' });
    component.onSubmit();

    await fixture.whenStable();

    expect(boardServiceMock.getBoard).toHaveBeenCalledWith('easy');
    expect(component.store.initialBoard()).toEqual(boardResponse);
    expect(component.store.board()).toEqual(boardResponse);
    expect(component.store.boardStatus()).toBe('unsolved');
    expect(component.store.gameStatus()).toBe('playing');
    expect(component.store.isLoading()).toBe(false);
  });

  it('should call gradeBoard and stop loading', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    component.store.setInitial(boardResponse);
    component.store.updateBoard(boardResponse);

    component.gradeBoard();
    await fixture.whenStable();

    expect(boardServiceMock.gradeBoard).toHaveBeenCalledWith(component.store.board());
    expect(component.store.isLoading()).toBe(false);
  });

  it('should call validateBoard and set finished solved status', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    component.store.setInitial(boardResponse);
    component.store.updateBoard(boardResponse);

    component.validateBoard();
    await fixture.whenStable();

    expect(boardServiceMock.validateBoard).toHaveBeenCalledWith(component.store.board());
    expect(component.store.boardStatus()).toBe('solved');
    expect(component.store.gameStatus()).toBe('finished');
    expect(component.store.isLoading()).toBe(false);
  });

  it('should call solveBoard and update board with solved solution', async () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    component.store.setInitial(boardResponse);
    component.store.updateBoard(boardResponse);

    component.solveBoard();
    await fixture.whenStable();

    expect(boardServiceMock.solveBoard).toHaveBeenCalledWith({ board: boardResponse.board });
    expect(component.store.board()).toEqual({ board: solvedResponse.solution });
    expect(component.store.boardStatus()).toBe('solved');
    expect(component.store.gameStatus()).toBe('finished');
    expect(component.store.isLoading()).toBe(false);
  });

  it('should clear board and restore initial board', () => {
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;
    const modifiedBoard: Boards = { board: [[9, 9, 9]] };

    component.store.setInitial(boardResponse);
    component.store.updateBoard(modifiedBoard);
    component.store.setGameStatus('finished');

    component.clearBoard();

    expect(component.store.board()).toEqual(boardResponse);
    expect(component.store.gameStatus()).toBe('playing');
  });
});

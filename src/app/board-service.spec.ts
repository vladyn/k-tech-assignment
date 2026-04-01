import { TestBed } from "@angular/core/testing";
import { BoardService } from "./board-service";
import { Boards } from "./enums/boards";
import { HttpParams } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("BoardService", () => {
  let service: BoardService;
  let httpTestingController: HttpTestingController;
  let board: Boards = {
    "board": [
      [
        0,
        0,
        2,
        0,
        4,
        0,
        1,
        5,
        0
      ],
      [
        1,
        0,
        0,
        0,
        0,
        8,
        0,
        0,
        0
      ],
      [
        0,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        8
      ],
      [
        0,
        1,
        0,
        4,
        0,
        0,
        8,
        0,
        7
      ],
      [
        0,
        0,
        0,
        0,
        9,
        0,
        0,
        2,
        6
      ],
      [
        6,
        0,
        9,
        0,
        8,
        0,
        4,
        1,
        0
      ],
      [
        3,
        2,
        0,
        5,
        0,
        6,
        0,
        0,
        4
      ],
      [
        0,
        9,
        0,
        8,
        1,
        0,
        5,
        0,
        2
      ],
      [
        0,
        4,
        0,
        9,
        0,
        0,
        0,
        6,
        1
      ]
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          provideHttpClient(),
          provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(BoardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should check the service methods existence", () => {
    expect(service.getBoard('hard')).toBeTruthy();
    expect(service.solveBoard(board)).toBeTruthy();
    expect(service.gradeBoard(board)).toBeTruthy();
    expect(service.validateBoard(board)).toBeTruthy();
  })

  it("should call getBoard", () => {
    expect(service.getBoard('hard')).toBeInstanceOf(Object);
    service.getBoard('hard').subscribe(board => {
      expect(board).toEqual({ foo: 'bar' });
    });

    const req = httpTestingController.expectOne('https://sugoku.onrender.com/board?difficulty=hard');
    expect(req.request.method).toEqual('GET');
    req.flush({ foo: 'bar' });
  });

  it("should call solveBoard", () => {
    expect(service.solveBoard(board)).toBeInstanceOf(Object);
    service.solveBoard(board).subscribe(board => {
      expect(board).toEqual({ name: 'John Rambo' });
    });

    const req = httpTestingController.expectOne('https://sugoku.onrender.com/solve');
    const encodedBoard = new HttpParams({ fromObject: { board: JSON.stringify(board.board) } }).toString();

    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(encodedBoard);
    req.flush({ name: 'John Rambo' });
  });

  it("should call gradeBoard", () => {
    expect(service.gradeBoard(board)).toBeInstanceOf(Object);
    service.gradeBoard(board).subscribe(board => {
      expect(board).toEqual({
        "difficulty": "hard"
      });
    });

    const req = httpTestingController.expectOne('https://sugoku.onrender.com/grade');
    const encodedBoard = new HttpParams({ fromObject: { board: JSON.stringify(board.board) } }).toString();
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(req.request.body).toBe(encodedBoard);
    req.flush({
      "difficulty": "hard"
    });
  });

  it("should call validateBoard", () => {
    service.validateBoard(board).subscribe(response => {
      expect(response).toEqual({ status: 'solved' });
    });

    const req = httpTestingController.expectOne('https://sugoku.onrender.com/validate');
    const encodedBoard = new HttpParams({ fromObject: { board: JSON.stringify(board.board) } }).toString();

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(req.request.body).toBe(encodedBoard);
    req.flush({ status: 'solved' });
  });
});

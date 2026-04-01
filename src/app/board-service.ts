import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { endpoints } from "./enums/endpoints";
import { Boards, SolvedBoard } from "./enums/boards";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  private http: HttpClient = inject(HttpClient);
  private formUrlEncodedHeaders = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
  });

  public getBoard(difficulty: string) {
    const params = new HttpParams().set("difficulty", difficulty);
    return this.http.get<Boards>(endpoints.getBoard, { params });
  }

  public solveBoard(board: Boards) {
    return this.http.post<SolvedBoard>(endpoints.solveBoard, this.encodeBoard(board), {
      headers: this.formUrlEncodedHeaders,
    });
  }

  public gradeBoard(board: Boards) {
    return this.http.post<SolvedBoard>(endpoints.gradeBoard, this.encodeBoard(board), {
      headers: this.formUrlEncodedHeaders,
    });
  }

  public validateBoard(board: Boards) {
    return this.http.post<SolvedBoard>(endpoints.validateBoard, this.encodeBoard(board), {
      headers: this.formUrlEncodedHeaders,
    });
  }

  private encodeBoard(board: Boards): string {
    return new HttpParams({
      fromObject: {
        board: JSON.stringify(board.board),
      },
    }).toString();
  }
}

import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { endpoints } from "./enums/endpoints";
import { Boards, SolvedBoard } from "./enums/boards";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  private http: HttpClient = inject(HttpClient);

  public getBoard(difficulty: string) {
    const params = new HttpParams().set("difficulty", difficulty);
    return this.http.get<Boards>(endpoints.getBoard, { params });
  }

  public solveBoard(board: Boards) {
    const headers =  new HttpHeaders();
    return this.http.post<SolvedBoard>(endpoints.solveBoard, board, { headers: headers.set("Content-Type", "application/x-www-form-urlencoded") });
  }

  public gradeBoard(board: Boards) {
    const headers =  new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<SolvedBoard>(endpoints.gradeBoard, board, { headers });
  }

  public validateBoard(board: Boards) {
    const headers =  new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<SolvedBoard>(endpoints.validateBoard, board, { headers });
  }
}

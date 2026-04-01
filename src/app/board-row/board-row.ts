import {Component, inject, Input} from "@angular/core";
import { BoardCell } from "../board-cell/board-cell";
import { AppStore } from "../app-store";

@Component({
  selector: "app-board-row",
  imports: [
    BoardCell
  ],
  templateUrl: "./board-row.html",
  styleUrl: "./board-row.css",
  standalone: true,
})
export class BoardRow {
  @Input() boardRowCells!: number[];
  @Input() rowIndex!: number;

  readonly store = inject(AppStore);
}

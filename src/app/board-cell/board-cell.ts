import { Component, Input } from "@angular/core";

@Component({
  selector: "app-board-cell",
  imports: [],
  templateUrl: "./board-cell.html",
  styleUrl: "./board-cell.css",
  standalone: true,
})
export class BoardCell {
  @Input() cellValue: number = 0;
  @Input() cellIndex?: number;
  @Input() rowIndex?: number;
}

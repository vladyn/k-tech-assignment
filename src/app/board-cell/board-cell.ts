import { Component, Input, inject } from "@angular/core";
import { AppStore } from "../app-store";

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
  @Input() disabled?: boolean;

  readonly store = inject(AppStore);

  onCellClicked(value: number) {
      console.log('Cell  clicked:', value, this.rowIndex!, this.cellIndex!);
      this.store.updateCell(value, this.rowIndex!, this.cellIndex!);
  }
}

import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { PeriodicElement, PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TableColumnPipe } from 'src/app/pipes/table-column.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormField,
    MatInput,
    MatLabel,
    TableColumnPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Output() openModal = new EventEmitter<[PeriodicElementWithId | undefined, MouseEvent]>();
  private _filterTimeout: number | undefined;
  readonly data = input.required<PeriodicElementWithId[]>();
  readonly filter = signal<string>('');
  readonly tableData = computed<MatTableDataSource<PeriodicElement>>(() => {
    const dataSource = new MatTableDataSource<PeriodicElement>(this.data().sort((a, b) => a.id - b.id));
    dataSource.filter = this.filter();
    return dataSource;
  });
  readonly displayedColumns = computed<string[]>(() => {
    const [columns] = this.data();
    return columns ? Object.keys(columns).filter((column: string) => column !== 'id') : [];
  });

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    clearTimeout(this._filterTimeout);
    this._filterTimeout = window.setTimeout(() => {
      this.filter.set(filterValue.trim().toLowerCase());
    }, 2000);
  }
}

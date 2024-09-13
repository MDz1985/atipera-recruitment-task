import { Component, computed, input, signal } from '@angular/core';
import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';
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
  private _filterTimeout: number | undefined;
  readonly data = input.required<PeriodicElement[]>();
  readonly filter = signal<string>('');
  readonly tableData = computed<MatTableDataSource<PeriodicElement>>(() => {
    const dataSource = new MatTableDataSource<PeriodicElement>(this.data());
    dataSource.filter = this.filter();
    return dataSource;
  });
  readonly displayedColumns = computed<string[]>(() => this.data()[0] ? Object.keys(this.data()[0]) : []);

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    clearTimeout(this._filterTimeout);
    this._filterTimeout = window.setTimeout(() => {
      this.filter.set(filterValue.trim().toLowerCase());
    }, 2000);
  }
}

import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { PeriodicElement, PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TableColumnPipe } from 'src/app/pipes/table-column.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TABLE_COLUMNS } from 'src/app/data/TABLE_COLUMNS';
import { LoadingShadeComponent } from 'src/app/components/loading-shade/loading-shade.component';

const PLACEHOLDER_ROWS_COUNT = 10;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormField,
    MatInput,
    MatLabel,
    TableColumnPipe,
    MatProgressSpinner,
    LoadingShadeComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Output() openModal = new EventEmitter<[PeriodicElementWithId | undefined, MouseEvent]>();
  readonly data = input.required<PeriodicElementWithId[]>();
  readonly loading = input.required<boolean>();
  readonly filter = input<string>('');
  readonly displayedColumns = signal(Object.keys(TABLE_COLUMNS) as (keyof PeriodicElement)[]);
  readonly tableData = computed<MatTableDataSource<PeriodicElement>>(() => {
    if(this.loading()) return new MatTableDataSource(Array(PLACEHOLDER_ROWS_COUNT).fill({}));
    const dataSource = new MatTableDataSource<PeriodicElement>(this.data().sort((a, b) => a.id - b.id));
    dataSource.filter = this.filter();
    return dataSource;
  });
}

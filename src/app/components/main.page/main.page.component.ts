import { Component, inject, signal } from '@angular/core';
import { TableComponent } from 'src/app/components/main.page/components/table/table.component';
import { DataStore } from 'src/app/store/data.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EditElementModalComponent } from 'src/app/components/modals/edit-element.modal/edit-element.modal.component';
import { PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

const INPUT_DELAY_MS = 2000;

@Component({
  selector: 'app-main.page',
  standalone: true,
  imports: [
    TableComponent,
    MatProgressSpinner,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './main.page.component.html',
  styleUrl: './main.page.component.scss'
})
export class MainPageComponent {
  private _filterTimeout: number | undefined;
  private readonly _store = inject(DataStore);
  readonly filter = signal<string>('');
  readonly data = this._store.data;
  readonly isLoading = this._store.isLoading;
  readonly dialog = inject(MatDialog);

  openModal(data: [PeriodicElementWithId | undefined, MouseEvent]) {
    const [element, event] = data;
    if (element && event.target instanceof HTMLTableCellElement) {
      const target = event.target as HTMLTableCellElement;
      const columnIndex = target.cellIndex;
      const columnName = Object.keys(element)[columnIndex];
      const value = target.innerText;
      this.dialog.open(EditElementModalComponent, { data: value }).afterClosed()
        .subscribe((newValue: string) => {
          this.updateData(newValue !== undefined ? { ...element, [columnName]: newValue } : element);
        });
    }
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    clearTimeout(this._filterTimeout);
    this._filterTimeout = window.setTimeout(() => {
      this.filter.set(filterValue.trim().toLowerCase());
    }, INPUT_DELAY_MS);
  }

  private updateData(data: PeriodicElementWithId) {
    this._store.updateData(data);
  }
}

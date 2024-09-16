import { Component, effect, inject, Signal, signal } from '@angular/core';
import { TableComponent } from 'src/app/components/main.page/components/table/table.component';
import { DataStore } from 'src/app/store/data.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EditElementModalComponent } from 'src/app/components/modals/edit-element.modal/edit-element.modal.component';
import { PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { rxState } from '@rx-angular/state';
import { RxLet } from '@rx-angular/template/let';

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
    MatIcon,
    MatIconButton,
    MatSuffix,
    FormsModule,
    AsyncPipe,
    RxLet,
  ],
  templateUrl: './main.page.component.html',
  styleUrl: './main.page.component.scss'
})
export class MainPageComponent {
  private readonly _store = inject(DataStore);
  private readonly _state = rxState<{ filter: string }>(({ set }) => {
    set({ filter: '' });
  });
  private readonly _dialog: MatDialog = inject(MatDialog);
  readonly filterInputValue = signal<string>('');
  readonly data: Signal<PeriodicElementWithId[]> = this._store.data;
  readonly isLoading: Signal<boolean> = this._store.isLoading;
  readonly filter$: Observable<string> = this._state.select('filter').pipe(
    distinctUntilChanged(),
    debounceTime(INPUT_DELAY_MS),
    startWith(''),
  );

  constructor() {
    effect(() => {
      this._state.set({ filter: this.filterInputValue() });
    });
  }

  openModal(data: [PeriodicElementWithId | undefined, MouseEvent]) {
    const [element, event] = data;
    if (element && event.target instanceof HTMLTableCellElement) {
      const target: HTMLTableCellElement = event.target;
      const columnIndex: number = target.cellIndex;
      const columnName: string = Object.keys(element)[columnIndex];
      const cellValue: string = target.innerText;
      this._dialog.open(EditElementModalComponent, { data: cellValue }).afterClosed()
        .subscribe((newValue: string) => {
          this.updateData(newValue !== undefined ? { ...element, [columnName]: newValue } : element);
        });
    }
  }

  resetFilter(): void {
    this.filterInputValue.set('');
  }

  private updateData(data: PeriodicElementWithId): void {
    this._store.updateData(data);
  }
}

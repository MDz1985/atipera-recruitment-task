import { Component, effect, inject, signal } from '@angular/core';
import { TableComponent } from 'src/app/components/main.page/components/table/table.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EditElementModalComponent } from 'src/app/components/modals/edit-element.modal/edit-element.modal.component';
import { PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RxLet } from '@rx-angular/template/let';
import { DataState, IDataState } from 'src/app/state/data.state';

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
  providers: [DataState],
  templateUrl: './main.page.component.html',
  styleUrl: './main.page.component.scss'
})
export class MainPageComponent {
  private readonly _dataState = inject(DataState);
  private readonly _dialog: MatDialog = inject(MatDialog);
  readonly vm$: Observable<IDataState> = this._dataState.select();
  readonly filterInputValue = signal<string>('');

  constructor() {
    effect(() => {
      this._dataState.setFilter(this.filterInputValue());
    });
  }

  openModal(data: [PeriodicElementWithId | undefined, MouseEvent]) {
    const [element, event] = data;
    if (element && event.target instanceof HTMLTableCellElement) {
      const target: HTMLTableCellElement = event.target;
      const columnIndex: number = target.cellIndex;
      const columnName: string = Object.keys(element)[columnIndex];
      const cellValue: string = target.innerText;
      firstValueFrom(this._dialog.open(EditElementModalComponent, { data: cellValue }).afterClosed())
        .then((newValue: string) => this.updateData(newValue !== undefined ? { ...element, [columnName]: newValue } : element))
    }
  }

  resetFilter(): void {
    this.filterInputValue.set('');
    this._dataState.resetFilter()
  }

  private updateData(data: PeriodicElementWithId): void {
    this._dataState.updateData(data);
  }
}

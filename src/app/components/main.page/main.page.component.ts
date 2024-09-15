import { Component, inject } from '@angular/core';
import { TableComponent } from 'src/app/components/main.page/components/table/table.component';
import { DataStore } from 'src/app/store/data.store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EditElementModalComponent } from 'src/app/components/modals/edit-element.modal/edit-element.modal.component';
import { PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';

@Component({
  selector: 'app-main.page',
  standalone: true,
  imports: [
    TableComponent,
    MatProgressSpinner,
  ],
  templateUrl: './main.page.component.html',
  styleUrl: './main.page.component.scss'
})
export class MainPageComponent {
  store = inject(DataStore);
  readonly data = this.store.data;
  readonly isLoading = this.store.isLoading;
  readonly dialog = inject(MatDialog);

  openModal(data: [PeriodicElementWithId | undefined, MouseEvent]) {
    const [element, event] = data;
    if (element) {
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

  private updateData(data: PeriodicElementWithId) {
    this.store.updateData(data);
  }
}

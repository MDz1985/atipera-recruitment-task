import { Component, inject } from '@angular/core';
import { TableComponent } from 'src/app/components/main.page/components/table/table.component';
import { DataStore } from 'src/app/store/data.store';

@Component({
  selector: 'app-main.page',
  standalone: true,
  imports: [
    TableComponent,
  ],
  templateUrl: './main.page.component.html',
  styleUrl: './main.page.component.scss'
})
export class MainPageComponent {
  store = inject(DataStore);
  readonly data = this.store.data;
  readonly isLoading = this.store.isLoading;

}

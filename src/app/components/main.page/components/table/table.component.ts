import { Component, input } from '@angular/core';
import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  data = input<PeriodicElement[]>();
}

import { Component } from '@angular/core';
import { TableComponent } from 'src/app/components/table/table.component';

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

}

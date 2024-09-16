import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-shade',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './loading-shade.component.html',
  styleUrl: './loading-shade.component.scss'
})
export class LoadingShadeComponent {

}

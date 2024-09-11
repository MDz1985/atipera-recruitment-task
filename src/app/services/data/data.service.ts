import { Injectable } from '@angular/core';
import { delay, firstValueFrom, of } from 'rxjs';
import { ELEMENT_DATA } from 'src/app/data/ELEMENT_DATA';
import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';

const SERVER_DELAY = 1000;

@Injectable({ providedIn: 'root' })
export class DataService {
  getData(): Promise<PeriodicElement[]> {
    return firstValueFrom(of(ELEMENT_DATA).pipe(delay(SERVER_DELAY)));
  }
}

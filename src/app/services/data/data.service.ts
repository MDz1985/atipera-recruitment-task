import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { ELEMENT_DATA } from 'src/app/data/ELEMENT_DATA';

const SERVER_DELAY = 1000;

@Injectable()
export class DataService {
  getData() {
    return of(ELEMENT_DATA).pipe(delay(SERVER_DELAY));
  }
}

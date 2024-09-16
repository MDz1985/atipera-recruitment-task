import { Pipe, PipeTransform } from '@angular/core';
import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';
import { TABLE_COLUMNS } from 'src/app/data/TABLE_COLUMNS';

@Pipe({
  name: 'tableColumn',
  standalone: true
})
export class TableColumnPipe implements PipeTransform {
  transform(value: string): string {
    return value in TABLE_COLUMNS ? TABLE_COLUMNS[value as keyof PeriodicElement] : value;
  }
}

import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';

export const TABLE_COLUMNS: Record<keyof PeriodicElement, string> = {
  name: 'Name',
  position: 'Number',
  symbol: 'Symbol',
  weight: 'Weight',
};

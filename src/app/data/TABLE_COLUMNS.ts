import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';

export const TABLE_COLUMNS: Record<keyof PeriodicElement, string> = {
  position: 'Number',
  name: 'Name',
  weight: 'Weight',
  symbol: 'Symbol',
};

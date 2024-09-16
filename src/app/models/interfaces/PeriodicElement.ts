export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

export interface PeriodicElementWithId extends PeriodicElement {
  id: number;
}

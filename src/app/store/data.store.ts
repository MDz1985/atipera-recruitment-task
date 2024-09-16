import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { PeriodicElement, PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';

interface DataState {
  isLoading: boolean;
  data: PeriodicElementWithId[];
}

const initialState: DataState = {
  isLoading: false,
  data: [],
};

export const DataStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, dataService = inject(DataService)) => ({
    async loadData(): Promise<void> {
      patchState(store, { isLoading: true });
      const data = await dataService.getData();

      patchState(store, {
        data: data.map((el: PeriodicElement, i: number): PeriodicElementWithId => ({ ...el, id: i })),
        isLoading: false
      });
    },
    updateData(data: PeriodicElementWithId): void {
      patchState(store, { data: [...store.data().filter((el) => el.id !== data.id), data] });
    }
  })),
  withHooks({ onInit: ({ loadData }) => loadData() })
);

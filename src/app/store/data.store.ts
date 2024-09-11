import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { PeriodicElement } from 'src/app/models/interfaces/PeriodicElement';

interface DataState {
  isLoading: boolean;
  data: PeriodicElement[];
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
      patchState(store, { data, isLoading: false });
    },
  })),
  withHooks({ onInit: ({ loadData }) => loadData() })
);

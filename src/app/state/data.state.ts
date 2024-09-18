import { PeriodicElement, PeriodicElementWithId } from 'src/app/models/interfaces/PeriodicElement';
import { inject, Injectable } from '@angular/core';
import { rxActions } from '@rx-angular/state/actions';
import { RxState } from '@rx-angular/state';
import { concatMap, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';

const INPUT_DELAY_MS = 2000;

export interface IDataState {
  isLoading: boolean;
  data: PeriodicElementWithId[];
  filter: string;
}

interface Actions {
  loadData: void;
  updateData: PeriodicElementWithId;
  setFilter: string;
  resetFilter: void;
}

@Injectable()
export class DataState extends RxState<IDataState> {
  private _dataService: DataService = inject(DataService);
  private readonly _actions = rxActions<Actions>();
  public readonly updateData = this._actions.updateData;
  public readonly setFilter = this._actions.setFilter;
  public readonly resetFilter = this._actions.resetFilter;

  constructor() {
    super();
    this.set({ isLoading: false, data: [], filter: '' });
    this.connect(
      'data',
      this._actions.loadData$.pipe(
        tap(() => this.set({ isLoading: true })),
        concatMap(async () => {
            const data = await this._dataService.getData();
            return data.map((el: PeriodicElement, i: number): PeriodicElementWithId => ({ ...el, id: i }));
          }
        ),
        tap(() => this.set({ isLoading: false })),
      ),
    );
    this.connect(
      'data',
      this._actions.updateData$.pipe(
        map((element: PeriodicElementWithId): PeriodicElementWithId[] => ([
            ...this.get('data').filter((el) => el.id !== element.id),
            element
          ])
        )
      )
    );
    this.connect(
      'filter',
      this._actions.setFilter$.pipe(
        distinctUntilChanged(),
        debounceTime(INPUT_DELAY_MS),
        map((filter: string) => filter)
      )
    );
    this.connect(
      'filter',
      this._actions.resetFilter$.pipe(
        map(() => '')
      )
    );
    this._actions.loadData();
  }
}


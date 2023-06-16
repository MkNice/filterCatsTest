import { State, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import {
  GetData,
  GetCatsByBreed,
  GetCatsError,
} from './cats.actions';
import { DataCatsService } from '../services/data-cats.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ICatsState } from '../interfaces/cats-state.interface';

const initialCatsState: ICatsState = {
  isLoading: false,
  cats: [],
  breeds: [],
  error: null,
  params: null,
};

@State<ICatsState>({
  name: 'cats',
  defaults: initialCatsState,
})
@Injectable()
export class CatsState {
  constructor(private catsService: DataCatsService) { }

  @Action(GetData)
  getData(ctx: StateContext<ICatsState>) {
    ctx.patchState({ isLoading: true });

    return this.catsService.getCatsWithBreeds().pipe(
      tap((data) => {
        const [cats, breeds] = data;
        ctx.patchState({ isLoading: false, cats, breeds });
      }),
      catchError((error) => ctx.dispatch(new GetCatsError(error.message)))
    );
  }

  @Action(GetCatsByBreed)
  getCatsByBreed(ctx: StateContext<ICatsState>, action: GetCatsByBreed) {
    ctx.patchState({ isLoading: true, params: action.params });
    return this.catsService.getCatsByBreed(action.params).pipe(
      tap((cats) => {
        ctx.patchState({ isLoading: false, cats: cats });
      }),
      catchError((error) => {
        ctx.patchState({ isLoading: false, error: error });
        return of(error);
      })
    );
  }
}
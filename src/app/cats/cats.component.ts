import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICat } from 'src/app/cats/interfaces/cat.interface';
import { IFilter } from './interfaces/filter.interface';

import { Select, Store } from '@ngxs/store';

import { GetData, GetCatsByBreed } from './store/cats.actions';
import { CatsSelectors } from './store/cats.selector';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CatsComponent {
  @Select(CatsSelectors.cats)
  public cats$!: Observable<ICat[]>;

  @Select(CatsSelectors.isLoading)
  public isLoading$!: Observable<boolean>;

  constructor(private store: Store) {
    this.getCats();
  }

  private getCats(): void {
    this.store.dispatch(new GetData());
  }

  public getCatsByBreed(event: IFilter): void {
    this.store.dispatch(
      new GetCatsByBreed({
        countCats: event.amountCats,
        breedCat: event.currentBreed,
      })
    );
  }

}
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICatBreed } from 'src/app/cats/interfaces/cat-breed.interface';
import { IFilter } from 'src/app/cats/interfaces/filter.interface';
import { environment } from 'src/environments/environment';
import { Select } from '@ngxs/store';
import { CatsSelectors } from '../../store/cats.selector';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilterComponent {
  @Output() dataFilter: EventEmitter<IFilter> = new EventEmitter<IFilter>();

  @Select(CatsSelectors.breeds)
  public catBreeds$!: Observable<ICatBreed[]>;

  public filterForm: FormGroup = new FormGroup({
    breed: new FormControl(''),
    amountCats: new FormControl(environment.DEFAULT_AMOUNT_CATS, [
      Validators.min(1),
      Validators.max(20),
    ])
  });

  public readonly defaultFilterBreed: string = '';

  public emitFilterData(): void {
    const { breed, amountCats } = this.filterForm.value;

    const filterData = {
      amountCats: amountCats,
      currentBreed: breed
    }

    this.dataFilter.emit(filterData);
  }
}
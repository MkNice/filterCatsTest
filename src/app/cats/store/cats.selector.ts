import { Selector } from '@ngxs/store';
import { CatsState } from './cats.state';
import { ICatsState } from '../interfaces/cats-state.interface';

export class CatsSelectors {
  @Selector([CatsState])
  static isLoading(state: ICatsState) {
    return state.isLoading;
  }

  @Selector([CatsState])
  static cats(state: ICatsState) {
    return state.cats;
  }

  @Selector([CatsState])
  static breeds(state: ICatsState) {
    return state.breeds;
  }

  @Selector([CatsState])
  static error(state: ICatsState) {
    return state.error;
  }
}
